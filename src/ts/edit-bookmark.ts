import {type Bookmark, bookmarks, showBookmarks} from "./bookmark-manager.ts";
import {toggleElement} from "./utils.ts";
import {saveBookmarksToStorage} from "./storage.ts";

const editPanel = document.querySelector('.edit-bookmark') as HTMLDivElement;
const closeBtn = document.querySelector('.edit-bookmark-close') as HTMLButtonElement
const saveBtn = document.querySelector('.save-bookmark-btn') as HTMLButtonElement
const cancelBtn = document.querySelector('.cancel-edit-bookmark-btn') as HTMLButtonElement

const titleInput = document.getElementById('edit-title') as HTMLInputElement
const descInput = document.getElementById('edit-description') as HTMLInputElement
const urlInput = document.getElementById('edit-website') as HTMLInputElement
const tagsInput = document.getElementById('edit-tags') as HTMLInputElement

let currentEditingId: string | null = null

export function openEditModal(bookmark: Bookmark) {
    currentEditingId = bookmark.id
    titleInput.value = bookmark.title
    descInput.value = bookmark.description
    urlInput.value = bookmark.url
    tagsInput.value = bookmark.tags.join(', ')

    toggleElement(editPanel)
}

closeBtn.addEventListener('click', () => {
    toggleElement(editPanel)
})

cancelBtn.addEventListener('click', () => {
    toggleElement(editPanel)
})

saveBtn.addEventListener('click', () => {
    if (!currentEditingId) return;

    const bookmarkIndex = bookmarks.findIndex(b => b.id === currentEditingId)

    if (bookmarkIndex !== -1) {
        bookmarks[bookmarkIndex] = {
            ...bookmarks[bookmarkIndex],
            title: titleInput.value,
            description: descInput.value,
            url: urlInput.value,
            tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
        }

        saveBookmarksToStorage(bookmarks)
        showBookmarks(bookmarks)
        toggleElement(editPanel)

        currentEditingId = null
    }
})
