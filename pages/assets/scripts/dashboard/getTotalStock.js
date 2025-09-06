import { documentQuerySelector } from "../dom.js"

document.addEventListener("DOMContentLoaded", () => {
    const totalStockParagraphy =  documentQuerySelector("p#total-stock")
    const totalStockObject = getData()
    const totalStock = sumStock(totalStockObject)
    totalStockParagraphy.innerHTML = totalStock
})
function getData() {
    return window.internalFunction.getColumnFromDb("current_stock")
}
function sumStock(objectArr) {
    let sum = 0
    for (const index of objectArr) {
        for (const key in index) {
            sum += index[key]
        }
    }
    return sum
}