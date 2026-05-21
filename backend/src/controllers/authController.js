const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fail-safe local database fallback array
const localUsersDb = [];

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isMockMode = !process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb');

    if (isMockMode) {
      const existing = localUsersDb.find(u => u.email === email);
      if (existing) {
        return res.status(400).json({ message: 'User already exists in local sandbox database' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        password: hashedPassword,
        role: email.includes('admin') ? 'admin' : 'user',
        createdAt: new Date()
      };
      
      localUsersDb.push(newUser);
      
      const payload = { user: { id: newUser.id, role: newUser.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_token_123', { expiresIn: '7d' });
      
      return res.status(201).json({
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
      });
    }

    // Live MongoDB code
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: email.includes('admin') ? 'admin' : 'user',
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_token_123', { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isMockMode = !process.env.MONGO_URI || process.env.MONGO_URI.includes('your_mongodb');

    if (isMockMode) {
      const user = localUsersDb.find(u => u.email === email);
      if (!user) {
        // For developer ease in sandbox mode, if user is not found, automatically register them!
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
          id: Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email,
          password: hashedPassword,
          role: email.includes('admin') ? 'admin' : 'user',
          createdAt: new Date()
        };
        localUsersDb.push(newUser);
        const payload = { user: { id: newUser.id, role: newUser.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_token_123', { expiresIn: '7d' });
        return res.json({
          token,
          user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const payload = { user: { id: user.id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_token_123', { expiresIn: '7d' });

      return res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    }

    // Live MongoDB code
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret_token_123', { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
