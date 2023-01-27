//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {

    /***********************************************************************************/
    /*                          GLOBAL VARIABLES                                       */
    /***********************************************************************************/

    let regForm = document.getElementById("registrationForm"); 
    let name = document.getElementById("name"); 
    let nameError = document.getElementById("nameError"); 
    let email = document.getElementById("email"); 
    let emailError = document.getElementById("emailError"); 
    let username = document.getElementById("username"); 
    let usernameError = document.getElementById("usernameError"); 
    let pass1 = document.getElementById("pass1"); 
    let pass2 = document.getElementById("pass2");
    let passError = document.getElementById("passError"); 


    /***********************************************************************************/
    /*                               DO ON FORM SUBMIT                                 */
    /***********************************************************************************/
    regForm.addEventListener("submit", (ev) => {

        //Prevent default form behaviour
        ev.preventDefault(); 

        //Set valid to true
        let valid = true; 

        //-------VALIDATE NAME INPUT--------

        //Regular expression to verify full name
        //Code referenced from: https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/
        const nameIsValid = /^[a-zA-Z]+ [a-zA-Z]+$/;

        //Check if a name is entered
        if(name.value.length == 0){
            valid = false; 
            nameError.innerHTML = "<p>Please Enter Your Full Name</p>"; 
        }
        //Check if name entered is a full name
        else if(!nameIsValid.test(name.value)){
            valid = false; 
            nameError.innerHTML = "<p>Please Enter Your Full Name</p>"; 
        }
        //Remove error message if name is entered and is valid
        else if (name.value.length != 0 && nameIsValid.test(name.value)){
            nameError.innerHTML = ""; 
            valid = true; 
        }

        //-------VALIDATE EMAIL INPUT--------

        //Regular expression to verify email
        //Code referenced from Lab 9
        const emailIsValid = (string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);

        //Check if email is entered
        if(email.value.length == 0){
            valid = false; 
            emailError.innerHTML = "<p>Please Enter A Valid Email</p>"; 
        }
        //Check if email entered is valid
        else if (!emailIsValid(email.value)) {
            valid = false; 
            emailError.innerHTML = "<p>Please Enter A Valid Email</p>"; 
        }
        //Remove error message if email is entered and is valid
        else if (email.value.length != 0 && emailIsValid(email.value)){
            emailError.innerHTML = ""; 
            valid = true; 
        }

        //-------VALIDATE USERNAME INPUT--------

        //get return value of checkUsernameExists function
        let usernameExists = checkUsernameExists();

        //Check if username is entered
        if(username.value.length == 0){
            valid = false; 
            usernameError.innerHTML = "<p>Please Choose A Username</p>"; 
        }
        //Check if username already exists
        else if(usernameExists == true){
            valid = false; 
            usernameError.innerHTML = "<p>This Username is Already Taken.</p>"; 
        }
        //Remove error message if username is entered and is valid
        else if(username.value.length != 0 && usernameExists == false){
            usernameError.innerHTML = ""; 
            valid = true; 
        }

        //-------VALIDATE PASSWORDS INPUT--------

        //Regular expression to verify password
        //Code referenced from: https://www.w3resource.com/javascript/form/password-validation.php
        const passIsValid=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

        //Check if password is entered
        if(pass1.value.length == 0 || pass2.value.length == 0){
            valid = false; 
            passError.innerHTML = "<p>Please Enter A New Password</p>"; 
        }
        //Check if password is valid
        else if(!pass1.value.match(passIsValid)){
            valid = false; 
            passError.innerHTML = "<p>Please Follow Our Password Guidelines</p>"; 
        }
        //Check if both passwords match
        else if(pass1.value != pass2.value){
            valid = false; 
            passError.innerHTML = "<p>Your Passwords Do Not Match</p>"; 
        }
        //Remove error message if passwords are entered, are valid and they match
        else{
            passError.innerHTML = "";
            valid = true; 
        }

        //-------IF ALL FORM ENTRIES ARE VALID--------
        if (valid == true){

            //Give user an unique ID
            let ranNum = Math.random(); 
            let userId = `user + ${ranNum}`
            
            //Post form data 
            postFormData(userId); 
        }
    });
    
    
    /***********************************************************************************/
    /*                                  FUNCTIONS                                      */
    /***********************************************************************************/

    // CHECK IF USERNAME EXISTS
    function checkUsernameExists(){

        let doesUsernameExist = false; 

        //Create new xmlhttp request
        const xhr = new XMLHttpRequest();
        //Open request
        xhr.open("GET", `../api/get1_registerCheckUsername.php?username=${username.value}`);

        //When request loads
        xhr.addEventListener("load", (ev) => {
            //If request is succesful 
            if (xhr.status == 200) {
                //Get response
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
            //Else if request is unsuccesful
            else{
                console.log("Unable to load");
            }
        }); 

        //Send xhr
        xhr.send(); 

        //Return value
        return doesUsernameExist; 
    }

    // POST FORM DATA AND REGISTER 
    function postFormData(){
        //Create form data object
        let formdata = new FormData();

        formdata.append("name", name.value);
        formdata.append("email", email.value); 
        formdata.append("username", username.value); 
        formdata.append("password", pass1.value); 

        console.log(formdata); 

        //Create new xhr
        const xhr = new XMLHttpRequest();
        //Open xhr
        xhr.open("POST", "../api/post1_register.php"); 

        //When request loads
        xhr.addEventListener("load", (ev) => {
                    //If request is succesful 
                    if (xhr.status == 200) {
                        let url = window.open("../cravings_pages/login.php.php", '_self'); 
                    }
                    //Else if request is unsuccesful
                    else{
                        console.log("Unable to load");
                    }
        }); 
        //Send form data to xhr
        xhr.send(formdata);
        
    }

}); 

