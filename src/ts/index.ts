import {toggleElement} from "./utils.ts";
import {sortBookmarks, menuCheckToggle} from "./sorting.ts";
import {processNewBookmark, validateAddForm, resetForm} from "./add-bookmark.ts";
import {searchBookmarks} from "./search.ts";
import {showTags} from "./tags.ts";
import {renderCurrentTab} from "./bookmark-manager.ts";
import {initTheme} from "./theme.ts"
import {initClickOutside} from './utils.ts'

const addInput = document.querySelector('.add') as HTMLButtonElement;
const addBookmarkBtn = document.querySelector('.add-bookmark-btn') as HTMLButtonElement;
const cancelBookmarkBtn = document.querySelector('.cancel-bookmark-btn') as HTMLButtonElement;
const addBookmarkPanel = document.querySelector('.add-bookmark') as HTMLDivElement;
const closeBookmarkPanel = document.querySelector('.bookmarkClose') as HTMLButtonElement;
const closeHamburgerMenuBtn = document.querySelector('.close-hamburger-btn') as HTMLImageElement;
const openHamburgerMenuBtn = document.querySelector('.open-hamburger-btn') as HTMLButtonElement;
const sortMenu = document.querySelector('.sort-menu') as HTMLDivElement;
const sortMenuBtn = document.querySelector('.sort-menu-btn') as HTMLButtonElement
const searchInput = document.querySelector('.search-input') as HTMLInputElement
const hamburgerMenu = document.querySelector('.hamburger-menu') as HTMLDivElement;
const profile = document.querySelector('.profile') as HTMLDivElement;
const profileMenu = document.querySelector('.profile-menu') as HTMLDivElement;


closeBookmarkPanel.addEventListener('click', () => toggleElement(addBookmarkPanel))
closeHamburgerMenuBtn.addEventListener('click', () => toggleElement(hamburgerMenu))

addInput.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleElement(addBookmarkPanel)
})

sortMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleElement(sortMenu)
})

profile.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleElement(profileMenu)
})

openHamburgerMenuBtn.addEventListener('click', () => toggleElement(hamburgerMenu))

initClickOutside(sortMenu, sortMenuBtn)
initClickOutside(profileMenu, profile)

addBookmarkBtn.addEventListener('click', () => {
    if (!validateAddForm()) return
    processNewBookmark()
    resetForm()
})

cancelBookmarkBtn.addEventListener('click', () => {
    resetForm()
    toggleElement(addBookmarkPanel)
})

searchInput.addEventListener('input', searchBookmarks)

menuCheckToggle();
showTags()
renderCurrentTab();
initTheme()
sortBookmarks();
