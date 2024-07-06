from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import openai
from dotenv import load_dotenv
import os
from docx import Document

# 加載環境變量
load_dotenv()

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = '123456'
socketio = SocketIO(app, cors_allowed_origins="*")

# 設置 API 密鑰
openai.api_key = os.getenv('OPENAI_API_KEY')

def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

document_text = extract_text_from_docx('C:/Users/st962/Desktop/GEN_AI_final/羅氏企業.docx')

@socketio.on('ask')
def handle_question(data):
    user_input = data['question']
    # 創建聊天模型的提示
    messages = [
        {"role": "user", "content": document_text},
        {"role": "user", "content": user_input}
    ]
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=500,
        temperature=0.5,
    )

    answer = response['choices'][0]['message']['content']
    print(f"Generated answer: {answer}")  # 添加日誌
    emit('response', {'text': answer})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app, debug=True)