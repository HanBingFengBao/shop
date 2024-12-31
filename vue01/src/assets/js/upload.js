// 获取DOM元素
const projectInfoHeader = document.getElementById('upload-goods-header');
const projectInfo = document.getElementById('project-info');
const goodsValue = document.getElementById('project-value');
const descriptionValue = document.getElementById('description-value');
const muchValue = document.getElementById('much-value');
const projectEditBtn = document.getElementById('projectedit-btn');
const projectSubmitBtn = document.getElementById('projectsubmit-btn');
const projectAvatarPreview = document.getElementById('projectavatar-preview');
const projectAvatarUpload = document.getElementById('projectavatar-upload');
const projectAvatarButton = document.getElementById('projectavatar-button');

// 页面加载时从本地存储加载商品信息
window.addEventListener('load', function() {
	projectInfo.style.display = 'none';
    const goods = localStorage.getItem('goods');
    const much = localStorage.getItem('much');
    const description = localStorage.getItenValue = ('description'); 
    const avatarImage = localStorage.getItem('project-avatar');

    if (goods && much && description) { // 检查是否存在有效的商品信息
        goodsValue.textContent = goods;
        muchValue.textContent = much;
        descriptionValue.value = description;
        if (avatarImage) {
            projectAvatarPreview.src = avatarImage;
            projectAvatarPreview.style.display = 'block';
        }
    } else {
        // 如果没有有效的商品信息，清空所有字段
        goodsValue.textContent = '';
        muchValue.textContent = '';
        descriptionValue.value = '';
        projectAvatarPreview.src = '';
        projectAvatarPreview.style.display = 'none';
    }
});

// 点击“商品信息”时显示商品信息，并重置编辑模式
projectInfoHeader.addEventListener('click', function() {
    if (projectInfo.style.display === 'none') {
        projectInfo.style.display = 'block';
        projectEditBtn.style.display = 'inline-block';
        projectSubmitBtn.style.display = 'none';

        // 重置编辑模式
        if (document.getElementById('goods-input')) {
            goodsValue.textContent = goodsValue.querySelector('input').value;
            goodsValue.removeChild(goodsValue.querySelector('input'));
        }
        if (document.getElementById('much-input')) {
            muchValue.textContent = muchValue.querySelector('input').value;
            muchValue.removeChild(muchValue.querySelector('input'));
        }
    } else {
        projectInfo.style.display = 'none';
        projectEditBtn.style.display = 'none';
        projectSubmitBtn.style.display = 'none';
    }
});

// 编辑按钮点击事件
projectEditBtn.addEventListener('click', function() {
    // 切换到编辑模式，显示输入框等
    goodsValue.innerHTML = '<input type="text" id="goods-input" value="' + goodsValue.textContent.split('：')[1] + '">';
    muchValue.innerHTML = '<input type"text" id="much-input" value="' + muchValue.textContent.split('：')[1] + '">';
    projectEditBtn.style.display = 'none';
    projectSubmitBtn.style.display = 'inline-block';
});

// 保存按钮点击事件
projectSubmitBtn.addEventListener('click', function() {
    

    // 处理提交的信息
    if (document.getElementById('goods-input') && document.getElementById('much-input')) {
        const goods = document.getElementById('goods-input').value;
        const much = document.getElementById('much-input').value;
        const description = descriptionValue.value;
        const id = generateUniqueId(); // 生成唯一编号

        // 更新DOM元素
        goodsValue.textContent = `${goods}`;
        muchValue.textContent = `${much}`;
        projectEditBtn.style.display = 'inline-block';
        projectSubmitBtn.style.display = 'none';

        // 保存商品信息到本地存储
        saveProductInfo(id, goods, much, description);
    }
    
    // 清空商品信息栏里面的所有内容和照片
    goodsValue.textContent = '';
    muchValue.textContent = '';
    descriptionValue.value = '';
    projectAvatarPreview.src = '';
    projectAvatarPreview.style.display = 'none';
    
});

// 生成唯一编号的函数
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// 保存商品信息的函数
function saveProductInfo(id, goods, much, description) {
    const productInfo = {
        id: id,
        goods: goods,
        much: much,
        description: description,
        avatar: localStorage.getItem('project-avatar') || ''
    };
    localStorage.setItem(id, JSON.stringify(productInfo));
}

projectAvatarButton.addEventListener('click', function() {
    projectAvatarUpload.click();
});

projectAvatarUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = projectAvatarPreview;
            img.src = e.target.result;
            img.style.display = 'block';
            // 将头像图片保存到本地存储
            localStorage.setItem('project-avatar', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});