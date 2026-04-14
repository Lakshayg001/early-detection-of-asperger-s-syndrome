import requests
import json

def test_submission():
    url = "http://localhost:8000/api/assessment/submit"
    payload = {
        "name": "Test User",
        "age": 25,
        "gender": "male",
        "familyHistory": False,
        "responses": {"q1": "Definitely Agree", "q2": "Slightly Agree"},
        "gazeData": [{"x": 100, "y": 200, "t": 500}]
    }
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print("Response Data:")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_submission()
