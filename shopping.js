document.addEventListener('DOMContentLoaded', () => {
    const shoppingBag = document.querySelector('.shopping-bag');
    const imageContainer = document.querySelector('.image-container');
    const imageBoxes = document.querySelectorAll('.image-box');
    let isImagesShown = false;

    function getRandomPosition(boxWidth, boxHeight) {
        const padding = 50;
        const maxX = window.innerWidth - boxWidth - padding * 2;
        const maxY = window.innerHeight - boxHeight - padding * 2;
        
        return {
            x: padding + Math.random() * maxX,
            y: padding + Math.random() * maxY
        };
    }

    function checkOverlap(box1, box2) {
        const rect1 = {
            left: parseFloat(box1.style.left),
            right: parseFloat(box1.style.left) + box1.offsetWidth,
            top: parseFloat(box1.style.top),
            bottom: parseFloat(box1.style.top) + box1.offsetHeight
        };

        const rect2 = {
            left: parseFloat(box2.style.left),
            right: parseFloat(box2.style.left) + box2.offsetWidth,
            top: parseFloat(box2.style.top),
            bottom: parseFloat(box2.style.top) + box2.offsetHeight
        };

        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    function positionImages() {
    const boxes = Array.from(imageBoxes);
    const padding = 50;
    
    // Calculate dimensions for even spacing
    const boxWidth = boxes[0].offsetWidth;
    const boxHeight = boxes[0].offsetHeight;
    const spacing = (window.innerWidth - (3 * boxWidth) - (2 * padding)) / 2;
    
    // Fixed positions for two rows of three images
    const positions = [
        // Top row
        { x: padding, y: padding },
        { x: padding + boxWidth + spacing/2, y: padding },
        { x: padding + (2 * boxWidth) + spacing, y: padding },
        // Bottom row
        { x: padding, y: padding + boxHeight + spacing/2 },
        { x: padding + boxWidth + spacing/2, y: padding + boxHeight + spacing/2 },
        { x: padding + (2 * boxWidth) + spacing, y: padding + boxHeight + spacing/2 }
    ];

    boxes.forEach((box, index) => {
        box.style.left = `${positions[index].x}px`;
        box.style.top = `${positions[index].y}px`;
        
        setTimeout(() => {
            box.style.transform = 'scale(1)';
        }, index * 200);
    });
}

    function showImages() {
        imageContainer.style.display = 'block';
        shoppingBag.style.display = 'none';
        
        positionImages();
        
        imageBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.style.transform = 'scale(1)';
            }, index * 150);
        });
    }

    function hideImages() {
        imageBoxes.forEach(box => {
            box.style.transform = 'scale(0)';
        });
        
        setTimeout(() => {
            imageContainer.style.display = 'none';
            shoppingBag.style.display = 'block';
        }, 500);
    }

    shoppingBag.addEventListener('click', () => {
        isImagesShown = !isImagesShown;
        if (isImagesShown) {
            showImages();
        } else {
            hideImages();
        }
    });

    window.addEventListener('resize', () => {
        if (isImagesShown) {
            positionImages();
        }
    });
});