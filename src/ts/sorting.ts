import {showBookmarks} from "./bookmark-manager.ts";
import {filteredBookmarks} from "./tags.ts";

export function sortBookmarks() {
    const recentlyAddedBtn = document.querySelector('.recently-added') as HTMLButtonElement;
    const recentlyVisitedBtn = document.querySelector('.recently-visited') as HTMLButtonElement
    const mostVisitedBtn = document.querySelector('.most-visited') as HTMLButtonElement

    if (!recentlyAddedBtn || !recentlyVisitedBtn || !mostVisitedBtn) return

    const handleSort = (property: 'createdAt' | 'lastVisited' | 'visitCount') => {
        const sorted = [...filteredBookmarks].sort((a, b) => {

            const valA = a[property]
            const valB = b[property]

            if (property === 'visitCount') {
                return (valB as number) - (valA as number)
            }

            const timeA = new Date(valA as string ?? 0).getTime()
            const timeB = new Date(valB as string ?? 0).getTime()
            return timeB - timeA
        })
        showBookmarks(sorted)
    }
    recentlyAddedBtn.addEventListener('click', () => handleSort('createdAt'))
    recentlyVisitedBtn.addEventListener('click', () => handleSort('lastVisited'))
    mostVisitedBtn.addEventListener('click', () => {
        handleSort('visitCount')
    })
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
