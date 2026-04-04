import google.generativeai as genai
from app.ai.prompt import SYSTEM_PROMPT02
  

def generate_sentiment(msg: str):

    genai.configure(api_key="AIzaSyCXNGckJLlI_SF_QSXpdwbI6FTBtL3E6TM")

    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        system_instruction=SYSTEM_PROMPT02
    )

    response = model.generate_content(msg)
    return response.text
