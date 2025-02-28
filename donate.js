document.addEventListener('DOMContentLoaded', () => {
    const donateBtn = document.querySelector('.donate-btn');
    const donateSection = document.querySelector('.donate-section');

    // 创建二维码面板
    const qrPanel = document.createElement('div');
    qrPanel.className = 'qr-panel';
    
    // 使用模板字符串创建HTML内容
    const qrContent = `
        <div class="qr-container">
            <div class="qr-code">
                <img src="/static/wechat-qr.jpg" alt="Wechat Pay" />
                <p>Wechat Pay</p>
            </div>
            <div class="qr-code">
                <img src="/static/alipay-qr.jpg" alt="Alipay" />
                <p>Alipay</p>
            </div>
        </div>
    `;
    
    // 设置面板的HTML内容
    qrPanel.innerHTML = qrContent;
    donateSection.appendChild(qrPanel);

    // 点击捐赠按钮显示/隐藏面板
    donateBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        qrPanel.classList.toggle('active');
    });

    // 点击面板内部不关闭
    qrPanel.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // 点击其他区域关闭面板
    document.addEventListener('click', () => {
        qrPanel.classList.remove('active');
    });

});