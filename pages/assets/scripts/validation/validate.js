import ErrorHandling from "../../../../scripts/ErrorHandling.js"
import { showErrorMsg } from "../dom.js"

export function getForm(formData) {
    window.internalFunction.isNullFunction(formData)
    window.internalFunction.checkTypeFunction(formData, ["object"])

    const parsedData = {}

    for (const key in formData) {
        parsedData[key] = validation(key, formData[key])
        
    }
    return parsedData
}

function validation(key, value) {
    try {
        let sanitizedData = value.trim()

        if (containsBlackListChar(sanitizedData)) {
            const msg = "O valor informado contém caracteres não permitidos. Por favor, revise e tente novamente."
            showErrorMsg(msg, "FORBIDDEN_CHARS")
            throw new ErrorHandling(msg, "FORBIDDEN_CHARS")
        }

        switch (key) {
            case "quantity":
            case "minStock":
            case "stock":
                sanitizedData = parseInt(sanitizedData, 10)
                break
            case "price":
                sanitizedData = parseFloat(sanitizedData)
                break
        }

        if (key === "productCode") {
            if (key < 999 || key > 99999) {
                showErrorMsg(
                    "O código do produto deve ter entre 4 e 5 dígitos. Ex.: 1000 a 99999.",
                    "INVALID_PRODUCT_CODE"
                )
            }
        }
        return sanitizedData
    }
    catch (err) {
        if (err instanceof ErrorHandling) {
            showErrorMsg(err.message, err.name)
        } else {
            showErrorMsg(`Um erro inesperado ocorreu durante a validação dos dados: ${err}`, "UNEXPECTED")
        }
    }
}

function containsBlackListChar(value) {
    const pattern = /(--|<|>|"|'|`|;|\\)/g
    if (pattern.test(value)) {
        return true
    }
    return false
}
