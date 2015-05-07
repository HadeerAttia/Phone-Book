var PHONE_NUMBER_ELEMENT_INDEX = 2;

var phones = new Array();
phones[0] = "Hadeer Attia ";
phones[1] = "Mony Nabil ";
phones[2] = "Lamis Attia ";
phones[3] = "Heba Nabil";
var phonesNo = new Array();
phonesNo[0] = "01025268586";
phonesNo[1] = "01229116205";
phonesNo[2] = "01153689745";
phonesNo[3] = "01229559206";

var liLinkArray = new Array();
var ulInput = null;
var deletedFromList = new Array();
var a = 0;
var mylis = null;

var useLi = new Array();
var inputBox = null;

// onPageLoad
function onPageLoad() {
    inputBox = document.getElementById("inputBox");
    ulInput = document.getElementById("list1");
    mylis = document.getElementsByClassName("numberInContact");

    var clearHistory = document.getElementById("clear");
    //Function Clear The Hisstory     
    clearHistory.onclick = function () {
        while (hisInput.firstChild) {
            hisInput.removeChild(hisInput.firstChild);
        }
    };

    loadContacts();
}
// adding Constant contacts 
function loadContacts() {
    for (var i = 0; i < phones.length; i++)
    {
        addContact(ulInput, phones[i], phonesNo[i], i);
    }
}
// function of building the contactssss
function addContact(list, name, number, index) {
    var liPut = document.createElement("li");
    var liLink = document.createElement("a");
    liLink.innerHTML = "    " + name + "        ";
    liLink.href = "#";
    liLinkArray[index] = liLink;
    liPut.appendChild(liLink);

    var deleteBtn = document.createElement("a");
    deleteBtn.href = "#";
    deleteBtn.className = "contact";
    deleteBtn.innerHTML = " x ";
    liPut.appendChild(deleteBtn);

    var phoneNumSpan = document.createElement("span");
    phoneNumSpan.innerHTML = number + "<br/><hr/>";
    liPut.className = "numberInContact";
    liPut.appendChild(phoneNumSpan);
    list.appendChild(liPut);
    //this make the new one call
    liLinkArray[index].onclick = callContact;

    deleteBtn.onclick = function () {
        this.parentElement.remove(this);
        phones.splice(index, 1);
        phonesNo.splice(index, 1);
    };
    useLi[index] = liPut;
}

//Function caling ...... and add to history
function callContact() {
    var nowTime = new Date();
    var hour;
    var min;
    var date;
    var month;

    hour = nowTime.getHours();
    min = nowTime.getMinutes();
    date = nowTime.getDate();
    month = nowTime.getMonth();
    //PopUp Cslling
    var popup = document.getElementById("PopupAddContact");
    popup.style.display = "block";
    var callWho = document.getElementById("call");
    callWho.innerHTML = "Calling" + this.innerHTML;
    var endTheCall = document.getElementById("endCall");
    //alert("calling"+this.innerHTML);
    console.log("calling");
    hisInput = document.getElementById("historyList");
    hisInputList = document.createElement("li");
    hisInputList.className = "theHistory";
    months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    hisInputList.innerHTML = this.innerHTML + "<br/>" + hour + ":" + min + "    " + nowTime.getDate() + "-" + months[nowTime.getMonth()] + "-" + nowTime.getFullYear();

    var deleteBtn = document.createElement("a");
    deleteBtn.href = "#";
    deleteBtn.className = "contact";
    deleteBtn.innerHTML = "x";
    deleteBtn.onclick = function () {
        this.style.display = "none";
        this.parentElement.remove(this);
    };
    var hr1 = document.createElement("hr");
    hisInputList.appendChild(deleteBtn);
    hisInputList.appendChild(hr1);
    hisInput.appendChild(hisInputList);
    hisInputList.id = "historyUl";
}

//Function For adding Clicked number to the input 
function pressDigit(inputDigit) {
    inputBox.innerHTML += inputDigit;
    searchInContacts();
}
;

//PopUp End Call Button
function endCallButton() {
    var popup = document.getElementById("PopupAddContact");
    popup.style.display = "none";
}
// function the updte button
function updateFunction() {
    var writeit = inputBox;
    var gogo = writeit.innerHTML;
    if (gogo.length < 7)
    {
        var showPopup = document.getElementById("PopupAdd2");
        showPopup.style.display = "block";
    }
    else {
        var popup = document.getElementById("PopupUpdate");
        popup.style.display = "block";

        var update = document.getElementById("update");
        update.innerHTML = "";
        for (var i = 0; i < phones.length; i++)
        {
            var updateList = document.createElement("option");
            updateList.innerHTML = phones[i];
            updateList.className = "optionUpdate";
            update.appendChild(updateList);
        }
    }
}
//Function update cancel button
function updateCancelButton() {
    var popup = document.getElementById("PopupUpdate");
    popup.style.display = "none";
}
//the update inside the popup
function updateButton() {
    var selected = document.getElementById("update").selectedIndex;
    phonesNo[selected] = inputBox.innerHTML;
    mylis[selected].children[PHONE_NUMBER_ELEMENT_INDEX].innerHTML = phonesNo[selected] + "<br/><hr/>";
    //To Show the List Again
    unhideContacts();
    hidePopup();
    inputBox.innerHTML = "";
}

//filter The contact automaticly  
function searchInContacts() {
    var userInput = inputBox.innerHTML;
    mylis = document.getElementsByClassName("numberInContact");
    for (var x = 0; x < mylis.length; x++)
    {
        var check = mylis[x].children[2].innerHTML.indexOf(userInput);
        if (check === -1)
        {
            mylis[x].style.display = "none";
        }
        else {
            mylis[x].style.display = "block";
        }
    }
}
// function of adding New contact 
function addNewContact() {
    var inputFromBox = inputBox.innerHTML;
    if (inputFromBox.length < 7)
    {
        var showPopup = document.getElementById("PopupAdd2");
        showPopup.style.display = "block";
        // alert("more than 6 plz");
    } else {
        document.getElementById("Add22").value = "";
        var showPopup = document.getElementById("PopupAdd");
        showPopup.style.display = "block";
    }
}
// unhide the contact after each process
function unhideContacts() {
    for (var x = 0; x < mylis.length; x++)
    {
        mylis[x].style.display = "block";
    }
}
/**
 * Remove Last num
 * @returns {undefined}
 */
function deleteOneDigit() {
    var text = inputBox.innerHTML;
    inputBox.innerHTML = text.slice(0, text.length - 1);
    searchInContacts();
}

function hidePopup() {
    var popup = document.getElementById("PopupUpdate");
    popup.style.display = "none";
}
//popup less than 6 digit 
function AddCancelButton2() {
    var popup = document.getElementById("PopupAdd2");
    popup.style.display = "none";
}
//popup addcontact cancel button
function AddCancelButton() {
    var popup = document.getElementById("PopupAdd");
    popup.style.display = "none";
}
//popup addcontact add button
function AddButton() {
    var inputFromBox = inputBox.innerHTML;
    phonesNo.push(inputFromBox);
    newContact = document.getElementById("Add22").value;
    phones.push(newContact);
    unhideContacts();
    addContact(ulInput, phones[phones.length - 1], phonesNo[phones.length - 1], phones.length - 1);
    var popup = document.getElementById("PopupAdd");
    popup.style.display = "none";
    inputBox.innerHTML = "";
}
