import ErrorHandling from "../ErrorHandling.js"

export default class Utils {
    constructor(value) {
        this.value = value
    }   
    isNull = () => {
        if (this.value == null || this.value == undefined) {
            throw new ErrorHandling("[-] O valor não pode ser null ou undefined", "NOT_NULL_EXCEPTION")
        }        
    }
    
    checkType = (accepted) => {
        try {
            for (const type of accepted) {
                if (typeof this.value === type) {
                    return
                } 
            }
            throw new ErrorHandling(`[-] Erro de tipo\nTipos esperados: ${accepted}\nTipo recebido: ${typeof this.value}`)
        }
        catch (err) {
            console.log(err)
        }
    
    }
    static logMsg = (msg) => {
        console.log("[+]", msg)
    }
    static warnMsg = (msg) => {
        console.warn("[*]", msg)
    }
    static errorMsg = (msg) => {
        console.error("[-]", msg)
    }
}