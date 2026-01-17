const input_btn = document.getElementById("input-btn")
const result = document.getElementById("result")
const input_el = document.getElementById("input-el")
const delete_btn = document.getElementById("delete-btn")
const tab_btn = document.getElementById("tab-btn")
let myLead
if (!(localStorage.getItem("myLead"))) {
    localStorage.setItem("myLead", JSON.stringify([]))
    myLead = JSON.parse(localStorage.getItem("myLead"))
} else {
    myLead = JSON.parse(localStorage.getItem("myLead"))
}


tab_btn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead))
        render(myLead)
    })
})

// we can use async functions and await method also.
// tab_btn.addEventListener("click", async function () {
//     let tabs = await chrome.tabs.query({ active: true, currentWindow: true })
//     myLead.push(tabs[0].url)
//     localStorage.setItem("myLead", JSON.stringify(myLead))
//     render(myLead)
// })

function render(lead) {
    result.textContent = ""
    for (let i = 0; i < lead.length; i++) {
        let item = lead[i]
        result.innerHTML += `<li>
                            <a  target='_blank' href=" ${item}"> 
                               ${item}
                            </a>
                        </li>`
    }
}

render(myLead)


delete_btn.addEventListener("dblclick", () => {
    localStorage.clear()
    result.textContent = ""
    localStorage.setItem("myLead", JSON.stringify([]))
    myLead = JSON.parse(localStorage.getItem("myLead"))
})




input_btn.addEventListener("click", function () {

    //Local Storage-localStorage is browser-based 
    // persistent key–value storage scoped per origin. 
    // Both keys and values are stored as strings, so 
    // objects must be serialized using JSON.”
    //     What localStorage actually is

    // It is browser-managed storage

    // Stored on your computer, BUT

    // Sandboxed per browser + per website
    //     3️⃣ Key & Value rules (IMPORTANT)
    // 🔴 YES — both key and value MUST be strings

    // This is non-negotiable.

    // localStorage.setItem("name", "Ashish"); // ✅


    // Even if you pass something else, the browser converts it to string.
    //     Yes — exactly like JSON, but manually.

    // Store object/array
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ name: "Ashish", age: 22 })
    // );

    // Retrieve object/array
    // const user = JSON.parse(localStorage.getItem("user"));


    // This is the only correct way.

    // 5️⃣ Example (Real-world, Lead Tracker)
    // let leads = ["google.com", "github.com"];

    // localStorage.setItem("leads", JSON.stringify(leads));

    // let savedLeads = JSON.parse(localStorage.getItem("leads"));
    let item = input_el.value
    myLead.push(item)
    localStorage.setItem("myLead", JSON.stringify(myLead))
    // localStorage.clear()
    // localStorage.getItem("myLeads")
    // console.log(JSON.parse(localStorage.getItem("myLeads")));
    //Method-1
    // result.innerHTML += "<li><a  target='_blank' href=" + item + ">" + item + "</a>" + "</li>"

    //multi Line
    result.innerHTML += `<li>
                            <a  target='_blank' href=" ${item}"> 
                               ${item}
                            </a>
                        </li>`




    // result.innerHTML += "<li><a  href=" + item + "target='_blank'>" + item + "</a>" + "</li>"
    // This will not open in new window.
    // Alway write the feature with the string of html tag

    //Method-2
    // const listItem=document.createElement("li")
    // listItem.textContent=input_el.value
    // result.append(listItem)

    // input_el.textContent=""--->this will not clear the input field
    input_el.value = ""
});

