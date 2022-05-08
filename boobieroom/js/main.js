

const airtableApiKey = "keyWiYmFGHrXf4AYb";
const tableUrl = "https://api.airtable.com/v0/appoo0Z7WkXt9Jrsq/Table%201";

const authenticatedUrl = tableUrl + "?api_key=" + airtableApiKey;


const metaContainerElement = document.querySelector('.meta')
const chatFormElement = document.querySelector('#chat-form')
const chatFormInputElement = document.querySelector('#msg')
const chatMessagesContainerElement = document.querySelector('.chat-messages')
const metaUsernameElement = document.querySelector('.meta-username')
const timeMessageElement = document.querySelector('.time')



console.log(metaContainerElement)
const fetchPromise = fetch(authenticatedUrl) 
const jsonPromise = fetchPromise.then((response)=> {
       return response.json()
}) 

jsonPromise.then((data) => {
    console.log(data)
    
for (let index = 0; index < data.records.length; index++) {
    const chatMessage = data.records[index]
    const meta = chatMessage.fields.meta
    const time = chatMessage.fields.time
    const text = chatMessage.fields.texts
    // console.log
    console.log(chatMessage)
        // Create Chat Element
        const containerDiv = document.createElement('div')
        containerDiv.classList.add('message')
        const textElement = document.createElement('p')
        textElement.innerHTML = text
        containerDiv.appendChild(textElement)
        chatMessagesContainerElement.appendChild(containerDiv)
}
    // for (let index = 0; index < array.length; index++) {
    // }
 



})

// Add Event Listener for a Submit Event
chatFormElement.addEventListener('submit', (event) => {
    // Prevent Default Event of Form Submission
    event.preventDefault(); 
    // Get Value of Chat Message Input 
    const chatMessage = chatFormInputElement.value
    // Clear Chat Message Input Value for Future Usage
    chatFormInputElement.value = ""
    // Create Chat Element
    const containerDiv = document.createElement('div')
    containerDiv.classList.add('message')
    const textElement = document.createElement('p')
    textElement.innerHTML = chatMessage

    // Create a new element for adding the username to the page
    // attach the username element to the containerDiv
    const userElement = document.createElement('div')
    userElement.classList.add('meta-username')
    userElement.innerHTML = "Username"
    
    
    // Create a new element for adding the time to the page
    // attach the time element to the containerDiv
    const timeElement = document.createElement('div')
    timeElement.classList.add('time')
    timeElement.innerHTML = "10:38"
    
    containerDiv.appendChild(userElement)
    containerDiv.appendChild(timeElement)
    containerDiv.appendChild(textElement)
    chatMessagesContainerElement.appendChild(containerDiv)

    // Submit Chat Message to Airtable Database
    const fetchPostPromise = fetch(authenticatedUrl, {
        method: 'POST', 
        body: JSON.stringify({
            records: [{
                fields: {
                    meta:  "Username",
                    time: "10:38",
                    texts: chatMessage
                }
            }]
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    fetchPostPromise.then((response) => {
        console.log(response)
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
    // End Submit Chat Message to Airtable Database
})