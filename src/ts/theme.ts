export function initTheme() {
    const html = document.documentElement as HTMLElement
    const themeContainer = document.querySelector('.theme-switch-container') as HTMLDivElement
    const lightBtn = document.querySelector('.theme-btn-light') as HTMLButtonElement
    const darkBtn = document.querySelector('.theme-btn-dark') as HTMLButtonElement

    const activeClasses = ['bg-neutral-0', 'shadow-sm', 'dark:bg-d-800'];

    const updateUI = (isDark: boolean) => {
        html.classList.toggle('dark', isDark);

        if (isDark) {
            darkBtn?.classList.add(...activeClasses);
            lightBtn?.classList.remove(...activeClasses);
        } else {
            lightBtn?.classList.add(...activeClasses);
            darkBtn?.classList.remove(...activeClasses);
        }
    };

    themeContainer?.addEventListener('click', () => {
        const isCurrentlyDark = html.classList.contains('dark');
        const nextIsDark = !isCurrentlyDark;

        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        updateUI(nextIsDark);
    });

    const savedTheme = localStorage.getItem('theme') === 'dark';
    updateUI(savedTheme);
}