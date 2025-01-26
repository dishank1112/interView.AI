# emotion_detector.py
from deepface import DeepFace
import cv2
import numpy as np
import threading
import time

emotion_mapping = {
    "happy": "Confident",
    "sad": "Nervous",
    "angry": "Fumble",
    "neutral": "Neutral",
    "fear": "Nervous",
    "surprise": "Confident",
    "disgust": "Fumble"
}

def analyze_emotions(frame):
    try:
        resized_frame = cv2.resize(frame, (224, 224))
        result = DeepFace.analyze(resized_frame, actions=['emotion'], enforce_detection=False)

        if isinstance(result, list):
            result = result[0]

        emotion_probabilities = result['emotion']
        mapped_emotions = {emotion_mapping[k]: v for k, v in emotion_probabilities.items()}

        # Sort emotions by probability
        sorted_emotions = sorted(mapped_emotions.items(), key=lambda x: x[1], reverse=True)

        emotion_data = []
        y_offset = 50
        max_line_length = 300  # Maximum line length in pixels (100% will be this length)
        for emotion, percentage in sorted_emotions:
            line_length = int((percentage / 100) * max_line_length)
            emotion_data.append({
                'emotion': emotion,
                'percentage': percentage,
                'line_length': line_length
            })
            y_offset += 40

        return emotion_data

    except Exception as e:
        print(f"Error in emotion detection: {e}")
        return None
