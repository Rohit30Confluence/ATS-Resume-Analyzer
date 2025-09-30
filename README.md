# ATS Resume Analyzer

An intelligent, AI-powered web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). This tool analyzes a user's resume against a specific job description, provides a detailed ATS compatibility score, offers actionable feedback, and generates a revised, ATS-friendly version of the resume.

![ATS Resume Analyzer Screenshot](https://storage.googleapis.com/aistudio-hosting/project-assets/b178225e-4c3d-4952-b91b-9f375086082c/screenshot.png)

## ✨ Key Features

-   **AI-Powered Analysis**: Leverages the Google Gemini API to provide an in-depth analysis of your resume.
-   **ATS Compatibility Score**: Get an instant score (out of 10) to see how well your resume is likely to perform in an ATS.
-   **Keyword Matching**: Compares your resume to the job description to identify matching and missing keywords crucial for passing ATS filters.
-   **Actionable Feedback**: Receive concrete suggestions on improving action verbs, formatting, clarity, and overall content.
-   **Automated Resume Revision**: Generates a complete, rewritten, and optimized version of your resume that you can copy and use immediately.
-   **Easy Input**: Supports both pasting resume text directly and uploading a `.txt` file via a simple drag-and-drop interface.
-   **Modern & Responsive UI**: Clean, intuitive, and mobile-friendly interface built with React and Tailwind CSS.

## 🚀 How It Works

1.  **Upload or Paste Resume**: Drag and drop a `.txt` file or paste your resume text into the designated input field.
2.  **Paste Job Description**: Copy the full text of the job description for the role you're targeting and paste it into the second field.
3.  **Analyze**: Click the "Analyze My Resume" button to submit your information to the AI.
4.  **Get Results**: Within seconds, the application displays a comprehensive report including your score, detailed feedback, and your new, optimized resume.

## 🛠️ Technology Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **AI/LLM**: [Google Gemini API](https://ai.google.dev/)
-   **Build/Module System**: esbuild via AI Studio's web editor environment

## 📁 Project Structure

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── ClipboardCheckIcon.tsx
│   │   │   ├── ClipboardIcon.tsx
│   │   │   ├── RobotIcon.tsx
│   │   │   └── UploadIcon.tsx
│   │   ├── AnalysisResult.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ResumeInput.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── types.ts
├── index.html
├── metadata.json
└── README.md
```

## Getting Started

This project is set up to run in a specific web-based development environment (like AI Studio) where the API key is securely managed as an environment variable (`process.env.API_KEY`).

To run a similar project locally:

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```
    VITE_API_KEY=your_gemini_api_key_here
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
This will start the application, and you can access it in your browser, typically at `http://localhost:5173`.
