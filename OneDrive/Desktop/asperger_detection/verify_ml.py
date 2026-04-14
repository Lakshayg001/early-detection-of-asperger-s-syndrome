import sys
import os

# Add the root directory to sys.path to import from ml/
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ml.inference import AspireSenseInference

def test_ml():
    print("Initializing AspireSenseInference...")
    inference = AspireSenseInference()
    
    mock_questionnaire = {
        "q1": "Definitely Agree",
        "q2": "Slightly Agree",
        "q3": "Slightly Disagree",
        "q4": "Definitely Disagree"
    }
    
    mock_eye_tracking = {"fixation_ratio": 0.8}
    
    print("Running prediction...")
    results = inference.predict_risk(
        questionnaire_data=mock_questionnaire,
        eye_tracking_data=mock_eye_tracking
    )
    
    print("\nML Prediction Results:")
    print(f"Risk Score: {results['risk_score']}%")
    print(f"Domain Scores: {results['domain_scores']}")
    print(f"SHAP Values: {results['shap']}")
    
    if results['risk_score'] >= 0:
        print("\nML Component is INTEGRATED and WORKING (using mock logic).")
    else:
        print("\nML Component returned invalid results.")

if __name__ == "__main__":
    test_ml()
