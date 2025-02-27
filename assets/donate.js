// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    const donateBtn = document.querySelector('.donate-btn');

    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.innerHTML = `
        <div class="qr-modal-content">
            <span class="close-modal">&times;</span>
            <h3>Thanks for your support</h3>
            <div class="qr-container">
                <div class="qr-code">
                    <img src="assets/wechat-qr.jpg" alt="Wechat Pay" />
                    <p>Wechat Pay</p>
                </div>
                <div class="qr-code">
                    <img src="assets/alipay-qr.jpg" alt="Alipay" />
                    <p>Alipay</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // 获取关闭按钮和模态框元素
    const closeBtn = modal.querySelector('.close-modal');

    // 点击捐赠按钮显示模态框
    donateBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // 点击关闭按钮隐藏模态框
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击模态框外部区域关闭模态框
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});