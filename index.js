
// variable declaration
let myLeads = []
let inputValue = ""
let ulEl = document.getElementById("ul-el")
const inputEl = document.querySelector("#input-el")
const inputBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// check for data in localStorage
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// display data
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems +=
            `<li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

// save input button functionality
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

// delete button functionality
deleteBtn.addEventListener("dblclick", function () {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})

// save tab button functionality
saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!myLeads.includes(tabs[0].url)) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        }
    })
})