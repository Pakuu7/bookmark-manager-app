import {toggleElement} from "./utils.ts";
import {sortBookmarks, menuCheckToggle} from "./sorting.ts";
import {processNewBookmark, validateAddForm, resetForm} from "./add-bookmark.ts";
import {searchBookmarks} from "./search.ts";
import {showTags} from "./tags.ts";
import {renderCurrentTab} from "./bookmark-manager.ts";

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

addInput.addEventListener('click', () => toggleElement(addBookmarkPanel))
closeBookmarkPanel.addEventListener('click', () => toggleElement(addBookmarkPanel))
closeHamburgerMenuBtn.addEventListener('click', () => toggleElement(hamburgerMenu))
openHamburgerMenuBtn.addEventListener('click', () => toggleElement(hamburgerMenu))
sortMenuBtn.addEventListener('click', () => toggleElement(sortMenu))

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

sortBookmarks();
menuCheckToggle();
showTags()
renderCurrentTab();