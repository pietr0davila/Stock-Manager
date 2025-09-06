import { getForm } from "./validation/validate.js"
import { isStockSufficient } from "./sales/updateStock.js"
import { documentQuerySelector, showSuccessMsg, showErrorMsg } from "./dom.js"
import { showInDashboard } from "./dashboard/getLowStock.js"

const dashboard = () => {
    // const notificationButton = documentQuerySelector("button#notification-button")
    // notificationButton.addEventListener("click", () => {
    //     window.internalFunction.toggle("div#notification-container")
    // })

    document.addEventListener("DOMContentLoaded", () => {
        showInDashboard()
    })
} 

const addProduct = () => {
    const addProductForm = documentQuerySelector("form#add-form")
    
    document.addEventListener("submit", (e) => {
        const formData = new FormData(addProductForm)
        const data = Object.fromEntries(formData.entries())
        e.preventDefault()
        const parsed = getForm(data)     
        window.internalFunction.insertProduct(parsed)
    })
}

const salesMode = () => {
    const saleButtonSubmit = documentQuerySelector("button#register-sale-button")
    
    const productCodeInput = documentQuerySelector("input#product-code")
    const productNameInput = documentQuerySelector("span#product-name")
    const quantityToSaleInput = documentQuerySelector("input#quantity")
    productCodeInput.addEventListener("change", () => {

        const correspondence = window.internalFunction.getDataFromDbWhere(`product_code = ${productCodeInput.value}`)
        if (!correspondence) {
            productNameInput.innerHTML = "Produto inválido"
        } else {
            productNameInput.innerHTML = correspondence["product_name"]
        }
    })
    saleButtonSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        if (isStockSufficient(productCodeInput.value, quantityToSaleInput.value)) {
            showSuccessMsg("Produto vendido com sucesso")
            window.internalFunction.updateDataBySale(productCodeInput.value, quantityToSaleInput.value)
        } else {
            showErrorMsg("Essa venda deixaria seu estoque negativo!!", "ERROR_INVALID_SALE")
        }
    })
}

if (document.body.classList.contains("dashboard")) {
    dashboard()
} else if (document.body.classList.contains("add-product")) {
    addProduct()
} else {
    salesMode()
}