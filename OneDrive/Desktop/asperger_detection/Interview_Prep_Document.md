# Project Document: Early Detection of Asperger's Syndrome (AspireSense)

This document is structured to be clear, simple, and interview-ready. It breaks down the key components of the project into easily explainable points.

---

## 1. Project Overview
*   **What is the project about?** 
    AspireSense is an AI-powered diagnostic support platform designed to detect Asperger's Syndrome (Level 1 Autism). It evaluates users by combining traditional clinical questionnaires with real-time physical behaviors (eye movement, facial expressions, and voice patterns).
*   **What problem does it solve?** 
    Standard autism screening relies heavily on paper-based surveys, which can be highly subjective and easily miss subtle behavioral signs. This project solves that by introducing objective, data-driven biometric AI analysis.
*   **Why is it important?** 
    Early and accurate detection leads to better, faster interventions. This improves the quality of life for individuals on the spectrum by ensuring they get the right support without misdiagnosis.

## 2. Objective
*   **Main goal:** 
    To build a "Diagnostic Fusion" system that provides clinicians with a highly accurate "Probability Index" (Risk Score). It acts as a reliable decision-support tool by combining what a patient *says* (survey) with how they *behave* (biometrics).

## 3. Technologies Used
*   **Frontend (User Interface):** React.js, Tailwind CSS (for modern styling), Recharts (for interactive data visualization).
*   **Backend (Server):** Python with FastAPI (for fast AI processing).
*   **Machine Learning & AI:** 
    *   **XGBoost:** For analyzing the tabular survey data.
    *   **TensorFlow / Keras:** For the neural network that fuses all data points together.
    *   **OpenCV:** For computer vision and facial tracking.
    *   **WebGazer.js:** For real-time eye-tracking in the browser.

## 4. Working / Methodology
The system works on a "Late-Fusion" architecture.
*   **Step 1: Input:** The user completes a standard clinical questionnaire (AQ-10). While they do this, the system uses the device's webcam and microphone to capture real-time biometrics: eye gaze, facial expressions, and speech pitch.
*   **Step 2: Processing:** 
    *   Survey data is analyzed to find baseline patterns.
    *   Eye-tracking calculates the "Social Fixation Ratio" (how much they focus on social cues).
    *   Video analysis checks for "Flat Affect" (reduced facial expressivity).
    *   Audio analysis checks for monotone speech (lack of pitch modulation).
    *   All these individual signals are normalized and "Fused" into a Global Feature Vector, which is passed through a Neural Network.
*   **Step 3: Output:** The system outputs a final "Risk Score" alongside an Evidence Attribution map, explaining exactly which factors contributed to the score.

## 5. Features
*   **Multi-Modal AI Engine:** Evaluates 4 distinct inputs simultaneously (Text, Eyes, Face, Voice).
*   **Real-Time Biometric Tracking:** Tracks physical responses live through standard webcams without needing specialized hardware.
*   **Explainable AI (SHAP Logic):** The system doesn't just output a blind score; it explains *why*. (e.g., "70% Risk — Largely due to low ocular fixation and monotone acoustic prosody").
*   **Clinical Dashboard:** Features beautiful, interactive charts (Radar charts) showing domain-specific risks like Communication, Social, and Sensory issues.

## 6. Dataset
*   **Source Data:** Kaggle's Autistic Spectrum Disorder Screening Data (AQ-10 spanning Toddlers, Children, and Adults).
*   **Augmentation:** To train the multi-modal network, the dataset was augmented with synthetic biometric data (eye/face/audio metrics) mapped directly from peer-reviewed clinical studies.

## 7. Challenges Faced
*   **Real-Time Synchronization:** It was challenging to capture, sync, and process video, audio, and eye-tracking streams concurrently in a web browser without lagging.
*   **Hardware Tolerances:** Ensuring that eye-tracking (WebGazer) and facial recognition (OpenCV) functioned accurately across different qualities of user webcams and varying room lighting conditions.
*   **AI Model Balancing:** Tuning the "Fusion Network" so that one extreme input (like a loud background noise affecting the audio) wouldn't completely skew the final prediction.

## 8. Results / Outcome
*   Successfully achieved a unified, multi-modal diagnostic model that is significantly more robust than traditional single-point surveys.
*   Developed a fully functional, highly interactive clinical dashboard that provides a 360-degree patient profile.
*   Implemented an "Explainable AI" mechanism that gives clinicians the confidence to trust the platform's outputs.

## 9. Future Improvements
*   **Real-World Biometric Datasets:** Train the biometric models on larger, real-world clinical datasets rather than relying on synthetic augmentations.
*   **Mobile App Integration:** Develop a dedicated mobile application for easier, more accessible screening.
*   **Semantic Audio Analysis:** Upgrade the audio model to understand the actual meaning of the words spoken (NLP), rather than just analyzing the pitch and tone.
*   **Clinical Testing:** Partner with health institutions to conduct formal clinical trials and validate the system's accuracy in the real world.

## 10. Role & Contribution
*   **Full-Stack & ML Development:** Designed the entire architecture from the ground up.
*   **Frontend Engine:** Built the React interface, integrating complex real-time browser APIs for webcam and microphone access.
*   **Machine Learning:** Trained the XGBoost model for tabular data and the Neural Network for multi-modal fusion.
*   **Backend Integration:** Set up the Python FastAPI server to handle high-frequency AI inference requests smoothly.
