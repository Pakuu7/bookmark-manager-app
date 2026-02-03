import {bookmarks} from "./bookmark-manager.ts";
import {showBookmarks} from "./bookmark-manager.ts";

const tagsContainer = document.querySelector('.tags') as HTMLDivElement

let activeTags: string[] = []

export function showTags() {
    tagsContainer.innerHTML = ''
    const allTags = bookmarks.flatMap(bookmark => bookmark.tags)
    const uniqueTags = [...new Set(allTags)]

    uniqueTags.forEach(tag => {
        const tagCount = allTags.filter(singleTag => singleTag == tag).length
        const tagElement = document.createElement('div')
        tagElement.classList.add('tag', 'flex', 'items-center', 'justify-between', 'px-3', 'py-2', 'cursor-pointer')

        tagElement.innerHTML = `    
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" class="tags-choice pointer-events-none">
                            <p class="text-preset-3 text-neutral-800">${tag}</p>
                        </div>
                        <div class="bg-neutral-100 px-2 py-0.5 font-bold text-xs border border-neutral-300 rounded-full">
                            <span class="tag-count text-neutral-800">${tagCount}</span>
                        </div>
        `

        const checkbox = tagElement.querySelector("input") as HTMLInputElement
        tagElement.addEventListener('click', () => {

            checkbox.checked = !checkbox.checked

            if (checkbox.checked) {
                activeTags.push(tag)
            } else {
                activeTags = activeTags.filter(t => t !== tag)
            }

            const filteredBookmarks = activeTags.length === 0
                ? bookmarks
                : bookmarks.filter(book => book.tags.some(t => activeTags.includes(t)))

        showBookmarks(filteredBookmarks)
    })
        tagsContainer.appendChild(tagElement)
}
)}
