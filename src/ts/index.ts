const addInput = document.querySelector('.add') as HTMLButtonElement;
const addBookmarkPanel = document.querySelector('.add-bookmark') as HTMLDivElement;
const closeBookmarkPanel = document.querySelector('.bookmarkClose') as HTMLButtonElement;

function showAddPanel() {
    addBookmarkPanel.classList.toggle('hidden')
}

addInput.addEventListener('click', showAddPanel)
closeBookmarkPanel.addEventListener('click', showAddPanel)