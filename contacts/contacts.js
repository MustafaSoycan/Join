let contacts = [];

async function loadContactList(){

    await getContactsFromRemoteStorage();
    renderContactList();

}

function renderContactList(){
    let letter = ""; 
    sortContact();
    document.getElementById("contactList").innerHTML = /*html*/ ``; 
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetter = contact.firstName.substring(0, 1); 
        if(letter != firstLetter) {
            letter = firstLetter; 
            document.getElementById("contactList").innerHTML += /*html*/ `
                <div>
                    <h3 class="contactLetter">${letter}</h3>
                    <hr class="contactLetterDivider">
                </div>
            `; 
       }
        document.getElementById("contactList").innerHTML += /*html*/ `
            <div class="contactListItem">
                <div>
                    <div id="contactIcon${i}" class="contactIcon">AA</div>
                </div>
                <div>
                    <h3 class="contactName">${contact.firstName} ${contact.lastName}</h3>
                    <a class="contactEmail" href= "mailto:${contact.email}">${contact.email}</a>
                </div>
               
            </div>
        `; 
        setContactIconBackground(i); 
    }
}

function sortContact(){
    contacts = contacts.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
      });
}
function setContactIconBackground(id){
    let color = Math.floor(Math.random()*16777215).toString(16);
    document.getElementById("contactIcon"+id).style.backgroundColor = "#"+color; 
} 

async function getContactsFromRemoteStorage(){
    const url = "./contacts.json"
    response = await fetch(url); 
    console.log(response);         
    contacts = await response.json();       
}
