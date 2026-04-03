import requests

url = "http://127.0.0.1:8000/classify"
image_path = r"data\download (1).jpg"

with open(image_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

print("Status Code:", response.status_code)
print("Response:", response.json())