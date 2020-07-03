const form = document.querySelector("form");
const name = document.getElementById("name");
name.focus();
const email = document.getElementById("mail");

const select = document.getElementById("title");
const otherJobRole = document.getElementById("other-title");
otherJobRole.style.display = 'none';

const design = document.getElementById("design");
design.options[0].hidden = true;

const tShirtColor = document.getElementById("color");
const colorLabel = document.getElementById("colors-js-puns").firstElementChild;
const designValue = design.value;
if(designValue === "Select Theme") {
   tShirtColor.style.display = "none";
   colorLabel.style.display = "none";
}
const defaulltOption = document.createElement("option");
defaulltOption.text = "Please select a T-shirt theme";
tShirtColor.options.add(defaulltOption, 0);
tShirtColor.options[0].hidden = true;
tShirtColor.options[0].selected = true;
  for (let i = 0; i < tShirtColor.options.length; i += 1) {
     tShirtColor.options[i].hidden = true;
  }


const activities = document.querySelectorAll(".activities input");
const input = document.querySelector(".activities");
const activityLast = input.lastElementChild;
const priceField = document.createElement("h3");
input.appendChild(priceField);

const activityLegend = document.querySelector(".activities").firstElementChild;

const payment = document.getElementById("payment");
payment.options[0].hidden = true;
payment.options[1].selected = true;
const card = document.getElementById("credit-card");
const ccNumDiv = document.querySelector(".col-6");
const ccNumSpan = document.createElement("span");
ccNumSpan.textContent = "Enter only numbers from 13 to 16 digits";
ccNumDiv.appendChild(ccNumSpan);
const cardNumber = document.getElementById("cc-num");
const cardZip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
paypal.style.display = 'none';
bitcoin.style.display = 'none';




select.addEventListener('change', e => {
   const option = select.options[select.selectedIndex].value;
   if(option === 'other') {
      otherJobRole.style.display = '';
   } else {
      otherJobRole.style.display = 'none';
   }
});

//dynamically changing the drop down value
design.addEventListener('change', (e) => {
   design.options[0].hidden = true;
   const colorOptions = tShirtColor.options;
   if (design.value !== "Select Theme") {
      tShirtColor.style.display = "";
      colorLabel.style.display = "";
      if(design.value === "js puns") {
         for (let i = 0; i < colorOptions.length; i += 1) {
            const val = colorOptions[i].value;
            if (val === 'cornflowerblue' || val === 'darkslategrey' || val === 'gold') {
               colorOptions[i].hidden = false;
               if (val === 'cornflowerblue') {
                  colorOptions[i].selected = true;
               }   
            } else {
               colorOptions[i].hidden = true;
            }
         }
      } else if (design.value === "heart js") {
         for (let i = 0; i < colorOptions.length; i += 1) {
            const val = colorOptions[i].value;
            if (val === 'tomato' || val === 'steelblue' || val === 'dimgrey') {
               colorOptions[i].hidden = false;
               if (val === 'tomato'){
                  colorOptions[i].selected = true;
               }
            } else {
               colorOptions[i].hidden = true;
            }
         }   
      }
   }  
   

});

//Event Checkbox checking 
input.addEventListener('change', (e) => {
   const isChecked = e.target;
   const isCheckedTime = isChecked.getAttribute("data-day-and-time");
   //const price = isChecked.getAttribute("data-cost");
   let priceTotal = 0;
   for (let i = 0; i < activities.length; i += 1) {
      const iterator = activities[i].getAttribute("data-day-and-time");
      if (isCheckedTime === iterator && isChecked !== activities[i]) {
         if (isChecked.checked) {
            activities[i].disabled = true;
         } else {
            activities[i].disabled = false;
         }      
      }
      if(activities[i].checked){
         priceTotal += parseInt(activities[i].getAttribute("data-cost"));
      }
   }
      priceField.textContent = `Total:$${priceTotal}`;
});
 

//Payment section dispay event
payment.addEventListener('change',(e) => {
   if (payment.value === 'credit card'){
      paypal.style.display = 'none';
      bitcoin.style.display = 'none';
      card.style.display = '';
   } else if (payment.value === 'paypal') {
      card.style.display = 'none';
      bitcoin.style.display = 'none';
      paypal.style.display = '';
   } else if(payment.value === 'bitcoin'){
      card.style.display = 'none';
      paypal.style.display = 'none';
      bitcoin.style.display = '';
   }
});


 function errorElement (node,errorMessage) {
    //console.log(node.nextElementSibling)
   if (node.nextElementSibling === null || node.nextElementSibling.className != "errorClass") {
      const strong = document.createElement("strong");
      strong.textContent = errorMessage;
      strong.className = "errorClass"
      strong.style.color = "red"
      node.parentNode.insertBefore(strong,node.nextSibling);
   }
 }

 function errorReset(node) {
   if (node.nextElementSibling !== null && node.nextElementSibling.className == "errorClass") {
      console.log(node.nextElementSibling)
      node.nextElementSibling.style.display = "none";
      // let errorMessageElement = node.nextElementSibling
      // errorMessageElement.style.display = "none";      
      //node.nextElementSibling.innerHTML = '';  
   }
 }


//Validation for name Input
const nameValidator = () => {
   const nameInput = name.value;
   if(nameInput.length > 0) {
      name.style.border = "";
      errorReset(name);
      return true;
   } else {
      name.style.border = "thick solid red";
      errorElement(name,"Name field is empty please enter the name field")
      return false;
   }

}

//email validator
const emailValidator = () => {

   const emailInput = email.value;
   const positionOfAt = emailInput.indexOf("@");
   const positionOfDot = emailInput.lastIndexOf(".");
   if (positionOfAt > 1 && positionOfDot > (positionOfAt+1)) {
     email.style.border = "";
     errorReset(email);
     return true
   } else {
     email.style.border = "thick solid red";
     errorElement(email,"Please enter a correct valid email")
     return false;
   } 
 }

 //activity validator
const activityValidator = () => {
   let activityBorder = "";
   for (let i = 0; i < activities.length; i+=1) {
      if(activities[i].checked) {
         activityLegend.style.border = "";
          errorReset(activityLegend);
         activityBorder += "white"
         return true;
      }
   }
   if(!activityBorder) {
      activityLegend.style.border = "thick solid red";
      errorElement(activityLegend,"Atleast select one activity from the below list");
      return false;
   }
}

//credit card validator
const cardValidator = () => {
   const cardNo = cardNumber.value;
   if (/^\d{13,16}$/.test(cardNo)) {
      cardNumber.style.border = "";
      errorReset(cardNumber);
      return true;
   } else {
      cardNumber.style.border = "thick solid red";
      errorElement(cardNumber,"Please enter your 13 to 16 digit card number");
      return false;
   }
}

//zip code validator
const zipValidator = () => {
   const zipNo = cardZip.value;
   if (/^\d{5}$/.test(zipNo)) {
      cardZip.style.border = "";
      errorReset(cardZip);
      return true;
   } else {
      cardZip.style.border = "thick solid red";
      errorElement(cardZip,"Please enter your 5 digit zip number");
      return false;
   }
}

//cvv no validator
const cvvValidator = () => {
   const cvvNo = cvv.value;
   if (/^\d{3}$/.test(cvvNo)) {
      cvv.style.border = "";
      errorReset(cvv);
      return true;
   } else {
      cvv.style.border = "thick solid red";
     errorElement(cvv,"Please enter your 3 digit cvv number");
      return false;
   }
}

function isValidCardNo(cardNO) {
   return /^\d{13,16}$/.test(cardNO);
}

function showOrHideTip(show, element) {
   // show element when show is true, hide when false
   if (show) {
     element.style.display = "inherit";
   } else {
     element.style.display = "none";
   }
 }

function createListener(validator) {
   return e => {
     const text = e.target.value;
     const valid = validator(text);
     const showTip = text !== "" && !valid;
     const tooltip = e.target.nextElementSibling;
     showOrHideTip(showTip, tooltip);
   };
 }

 cardNumber.addEventListener("input", createListener(isValidCardNo));


/* Submit listener on the form element */
form.addEventListener('submit', (e) => {
   
   if (!nameValidator()) {
      e.preventDefault();
    } 

   //email validation
   if (!emailValidator()) {
      e.preventDefault();
    }
   if (!activityValidator()) {
      e.preventDefault();
   }
   if (payment.value === 'credit card') {
      if (!cardValidator()) {
         e.preventDefault();
      }
      if(!zipValidator()) {
         e.preventDefault();
      }
      if(!cvvValidator()) {
         e.preventDefault();
      }

   }

   });