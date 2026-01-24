import data from '../json/data.json'
import {showBookmarks} from "./bookmark-manager.ts";
import type {Bookmark} from "./bookmark-manager.ts";

const recentlyAddedBtn = document.querySelector('.recently-added') as HTMLButtonElement;
const recentlyVisitedBtn = document.querySelector('.recently-visited') as HTMLButtonElement
const mostVisitedBtn = document.querySelector('.most-visited') as HTMLButtonElement

const bookmarks: Bookmark[] = data.bookmarks

export function sortBookmarks() {
    const handleSort = (property: 'createdAt' | 'lastVisited' | 'visitCount') => {
        const sorted = [...bookmarks].sort((a, b) => {
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
    mostVisitedBtn.addEventListener('click', () => handleSort('visitCount'))
}