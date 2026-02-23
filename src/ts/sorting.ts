import {showBookmarks} from "./bookmark-manager.ts";
import {filteredBookmarks} from "./tags.ts";

export function sortBookmarks() {
    const recentlyAddedBtn = document.querySelector('.recently-added') as HTMLLIElement;
    const recentlyVisitedBtn = document.querySelector('.recently-visited') as HTMLLIElement
    const mostVisitedBtn = document.querySelector('.most-visited') as HTMLLIElement

    if (!recentlyAddedBtn || !recentlyVisitedBtn || !mostVisitedBtn) return

    const allSortItems = [recentlyAddedBtn, recentlyVisitedBtn, mostVisitedBtn]
    const checkmarkHTML = `<img src="/icon-check.svg" class="sort-check dark:brightness-0 dark:invert" alt="">`

    const handleSort = (property: 'createdAt' | 'lastVisited' | 'visitCount', clickedElement: HTMLLIElement) => {
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

            allSortItems.forEach(item => {
                item.querySelector('.sort-check')?.remove()
            })

            clickedElement.insertAdjacentHTML('beforeend', checkmarkHTML)
        }

    recentlyAddedBtn.addEventListener('click', () => handleSort('createdAt', recentlyAddedBtn))
    recentlyVisitedBtn.addEventListener('click', () => handleSort('lastVisited', recentlyVisitedBtn))
    mostVisitedBtn.addEventListener('click', () => handleSort('visitCount', mostVisitedBtn))

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
