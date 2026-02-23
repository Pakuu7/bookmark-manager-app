import {setSortProperty} from "./bookmark-manager.ts";

export function sortBookmarks() {
    const recentlyAddedBtn = document.querySelector('.recently-added') as HTMLLIElement;
    const recentlyVisitedBtn = document.querySelector('.recently-visited') as HTMLLIElement
    const mostVisitedBtn = document.querySelector('.most-visited') as HTMLLIElement

    if (!recentlyAddedBtn || !recentlyVisitedBtn || !mostVisitedBtn) return

    const allSortItems = [recentlyAddedBtn, recentlyVisitedBtn, mostVisitedBtn]
    const checkmarkHTML = `<img src="/icon-check.svg" class="sort-check dark:brightness-0 dark:invert" alt="">`

    const handleSortAction = (property: 'createdAt' | 'lastVisited' | 'visitCount', element: HTMLLIElement) => {
        setSortProperty(property);

        allSortItems.forEach(item => item.querySelector('.sort-check')?.remove());
        element.insertAdjacentHTML('beforeend', checkmarkHTML);
    };

    recentlyAddedBtn.addEventListener('click', () => handleSortAction('createdAt', recentlyAddedBtn));
    recentlyVisitedBtn.addEventListener('click', () => handleSortAction('lastVisited', recentlyVisitedBtn));
    mostVisitedBtn.addEventListener('click', () => handleSortAction('visitCount', mostVisitedBtn));
}

export function menuCheckToggle() {
    const sortMenuBtns = document.querySelectorAll('.sort-menu button') as NodeListOf<HTMLButtonElement>
    const allChecks = document.querySelectorAll('.check') as NodeListOf<HTMLImageElement>
    sortMenuBtns.forEach(button => {
        button.addEventListener('click', () => {
            allChecks.forEach(check => check.classList.add('hidden'))
            sortMenuBtns.forEach(btn => btn.setAttribute('aria-selected', 'false'))
            const currentCheck = button.querySelector('.check')
            if (currentCheck) {
                currentCheck.classList.remove('hidden')
                button.setAttribute('aria-selected', 'true')
            }
        })
    })
}
