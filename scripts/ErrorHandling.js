export default class ErrorHandling extends Error {
    constructor(message, name) {
        super(message)
        this.name = name || "ValidationError"
        this.errors = []
    }
    addToErrors(error) {
        this.errors.push(error)
    }
    hasErrors() {
        return this.errors.length > 0
    }
    getErrors() {
        return this.errors
    }
    throwError() {
        if (this.hasErrors()) {
            throw this
        }
    }
    
    
}