import { documentQuerySelector } from "../dom.js"
import { createButton } from "./trashIcon.js"

document.addEventListener("DOMContentLoaded", () => {
    const products = window.internalFunction.getDataFromDb()
    const tableBody = documentQuerySelector("tbody#table-body")
    
    const createRow = (table) => {
        const newRow = document.createElement("tr")
        newRow.classList.add("table-row")
        table.appendChild(newRow)
        return newRow
    }

    const createTd = (row) => {
        const newTd = document.createElement("td")
        row.appendChild(newTd)
        return newTd
    }
    function createMessageRow(msg) {
        const row = createRow(tableBody)
        const td = createTd(row)
        td.colSpan = 8
        td.style.textAlign = "center"
        td.innerHTML = msg
        return row
    }

    if (!products || products.length === 0) {
        createMessageRow("Seus produtos aparecerão aqui!")
        return
    }

    for (const item of products) {
        const code = item.product_code
        const row = createRow(tableBody)
        for (const value of Object.values(item)) {
            const td = createTd(row)
            td.innerHTML = value
            row.appendChild(td)
        }
        
        const statusColumn = document.createElement("td")
        row.appendChild(statusColumn)
        const trashButton = createButton(row)
        trashButton.addEventListener("click", () => {
            window.internalFunction.deleteDataFromDbWhere(`product_code = ${code}`)
            window.location.reload()
        })
        const status = document.createElement("span")
        status.classList.add("status-badge")
        statusColumn.appendChild(status)

        if (item.current_stock === 0) {
            status.classList.add("status-out-of-stock")
            status.innerHTML = "Sem estoque"
        } else if (item.current_stock <= item.min_stock) {
            status.classList.add("status-low-stock")
            status.innerHTML = "Reposição recomendada"
        } else {
            status.classList.add("status-in-stock")
            status.innerHTML = "Em estoque"
        }
    }
})

