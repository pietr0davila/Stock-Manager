import Database from "better-sqlite3"
import { showErrorMsg, showSuccessMsg } from "../pages/assets/scripts/dom.js"
import ErrorHandling from "../scripts/ErrorHandling.js"

export class LocalDatabase {
    constructor(dbName) {
        this.dbName = dbName
        this.db = new Database(this.dbName)
        this.createTables()
    }
    createTables() {
        try {
            this.db.prepare(`CREATE TABLE IF NOT EXISTS Product ( 
                product_code INTEGER PRIMARY KEY,
                product_name TEXT UNIQUE NOT NULL,
                product_price DECIMAL(10, 2) NOT NULL,
                min_stock INTEGER NOT NULL default 5,
                supplier TEXT DEFAULT '',
                current_stock INTEGER NOT NULL DEFAULT 0,
                description TEXT DEFAULT ''
            )`).run()
            this.db.prepare(`
                CREATE TABLE IF NOT EXISTS Movement (
                id_movement INTEGER PRIMARY KEY AUTOINCREMENT,
                product_code INTEGER UNIQUE NOT NULL,
                type TEXT CHECK(type IN ('entry', 'exit', 'sale')) NOT NULL,
                quantity INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(product_code) REFERENCES Product(product_code) 
                )`).run()
                this.db.prepare(`CREATE TABLE IF NOT EXISTS App_data (
                    key TEXT PRIMARY KEY,
                    value TEXT
                )
                `).run()
            } 
        catch (err) {
            console.log(err)
            return null
        }
    }
    insertIntoProduct(
        code, 
        name, 
        price, 
        min_stock, 
        supplier="", 
        stock, 
        description=""
    ) {
        try {
            this.instanceIsNull()
            this.db.prepare(`
                INSERT INTO Product (
                    product_code,
                    product_name,
                    product_price,
                    min_stock,
                    supplier,
                    current_stock,
                    description
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(code, name, price, min_stock, supplier, stock, description)
            console.log("Adicionado com sucesso")
            showSuccessMsg("Produto adicionado com sucesso!")

        }
        catch (err) {
            if (err.code?.includes("UNIQUE") || err.code?.includes("PRIMARYKEY")) {
                showErrorMsg(
                    "Não foi possível salvar: já existe um registro com esse mesmo valor único. Verifique se o código ou nome do produto não estão duplicados.",
                    "SQLITE_UNIQUE_EXCEPTION"
                )
            } else {
                showErrorMsg(
                    "Ocorreu um erro inesperado ao acessar o banco de dados.\nTente novamente ou contate o suporte.\nDetalhes técnicos: " + err.message,
                    "UNEXPECTED"
                )
            }
        }
    }
    registryNewSale(productCode, quantity) {
        this.instanceIsNull()
        this.db.prepare(`
            UPDATE Product 
                SET current_stock = current_stock - ? 
                WHERE product_code = ?;
            `).run(quantity, productCode)
    }
    listData() {
        try {
            this.instanceIsNull()            
            const data = this.db.prepare("SELECT * FROM Product").all()
            return data
        }
        catch (err) {
            showErrorMsg("Não foi possível recuperar os dados do banco de dados", "ERROR_GETTING_DATA")
        }
    }
    getColumn(column) {
        try {
            this.instanceIsNull()
            const query = this.db.prepare(`SELECT ${column} FROM Product`)
            const result = query.all()
            return result
        }
        catch (err) {
            showErrorMsg("Não foi possível recuperar a coluna " + column + " do banco de dados")
            throw new ErrorHandling("Não foi possível recuperar a coluna " + column + "do banco de dados", "CANT_SELECT_COLUMNS")
        }
    }
    getDataWhere(condition) {
        try {
            this.instanceIsNull()
            const query = this.db.prepare(`SELECT * FROM Product WHERE ${condition}`)
            const data = query.get()
            return data
        }
        catch (err) {
            showErrorMsg("Não foi possível recuperar os dados do banco de dados")
            throw new ErrorHandling("Não foi possível recuperar os dados do banco de dados ")
        }

    }
    deleteAllWhere(condition) {
        try {
            this.instanceIsNull()
            const query = this.db.prepare(`
                DELETE FROM Product WHERE ${condition}  
                `)        
            query.run()    
        }
        catch (err) {
            showErrorMsg("Não foi possível deletar dados do banco")
            throw new ErrorHandling("Não foi possível deletar dados do banco", "CANT_DELETE_DATA")
        }
    }
    instanceIsNull() {
        const errorMsg = "Não foi possível acessar o banco de dados"
        const name = "DB_INSTANCE_IS_NULL"
        if (this.db == null) {
            showErrorMsg(errorMsg, name)
            throw new ErrorHandling(errorMsg, name)
        } 
    }
    
}
    