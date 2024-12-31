<template>

<AppNavbar />

    <div class="container">
        <h1>买卖咨询中</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="🔍 搜索消息..." />
        </div>
        <div id="messages" class="messages"></div>
        <div class="input-container">
            <input type="text" id="messageInput" placeholder="✉️ 输入你的消息..." />
            <button id="sendButton">发送</button>
            <button id="emojiButton">😊</button>
        </div>
        <div id="emojiPicker" class="emoji-picker" style="display: none;">
            <span class="emoji" data-emoji="😀">😀</span>
            <span class="emoji" data-emoji="😁">😁</span>
            <span class="emoji" data-emoji="😂">😂</span>
            <span class="emoji" data-emoji="😃">😃</span>
            <span class="emoji" data-emoji="😄">😄</span>
            <span class="emoji" data-emoji="😅">😅</span>
            <span class="emoji" data-emoji="😆">😆</span>
            <span class="emoji" data-emoji="😉">😉</span>
            <span class="emoji" data-emoji="😊">😊</span>
            <span class="emoji" data-emoji="😇">😇</span>
            <span class="emoji" data-emoji="🥰">🥰</span>
            <span class="emoji" data-emoji="😍">😍</span>
            <span class="emoji" data-emoji="😎">😎</span>
            <span class="emoji" data-emoji="😜">😜</span>
            <span class="emoji" data-emoji="😝">😝</span>
            <span class="emoji" data-emoji="😳">😳</span>
            <span class="emoji" data-emoji="😢">😢</span>
            <span class="emoji" data-emoji="😡">😡</span>
            <span class="emoji" data-emoji="🥳">🥳</span>
        </div>
    </div>

</template>

<script>
import AppNavbar from './NavBar.vue'; // 导入 Navbar 组件

export default {
    components: {
    AppNavbar  // 注册 Navbar 组件
    },
    data() { // 组件的数据
        return {

        }           
    },
    methods: { //处理函数
   
},
mounted() {
const productId = 1; // 示例的 product_id，实际使用时应从后端传递
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const searchInput = document.getElementById('searchInput');
const emojiButton = document.getElementById('emojiButton');
const emojiPicker = document.getElementById('emojiPicker');

function loadMessages() {
    fetch(`/api/messages/${productId}`)
        .then(response => response.json())
        .then(data => {
            messagesDiv.innerHTML = '';
            data.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                const timestamp = new Date(msg.timestamp).toLocaleTimeString(); // 格式化时间
                const avatar = msg.sender === '学生' ? 'https://via.placeholder.com/30/00796b/ffffff?text=买' : 'https://via.placeholder.com/30/ff5722/ffffff?text=卖';
                messageElement.innerHTML = `
                    <div class="message-content ${msg.sender === '学生' ? 'message-sent' : 'message-received'}">
                        <img src="${avatar}" alt="用户头像" class="avatar" />
                        <span class="sender">${msg.sender}:</span> ${msg.message} <span class="timestamp">(${timestamp})</span>
                    </div>`;
                messagesDiv.appendChild(messageElement);
            });
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // 滚动到底部
        });
}

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        fetch(`/api/messages/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sender: '学生', message: message, timestamp: new Date() })
        }).then(() => {
            messageInput.value = '';
            loadMessages();
        });
    }
});

// 表情符号选择器
emojiButton.addEventListener('click', () => {
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('.emoji').forEach(emoji => {
    emoji.addEventListener('click', () => {
        messageInput.value += emoji.getAttribute('data-emoji');
        emojiPicker.style.display = 'none'; // 选择后隐藏表情选择器
    });
});

// 搜索功能
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const messages = messagesDiv.getElementsByClassName('message');
    Array.from(messages).forEach(message => {
        const text = message.innerText.toLowerCase();
        message.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
});

// 初始加载消息
loadMessages(); 
}
}
</script>

<style scoped>
body {
    font-family: 'Arial', sans-serif;
    /* 淡蓝色背景 */
    background-color: #e0f7fa; 
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    animation: fadeIn 0.5s ease-in-out; /* 添加淡入动画 */
}

h1 {
    text-align: center;
    color: #00796b; /* 深绿色 */
    font-size: 24px;
    margin-bottom: 20px;
}

.search-container {
    margin-bottom: 10px;
}

input[type="text"] {
    width: calc(100% - 22px);
    padding: 10px;
    border: 1px solid #00796b; /* 深绿色边框 */
    border-radius: 5px;
    transition: border-color 0.3s; /* 添加过渡效果 */
}

input[type="text"]:focus {
    border-color: #004d40; /* 聚焦时改变边框颜色 */
    outline: none; /* 去掉默认的轮廓 */
}

.messages {
    border: 1px solid #00796b; /* 深绿色边框 */
    height: 300px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #f1f8e9; /* 浅绿色背景 */
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* 内部阴影 */
}

.message {
    margin: 5px 0;
    display: flex;
    align-items: center;
}

.message-content {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 5px;
    transition: background-color 0.3s; /* 添加过渡效果 */
}

.message-sent {
    background-color: #c8e6c9; /* 买家消息背景色 */
    margin-left: auto; /* 右对齐 */
}

.message-received {
    background-color: #bbdefb; /* 卖家消息背景色 */
}

.message:hover {
    background-color: #c8e6c9; /* 悬停时改变背景颜色 */
}

.avatar {
    border-radius: 50%;
    margin-right: 10px;
}

.sender {
    font-weight: bold;
    color: #00796b; /* 深绿色 */
}

.timestamp {
    font-size: 0.8em;
    color: #888;
    margin-left: 5px;
}

.input-container {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 15px;
    background-color: #00796b; /* 深绿色 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s; /* 添加过渡效果 */
}

button:hover {
    background-color: #004d40; /* 悬停时改变按钮颜色 */
}

.emoji-picker {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.emoji {
    cursor: pointer;
    font-size: 20px;
    margin: 5px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>