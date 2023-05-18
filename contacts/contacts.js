let contacts = [];
const remoteStorageKey = `contacts`;

async function loadContactList(){

    await getContactsFromRemoteStorage();
    

    /*
    let resp = setItem(remoteStorageKey , JSON.stringify(contacts)); 
    console.log(resp); 
    */

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
            <img onclick="editContact(${index})" src="../img/edit-contact-icon.png" alt="">
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

function addNewContact(){
    document.getElementById("openContact").classList.remove("dsp-none");
    document.getElementById("openContact").classList.add("openContact"); 
    renderContactForm(); 
    


}

function renderContactForm(){

    document.getElementById("openContact").innerHTML = /*html*/ `
    <div class="contactOverlay">
        <div class="contactOverlayContentClose">
            <img onclick="closeContactOverlay()"src="../img/cross-icon.png" alt="cross">
        </div>
        <div class="contactOverlaySideBar">
            <img src="../img/join-logo.png" alt="">
            <h1 id="contactOverlaySideBarTitle">Add contact</h1>
            <h2 id="contactOverlaySideBarSubtitle">Tasks are better with a team!</h2>
            <div class="blueStyleElem"></div>
        </div>
        <div class="contactOverlayContent">
            <div class="contactOverlayContentView">
                <form id="contactOverlayForm" onsubmit="addContact();return false">
                    <div class="contactOverlayContentMain">
                        <div>
                            <img class="contactOverlayContentIcon" src="../img/profil-icon-white.png" alt="profilIcon">
                       </div>
                        <div class="contactOverlayContentInputs">
                            <input required class="backgroundName" id="contactOverlayName" placeholder="Name" type="text">
                            <input required class="backgroundMail" id="contactOverlayEmail" placeholder="Email" type="email">
                            <input required class="backgroundTel" id="contactOverlayPhone" placeholder="Phone" type="tel">
                        </div>
                    </div>
                    <div class="contactOverlayButtons">
                        <button id="contactOverlayCancleButton" onclick="closeContactOverlay()" type="button" class="buttonWhite">
                            <h3 id="contactOverlayCancleButtonText">Cancel</h3>
                            <img src="../img/cross-icon.png" alt=""> 
                        </button>
                        <button id="contactOverlaySubmitButton" class="buttonBlue" type="submit">
                            <h3 id="contactOverlaySubmitButtonText">Create contact</h3>
                            <img src="../img/checkmark-only-icon.png" alt=""> 
                        </button>
                    </div>
                </form>

            </div>


            
        </div>
    </div>
    
    `;

}

function addContact(){
    console.log("Add Contact"); 
    let name = document.getElementById("contactOverlayName").value ; 
    let email = document.getElementById("contactOverlayEmail").value ; 
    let phone = document.getElementById("contactOverlayPhone").value ; 
    let fullName = name.split(' '); 
    let firstName = fullName[0];
    let lastName = fullName[1];
    let bgColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    contacts.push({
        "firstName": `${firstName}`,
        "lastName": `${lastName}`,
        "email": `${email}`,
        "tel": `${phone}`,
        "bgIconColor": `${bgColor}`
    })
    setContactsToRemoteStorage(); 
    closeContactOverlay(); 
    renderContactList(); 
}

function setContactsToRemoteStorage(){
    let resp = setItem(remoteStorageKey , JSON.stringify(contacts)); 
    console.log(resp); 
}

function closeContactOverlay(){
    console.log("Close"); 
    document.getElementById("openContact").classList.add("dsp-none");
    document.getElementById("openContact").classList.remove("openContact"); 
}

function editContact(index){
    console.log("edit");
    console.log(contacts[index].firstName);
    document.getElementById("openContact").classList.remove("dsp-none");
    document.getElementById("openContact").classList.add("openContact"); 
    renderContactForm(); 
    document.getElementById("contactOverlaySideBarTitle").innerHTML = "Edit contact"; 
    document.getElementById("contactOverlaySideBarSubtitle").innerHTML = ""; 
    document.getElementById("contactOverlayName").value = contacts[index].firstName + " " + contacts[index].lastName; 
    document.getElementById("contactOverlayEmail").value = contacts[index].email; 
    document.getElementById("contactOverlayPhone").value = contacts[index].tel; 
    document.getElementById("contactOverlaySubmitButtonText").innerHTML = "Save"; 
    document.getElementById("contactOverlayForm").onsubmit = function() {saveEditedContact(index)};
    document.getElementById("contactOverlayCancleButton").onclick = function() {deleteEditedContact(index)};
    document.getElementById("contactOverlayCancleButtonText").innerHTML = "Delete"; 
    
}

function saveEditedContact(index){
    console.log("SAVE edit");
    let name = document.getElementById("contactOverlayName").value ; 
    let fullName = name.split(' '); 
    let firstName = fullName[0];
    let lastName = fullName[1];
    contacts[index].firstName = firstName; 
    contacts[index].lastName = lastName; 
    contacts[index].email = document.getElementById("contactOverlayEmail").value ; 
    contacts[index].tel = document.getElementById("contactOverlayPhone").value ; 
    setContactsToRemoteStorage(); 
    closeContactOverlay(); 
    renderContactList(); 
} 

function deleteEditedContact(index){
    console.log("DELETE edit");
    contacts.splice(index, 1); 
    setContactsToRemoteStorage(); 
    closeContactOverlay(); 
    renderContactList(); 
}