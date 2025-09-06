import ErrorHandling from "../../../../scripts/ErrorHandling.js"

export function isStockSufficient(code, saleQuantity) {
    try {
        const obj = window.internalFunction.getDataFromDbWhere(`product_code = ${code}`)
        const currentStock = obj.current_stock        
        
        if (Number(currentStock - saleQuantity) < 0 || currentStock == 0) {
            return false            
        } 
        console.log("vendida")
        return true
    }
    catch (err) {
        console.log(err)
    }
}