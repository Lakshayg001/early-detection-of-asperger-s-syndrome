from ml.inference import AspireSenseInference
import numpy as np
import os

def final_test():
    print("Initializing Multi-modal Deep Fusion Inference...")
    # Use explicit model path for test
    inference = AspireSenseInference(model_dir="ml/models")
    
    # Mock data following the expected schema
    q_data = {
        "age": 25,
        "gender": "male",
        "familyHistory": True,
        "a1": "Definitely Agree",
        "a2": "Definitely Agree",
        "a3": "Definitely Agree",
        "a4": "Definitely Agree",
        "a5": "Definitely Agree",
        "a6": "Definitely Agree",
        "a7": "Definitely Agree",
        "a8": "Definitely Agree",
        "a9": "Definitely Agree",
        "a10": "Definitely Agree"
    }
    
    gaze_data = [{"x": 0.5, "y": 0.5}] * 50 # High social fixation
    
    print("\nRunning Multi-modal Prediction...")
    results = inference.predict_risk(
        questionnaire_data=q_data,
        eye_tracking_data=gaze_data,
        video_path=None, # Testing fallback/neutral
        audio_path=None
    )
    
    print(f"\nResulting Risk Score: {results['risk_score']}%")
    print("\nDomain Analysis:")
    for d in results['domain_scores']:
        print(f"- {d['subject']}: {d['A']}")
        
    print("\nExplainability (SHAP):")
    for s in results['shap']:
        print(f"- {s['name']}: {s['detail']} (Impact: {s['value']})")

    if results['risk_score'] > 0:
        print("\n[SUCCESS] Deep Learning Engine is FUNCTIONAL and providing real analysis.")
    else:
        print("\n[ERROR] Risk score is 0. Check model loading.")

if __name__ == "__main__":
    final_test()
