export const toggleElement = (element: HTMLElement) => {
    if (!element) return
    element.classList.toggle('hidden')
}