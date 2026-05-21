# CVInsight AI — Intelligent Resume Analyzer

CVInsight AI is an AI-powered advanced resume analysis platform. After a user uploads a resume, the system extracts the text and uses AI (GPT-4o) to evaluate it based on ATS (Applicant Tracking System) standards. It provides job seekers with actionable feedback to optimize their resumes and professional growth roadmap.

---

## 🚀 Key Features

*   **AI-Powered Analysis:** Uses GPT-4o to evaluate ATS compatibility, skill relevance, and experience quality.
*   **Robust Extraction:** Automated text extraction from PDF and DOCX files.
*   **OCR Fallback:** Uses `Tesseract.js` for OCR support for scanned or image-based resumes.
*   **Multi-Dimensional Scoring:** Provides normalized scores (out of 100) for ATS, skills, experience, grammar, and formatting.
*   **Actionable Insights:** Delivers specific suggestions for resume improvement and career progression.
*   **Production-Ready API:** API-first design ensuring fast and secure data processing.

---

## 🛠 Tech Stack

### Frontend
*   **Framework:** Next.js, React
*   **Styling:** Tailwind CSS
*   **State Management:** Zustand
*   **Data Fetching:** Axios

### Backend
*   **Runtime:** Node.js, Express
*   **AI Engine:** OpenAI GPT-4o
*   **Extraction:** PDF-Parse, Mammoth
*   **OCR:** Tesseract.js
*   **Database:** MongoDB (via Mongoose)
*   **Security:** Helmet, CORS, Express-Rate-Limit

---

## ⚙️ Getting Started

### 1. Requirements
Ensure you have **Node.js (v18+)** and **MongoDB** installed on your machine.

### 2. Project Configuration
Clone the repository and install dependencies:

```bash
# Backend Setup
cd backend
npm install

# Frontend Setup
cd ../frontend
npm install
```

### 3. Environment Variables (.env)
*   Create `backend/.env`:
    ```env
    OPENAI_API_KEY=your_openai_key
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
*   Create `frontend/.env.local`:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

### 4. Running the Project
```bash
# Run Backend
cd backend
npm run dev

# Run Frontend
cd ../frontend
npm run dev
```

---

## 🔗 API Documentation (Overview)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/resume/upload` | Upload resume and perform AI analysis. |
| `GET` | `/api/resume/history` | Retrieve past analysis logs for the authenticated user. |

---

## 🏗 System Architecture
This project follows a microservice-inspired architecture with a multi-layer pipeline:
1. **Extraction Layer:** Collects text from files.
2. **OCR Fallback:** Image processing for scanned files.
3. **AI Evaluation Layer:** Analysis performed by GPT-4o.
4. **Data Layer:** Results persisted in MongoDB.

---

## 🤝 Contribution
This project is open-source. Feel free to submit a `Pull Request` for new features or bug fixes.

---

## ⚖️ License
This project is licensed under the [MIT License](LICENSE).
