# 🏥 AspireSense: Project Presentation Guide
**Multi-Modal AI Diagnostic Support for Autism Spectrum Disorder (Level 1 / Asperger's)**

---

## 🌟 1. Core Vision & Concept
**The Problem:** Autism Spectrum Disorder (ASD), particularly Level 1 (Asperger's), is often missed in early childhood or misdiagnosed due to the subtlety of behavioral markers and the subjectivity of traditional screening.
**The Solution:** **AspireSense** is a multi-modal "Diagnostic Fusion" platform. It doesn't just rely on text surveys; it synchronizes **Eye-Tracking**, **Acoustic Speech Patterns**, and **Facial Affect** with clinical questionnaires to provide a weighted, data-driven "Probability Index" for clinicians.

---

## 🧪 2. The Science of Multi-Modal Fusion
Explain to your teachers how the project uses "Fusion" instead of single-point analysis:

1.  **Clinical Questionnaire (The Baseline)**:
    - Uses the **AQ-10 (Autism Quotient)** screening parameters.
    - Processes 10 core behavioral markers (A1–A10) to establish a baseline score.
2.  **Ocular Gaze Mapping (The Biometric Marker)**:
    - **Logic**: Research shows that individuals on the spectrum often exhibit different foveal latency (time to look at objects) and reduced fixation on social areas of the face.
    - **Implementation**: Uses **WebGazer.js** for real-time gaze synchronization via the user's webcam.
3.  **Acoustic Prosody (The Speech Marker)**:
    - **Logic**: Analyze speech rhythm and pitch modulation. Monotone prosody is a well-documented phenotype.
    - **Implementation**: Captures raw audio and analyzes spectral variations to detect "monotone frequency" clusters.
4.  **Facial Affective Variance (The Visual Marker)**:
    - **Logic**: Studies "Flat Affect" (reduced facial expression variance).
    - **Implementation**: Uses **OpenCV** to track facial pixel delta variance. Low motion variance in a speaking video correlates with reduced emotional expressivity.

---

## 💻 3. Technical Stack (The "How it Works")
*   **Frontend**: React 19 (High-performance rendering) + Vite.
*   **Styling**: **Tailwind CSS** with a custom "Tactical Minimalist" Design System (Teal & Green Palette).
*   **Animations**: **Framer Motion** (Used for "Cinematic Processing" effects to engage users).
*   **Data Visualization**: **Recharts** (Radar charts for clinical domains, circular progress for risk).
*   **Backend**: **FastAPI** (Python) for asynchronous, low-latency ML inference.
*   **AI/ML Frameworks**: 
    - **XGBoost**: For extremely high accuracy on questionnaire tabular data.
    - **TensorFlow/Keras**: For the "Fusion Model" that weights biometrics against the survey.
    - **OpenCV**: For computer vision-based facial motion analysis.

---

## 🛡️ 4. Key Professional Features
*   **Ocular Protocol**: A 9-point calibration system to ensure gaze data is scientifically valid.
*   **Outcome Intelligence**: Uses a "Risk Core" indicator and a **Diagnostic Mesh (Radar Chart)** to show which specific domains (Communication, Social, Sensory) are most affected.
*   **Clinical Attribution (SHAP)**: The system doesn't just give a score; it explains **WHY** (e.g., "Identified atypically low ocular fixation delta").
*   **Longitudinal Archives**: A history system that allows clinicians to track a patient’s progress or secondary screenings over months.

---

## 🎤 5. Presentation Script (Short Version)
> *"Good morning teachers. Our project, **AspireSense**, is a next-generation screening platform for Autism Spectrum Disorder. Instead of relying purely on subjective questionnaires, we've built a **Multi-Modal AI engine**. My platform captures the user's eye movements, their speech rhythm, and their facial expressions in real-time. By 'fusing' these biometric signals with clinical survey data, AspireSense provides a high-purity 'Neural Probability Index' that gives clinicians a deep, 360-degree view of a patient’s diagnostic profile. This reduces the time to screening and increases the accuracy of early intervention."*

---

## ❓ 6. Expected Q&A for Teachers
1.  **Q: Is this a final diagnosis?**
    *   **A**: No, it is a **Clinical Decision Support Tool**. It is designed to flag cases for specialist review with empirical data that a standard paper survey cannot provide.
2.  **Q: How do you handle privacy?**
    *   **A**: The platform simulates a **HIPAA-secure environment**. Biometric data is processed for inference and can be encrypted using AES-256 for clinical archives.
3.  **Q: Why the Teal and Green theme?**
    *   **A**: This palette is designed for **Clinical Professionalism**. Teal represents trust and calm, while Green represents growth and health. It is a "Minimalist Tactical" aesthetic used by high-end medical enterprises.

---

**Good luck with your presentation tomorrow! You've built a world-class project. 🚀**
