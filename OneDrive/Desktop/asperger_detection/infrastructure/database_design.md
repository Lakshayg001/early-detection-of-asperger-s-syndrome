# Database Design: AspireSense

## PostgreSQL (Relational)
Used for user authentication, assessment metadata, and historical records.

### `users`
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `password_hash`: String
- `full_name`: String
- `created_at`: Timestamp

### `assessments`
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key)
- `assessment_type`: String (Toddler, Child, Adult)
- `risk_score`: Float
- `status`: String (Completed, Pending)
- `created_at`: Timestamp

---

## MongoDB (Document-based)
Used for storing the high-dimensional multimodal assessment data.

### `assessment_data`
- `assessment_id`: UUID (Reference to PG)
- `demographics`: Object
- `questionnaire_responses`: Array
- `eye_tracking_data`: Object (Heatmap coordinates, durations)
- `audio_metadata`: Object (Duration, sample rate, reference ID)
- `video_metadata`: Object (Reference ID)
- `ml_insights`: {
    "shap_values": Array,
    "confidence_interval": [float, float],
    "domain_scores": {
        "social": float,
        "communication": float,
        "sensory": float,
        "repetitive": float
    }
}
