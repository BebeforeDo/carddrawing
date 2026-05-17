fetch('updated_tarot-card.json')
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
        
        const cardInfo = document.getElementById('cardInfo');
        
        img.onload = function() {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            const cardWidth = 300;
            const cardHeight = cardWidth / aspectRatio;
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
        
                cardInfo.innerHTML = `${selectedCard.name_chinese} / ${selectedCard.element_chinese}`;
                cardInfo.style.display = 'block';
        
                if (readButton) {
                    readButton.style.display = 'block';
                    readButton.addEventListener('click', () => {
                        window.open(selectedCard.detailUrl, '_blank');
                    });
                }
        
                pageTitle.style.display = 'none';
                drawCardButton.style.display = 'none';
                slowBreathText.style.display = 'none';
        
            }, 600);
        });
    })
    .catch(error => console.error('Error fetching tarot cards:', error));
