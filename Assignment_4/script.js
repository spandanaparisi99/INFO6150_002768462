const form = document.querySelector("form");

const titles = document.querySelectorAll('input[name="title"]');
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailId = document.getElementById("emailId");
const phoneNumber = document.getElementById("phoneNumber");
const streetAddress1 = document.getElementById("streetAddress1");
const streetAddress2 = document.getElementById("streetAddress2");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zipcode = document.getElementById("zipcode");
const source = document.querySelectorAll("#source");
const comments = document.getElementById("comments");
const suggestionSelect = document.getElementById("suggestion");
const dynamicCheckbox = document.getElementById("dynamicCheckbox");
const textReason = document.getElementById("textReason");
const suggestionComment = document.getElementById("suggestionComment");

const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

let table = document.getElementById("tableData");

let validatationBool = false;
let validationErrors = {};

form.addEventListener("reset", e=> {
  dynamicCheckbox.innerHTML = "";
  textReason.style.display = "none";
  form.reset();
})

form.addEventListener("submit", e => {
  e.preventDefault();

  let title;

  for (let i=0; i<titles.length; i++) {
    if (titles[i].checked) {
      validatationBool = true;
      title = titles[i].value;
    }
  }

  if (
    validatationBool &&
    firstName.value != "" &&
    lastName.value != "" &&
    emailId.value != "" && validateEmail(emailId.value) &&
    phoneNumber.value != "" && validatePhoneNo(phoneNumber.value) &&
    streetAddress1.value != "" &&
    city.value != "" &&
    state.value != "" &&
    zipcode.value != "" && validateZipCode(zipcode.value) &&
    comments.value != "" &&
    suggestionSelect.value != "select" &&
    suggestionComment.value != "" &&
    Array.prototype.some.call(source, (checkbox) => checkbox.checked)
  ) {

    let myString = "";

    source.forEach(item => {
      if (item.checked) {
        myString += item.value + ", ";
      }
    })

    tableData.innerHTML += `
      <tr>
        <td>${title.charAt(0).toUpperCase() + title.slice(1)}. ${firstName.value} ${lastName.value}</td>
        <td>${emailId.value}</td>
        <td>${phoneNumber.value}</td>
        <td>${streetAddress1.value}</td>
        <td>${streetAddress2.value}</td>
        <td>${city.value}</td>
        <td>${state.value}</td>
        <td>${zipcode.value}</td>
        <td>${myString}</td>
        <td>${comments.value}</td>
        <td>${suggestionSelect.value}</td>
        <td>${suggestionComment.value}</td>
      </tr>
    `;

    alert("Details have been uploaded to the table!");
    dynamicCheckbox.innerHTML = "";
    textReason.style.display = "none";
    form.reset();
    validatationBool = false;
  } else {
    alert("Please enter details correctly!");
  }
})

phoneNumber.addEventListener("keyup", () => {
  if(validatePhoneNo(phoneNumber.value)) {
    phoneNumber.style.color = "green";
  } else {
    phoneNumber.style.color = "red";
  };
})

zipcode.addEventListener("keyup", () => {
  if(validateZipCode(zipcode.value)) {
    zipcode.style.color = "green";
  } else {
    zipcode.style.color = "red";
  };
})

emailId.addEventListener("keyup", () => {

  const domain = "northeastern.edu";

  if(validateEmail(emailId.value) && emailId.value.indexOf(domain) != -1) {
    emailId.style.color = "green";
  } else if (emailId.value.indexOf(domain) === -1) {
    emailId.style.color = "red";
  };
})

firstName.addEventListener("keyup", () => {
  if(validateFirstName(firstName.value)){
    firstName.style.color = "green";
  } else {
    firstName.style.color = "red";
  }
})

lastName.addEventListener("keyup", () => {
  if(validateFirstName(lastName.value)){
    lastName.style.color = "green";
  } else {
    lastName.style.color = "red";
  }
})

state.addEventListener("keyup", () => {
  if(validateFirstName(state.value)){
    state.style.color = "green";
  } else {
    state.style.color = "red";
  }
})

city.addEventListener("keyup", () => {
  if(validateFirstName(city.value)){
    city.style.color = "green";
  } else {
    city.style.color = "red";
  }
})

const validateFirstName = name => {
  const validateFirstRegex = /^[a-zA-Z ]{2,30}$/;

  if(name.match(validateFirstRegex)){
    return true;
  }
  else {
    return false;
  }
}

const validatePhoneNo = no => {
    const validateMobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (no.match(validateMobileRegex)) {
      return true;
    } else {
      return false;
    }
}

const validateZipCode = zipcode => {
  const validateZip = /^\d{5}(-\d{4})?$/;

  if (zipcode.match(validateZip)) {
    return true;
  } else {
    return false;
  }
}

const validateEmail = email => {
  const validateEmailId = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.match(validateEmailId)) {
    return true;
  } else {
    return false;
  }
}

suggestionSelect.onchange = (e) => {
    let dynamicHTML = '';
    let checkboxes = [];
    
    if (e.target.value === "appetizer") {
      dynamicHTML = `
        <input id="messageCheckbox1" type='checkbox' name="source" value="rollUps" /> Roll Ups
        <input id="messageCheckbox2" type='checkbox' name="source" value="stuffed" /> Stuffed Eggplant
        <input id="messageCheckbox3" type='checkbox' name="source" value="fries" /> Fries
        <br><br>
      `;
      const messageCheckbox1 = document.getElementById("messageCheckbox1");
      const messageCheckbox2 = document.getElementById("messageCheckbox2");
      const messageCheckbox3 = document.getElementById("messageCheckbox3");
      
    } else if (e.target.value === "mainCourse") {
      dynamicHTML = `
        <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="braised" /> Braised Chicken
        <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="salmon" /> Avocado Salmon
        <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="chicken" /> Butter Chicken
        <br><br>
      `;
      const messageCheckbox1 = document.getElementById("messageCheckbox1");
      const messageCheckbox2 = document.getElementById("messageCheckbox2");
      const messageCheckbox3 = document.getElementById("messageCheckbox3");
      
    } else if (e.target.value === "Soup") {
      dynamicHTML = `
        <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="tomato" /> Tomato
        <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="mushroom" /> Mushroom
        <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="corn" /> Corn
        <br><br>
      `;
      
      const messageCheckbox1 = document.getElementById("messageCheckbox1");
      const messageCheckbox2 = document.getElementById("messageCheckbox2");
      const messageCheckbox3 = document.getElementById("messageCheckbox3");
      
    } else if(e.target.value == "Dessert"){
      dynamicHTML = `
        <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="ice cream" /> Ice Cream
        <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="cheesecake" /> Cheesecake 
        <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="apple pie" /> Apple Pie 
        <br><br>
      `;
      
      const messageCheckbox1 = document.getElementById("messageCheckbox1");
      const messageCheckbox2 = document.getElementById("messageCheckbox2");
      const messageCheckbox3 = document.getElementById("messageCheckbox3");
      
    } else if(e.target.value == "drinks"){
      dynamicHTML = `
      <input id="messageCheckbox1" class="messageCheckbox1" type='checkbox' name="source" value="macha latte" /> Macha Latte
      <input id="messageCheckbox2" class="messageCheckbox2" type='checkbox' name="source" value="tea" /> Tea
      <input id="messageCheckbox3" class="messageCheckbox3" type='checkbox' name="source" value="coffee" /> Coffee
      <br><br>
    `;
  
    const messageCheckbox1 = document.getElementById("messageCheckbox1");
    const messageCheckbox2 = document.getElementById("messageCheckbox2");
    const messageCheckbox3 = document.getElementById("messageCheckbox3");
    
    }
    
    dynamicCheckbox.style.display = "block";
    textReason.style.display = "none";
    dynamicCheckbox.innerHTML = dynamicHTML;
    messageCheckbox1.style.width = "30px";
    messageCheckbox2.style.width = "30px";
    messageCheckbox3.style.width = "30px";
  
    checkboxes = [messageCheckbox1, messageCheckbox2, messageCheckbox3];
  
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      checkbox.addEventListener("click", () => {
        if (checkboxes.some(checkbox => checkbox.checked)) {
          textReason.style.display = "block";
  
          if (suggestionComment.value === "") {
            validatationBool = false;
          }
  
        } else {
          textReason.style.display = "none";
        }
  
      })
    })
  
  }

// doubtful 
resetBtn.addEventListener("click", () => {
  form.reset();
  dynamicCheckbox.innerHTML = "";
  textReason.style.display = "none";
});