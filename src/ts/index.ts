import {showBookmarks} from "./bookmark-manager.ts";
import {bookmarks} from "./bookmark-manager.ts";
const addInput = document.querySelector('.add') as HTMLButtonElement;
const addBookmarkPanel = document.querySelector('.add-bookmark') as HTMLDivElement;
const closeBookmarkPanel = document.querySelector('.bookmarkClose') as HTMLButtonElement;
// const addBookmarkBtn = document.querySelector('.addBookmarkBtn') as HTMLButtonElement;
const closeHamburgerMenuBtn = document.querySelector('.close-hamburger-btn') as HTMLImageElement;
const openHamburgerMenuBtn = document.querySelector('.open-hamburger-btn') as HTMLButtonElement;
const sortMenu = document.querySelector(`.sort-menu`) as HTMLDivElement;
const sortMenuBtn = document.querySelector('.sort-menu-btn') as HTMLButtonElement

const hamburgerMenu = document.querySelector('.hamburger-menu') as HTMLDivElement;

const toggleElement = (element: HTMLElement) => {
    element.classList.toggle('hidden')
}

addInput.addEventListener('click', () => toggleElement(addBookmarkPanel))
closeBookmarkPanel.addEventListener('click', () => toggleElement(addBookmarkPanel))
closeHamburgerMenuBtn.addEventListener('click', () => toggleElement(hamburgerMenu))
openHamburgerMenuBtn.addEventListener('click', () => toggleElement(hamburgerMenu))
sortMenuBtn.addEventListener('click', () => toggleElement(sortMenu))

showBookmarks(bookmarks)