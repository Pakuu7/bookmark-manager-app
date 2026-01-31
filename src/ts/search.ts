const searchInput = document.querySelector('.search-input') as HTMLInputElement
import {bookmarks} from "./bookmark-manager.ts";
import {showBookmarks} from "./bookmark-manager.ts";

export function searchBookmarks() {
    const searchInputTransform = searchInput.value.toLowerCase().trim()
    const result = bookmarks.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(searchInputTransform) ||
        bookmark.url.toLowerCase().includes(searchInputTransform) ||
        bookmark.description.toLowerCase().includes(searchInputTransform) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchInputTransform))
    )
    showBookmarks(result)
}