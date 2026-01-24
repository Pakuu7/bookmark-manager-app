import data from '../json/data.json'
import {showBookmarks} from "./bookmark-manager.ts";
import type {Bookmark} from "./bookmark-manager.ts";

const recentlyAddedBtn = document.querySelector('.recently-added') as HTMLButtonElement;
const recentlyVisitedBtn = document.querySelector('.recently-visited') as HTMLButtonElement

const bookmarks: Bookmark[] = data.bookmarks

export function sortBookmarks() {
    const handleSort = (property: 'createdAt' | 'lastVisited') => {
        const sorted = [...bookmarks].sort((a, b) => {
            const dateA = new Date(a[property] ?? 0).getTime()
            const dateB = new Date(b[property] ?? 0).getTime()
            return dateB - dateA
        })
        showBookmarks(sorted)
    }
    recentlyAddedBtn.addEventListener('click', () => handleSort('createdAt'))
    recentlyVisitedBtn.addEventListener('click', () => handleSort('lastVisited'))
}