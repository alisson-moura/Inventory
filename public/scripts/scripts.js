// active button menu
const menuItems = document.querySelectorAll('.menu a')
const title = document.querySelector('.header-title p').innerHTML
for (const item of menuItems) {
    item.innerHTML === title ? item.classList.add("active") : ''
}

// seleciona localidades de acordo com a empresa
let locales = document.getElementById('locales-data')

function removeOptions (comboBox) {
    while (comboBox.options.length > 0) {                
        comboBox.remove(0);
    }        
}

function FindLocale() {
    const company = document.getElementById('company').value
    let filteredLocales = document.getElementById('locale')
    removeOptions(filteredLocales)
  
    for (let i = locales.length - 1; i >= 0; i--) {
        if (locales.options[i].getAttribute("data-company") == company) {
            let locale = document.innerHTML = locales.options[i].cloneNode(true)
            filteredLocales.append(locale)
        }
    }
}
