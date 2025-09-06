import ErrorHandling from "../../../scripts/ErrorHandling.js"
import Utils from "../../../scripts/utils/Utils.js"
import { toggleElement } from "./toggle.js"

export function documentQuerySelector(element) {
    const instance = new Utils(element)
    instance.isNull()
    instance.checkType(["string"])
    return document.querySelector(element)    
}
export function showErrorMsg(msg, name) {
    const errorDiv = documentQuerySelector("div#error-messages")
    const errorList = documentQuerySelector("ul#error-list")
    if (errorDiv.classList.contains("deactivate")) {
        toggleElement("div#error-messages")
    }   
    const li = document.createElement("li")
    errorList.appendChild(li)
    errorDiv.innerHTML = `${name}: ${msg}`
    throw new ErrorHandling(msg, name)
}

export function showSuccessMsg(msg) {
    const successDiv = documentQuerySelector("div#success-messages")
    if (successDiv.classList.contains("deactivate")) {
        toggleElement("div#success-messages")
    }   
    const span = document.createElement("span")
    successDiv.appendChild(span)
    successDiv.innerHTML = `${msg}`
}