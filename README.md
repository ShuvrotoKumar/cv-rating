# CVInsight AI — Intelligent Resume Analyzer

CVInsight AI হলো একটি এআই-চালিত উন্নত রেজ্যুমে বিশ্লেষণ প্ল্যাটফর্ম। এটি রেজ্যুমে আপলোড করার পর সেটির টেক্সট এক্সট্রাক্ট করে এবং AI (GPT-4o) ব্যবহার করে রেজ্যুমেটিকে ATS (Applicant Tracking System) স্ট্যান্ডার্ড অনুযায়ী মূল্যায়ন করে। এটি চাকরিপ্রার্থীদের রেজ্যুমে অপ্টিমাইজ করতে এবং ক্যারিয়ারের পরবর্তী ধাপ সম্পর্কে সুনির্দিষ্ট পরামর্শ প্রদান করে।

---

## 🚀 মূল বৈশিষ্ট্যসমূহ (Key Features)

*   **AI-Powered Analysis:** GPT-4o ব্যবহার করে রেজ্যুমের ATS সামঞ্জস্যতা, স্কিলস, এবং অভিজ্ঞতার গুণগত মান মূল্যায়ন।
*   **Robust Extraction:** PDF এবং DOCX ফাইল থেকে টেক্সট এক্সট্রাকশন।
*   **OCR Fallback:** স্ক্যান করা বা ইমেজ-বেসড রেজ্যুমের জন্য `Tesseract.js` ব্যবহার করে OCR সাপোর্ট।
*   **Multi-Dimensional Scoring:** ATS, স্কিলস, অভিজ্ঞতা, গ্রামার এবং ফরম্যাটিংয়ের ওপর ভিত্তি করে ১০০-র মধ্যে স্কোর প্রদান।
*   **Actionable Insights:** রেজ্যুমে উন্নয়নের জন্য সুনির্দিষ্ট পরামর্শ এবং ক্যারিয়ার রোডম্যাপ।
*   **Production-Ready API:** এপিআই-ফার্স্ট ডিজাইন, যা দ্রুত এবং নিরাপদ ডেটা প্রসেসিং নিশ্চিত করে।

---

## 🛠 টেকনোলজি স্ট্যাক (Tech Stack)

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

## ⚙️ সেটআপ নির্দেশিকা (Getting Started)

### ১. রিকোয়ারমেন্টস
আপনার মেশিনে অবশ্যই **Node.js (v18+)** এবং **MongoDB** ইনস্টল থাকতে হবে।

### ২. প্রজেক্ট কনফিগারেশন
প্রথমে রুট ডিরেক্টরিতে প্রজেক্টটি ক্লোন করুন এবং ডিপেনডেন্সি ইনস্টল করুন:

```bash
# Backend সেটআপ
cd backend
npm install

# Frontend সেটআপ
cd ../frontend
npm install
```

### ৩. এনভায়রনমেন্ট ভেরিয়েবল (.env)
*   `backend/.env` ফাইল তৈরি করুন:
    ```env
    OPENAI_API_KEY=your_openai_key
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
*   `frontend/.env.local` ফাইল তৈরি করুন:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

### ৪. প্রজেক্ট রান করা
```bash
# Backend রান করুন
cd backend
npm run dev

# Frontend রান করুন
cd ../frontend
npm run dev
```

---

## 🔗 API ডকুমেন্টেশন (সংক্ষিপ্ত)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/resume/upload` | রেজ্যুমে ফাইল আপলোড এবং এআই বিশ্লেষণ। |
| `GET` | `/api/resume/history` | পূর্ববর্তী রেজ্যুমে বিশ্লেষণের ইতিহাস। |

---

## 🏗 সিস্টেম আর্কিটেকচার
এই প্রজেক্টটি একটি মাইক্রোসার্ভিস আর্কিটেকচার অনুসরণ করে। ব্যাকএন্ডে একটি মাল্টি-লেয়ার পাইপলাইন রয়েছে:
1. **Extraction Layer:** ফাইল থেকে টেক্সট সংগ্রহ।
2. **OCR Fallback:** এক্সট্রাকশন ব্যর্থ হলে ইমেজ প্রসেসিং।
3. **AI Evaluation Layer:** GPT-4o দ্বারা বিশ্লেষণ।
4. **Data Layer:** মঙ্গোডিবিতে ফলাফল সংরক্ষণ।

---

## 🤝 কন্ট্রিবিউশন
এই প্রজেক্টটি ওপেন সোর্স। আপনি যদি নতুন ফিচার যোগ করতে চান অথবা বাগ ফিক্স করতে চান, তবে একটি `Pull Request` দিন।

---

## ⚖️ লাইসেন্স
এই প্রজেক্টটি [MIT License](LICENSE) এর অধীনে লাইসেন্সপ্রাপ্ত।
