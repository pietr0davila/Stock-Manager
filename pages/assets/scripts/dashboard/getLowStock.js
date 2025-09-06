import { documentQuerySelector } from "../dom.js"

export function showInDashboard() {
    const paragraph = documentQuerySelector("p#low-stock")
    const span = documentQuerySelector("span#low-stock-span")

    const lowStockProducts = LowStockAmount()
    const totalProducts = window.internalFunction.getColumnFromDb("product_code").length // Tamanho da coluna de código
    
    const percentage = (lowStockProducts / totalProducts) * 100 // Porcentagem de baixo estoque
    paragraph.innerHTML = lowStockProducts
    if (!isNaN(percentage)) {
        // Validação se o banco de dados retornar undefined ou []
        span.innerHTML = percentage.toFixed(1) + "% de estoque baixo"
        span.classList.remove("positive", "negative", "neutral")
    }
    
    // Cor do span de acordo com a urgência
    if (percentage > 50) {
        span.classList.add("negative")
    } else if (percentage > 20) {
        span.classList.add("neutral")
    } else {
        span.classList.add("positive")
    }   
}

function LowStockAmount() {
    const data = window.internalFunction.getColumnFromDb("current_stock, min_stock") || [] // Evita undefined
    return data.filter(item => item.current_stock <= item.min_stock).length
    
}