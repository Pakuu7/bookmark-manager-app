import {getBookmarksFromStorage} from "./storage.ts";
import data from "../json/data.json"
import {saveBookmarksToStorage} from "./storage.ts";
import {openEditModal} from "./edit-bookmark.ts";

const cardsContainer = document.querySelector('.cards') as HTMLDivElement;

let currentTab: 'home' | 'archived' = 'home'

export interface Bookmark {
    id: string;
    title: string;
    url: string;
    favicon: string;
    description: string;
    tags: string[];
    pinned: boolean;
    isArchived: boolean;
    visitCount: number;
    createdAt: string;
    lastVisited: string | null;
}

export const bookmarks: Bookmark[] = getBookmarksFromStorage() || data.bookmarks

function formatDate(date: string | null) {
    if (!date) return 'Never'
    const dateObject = new Date(date)
    const day = dateObject.getDate()
    const month = dateObject.toLocaleDateString('en-US', {month: 'short'})
    return `${day} ${month}`
}

export function showBookmarks(list: Bookmark[]) {
    cardsContainer.innerHTML = ''
    const fragment = document.createDocumentFragment()
    list.forEach(bookmark => {
        let bookmarkUrl = bookmark.url
        const card = document.createElement('div');
        card.classList.add('bg-neutral-0', 'shadow-lg', 'rounded-xl', 'flex', 'flex-col', 'h-full')
        const lastVisitedText = formatDate(bookmark.lastVisited);
        const createdAtText = formatDate(bookmark.createdAt)
        const displayUrl = bookmarkUrl
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
        let tagsHTML = ''
        bookmark.tags.forEach(tag => {
            tagsHTML += `<span class='tag text-preset-5 bg-neutral-100 px-3 py-1 rounded-sm'>${tag}</span>`
        })
        card.innerHTML = `
        <div class="relative top flex justify-between items-start pb-3 p-4 border-b border-b-neutral-300">
                <div class="bookmark-menu hidden absolute right-4 top-full -mt-6">
                      <div class="p-2 rounded-lg bg-neutral-0 border border-neutral-100 w-50">
                            <a href="${bookmarkUrl}" target="_blank" rel="noopener" class="flex items-center p-2 space-x-2.5 w-full rounded-md hover:bg-neutral-100 transition-colors"><img src="/icon-visit.svg" class="w-4" alt=""><p class="text-preset-4">Visit</p></a> 
                            <button class="copy-btn flex items-center p-2 space-x-2.5 w-full rounded-md hover:bg-neutral-100 transition-colors"><img src="/icon-copy.svg" class="w-4" alt=""><p class="text-preset-4">Copy URL</p></button>
                            <button class="pin-btn flex items-center p-2 space-x-2.5 w-full rounded-md hover:bg-neutral-100 transition-colors"><img src="/icon-unpin.svg" class="w-4" alt=""><p class="text-preset-4">${bookmark.pinned ? 'Unpin' : 'Pin'}</p></button>
                            <button class="edit-btn flex items-center p-2 space-x-2.5 w-full rounded-md hover:bg-neutral-100 transition-colors"><img src="/icon-edit.svg" class="w-4" alt=""><p class="text-preset-4">Edit</p></button>
                            <button class="archive-btn flex items-center p-2 space-x-2.5 w-full rounded-md hover:bg-neutral-100 transition-colors"><img src="/icon-archive.svg" class="w-4" alt=""><p class="text-preset-4">${bookmark.isArchived ? 'Unarchive' : 'Archive'}</p></button>
                       </div>
                </div>
                
                <div class="flex gap-4 items-center">
                    <img src="${bookmark.favicon}"
                         class="w-12 h-12 rounded-lg border border-neutral-100"
                         alt="${bookmark.title} favicon">
                    <div>
                        <h3 class="text-preset-2 text-neutral-900">${bookmark.title}</h3>
                        <p class="bookmark-url text-preset-5 text-neutral-800">${displayUrl}</p>
                    </div>
                </div>
                <button class="bookmark-edit border border-neutral-400 p-1 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                         stroke="#001F1F" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                    </svg>
                </button>
            </div>
            <div class="pt-3 pb-3 p-4 grow">
                <p class="text-preset-4-medium">
                    ${bookmark.description}
                </p>
            </div>
            <div class="flex flex-wrap space-x-2 pb-3 pt-2 px-4 border-b border-b-neutral-300">
                ${tagsHTML}
            </div>
            <div class="flex items-center justify-between text-neutral-800 px-4 py-3">
                <div class="flex items-center space-x-4">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 20 20">
                            <path stroke="#001F1F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                                  d="M2.017 10.594c-.114-.18-.17-.27-.202-.408a1 1 0 0 1 0-.372c.032-.139.088-.229.202-.408.938-1.485 3.73-5.24 7.983-5.24 4.255 0 7.046 3.755 7.984 5.24.113.18.17.27.202.408a1 1 0 0 1 0 .372c-.032.139-.089.229-.202.408-.938 1.485-3.73 5.24-7.984 5.24s-7.045-3.755-7.983-5.24"/>
                            <path stroke="#001F1F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                                  d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        </svg>
                        <span class="text-preset-5">${bookmark.visitCount}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 20 20">
                            <g clip-path="url(#a)">
                                <path stroke="#001F1F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                                      d="M10 5v5l3.334 1.667m5-1.667a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"/>
                            </g>
                            <defs>
                                <clipPath id="a">
                                    <path fill="#fff" d="M0 0h20v20H0z"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span class="text-preset-5">${lastVisitedText}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 20 20">
                            <path stroke="#001F1F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                                  d="M17.5 8.333h-15m10.833-6.666V5M6.667 1.667V5M6.5 18.333h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 0 0 1.092-1.093c.273-.535.273-1.235.273-2.635v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.092c-.535-.273-1.235-.273-2.635-.273h-7c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 0 0-1.093 1.092C2.5 5.233 2.5 5.933 2.5 7.333v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.535.272 1.235.272 2.635.272"/>
                        </svg>
                        <span class="text-preset-5">${createdAtText}</span>
                    </div>
                </div>
                ${bookmark.pinned ? `
                <button class="text-gray-400 hover:text-gray-600 px-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 20 20">
                        <path stroke="#001F1F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"
                              d="M10 12.5v5.833M6.668 6.09v1.776c0 .173 0 .26-.017.343a.8.8 0 0 1-.074.211c-.039.076-.093.143-.201.279l-1.308 1.635c-.555.693-.832 1.04-.833 1.332 0 .254.115.494.314.652.228.182.672.182 1.56.182h7.785c.888 0 1.332 0 1.56-.182a.83.83 0 0 0 .314-.652c0-.292-.278-.639-.833-1.332l-1.308-1.635a1.8 1.8 0 0 1-.2-.279.8.8 0 0 1-.075-.211c-.017-.083-.017-.17-.017-.343V6.09c0-.096 0-.144.005-.191a1 1 0 0 1 .024-.125c.013-.045.03-.09.066-.18l.84-2.099c.245-.612.368-.919.317-1.165a.83.83 0 0 0-.356-.525c-.21-.138-.54-.138-1.199-.138H6.97c-.66 0-.99 0-1.2.138a.83.83 0 0 0-.355.525c-.05.246.072.553.317 1.165l.84 2.1c.035.089.053.134.066.18q.016.06.024.124c.005.047.005.095.005.191"/>
                    </svg>
                </button>
                ` : ''}
            </div>
     `

        const visitLink = card.querySelector('a[href]') as HTMLAnchorElement

        visitLink?.addEventListener('click', () => {
            bookmark.visitCount++
            bookmark.lastVisited = new Date().toISOString()
            saveBookmarksToStorage(bookmarks)
            renderCurrentTab()
        })

        const bookmarkMenu = card.querySelector('.bookmark-menu') as HTMLDivElement | null
        const bookmarkEdit = card.querySelector('.bookmark-edit') as HTMLButtonElement

        bookmarkEdit?.addEventListener('click', () => {
            const bookmarksMenu = document.querySelectorAll('.bookmark-menu') as NodeListOf<HTMLDivElement>
            const wasHidden = bookmarkMenu?.classList.contains('hidden')
            bookmarksMenu.forEach(menu => menu.classList.add('hidden'))

            if (wasHidden) {
                bookmarkMenu?.classList.remove('hidden')
            }
        })

        const copyBtn = card.querySelector('.copy-btn') as HTMLButtonElement
        const copyBtnText = copyBtn.querySelector('p') as HTMLParagraphElement

        copyBtn?.addEventListener('click', () => {
            navigator.clipboard.writeText(bookmarkUrl)
            copyBtnText.textContent = 'Copied!'
            setTimeout(() => {
                bookmarkMenu?.classList.add('hidden')
                copyBtnText.textContent = 'Copy URL'
            }, 2000)
        })

        const pintBtn = card.querySelector('.pin-btn') as HTMLButtonElement

        pintBtn?.addEventListener('click', () => {
            bookmark.pinned = !bookmark.pinned
            saveBookmarksToStorage(bookmarks)
            bookmarks.sort((a, b) => Number(b.pinned) - Number(a.pinned))
            renderCurrentTab()
        })

        const editBtn = card.querySelector('.edit-btn') as HTMLButtonElement;
        editBtn?.addEventListener('click', () => {
            bookmarkMenu?.classList.add('hidden')
            openEditModal(bookmark)
        })


        const archiveBtn = card.querySelector('.archive-btn') as HTMLButtonElement

        archiveBtn?.addEventListener('click', () => {
            bookmark.isArchived = !bookmark.isArchived
            saveBookmarksToStorage(bookmarks)
            renderCurrentTab()
        })


        fragment.appendChild(card)
    })
    cardsContainer.appendChild(fragment)
}

export function renderCurrentTab() {
    const filtered = bookmarks.filter(b => {
        if (currentTab === 'home') return !b.isArchived
        if (currentTab === 'archived') return b.isArchived
        return true
    })
    tabTitle.textContent = currentTab === 'archived' ? 'Archived bookmarks' : 'All bookmarks'
    filtered.sort((a, b) => Number(b.pinned) - Number(a.pinned))
    showBookmarks(filtered)
}

const homeTabBtn = document.querySelectorAll('.nav-home') as NodeListOf<HTMLButtonElement>
const archivedTabBtn = document.querySelectorAll('.nav-archived') as NodeListOf<HTMLButtonElement>
const tabTitle = document.querySelector('.tab-title') as HTMLHeadingElement

function updateUI() {
    const allButtons = [...homeTabBtn, ...archivedTabBtn]
    allButtons.forEach(btn => {
        btn.classList.remove('active-menu')
    })

    if (currentTab === 'home') {
        homeTabBtn.forEach(btn => btn.classList.add('active-menu'))
    } else {
        archivedTabBtn.forEach(btn => btn.classList.add('active-menu'))
    }
}

function initTabNavigation() {
    homeTabBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = 'home'
            updateUI()
            renderCurrentTab()
        })
    })

    archivedTabBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTab = 'archived'
            updateUI()
            renderCurrentTab()
        })
    })
}

initTabNavigation()
updateUI()
