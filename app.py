from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import RedirectResponse, Response, HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

from src.pipeline.prediction import PredictionPipeline

# Input schema for prediction
class TextInput(BaseModel):
    text: str


app = FastAPI(title="Text Summarization App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allows React on localhost
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates directory
templates = Jinja2Templates(directory="templates")


@app.get("/", tags=["Root"])
async def index():
    """Redirect root to /home"""
    return RedirectResponse(url="/home")


@app.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the frontend page"""
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/train")
async def training():
    """Trigger training pipeline manually"""
    try:
        os.system("python main.py")
        return Response("Training successful !!")
    except Exception as e:
        return Response(f"Error Occurred! {e}")


@app.post("/predict")
async def predict_route(input_data: TextInput):
    """Summarize input text"""
    try:
        obj = PredictionPipeline()
        summary = obj.predict(input_data.text)
        return {"summary": summary}
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
