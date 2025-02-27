// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.querySelector('.intro-overlay');
    const introButton = document.querySelector('.intro-button');
    const mainContainer = document.querySelector('.main-container');

    // 将按钮从遮罩层中移出，添加到body
    document.body.appendChild(introButton);

    // 创建下半部分遮罩
    const bottomOverlay = introOverlay.cloneNode(false);
    bottomOverlay.classList.add('intro-overlay-bottom');
    document.body.insertBefore(bottomOverlay, mainContainer);

    // 初始隐藏主容器
    mainContainer.style.opacity = '0';

    // 设置按钮和遮罩的初始样式
    const updateElementPositions = () => {
        // 更新遮罩尺寸
        introOverlay.style.width = '100vw';
        bottomOverlay.style.width = '100vw';

        // 获取按钮的实际尺寸
        const buttonWidth = introButton.clientWidth;
        const buttonHeight = introButton.clientHeight;

        // 更新按钮位置，减去一半的宽高以实现真正的居中
        introButton.style.position = 'fixed';
        introButton.style.transformOrigin = 'center center';
        introButton.style.top = `calc(50vh - ${buttonHeight / 2}px)`;
        introButton.style.left = `calc(50vw - ${buttonWidth / 2}px)`;
        introButton.style.zIndex = '1001';
    };

    // 初始化位置
    updateElementPositions();

    // 监听窗口大小变化
    window.addEventListener('resize', updateElementPositions);

    // 点击按钮时触发动画
    introButton.addEventListener('click', () => {
        // 添加分离效果的类
        introOverlay.classList.add('split');
        bottomOverlay.classList.add('split');

        // 隐藏按钮
        introButton.style.opacity = '0';
        introButton.style.transition = 'opacity 0.3s ease';

        // 渐显主容器
        setTimeout(() => {
            mainContainer.style.opacity = '1';
            mainContainer.style.transition = 'opacity 1s ease';
        }, 300);

        // 动画结束后移除遮罩和按钮，同时移除resize事件监听
        setTimeout(() => {
            introOverlay.remove();
            bottomOverlay.remove();
            introButton.remove();
            window.removeEventListener('resize', updateElementPositions);
        }, 1500);
    });
});