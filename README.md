# 📝 Text Summarization NLP End-to-End Project

![Build Status](https://img.shields.io/github/actions/workflow/status/AdMub/Text-Summarization-NLP-End-to-End-Project/main.yml?branch=main&label=CI%2FCD%20Build&logo=github)  
![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)   
![AWS](https://img.shields.io/badge/Deployed%20on-AWS-orange?logo=amazon-aws)  
![MLflow](https://img.shields.io/badge/MLflow-Tracking%20Enabled-blue?logo=mlflow)  
![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)  
![License](https://img.shields.io/github/license/AdMub/Text-Summarization-NLP-End-to-End-Project)  

An end-to-end **NLP project** for **Abstractive Text Summarization** built with modern MLOps practices.  
It covers the complete ML lifecycle — from data ingestion to deployment — and provides both a **FastAPI backend** and a **React + Tailwind frontend** for real-world usage.

---

## 📌 Project Overview
This project implements an **end-to-end NLP pipeline for Text Summarization** using **Transformers (T5/Pegasus)**.  
It includes everything from **data ingestion → preprocessing → model training → evaluation → serving with FastAPI → frontend integration with React + Tailwind → containerization with Docker → deployment on AWS (with CI/CD)**.

This project implements:

- ✅ **Data Pipeline**: Ingestion → Validation → Transformation  
- ✅ **Model Training** (T5/PEGASUS transformer models)
- ✅ **Model Evaluation** with ROUGE and other metrics  
- ✅ **Experiment Tracking** with MLflow  
- ✅ **FastAPI backend** for model inference  
- ✅ **Web UI** with HTML + Jinja templates and a React (Vite + Tailwind) frontend (`text-summarizer-frontend/`)  
- ✅ **Dockerized Deployment**  for portability
- ✅ **CI/CD pipeline** using GitHub Actions  
- ✅ **Cloud-ready**: Deployment setup for **AWS EC2 / ECS / EKS**
- ✅ **MLflow Tracking** integrated

---

## 🔄 Project Workflow

### 📊 Pipeline Flow
<img width="768" height="45" alt="text_summarizer_pipeline" src="https://github.com/user-attachments/assets/0393bc0e-996a-48ac-b134-71ef83efa94a" />

---

## 📂 Project Structure

```bash
Text-Summarization-NLP-End-to-End-Project/
│
├── artifacts/                 # Saved artifacts (data, checkpoints, models, etc.)
├── config/                    # Configuration files
├── datasets/                  # Raw / processed datasets
├── logs/                      # Logging files
├── mlruns/                    # MLflow experiment tracking
├── research/                  # Research & experimentation notebooks
├── src/                       # Source code for pipeline modules
├── templates/                 # Jinja2 HTML templates (FastAPI webapp)
├── text-summarizer-frontend/  # React + Tailwind frontend (UI)
│
├── app.py                     # FastAPI entrypoint (backend API)
├── main.py                    # Main project script
├── Dockerfile                 # Docker build configuration
├── requirements.txt           # Python dependencies
├── setup.py                   # Project package setup
├── params.yaml                # Training parameters & hyperparameters
├── .github/workflows/         # GitHub Actions (CI/CD pipelines)
│   └── main.yml
│
└── README.md                  # Project documentation

```

---

## 🚀 Features

- **Data Handling**:  
  - Data ingestion, validation, and transformation modules.  

- **Model Training**:  
  - T5 / PEGASUS transformer model fine-tuning.  
  - Training & evaluation pipeline with metrics (ROUGE, BLEU).  

- **Serving API**:  
  - FastAPI REST endpoints (`/predict`) for summarization.  
  - HTML template integration.  

- **Frontend**:  
  - React + Tailwind single-page app in `text-summarizer-frontend/`.  
  - Modern UI for text input and summary display.  

- **MLOps & Deployment**:  
  - Dockerized backend + frontend.  
  - CI/CD with GitHub Actions.  
  - AWS-ready deployment pipeline.  

---

## 🖼️ Screenshots
 
**Backend HTML UI**  

<img width="1757" height="923" alt="fastAPi" src="https://github.com/user-attachments/assets/cc5d43c8-7277-4839-93a2-353657a3c18c" />


**Frontend HTML UI**  

<img width="1920" height="932" alt="web" src="https://github.com/user-attachments/assets/6ae66c62-7cb9-4091-b85a-9367fa5ddbb0" />



**React Frontend UI**  

<img width="1920" height="455" alt="react" src="https://github.com/user-attachments/assets/dc223310-8731-4ca0-a01c-f6da1d97e3b3" />


---

## ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AdMub/Text-Summarization-NLP-End-to-End-Project.git
cd Text-Summarization-NLP-End-to-End-Project
```

### 2️⃣ Create Virtual Environment
```bash
conda create -n textsum python=3.10 -y
conda activate textsum
pip install -r requirements.txt
```

### 3️⃣ Run FastAPI Backend
```bash
uvicorn app:app --reload
```
App runs at: http://127.0.0.1:8080


### 4️⃣ Run React Frontend
```bash
cd text-summarizer-frontend
npm install
npm run dev
```
Frontend runs at: http://127.0.0.1:5173

---

## 🐳 Docker Setup

Build and run backend in Docker:
```bash
docker build -t text-summarizer .
docker run -p 8080:8080 text-summarizer
```

---

## ⚡ CI/CD (GitHub Actions)

This project uses **GitHub Actions** for automation:
- ✅ Code linting & testing
- 🐳 Build & push Docker image
- ☁️ Deploy to AWS

Workflow file: `.github/workflows/main.yml`

<img width="1406" height="301" alt="CI-CD" src="https://github.com/user-attachments/assets/8778a317-91cb-4940-bcd2-83f1067dcb20" />

---

## ☁️ Deployment on AWS

- **Backend** → Deploy via Docker container to EC2 / ECS / EKS.

- **Frontend** → Host on AWS Amplify / S3 + CloudFront.

---

## 📊 Model Training

- Uses HuggingFace Transformers (T5/PEGASUS).
- Experiment tracking with MLflow (mlruns/).
- Hyperparameters stored in params.yaml.

  ---

## 📬 API Usage

Once backend is running, send a POST request:
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{"text": "Your long article here..."}'
```

Response:
```json
{
  "summary": "Generated summary text..."
}
```

---

## 🛠️ Tech Stack

- **Python 3.9+**, PyTorch, HuggingFace Transformers  
- **FastAPI**, Jinja2, Uvicorn
- **Basic Webpage** HTML
- **React (Vite) + TailwindCSS** frontend  
- **Pipeline** MLflow, YAML configs, custom modules 
- **DevOps** Docker, GitHub Actions CI/CD, AWS (EC2 / ECR / S3)  


---

## ✨ Future Improvements

- Add support for multilingual summarization
- Improve model latency with quantization/distillation
- Deploy on Kubernetes
  
---

## 👨‍💻 Author  

**Mubarak Adisa**  
- 🎓 Civil Engineering + Computer Science (Data Science & AI Focus)  
- 🔗 GitHub: [AdMub](https://github.com/AdMub)  
- 💼 LinkedIn: [Mubarak Adisa](https://www.linkedin.com/in/mubarak-adisa-334a441b6/)  
