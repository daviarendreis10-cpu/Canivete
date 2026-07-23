function buttonToggleTheme() {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.textContent = '☼';
    button.addEventListener('click', toggleTheme);
    document.body.appendChild(button);

}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

buttonToggleTheme();