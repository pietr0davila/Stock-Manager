import { documentQuerySelector } from "../dom.js"

document.addEventListener("DOMContentLoaded", () => {
    const totalInStockParagraphy =  documentQuerySelector("p#total-cash")
    const totalCashObj = getData()
    const totalCash = sumCash(totalCashObj)
    totalInStockParagraphy.innerHTML = "R$" + totalCash + ",00"
})
function getData() {
    return window.internalFunction.getColumnFromDb("product_price, current_stock")
}

function sumCash() {
    const objectArr = window.internalFunction.getColumnFromDb("current_stock, product_price")
    let totalInStock = 0
    for (const index of objectArr) {    
        totalInStock += index["product_price"] * index["current_stock"]
    }
    return totalInStock
}