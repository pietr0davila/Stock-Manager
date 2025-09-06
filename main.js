import { app, BrowserWindow, ipcMain } from "electron"
import { fileURLToPath } from "url"
import { join, dirname } from "path"

ipcMain.handle("getUserData", () => {
    return app.getPath("userData")
})
function mainDir() {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname  = dirname(__filename)
    return __dirname
}

const createBrowserWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: join(mainDir(), "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        }
    }) 
    win.maximize() 
    win.loadFile(`${mainDir()}/pages/dashboard.html`) 
} 
// Execução
app.whenReady().then(() => { 
    onAllClosed() 
    createBrowserWindow() 
}) 


function onAllClosed() { 
    // Tratamento em windows e linux para nenhum processo ativo (Sair) 
    app.on("window-all-closed", () => { 
        if (process.platform !== "darwin") {
            console.log("[-] Exiting...")
            app.quit()    
        }
    }) 
    // Tratamento em mac (Abrir nova) 
    app.on("activate", () => { 
        if (BrowserWindow.getAllWindows().length === 0) {
            console.log("[+] Starting window...")
            createBrowserWindow()
        }  
    }) 
} 