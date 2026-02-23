export const toggleElement = (element: HTMLElement) => {
    if (!element) return
    element.classList.toggle('hidden')
}

export const initClickOutside = (element: HTMLElement, toggleBtn: HTMLElement) => {
    document.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as HTMLElement

        if (!element.classList.contains('hidden') &&
        !element.contains(target) &&
        !toggleBtn.contains(target)) {
            element.classList.add('hidden')
        }
    })
}