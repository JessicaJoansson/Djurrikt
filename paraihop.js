window.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.item');
    const dropzones = document.querySelectorAll('.dropzone');
    const draggableContainer = document.querySelector('.draggables');
    const targetContainer = document.querySelector('.targets');

    const shuffle = (container) => {
        if (!container) return;
        const elements = Array.from(container.children);
        for (let i = elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            container.appendChild(elements[j]);
        }
    };

    shuffle(draggableContainer);
    shuffle(targetContainer);

    draggables.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.closest('.item').id);
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');

            const id = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);

            if (!draggedElement) return;

            const match = draggedElement.dataset.match;
            const target = zone.dataset.animal;

            if (match === target) {
                    draggedElement.style.display = 'none';
                zone.style.display = 'none';
                checkWin(); 
            } else {
                              zone.style.backgroundColor = "#A94A3F"; 
                setTimeout(() => {
                    zone.style.backgroundColor = "";
                }, 400);
            }
        });
    });

    function checkWin() {
        const remaining = Array.from(document.querySelectorAll('.dropzone'))
                               .filter(z => z.style.display !== 'none');
        
        if (remaining.length === 0) {
            setTimeout(showWinPopUp, 300);
        }
    }
});

function showWinPopUp() {
  
    const modal = document.getElementById('win-modal');
    modal.style.display = 'flex';

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001 };

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            scalar: 1.4, 
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
        }));
    }, 250);
}

function closeModal() {
    document.getElementById('win-modal').style.display = 'none';
    location.reload(); 
}