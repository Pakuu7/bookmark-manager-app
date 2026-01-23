import data from '../json/data.json'
import {showBookmarks} from "./bookmark-manager.ts";
import type {Bookmark} from "./bookmark-manager.ts";

const recentlyAddedBtn = document.querySelector('.recently-added') as HTMLButtonElement;

const bookmarks: Bookmark[] = data.bookmarks

export function sortBookmarks() {
    recentlyAddedBtn.addEventListener('click', () => {
        const sortedBookmarks = [...bookmarks].sort((a, b) => {
            const dateA = new Date(a.createdAt ?? 0).getTime();
            const dateB = new Date(b.createdAt ?? 0).getTime();
            return dateB - dateA
        })
        showBookmarks(sortedBookmarks)
    })
}