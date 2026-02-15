import type {Bookmark} from "./bookmark-manager.ts";

const BOOKMARKS_KEY = 'my-bookmarks-data'

export function saveBookmarksToStorage(bookmarks: Bookmark[]): void {
    const dataString = JSON.stringify(bookmarks)
    localStorage.setItem(BOOKMARKS_KEY, dataString)
}

export function getBookmarksFromStorage(): Bookmark[] | null {
    const dataString = localStorage.getItem(BOOKMARKS_KEY)
    if (!dataString) return null

    try {
        return JSON.parse(dataString) as Bookmark[]
    } catch (e) {
        console.error("Error during process", e)
        return null
    }
}