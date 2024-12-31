//document.addEventListener('DOMContentLoaded', function() {
//  const productList = document.getElementById('product-list');
//
//  // 遍历本地存储中的所有商品信息
//  for (let i = 0; i < localStorage.length; i++) {
//      const id = localStorage.key(i);
//      console.log('Key:', id); // 添加调试信息
//      if (id.startsWith('_')) { // 确保是我们生成的商品编号
//          const productInfo = JSON.parse(localStorage.getItem(id));
//          displayProduct(productInfo, productList);
//      }
//  }
//});
//
//// 显示商品信息的函数
//function displayProduct(productInfo, productList) {
//  const productItem = document.createElement('div');
//  productItem.classList.add('product-item');
//
//  const goods = document.createElement('p');
//  goods.textContent = `商品名称: ${productInfo.goods}`;
//
//  const much = document.createElement('p');
//  much.textContent = `价格: ${productInfo.much}`;
//
//  const description = document.createElement('p');
//  description.textContent = `描述: ${productInfo.description}`;
//
//  const avatar = document.createElement('img');
//  avatar.src = productInfo.avatar;
//  avatar.alt = '商品照片';
//
//  productItem.appendChild(goods);
//  productItem.appendChild(much);
//  productItem.appendChild(description);
//  productItem.appendChild(avatar);
//
//  productList.appendChild(productItem);
//}

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');

    // 遍历本地存储中的所有商品信息
    for (let i = 0; i < localStorage.length; i++) {
        const id = localStorage.key(i);
        console.log('Key:', id); // 添加调试信息
        if (id.startsWith('_')) { // 确保是我们生成的商品编号
            const productInfo = JSON.parse(localStorage.getItem(id));
            displayProduct(productInfo, productList);
        }
    }
});

// 显示商品信息的函数
function displayProduct(productInfo, productList) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    const goods = document.createElement('p');
    goods.textContent = `商品名称: ${productInfo.goods}`;

    const much = document.createElement('p');
    much.textContent = `价格: ${productInfo.much}`;

    const description = document.createElement('p');
    description.textContent = `描述: ${productInfo.description}`;

    const avatar = document.createElement('img');
    avatar.src = productInfo.avatar;
    avatar.alt = '商品照片';

    // 添加删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.dataset.id = productInfo.id; // 将商品ID存储在dataset中
    deleteBtn.addEventListener('click', handleDelete); // 绑定点击事件
    productItem.appendChild(deleteBtn);

    productItem.appendChild(goods);
    productItem.appendChild(much);
    productItem.appendChild(description);
    productItem.appendChild(avatar);

    productList.appendChild(productItem);
}

// 处理删除操作的函数
function handleDelete(event) {
    const productId = event.target.dataset.id; // 获取商品ID
    const productItem = event.target.closest('.product-item'); // 获取商品项DOM元素

    // 从本地存储中删除商品信息
    localStorage.removeItem(productId);

    // 从网页上删除商品项
    productItem.remove();
}