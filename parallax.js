$(document).ready(function() {
    const moon = $('.moon');
    const mountain = $('.mountain');
    const moonText = $('.moon-text');
    const initialOffset = 5;
    
    function updateParallax() {
        const scrolled = $(window).scrollTop();
        const windowHeight = $(window).height();
        const parallaxContainer = $('.parallax-container').height();
        
        // 計算在容器內的相對位置
        const relativeScroll = scrolled % windowHeight;
        const progress = Math.min(relativeScroll / windowHeight, 1);
        
        // 文字動畫控制
        const textProgress = (scrolled / windowHeight);
        if (textProgress >= 0.6 && textProgress <= 1.5) {
            // 在 60vh 到 150vh 之間執行動畫
            const textAnimProgress = (textProgress - 0.6) * 2; // 將 0.6-1.2 映射到 0-1
            moonText.css({
                'opacity': 1,
                'transform': `translate(-50%, -50%) translateX(${(1 - textAnimProgress) * 200 - 100}vw)`,
                'left': '50%'
            });
        } else if (textProgress < 0.6) {
            // 在 70vh 前保持在右側隱藏
            moonText.css({
                'opacity': 0,
                'transform': 'translate(-50%, -50%) translateX(100vw)',
                'left': '50%'
            });
        } else {
            // 在 120vh 後保持在左側隱藏
            moonText.css({
                'opacity': 0,
                'transform': 'translate(-50%, -50%) translateX(-100vw)',
                'left': '50%'
            });
        }
        
        // 月亮移動
        moon.css({
            'transform': `translateY(${-15 + (progress * 10)}%) scale(0.7)`,
            'position': 'fixed',
            'top': '0'
        });
        
        // 山脈移動
        mountain.css({
            'transform': `translateY(${initialOffset + (progress * 45)}%)`,
            'position': 'fixed',
            'top': '0'
        });
        
        // 處理到達容器底部的情況
        if (scrolled > parallaxContainer - windowHeight) {
            const finalPosition = parallaxContainer - windowHeight;
            $('.parallax-item').each(function() {
                const $item = $(this);
                if ($item.hasClass('moon')) {
                    $item.css({
                        'position': 'absolute',
                        'top': `${finalPosition}px`,
                        'transform': `translateY(-5%) scale(0.7)`
                    });
                } else if ($item.hasClass('mountain')) {
                    $item.css({
                        'position': 'absolute',
                        'top': `${finalPosition}px`,
                        'transform': `translateY(50%)`
                    });
                } else {
                    $item.css({
                        'position': 'absolute',
                        'top': `${finalPosition}px`
                    });
                }
            });
            
            // 文字最終位置
            moonText.css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'transform': 'translate(-50%, -50%) translateX(-100vw)',
                'opacity': 0
            });
        } else {
            // 確保背景層保持固定
            $('.star-sky, .night-valley').css({
                'position': 'fixed',
                'top': '0',
                'transform': 'none'
            });
            
            moonText.css('position', 'fixed');
        }
    }
    
    // 監聽滾動事件
    $(window).scroll(function() {
        requestAnimationFrame(updateParallax);
    });
    
    // 初始化
    updateParallax();
});