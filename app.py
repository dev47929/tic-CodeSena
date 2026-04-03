from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoImageProcessor, AutoModelForImageClassification
import PIL.Image
import io
import torch
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set Hugging Face token if available
hf_token = os.getenv('HF_TOKEN')
if hf_token:
    os.environ['HF_TOKEN'] = hf_token

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and processor at startup

processor = AutoImageProcessor.from_pretrained("prithivMLmods/Realistic-Gender-Classification")
model = AutoModelForImageClassification.from_pretrained("prithivMLmods/Realistic-Gender-Classification")

@app.get("/")
async def root():
    return {"message": "Gender Classification API - POST image to /classify endpoint"}

@app.post("/classify")
async def classify_gender(file: UploadFile = File(...)):
    try:
        # Read and open image
        image_data = await file.read()
        image = PIL.Image.open(io.BytesIO(image_data))
        
        # Preprocess image
        inputs = processor(images=image, return_tensors="pt")
        
        # Run inference
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probs = logits.softmax(dim=1)
            pred = probs.argmax(dim=1).item()
            confidence = probs[0][pred].item()
            gender = model.config.id2label[pred]
        
        return {"gender": gender, "confidence": confidence}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)