const socket = io();

socket.on('response', function(data) {
    console.log("Received response:", data); // 確認前端接收到的訊息
    const chatContainer = document.getElementById('chatContainer');

    // 創建包含機器人回應和按鈕的容器
    const responseContainer = document.createElement('div');
    responseContainer.className = 'chat-response-container';

    // 創建並顯示機器人回應
    const botResponse = document.createElement('div');
    botResponse.className = 'chat-message bot';
    botResponse.innerText = data.text;
    responseContainer.appendChild(botResponse);

    // 創建按鈕
    const generateVideoButton = document.createElement('button');
    generateVideoButton.innerText = '生成衛教資訊短影音';
    generateVideoButton.className = 'response-button';
    generateVideoButton.onclick = function() {
        // 創建 video 元素
        const userQuestion = document.createElement('div');
        userQuestion.className = 'chat-message user';
        userQuestion.innerText = '生成衛教資訊短影音';
        chatContainer.appendChild(userQuestion);

        // 機器人回應包含影片和按鈕
        const botResponseContainer = document.createElement('div');
        botResponseContainer.className = 'chat-response-container';

        const botVideoResponse = document.createElement('div');
        botVideoResponse.className = 'chat-message bot';

        const videoElement = document.createElement('video');
        videoElement.src = 'static/video.mp4';
        videoElement.controls = true;
        videoElement.style.width = '100%';
        botVideoResponse.appendChild(videoElement);

        const shareButton = document.createElement('button');
        shareButton.innerText = '我要分享到社群~';
        shareButton.className = 'response-button';
        shareButton.onclick = function(){
            // 在這裡添加分享邏輯  
             // 將按鈕變成使用者訊息
             const userShareMessage = document.createElement('div');
             userShareMessage.className = 'chat-message user';
             userShareMessage.innerText = '我要分享到社群~';
             chatContainer.appendChild(userShareMessage);
 
             // 機器人回應包含社群連結
             const botShareResponseContainer = document.createElement('div');
             botShareResponseContainer.className = 'chat-response-container';
 
             const botShareResponse = document.createElement('div');
             botShareResponse.className = 'chat-message bot';
 
             // 添加社群連結圖示
             const socialPlatforms = [
                 { name: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=https://app.fliki.ai/files/667d4eb0348727362125a1c4', img: 'static/facebook.png' },
                 { name: 'LINE', url: 'https://line.me/', img: 'static/line.png' },
                 { name: 'Twitter', url: 'https://twitter.com/intent/tweet?url=https://app.fliki.ai/files/667d4eb0348727362125a1c4', img: 'static/twitter.png' },
                 { name: 'Instagram', url: 'https://www.instagram.com/', img: 'static/instagram.png' }
             ];
 
             socialPlatforms.forEach(platform => {
                 const link = document.createElement('a');
                 link.href = platform.url;
                 link.target = '_blank';
                 const img = document.createElement('img');
                 img.src = platform.img;
                 img.alt = platform.name;
                 img.style.width = '50px'; // 設置圖示寬度
                 img.style.margin = '5px'; // 設置圖示間距
                 link.appendChild(img);
                 botShareResponse.appendChild(link);
             });
             botShareResponseContainer.appendChild(botShareResponse);
             chatContainer.appendChild(botShareResponseContainer);
 
             // 確保最新訊息在視野內
             chatContainer.scrollTop = chatContainer.scrollHeight;
        };
    
        botVideoResponse.appendChild(shareButton);

        botResponseContainer.appendChild(botVideoResponse);
        chatContainer.appendChild(botResponseContainer);

        // 確保最新訊息在視野內
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const visitWebsiteButton = document.createElement('button');
    visitWebsiteButton.innerText = '前往羅氏企業網站';
    visitWebsiteButton.className = 'response-button';
    visitWebsiteButton.onclick = function() { 
        // 在這裡添加前往羅式企業網站的邏輯
        window.open('https://www.roche.com.tw/', '_blank');
    };
    const visitWebsite2Button = document.createElement('button');
    visitWebsite2Button.innerText = '了解更多NGS資訊';
    visitWebsite2Button.className = 'response-button';
    visitWebsite2Button.onclick = function() { 
        // 在這裡添加前往羅式企業網站的邏輯
        window.open('https://www.nhi.gov.tw/ch/np-3636-1.html', '_blank');
    };

    // 將按鈕添加到容器中 
    botResponse.appendChild(visitWebsiteButton);
    botResponse.appendChild(visitWebsite2Button);
    botResponse.appendChild(generateVideoButton);
    
    // 將容器添加到聊天容器中
    chatContainer.appendChild(botResponse);

    // 清空輸入框
    document.getElementById('userInput').value = '';

    // 確保最新訊息在視野內
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

function askQuestion() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    const chatContainer = document.getElementById('chatContainer');

    // 創建並顯示使用者問題
    const userQuestion = document.createElement('div');
    userQuestion.className = 'chat-message user';
    userQuestion.innerText = userInput;
    chatContainer.appendChild(userQuestion);

    console.log("Asking question:", userInput); // 確認發送的問題
    socket.emit('ask', { question: userInput });

    // 清空輸入框
    document.getElementById('userInput').value = '';

    // 確保最新訊息在視野內
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 隱藏問題按鈕
    // document.querySelector('.questions').style.display = 'none';
}

function askPresetQuestion(question) {
    const chatContainer = document.getElementById('chatContainer');

    // 創建並顯示使用者的預設問題
    const userQuestion = document.createElement('div');
    userQuestion.className = 'chat-message user';
    userQuestion.innerText = question;
    chatContainer.appendChild(userQuestion);

    console.log("Asking preset question:", question); // 確認預設問題
    socket.emit('ask', { question: question });

    // 確保最新訊息在視野內
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 隱藏問題按鈕
    // document.querySelector('.questions').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // 獲取聊天輸出容器
    var chatContainer = document.getElementById('chatContainer');

    // 創建並添加機器人的氣泡消息容器
    const botMessageContainer = document.createElement('div');
    botMessageContainer.className = 'content';

    // 創建並添加圖片
    const botImage = document.createElement('img');
    botImage.src = 'static/image1.jpg'; // 將此處的路徑替換為您的圖片路徑
    botImage.alt = 'AI 助手羅LAI的圖片';
    botMessageContainer.appendChild(botImage);

    // 創建並添加文字訊息
    const botResponse = document.createElement('div');
    botResponse.className = 'bot-message';
    botResponse.innerHTML = '歡迎來到<strong>Genetalk</strong>~<br>我是您的癌症基因檢測AI助手羅LAI把，提供最新的癌症基因檢測資訊幫助您了解NGS健保給付。';

    const visitWebsiteButton = document.createElement('button');
    visitWebsiteButton.innerText = '癌症與基因突變有關嗎?';
    visitWebsiteButton.className = 'response-button';
    visitWebsiteButton.onclick = function() { 
      askPresetQuestion('癌症與基因突變有關嗎?')
    };

    const visitWebsiteButton2 = document.createElement('button');
    visitWebsiteButton2.innerText = '為什麼我需要做癌症基因檢測?';
    visitWebsiteButton2.className = 'response-button';
    visitWebsiteButton2.onclick = function() { 
      askPresetQuestion('為什麼我需要做癌症基因檢測?')
    };

    const visitWebsiteButton3 = document.createElement('button');
    visitWebsiteButton3.innerText = '我適合哪一種癌症基因檢測?';
    visitWebsiteButton3.className = 'response-button';
    visitWebsiteButton3.onclick = function() { 
      askPresetQuestion('我適合哪一種癌症基因檢測?')
    };

    const visitWebsiteButton4 = document.createElement('button');
    visitWebsiteButton4.innerText = '如何選擇一個有品質的檢測服務?';
    visitWebsiteButton4.className = 'response-button';
    visitWebsiteButton4.onclick = function() { 
      askPresetQuestion('如何選擇一個有品質的檢測服務?')
    };

    botResponse.appendChild(visitWebsiteButton);
    botResponse.appendChild(visitWebsiteButton2);
    botResponse.appendChild(visitWebsiteButton3);
    botResponse.appendChild(visitWebsiteButton4);
    botMessageContainer.appendChild(botResponse);




    // 將氣泡消息容器添加到聊天容器
    chatContainer.appendChild(botMessageContainer);

    // 確保氣泡消息是可見的
    chatContainer.scrollTop = chatContainer.scrollHeight;
});

function fbshare(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
}