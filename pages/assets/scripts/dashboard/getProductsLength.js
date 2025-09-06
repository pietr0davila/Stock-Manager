import { documentQuerySelector } from "../dom.js"
document.addEventListener("DOMContentLoaded", () => {
    const correspondences = window.internalFunction.getColumnFromDb("product_code").length
    const allProductsParagraphy = documentQuerySelector("p#allProducts")
    allProductsParagraphy.innerHTML = correspondences
})