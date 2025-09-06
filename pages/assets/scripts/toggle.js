import Utils from "../../../scripts/utils/Utils.js"
import { documentQuerySelector } from "./dom.js"
    
export function toggleElement(element) {
    new Utils(element).checkType(["string"])
    const queryElement = documentQuerySelector(element)
    if (queryElement.classList.contains("activate")) {
        queryElement.classList.replace("activate", "deactivate") 
    } else {
        queryElement.classList.replace("deactivate", "activate") 
        setTimeout(() => {
            queryElement.classList.replace("activate", "deactivate") 

        }, 5000)
    }

}