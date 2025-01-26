import streamlit as st
import json
import time
import os
from dotenv import load_dotenv
import base64
import io
from PIL import Image
import pdf2image
import google.generativeai as genai

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

st.set_page_config(page_title="Interview SahayaK", layout="wide")

# Function to get AI response
def get_gemini_response(input_text, pdf_content, prompt):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([input_text, pdf_content[0], prompt])
        return response.text
    except Exception as e:
        st.error(f"Error generating response: {e}")
        return None

# Function to process PDF upload
def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        images = pdf2image.convert_from_bytes(uploaded_file.read())
        first_page = images[0]

        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()
            }
        ]
        return pdf_parts
    else:
        st.error("No file uploaded")
        return None

# Main Streamlit app
st.header("Interview SahayaK")

# Role input and resume upload
input_text = st.text_area("Select the Role:", key="role_input")
uploaded_file = st.file_uploader("Upload your resume (PDF)...", type=["pdf"], key="resume_upload")

if uploaded_file is not None:
    st.write("PDF Uploaded Successfully!")

submit1 = st.button("Analyze Resume")

input_prompt1 = """
You are an experienced Technical Human Resource Manager. Your task is to review the provided resume against the job description. 
Analyze the resume in detail and provide a JSON analysis of the candidate's suitability for the role. Limit your response to 100 words.
"""

# Handle resume analysis
if submit1:
    if uploaded_file:
        pdf_content = input_pdf_setup(uploaded_file)
        if pdf_content:
            raw_analysis_output = get_gemini_response(input_text, pdf_content, input_prompt1)
            if raw_analysis_output:
                final_json = {
                    "JobRole": input_text,
                    "ResumeContent": pdf_content[0],
                    "LLMAnalysis": raw_analysis_output,
                }
                with open("resume_analysis.json", "w") as file:
                    json.dump(final_json, file, indent=4)
                st.success("Analysis saved to JSON!")
    else:
        st.error("Please upload a resume first.")

# Timer for the interview
st.subheader("Set the Timer for the Interview")
timer_duration = st.slider(
    "Select Interview Duration (in minutes):", min_value=2, max_value=15, value=5, step=1
)

start_interview = st.button("Start Interview")


# Generate dynamic questions
def get_dynamic_question(context, user_answer=None):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        if user_answer:
            prompt = f"""
            Based on the user's previous answer: '{user_answer}', generate a follow-up question relevant to the context below:
            {context}
            """
        else:
            prompt = f"""
            Generate an interview question relevant to the following job role and resume analysis:
            {context}
            """
        response = model.generate_content([prompt])
        return response.text.strip()
    except Exception as e:
        st.error(f"Error generating question: {e}")
        return None


# Conduct the interview
def ask_questions(interview_data, total_time):
    context = f"Job Role: {interview_data['JobRole']}\nResume Analysis: {interview_data['LLMAnalysis']}"
    question_count = 1
    start_time = time.time()
    end_time = start_time + total_time * 60

    while time.time() < end_time:
        st.write(f"Time Remaining: {int(end_time - time.time())} seconds")

        if question_count == 1:
            question = get_dynamic_question(context)
        else:
            question = get_dynamic_question(context, user_answer)

        if not question:
            break

        st.write(f"Q{question_count}: {question}")
        user_answer = st.text_area(f"Your answer for Q{question_count}:", key=f"answer_{question_count}")

        if user_answer:
            st.write(f"Your answer: {user_answer}")
            question_count += 1
            time.sleep(2)

    st.write("The interview has ended. Thank you!")


# Start the interview if clicked
if start_interview:
    if uploaded_file:
        try:
            with open("resume_analysis.json", "r") as file:
                interview_data = json.load(file)
            st.write(f"Starting interview for the role: {interview_data['JobRole']}")
            ask_questions(interview_data, timer_duration)
        except FileNotFoundError:
            st.error("Please analyze a resume first to generate the JSON file.")
        except Exception as e:
            st.error(f"An error occurred: {e}")
    else:
        st.error("Please upload a resume first.")
