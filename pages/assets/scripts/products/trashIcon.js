/*
    
*/

export function createButton(parent) {
    let trashButton = parent.querySelector("button.btn-delete")
    if (!trashButton) {
        trashButton = document.createElement("button")
        trashButton.classList.add("btn-delete", "activate") 
        const icon = document.createElement("i")
        icon.classList.add("fas", "fa-trash")
        trashButton.appendChild(icon)
        parent.appendChild(trashButton)
    }
    return trashButton
}

