import { contextBridge, ipcRenderer } from "electron" 
import Utils from "./scripts/utils/Utils.js";
import { documentQuerySelector } from "./pages/assets/scripts/dom.js";
import { toggleElement } from "./pages/assets/scripts/toggle.js";
import { LocalDatabase } from "./database/LocalDatabase.js";

let db
ipcRenderer.invoke("getUserData").then(userData => {
    db = new LocalDatabase(userData + "/stock.db")
}),

contextBridge.exposeInMainWorld("internalFunction", {
    
    isNullFunction: (value) => new Utils(value).isNull(),
    checkTypeFunction: (value, accepted) => new Utils(value).checkType(accepted),
    querySelect: (element) => documentQuerySelector(element), 
    toggle: (element) => toggleElement(element),
    insertProduct: (parsedData) => {
        db.insertIntoProduct(
        parsedData.productCode,
        parsedData.productName,
        parsedData.price,
        parsedData.minStock,
        parsedData.supplier,
        parsedData.stock,
        parsedData.description
        )
    },
    getDataFromDb: () => db.listData(), 
    getColumnFromDb: (column) => db.getColumn(column),
    getDataFromDbWhere: (condition) => db.getDataWhere(condition),
    updateDataBySale: (productCode, quantity) => db.registryNewSale(productCode, quantity),
    deleteDataFromDbWhere: (condition) => db.deleteAllWhere(condition)
})
