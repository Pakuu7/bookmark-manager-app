const titleInput = document.querySelector('.title-input') as HTMLInputElement;
const descriptionInput = document.querySelector('.description-input') as HTMLInputElement;
const websiteInput = document.querySelector('.website-input') as HTMLInputElement;
const tagsInput = document.querySelector('.tags-input') as HTMLInputElement;

import {type Bookmark, bookmarks, showBookmarks} from "./bookmark-manager.ts";

export function createBookmarkObject(): Bookmark {
    const titleValue = titleInput.value;
    const descriptionValue = descriptionInput.value;
    const websiteValue = websiteInput.value;
    const tagsValue = tagsInput.value;

    return {
        id: crypto.randomUUID(),
        title: titleValue,
        description: descriptionValue,
        url: websiteValue,
        tags: tagsValue.split(',').map(tag => tag.trim()),
        favicon: "https://www.google.com/s2/favicons?domain=" + websiteInput.value,
        pinned: false,
        isArchived: false,
        visitCount: 0,
        createdAt: new Date().toISOString(),
        lastVisited: null
    };
}

export function processNewBookmark() {
    const newBookmark = createBookmarkObject()
    bookmarks.push(newBookmark)
    showBookmarks(bookmarks)
}



