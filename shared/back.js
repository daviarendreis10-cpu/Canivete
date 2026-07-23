function buttonBackMenu() {
    const buttonBack = document.createElement('button');
    buttonBack.className = 'back-button';
    buttonBack.textContent = '↩';

    buttonBack.addEventListener('click', () => {
        window.location.href = '../index.html';
    });

    document.body.appendChild(buttonBack);
}

buttonBackMenu();