# 🧠 AspireSense: Machine Learning Architecture Report
**Technical Documentation of the Multi-Modal Diagnostic Fusion System**

---

## 1. The Core Architecture: Multi-Modal Fusion
AspireSense operates on a **Late-Fusion AI Architecture**. Instead of analyzing each data point in isolation, the system extracts high-level features from four distinct modalities and passes them into a unified Deep Learning classifier.

### Modality 1: Tabular Clinical Markers (AQ-10)
*   **Algorithm**: **XGBoost (Extreme Gradient Boosting)**.
*   **Why?**: Tabular screening data (like the AQ-10) has high non-linear relationships but is relatively small in dimension. XGBoost provides the highest accuracy and interpretability for this specific type of clinical data.
*   **Features**: A1–A10 (binary encoding), age, gender, family history, and neonatal jaundice history.

### Modality 2: Ocular Foveal Latency (Eye-Tracking)
*   **Algorithm**: **Fixation Delta Analysis**.
*   **Process**: The system tracks `(x, y)` coordinates over a social interaction sequence.
*   **Feature Extraction**: Calculates the **Social Fixation Ratio**—the percentage of time the user focuses on the central "social triangle" vs. peripheral avoidant areas. Low ratios increase the ASD probability weight.

### Modality 3: Affective Variance (Computer Vision)
*   **Algorithm**: **OpenCV Temporal Pixel-Delta Analysis**.
*   **Process**: High-frequency frame-by-frame movement subtraction.
*   **Feature Extraction**: Individuals with ASD Level 1 often exhibit "Flat Affect" (reduced facial expressivity). The model calculates the **Motion Intensity Variance**. High variance = expressive; Low variance = potential affective flattening marker.

### Modality 4: Acoustic Spectral Prosody (Audio)
*   **Algorithm**: **Signal Frequency Pulse Sampling**.
*   **Process**: Analyzes the rhythm and pitch of the recorded speech.
*   **Feature Extraction**: Identifies **monotone speech clusters**. A lack of pitch modulation (prosody) across the 60-second sample is mapped to the final fusion vector.

---

## 2. The Fusion Neural Network (FNN)
After features are extracted from all four sources, they are concatenated into a **Global Feature Vector**.

1.  **Normalization**: A `StandardScaler` (Z-score normalization) ensures that age (e.g., 25) doesn't outweigh eye-fixation (e.g., 0.42) purely by number magnitude.
2.  **Dense Layers**: A multi-layer Feed-Forward Neural Network (TensorFlow/Keras) processes the fusion vector.
3.  **Softmax/Sigmoid Activation**: The final layer outputs a probability between 0 and 1, which we convert to the "Risk Score" shown in the UI.

---

## 3. Explainability (SHAP Logic)
We don't just output a number. We implement **Attribution Mapping**:
*   The system calculates the contribution of each individual feature to the final score.
*   For example: If `Risk = 72%`, the system can determine that 18% of that risk came from **Ocular Latency** and 25% from **Questionnaire Markers**.
*   This is presented in the "Evidence Attribution" cards to help clinicians verify the model's findings.

---

## 4. Training Pipeline
*   **Dataset**: Trained on consolidated data derived from **Kaggle's Autistic Spectrum Disorder Screening Data** (for Toddlers, Children, and Adults) + synthetic biometric data aligned with peer-reviewed clinical studies.
*   **Cross-Validation**: 5-fold cross-validation to prevent overfitting on specific age groups.
*   **Hyperparameter Tuning**: Bayesian optimization was used to find the optimal depth for the XGBoost trees and the learning rate for the Fusion Network.

---

## Summary for Presentation
"Our ML system uses **Multi-Modal Fusion**. We take clinical surveys and combine them with real-time biometric signals (Eyes, Sound, Face) using a **Dual-Model approach** (XGBoost + Neural Networks). This ensures the diagnosis is not just based on what the user says, but how they behave during the session."
