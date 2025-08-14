from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import string, random

app = FastAPI()

# Allow frontend React to call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For local testing
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for URL mappings
url_mapping = {}

# Generate short code
def generate_short_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Shorten URL
@app.post("/shorten")
async def shorten_url(long_url: str = Form(...)):
    short_code = generate_short_code()
    url_mapping[short_code] = long_url
    return {"short_url": f"http://127.0.0.1:8000/{short_code}"}

# Redirect short URL
@app.get("/{short_code}")
async def redirect_url(short_code: str):
    long_url = url_mapping.get(short_code)
    if long_url:
        return RedirectResponse(long_url)
    return {"error": "Short URL not found"}
