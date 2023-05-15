let contacts = [];
const remoteStorageKey = `contacts`;

async function loadContactList(){

    await getContactsFromRemoteStorage();
    
    let resp = setItem(remoteStorageKey , JSON.stringify(contacts)); 
    console.log(resp); 
    

    renderContactList();

}

function renderContactList(){
    let letter = ""; 
    sortContact();
    document.getElementById("contactList").innerHTML = /*html*/ ``; 
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const firstLetter = contact.firstName.substring(0, 1); 
        const firstLetterLastName = contact.lastName.substring(0, 1); 
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
            <div id="contactListItem" class="contactListItem" onClick="openContactDetails(${i})">
                <div>
                    <div id="contactIcon${i}" class="contactIcon">${firstLetter}${firstLetterLastName}</div>
                </div>
                <div>
                    <h3 class="contactName">${contact.firstName} ${contact.lastName}</h3>
                    <a class="contactEmail" href= "mailto:${contact.email}">${contact.email}</a>
                </div>
               
            </div>
        `; 
        document.getElementById("contactIcon"+i).style.backgroundColor = contact.bgIconColor; 
        //setContactIconBackground(i); 
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
    
    /*ALLTE VERSION - JSON FROM LOCAL FILE */
    /* 
    const url = "./contacts.json"
    response = await fetch(url); 
    //console.log(response);         
    contacts = await response.json();     
    */
    
    /* GET CONTACTS FROM REMOTE STORAGE */
    let resp =  await getItem(remoteStorageKey);
    contacts = JSON.parse(resp.data.value); 
    //console.log("GET FROM STORAGE:" + contacts);


}

function openContactDetails(index){
    let contact = contacts[index]; 
    const firstLetter = contact.firstName.substring(0, 1); 
    const firstLetterLastName = contact.lastName.substring(0, 1); 
    document.getElementById("selectedContact").innerHTML = /*html*/  `
    <div>
        <div class="contactDetailsName">
            <div class="contactDetailsIcon" id="contactDetailsIcon${index}">${firstLetter}${firstLetterLastName}</div>
            <div>
                <h3>${contact.firstName} ${contact.lastName}</h3>
                <a>
                    <img class="contactDetailsNamePlusIcon" src="../img/plus-icon-blue.png" alt="PlusIcon">  
                    <span class="contactDetailsNamePlusText">Add Task</span>
                </a>
            </div>
        </div>
        <div class="contactDetailsConatctInfos">
            <h3>Contact Information</h3>
            <img src="../img/edit-contact-icon.png" alt="">
        </div>
        <div  class="contactDetailsConatctMailTel">
            <h3>E-Mail</h3>
            <a class="contactEmail" href= "mailto:${contact.email}">${contact.email}</a>
        </div>
        <div  class="contactDetailsConatctMailTel">
            <h3>Phone</h3>
            <a class="contactEmail" href= "tel:${contact.tel}">${contact.tel}</a>
        </div>
    </div>
    `;
    document.getElementById("contactDetailsIcon"+index).style.backgroundColor = contact.bgIconColor; 
    console.log("Open" + index); 
}