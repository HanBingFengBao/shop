// 获取DOM元素
const personalInfoHeader = document.getElementById('personal-info-header');
const personalInfo = document.getElementById('personal-info');
const nameValue = document.getElementById('name-value');
const JnameValue = document.getElementById('Jname-value');
const emailValue = document.getElementById('email-value');
const addresslValue = document.getElementById('address-value');
const editBtn = document.getElementById('edit-btn');
const submitBtn = document.getElementById('submit-btn');

// 页面加载时从本地存储加载个人信息
window.addEventListener('load', function() {
    nameValue.textContent = `${localStorage.getItem('name') || '张大'}`;
    JnameValue.textContent = `${localStorage.getItem('Jname') || '黄昏'}`;
    emailValue.textContent = `${localStorage.getItem('email') || '2738338737'}`;
    addresslValue.textContent = `${localStorage.getItem('address') || '东海岸'}`;
});

// 点击“个人信息”时显示个人信息，并重置编辑模式
personalInfoHeader.addEventListener('click', function() {
    if (personalInfo.style.display === 'none') {
        personalInfo.style.display = 'block';
        editBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';

        // 重置编辑模式
        if (document.getElementById('name-input')) {
            nameValue.textContent = nameValue.querySelector('input').value;
            nameValue.removeChild(nameValue.querySelector('input'));
        }
        if (document.getElementById('Jname-input')) {
            JnameValue.textContent = JnameValue.querySelector('input').value;
            JnameValue.removeChild(JnameValue.querySelector('input'));
        }
        
        if (document.getElementById('email-input')) {
            emailValue.textContent = emailValue.querySelector('input').value;
            emailValue.removeChild(emailValue.querySelector('input'));
        }
        
        if (document.getElementById('address-input')) {
            addresslValue.textContent = addresslValue.querySelector('input').value;
            addresslValue.removeChild(addresslValue.querySelector('input'));
        }
    } else {
        personalInfo.style.display = 'none';
        editBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    }
});

// 编辑按钮点击事件
editBtn.addEventListener('click', function() {
    // 切换到编辑模式，显示输入框等
    nameValue.innerHTML = '<input type="text" id="name-input" value="' + nameValue.textContent.split('：')[1] + '">';
    JnameValue.innerHTML = '<input type="text" id="Jname-input" value="' + JnameValue.textContent.split('：')[1] + '">';
    emailValue.innerHTML = '<input type="text" id="email-input" value="' + emailValue.textContent.split('：')[1] + '">';
    
    addresslValue.innerHTML = '<input type="text" id="address-input" value="' + addresslValue.textContent.split('：')[1] + '">';
    editBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
});

// 保存按钮点击事件
submitBtn.addEventListener('click', function() {
    // 处理提交的信息
    if (document.getElementById('name-input') && document.getElementById('email-input') && document.getElementById('address-input') && document.getElementById('Jname-input')) {
        const name = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;
        const Jname = document.getElementById('Jname-input').value;
        const address = document.getElementById('address-input').value;
        nameValue.textContent = `${name}`;
        emailValue.textContent = `${email}`;
        JnameValue.textContent = `${Jname}`;
        addresslValue.textContent = `${address}`;
        editBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';

        // 保存个人信息到本地存储
        localStorage.setItem('name', name);
        localStorage.setItem('Jname', Jname);
        localStorage.setItem('email', email);
        localStorage.setItem('address', address);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 从本地存储中加载头像
    const avatarImage = localStorage.getItem('avatar');
    if (avatarImage) {
        document.getElementById('avatar-preview').src = avatarImage;
        document.getElementById('avatar-preview').style.display = 'block';
    }

    document.getElementById('avatar-button').addEventListener('click', function() {
        document.getElementById('avatar-upload').click();
    });

    document.getElementById('avatar-upload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.getElementById('avatar-preview');
                img.src = e.target.result;
                img.style.display = 'block';
                // 将头像图片保存到本地存储
                localStorage.setItem('avatar', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});