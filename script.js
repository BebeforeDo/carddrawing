fetch('tarot-card.json')
    .then(response => response.json())
    .then(data => {
        const tarotCards = data;

        const img = new Image();
        img.src = 'images/back.png';

        const card = document.getElementById('card');
        const cardName = document.getElementById('cardName');
        const readButton = document.getElementById('readButton');
        const drawCardButton = document.getElementById('drawCardButton');
        const pageTitle = document.getElementById('pageTitle');
        const subTitle = document.getElementById('subTitle');
        const slowBreathText = document.getElementById('slowBreathText');
        


        
        img.onload = function() {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            const cardWidth = 300; // 設定寬度
            const cardHeight = cardWidth / aspectRatio; // 根據比例自動計算高度

            card.style.width = `${cardWidth}px`;
            card.style.height = `${cardHeight}px`;
            card.style.background = `url('${img.src}') no-repeat center/contain`;
            card.style.backgroundSize = 'contain';
            card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            card.style.borderRadius = '10px';
            card.style.marginBottom = '20px';
        };

        drawCardButton.addEventListener('click', () => {
            card.style.transform = 'rotateY(180deg)';
            card.style.transition = 'transform 0.6s ease';
        
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * tarotCards.length);
                const selectedCard = tarotCards[randomIndex];
        
                card.style.transition = 'none';
                card.style.transform = 'rotateY(0deg)';
                card.style.background = `url('${selectedCard.image}') no-repeat center/contain`;
        
                // 顯示塔羅牌名稱和元素屬性
                let cardInfo = document.getElementById('cardInfo');
                if (!cardInfo) {
                    cardInfo = document.createElement('p');
                    cardInfo.id = 'cardInfo';
                    document.body.appendChild(cardInfo);
                }
                cardInfo.innerHTML = `${selectedCard.name_chinese} / ${selectedCard.element_chinese}`;
        
                // 移除 "看說明" 按鈕
                if (readButton) {
                    readButton.remove();
                }
        
                // 修改標題顏色
                pageTitle.classList.add('faded-text');
        
                // 隱藏抽卡按鈕和提示文字
                drawCardButton.style.display = 'none';
                slowBreathText.style.display = 'none';
        
            }, 600);
        });
    })
    .catch(error => console.error('Error fetching tarot cards:', error));
