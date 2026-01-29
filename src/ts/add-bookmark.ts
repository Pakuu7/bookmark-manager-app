const titleInput = document.querySelector('.title-input') as HTMLInputElement;
const descriptionInput = document.querySelector('.description-input') as HTMLInputElement;
const websiteInput = document.querySelector('.website-input') as HTMLInputElement;
const tagsInput = document.querySelector('.tags-input') as HTMLInputElement;
const titleError = document.querySelector('.title-error') as HTMLSpanElement;
const descriptionError = document.querySelector('.description-error') as HTMLSpanElement;
const websiteError = document.querySelector('.website-error') as HTMLSpanElement;
const tagsError = document.querySelector('.tags-error') as HTMLSpanElement;

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

export function resetForm() {
    titleInput.value = ''
    descriptionInput.value = ''
    websiteInput.value = ''
    tagsInput.value = ''
}

export function validateAddForm(): boolean {
    let isValid = true

    if (titleInput.value.trim().length == 0) {
        titleError.classList.remove('hidden')
        isValid = false
    } else {
        titleError.classList.add('hidden')
    }

    if (descriptionInput.value.trim().length == 0) {
        descriptionError.classList.remove('hidden')
        isValid = false
    } else {
        descriptionError.classList.add('hidden')
    }

    if (websiteInput.value.trim().length == 0) {
        websiteError.classList.remove('hidden')
        isValid = false
    } else {
        websiteError.classList.add('hidden')
    }

    if (tagsInput.value.trim().length == 0) {
        tagsError.classList.remove('hidden')
        isValid = false
    } else {
        tagsError.classList.add('hidden')
    }
    return isValid
}



