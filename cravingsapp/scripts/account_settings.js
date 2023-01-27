//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {

    /***********************************************************************************/
    /*                          GLOBAL VARIABLES                                       */
    /***********************************************************************************/
    let settingsTableDiv = document.getElementsByClassName("settingsTableDiv")[0];

    //Edit name 
    let editNameBtn = document.getElementById("editName");
    let editNameDiv = document.getElementById("editNameDiv");
    let editNameForm = document.getElementById("editNameForm"); 
    let newName = document.getElementById("newName"); 
    let newNameError = document.getElementById("newNameError");

    //Edit username 
    let editUsernameBtn = document.getElementById("editUsername");
    let editUsernameDiv = document.getElementById("editUsernameDiv"); 
    let editUsernameForm = document.getElementById("editUsernameForm");
    let newUsername = document.getElementById("newUsername");  
    let newUsernameError = document.getElementById("newUsernameError");

    //Edit email 
    let editEmailBtn = document.getElementById("editEmail");
    let editEmailDiv = document.getElementById("editEmailDiv");
    let editEmailForm = document.getElementById("editEmailForm");
    let newEmail = document.getElementById("newEmail");  
    let reEnterPass1 = document.getElementById("reEnterPass1");
    let newEmailError = document.getElementById("newEmailError"); 

    //Edit password
    let editPassBtn = document.getElementById("editPassword");
    let editPassDiv = document.getElementById("editPasswordDiv"); 
    let editPassForm = document.getElementById("editPasswordForm");  
    let newPass = document.getElementById("newPass"); 
    let confirmNewPass = document.getElementById("confirmNewPass");
    let reEnterPass2 = document.getElementById("reEnterPass2");  
    let newPassError = document.getElementById("newPassError");

    //Edit post sharing
    let editShareBtn = document.getElementById("editShare");
    let editShareDiv = document.getElementById("editShareDiv");
    let editShareForm = document.getElementById("editShareForm"); 
    let yesShare = document.getElementById("shareRadio"); 
    let noShare = document.getElementById("noShareRadio"); 
    let shareError = document.getElementById("shareError"); 

    //Edit post editing
    let editEditBtn = document.getElementById("editEdit");
    let editEditDiv = document.getElementById("editEditDiv");
    let editEditForm = document.getElementById("editEditForm"); 
    let yesEdit = document.getElementById("editRadio"); 
    let noEdit = document.getElementById("noEditRadio"); 
    let editError = document.getElementById("editError"); 

    /***********************************************************************************/
    /*                                 EDIT NAME                                       */
    /***********************************************************************************/

    //CLICK BUTTON TO SHOW EDIT NAME FORM
    editNameBtn.addEventListener("click", (ev) =>{
        //Prevent button default
        ev.preventDefault();
        //Show form, hide settings table
        settingsTableDiv.classList.add("hidden"); 
        editNameDiv.classList.remove("hidden"); 
    })

    //SUBMIT EDIT NAME FORM
   editNameForm.addEventListener("submit", (ev) => {

        //Regular expression to verify full name
        //Code referenced from: https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/
        const nameIsValid = /^[a-zA-Z]+ [a-zA-Z]+$/;

        //Check if a name is entered
        if(newName.value.length == 0){
            newNameError.innerHTML = "<p>Please Enter Your Full Name</p>"; 
            ev.preventDefault();
        }
        //Check if name entered is a full name
        else if(!nameIsValid.test(newName.value)){
            newNameError.innerHTML = "<p>Please Enter Your First And Last Name</p>"; 
            ev.preventDefault();
        }
        //If name is entered and is valid
        else {
            //Remove error messages
            newNameError.innerHTML = "";
            //Make form disappear and account details reappear
            settingsTableDiv.classList.remove("hidden"); 
            editNameDiv.classList.add("hidden");
        }
    });

    //RESET FORM
    editNameForm.addEventListener("reset", (ev) => {
        //Show settings table, hide form
        settingsTableDiv.classList.remove("hidden"); 
        editNameDiv.classList.add("hidden");
    }); 


    /***********************************************************************************/
    /*                                 EDIT USERNAME                                   */
    /***********************************************************************************/

    //CLICK BUTTON TO SHOW EDIT USERNAME FORM
    editUsernameBtn.addEventListener("click", (ev) =>{
        //Prevent button default
        ev.preventDefault();
        //Show form, hide settings table
        settingsTableDiv.classList.add("hidden"); 
        editUsernameDiv.classList.remove("hidden"); 
    })

    //SUBMIT EDIT USERNAME FORM
    editUsernameForm.addEventListener("submit", (ev) => {

        //get return value of checkUsernameExists function
        let usernameExists = checkUsernameExists();

        //Check if username is entered
        if(newUsername.value.length == 0){
            ev.preventDefault();
            newUsernameError.innerHTML = "<p>Please Choose A Username</p>"; 
        }
        //Check if username already exists
        else if(usernameExists == true){ 
            ev.preventDefault();
            newUsernameError.innerHTML = "<p>This Username is Already Taken.</p>"; 

        }
        //If username is entered and is valid
        else {
            //Make form disappear and account details reappear
            settingsTableDiv.classList.remove("hidden"); 
            editUsernameDiv.classList.add("hidden");
            //Remove error messages
            newUsernameError.innerHTML = "";
        }
    });

    //RESET FORM
    editUsernameForm.addEventListener("reset", (ev) => {
        //Hide form, show settings table
        settingsTableDiv.classList.remove("hidden"); 
        editUsernameDiv.classList.add("hidden"); 
    }); 

    //FUNCTION: CHECK IF THE NEW USERNAME IS ALREADY TAKEN
    function checkUsernameExists(){
        
        let doesUsernameExist = false; 
        //Create new xmlhttp request
        const xhr = new XMLHttpRequest();
        //Open request
        xhr.open("GET", `../api/get1_registerCheckUsername.php/${newUsername}`);
    
        //When request loads
        xhr.addEventListener("load", (ev) => {
            //If request is succesful, get response
            if (xhr.status == 200) {
                const apidata = xhr.response; 
                console.log(apidata);
                //If response is true or returns an error, set return value to true
                if(apidata == "true"){
                    doesUsernameExist = true; 
                }
                //Else if response is false, set return value to false
                else{
                    doesUsernameExist = false; 
                }
            }
            //Else if request is unsuccesful, log the error. 
            else{
                console.log("Unable to load");
            }
        }); 
        //Send xhr
        xhr.send(); 
        //Return value
        return doesUsernameExist; 
    }

    /***********************************************************************************/
    /*                                 EDIT EMAIL                                   */
    /***********************************************************************************/  

    //CLICK BUTTON TO SHOW EDIT EMAIL FORM
    editEmailBtn.addEventListener("click", (ev) =>{
        //Prevent button default
        ev.preventDefault();
        //Show form, hide settings table
        settingsTableDiv.classList.add("hidden");
        editEmailDiv.classList.remove("hidden");
    })

    //SUBMIT EDIT EMAIL FORM
    editEmailForm.addEventListener("submit", (ev) => {
        
        //Regular expression to verify email
        //Code referenced from Lab 9
        const emailIsValid = (string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);

        //Check if email is entered
        if(newEmail.value.length == 0){ 
            ev.preventDefault();
            newEmailError.innerHTML = "<p>Please Enter A Valid Email</p>"; 
        }
        //Check if email entered is valid
        else if (!emailIsValid(newEmail.value)) {
            ev.preventDefault();
            newEmailError.innerHTML = "<p>Please Enter A Valid Email</p>"; 
        }
        //If email is entered and is valid
        else {
            //Make form disappear and account details reappear
            settingsTableDiv.classList.remove("hidden"); 
            editEmailDiv.classList.add("hidden");
            //Remove error messages
            newEmailError.innerHTML = "";
        }
    });

    //RESET FORM
    editEmailForm.addEventListener("reset", (ev) => {
        //Hide form, show settings table
        settingsTableDiv.classList.remove("hidden"); 
        editEmailDiv.classList.add("hidden"); 
    }); 

    /***********************************************************************************/
    /*                                  EDIT PASSWORD                                  */
    /***********************************************************************************/ 

    //CLICK BUTTON TO SHOW EDIT PASSWORD FORM
    editPassBtn.addEventListener("click", (ev) =>{
        //Prevent button default
        ev.preventDefault();
        //Show form, hide settings table
        settingsTableDiv.classList.add("hidden");
        editPassDiv.classList.remove("hidden");      
    })

    //SUBMIT EDIT PASSWORD FORM
    editPassForm.addEventListener("submit", (ev) => {

        //Regular expression to verify password
        //Code referenced from: https://www.w3resource.com/javascript/form/password-validation.php
        const passIsValid=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

        //Check if current password is entered
        if(reEnterPass2.value.length == 0){
            ev.preventDefault();
            newPassError.innerHTML = "<p>Please Re-enter Your Current Password To Verify Your Identity</p>"; 
        }
        //Check if new password is entered
        else if(newPass.value.length == 0){
            ev.preventDefault();
            newPassError.innerHTML = "<p>Please Enter A New Password</p>"; 
        }
        //Check if new password is re-entered
        else if(confirmNewPass.value.length == 0){
            ev.preventDefault();
            newPassError.innerHTML = "<p>Please Re-confirm Your New Password</p>";
        }
        //Check if new password is valid
        else if(!newPass.value.match(passIsValid)){ 
            ev.preventDefault();
            newPassError.innerHTML = "<p>Please Follow Our Password Guidelines Below</p>"; 
        }
        //Check if both new passwords match
        else if(newPass.value != confirmNewPass.value){
            ev.preventDefault();
            newPassError.innerHTML = "<p>Your New Passwords Do Not Match</p>"; 
        }
        else if(newPass.value == reEnterPass2.value){
            ev.preventDefault();
            newPassError.innerHTML = "<p>Your New Password Cannot Be the Same as Your Old Password</p>";
        }
        //If passwords are entered, are valid and they match
        else{
            //Make settings table reappear and form disappear
            settingsTableDiv.classList.remove("hidden"); 
            editPassDiv.classList.add("hidden");
            //Remove error messages
            newPassError.innerHTML = "";
        }
    });

    //RESET FORM
    editPassForm.addEventListener("reset", (ev) => {
        //Hide form, show settings table
        settingsTableDiv.classList.remove("hidden"); 
        editPassDiv.classList.add("hidden"); 
    }); 

    /***********************************************************************************/
    /*                            CAN SHARE POSTS OR NOT                               */
    /***********************************************************************************/

    //CLICK BUTTON TO OPEN THE EDIT SHARE SETTINGS FORM
    editShareBtn.addEventListener("click", (ev) =>{
        //Prevent button default
        ev.preventDefault();
        //Show form, hide settings table
        settingsTableDiv.classList.add("hidden"); 
        editShareDiv.classList.remove("hidden"); 
    })

    //SUBMIT THE EDIT SHARE SETTINGS FORM
    editShareForm.addEventListener("submit", (ev)=>{

        //If neither radio buttons have been checked, show error message
        if(!(yesShare.checked) && !(noShare.checked)){
            ev.preventDefault();
            shareError.innerHTML = "<p>*Please select one option</p>"
        }
        //If one of the buttons have been checked, 
        else{
            //Remove error messages
            shareError.innerHTML = ""; 
            //Hide form, show settings table again
            settingsTableDiv.classList.remove("hidden"); 
            editShareDiv.classList.add("hidden"); 
        }
    });

    //RESET FORM
    editShareForm.addEventListener("reset", (ev) => {
        //Hide form, show settings table
        settingsTableDiv.classList.remove("hidden"); 
        editShareDiv.classList.add("hidden"); 
    }); 

    
    /***********************************************************************************/
    /*                          CAN EDIT POSTS OR NOT                                  */
    /***********************************************************************************/ 
    //CLICK BUTTON TO SHOW THE EDIT POST EDITING SETTINGS FORM
    editEditBtn.addEventListener("click", (ev) =>{
        //Prevent button default
        ev.preventDefault();
        //Show form, hide settings table
        settingsTableDiv.classList.add("hidden"); 
        editEditDiv.classList.remove("hidden"); 
    })

    //SUBMIT THE EDIT POST EDITING SETTINGS FORM
    editEditForm.addEventListener("submit", (ev)=>{

        //If neither radio buttons have been checked, show error message
        if(!(yesEdit.checked) && !(noEdit.checked)){
            editError.innerHTML = "<p>*Please select one option</p>"
            ev.preventDefault();
        }
        //If one radio button has been checked
        else{
            //Remove error message
            editError.innerHTML="";
            //Hide form, show settings table
            settingsTableDiv.classList.remove("hidden"); 
            editEditDiv.classList.add("hidden"); 
        }
    });

    //RESET FORM
    editEditForm.addEventListener("reset", (ev) => {
        //Hide form, show settings table
        settingsTableDiv.classList.remove("hidden"); 
        editEditDiv.classList.add("hidden"); 
    });    

}); 