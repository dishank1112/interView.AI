from deepface import DeepFace
import cv2
import numpy as np

emotion_mapping = {
    "happy": "Confident",
    "sad": "Nervous",
    "angry": "Fumble",
    "neutral": "Neutral",
    "fear": "Nervous",
    "surprise": "Confident",
    "disgust": "Fumble"
}

cap = cv2.VideoCapture(0)

frame_width = 640
frame_height = 480
cv2.namedWindow('Emotion Detector', cv2.WINDOW_NORMAL)

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to read frame from camera")
        break

    try:
        resized_frame = cv2.resize(frame, (224, 224))
        result = DeepFace.analyze(resized_frame, actions=['emotion'], enforce_detection=False)

        if isinstance(result, list):
            result = result[0]

        emotion_probabilities = result['emotion']
        mapped_emotions = {emotion_mapping[k]: v for k, v in emotion_probabilities.items()}

        # Sort emotions by probability
        sorted_emotions = sorted(mapped_emotions.items(), key=lambda x: x[1], reverse=True)

        # Display emotions on the video feed with animations
        y_offset = 50
        max_line_length = 300  # Maximum line length in pixels (100% will be this length)
        for emotion, percentage in sorted_emotions:
            line_length = int((percentage / 100) * max_line_length)
            cv2.line(frame, (50, y_offset), (50 + line_length, y_offset), (0, 0, 128), 5)  # Navy blue line

            label = f"{emotion}: {percentage:.2f}%"
            cv2.putText(frame, label, (50, y_offset - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (173, 216, 230), 2)  # Light blue text
            y_offset += 40

    except Exception as e:
        print(f"Error: {e}")
        cv2.putText(frame, "Error in emotion detection", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    cv2.imshow("Emotion Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
