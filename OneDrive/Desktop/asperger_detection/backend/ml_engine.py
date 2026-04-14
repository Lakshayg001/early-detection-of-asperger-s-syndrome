import sys
import os

# Add the root directory to sys.path to import from ml/
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ml.inference import AspireSenseInference

class MLEngineService:
    def __init__(self):
        self.inference = AspireSenseInference()

    async def process_assessment(self, questionnaire_data: dict, eye_tracking_data: dict = None, video_path: str = None, audio_path: str = None):
        """
        Processes assessment data through the ML inference engine.
        """
        results = self.inference.predict_risk(
            questionnaire_data=questionnaire_data,
            eye_tracking_data=eye_tracking_data,
            video_path=video_path,
            audio_path=audio_path
        )
        return results

ml_service = MLEngineService()
