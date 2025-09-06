function updateNotifications() {
    const amount = getNotifications()
    let badge = document.querySelector("span#notification-badge") 
        
    if (amount == 0) {
        badge.setAttribute("id", "deactivate")
    } else if (amount <= 999) {
        badge.innerHTML = amount
    } else {
        badge.innerHTML = "+999"
    }
}
function getNotifications() {
    const notifications = document.getElementsByClassName("notification-item").length
    return notifications
}
updateNotifications()