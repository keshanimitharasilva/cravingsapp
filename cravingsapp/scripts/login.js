//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {

    /***********************************************************************************/
    /*                          GLOBAL VARIABLES                                       */
    /***********************************************************************************/

    let form = document.getElementById("loginForm"); 
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");

    /***********************************************************************************/
    /*                               DO ON FORM SUBMIT                                 */
    /***********************************************************************************/
    form.addEventListener("submit", (ev) => {

        //Prevent default form behaviour
        ev.preventDefault(); 

        //Set valid to true
        let valid = true; 
  
        //-------VALIDATE USERNAME INPUT--------

        //Check if username is entered
        if(username.value.length == 0){
            valid = false; 
            usernameError.innerHTML = "<p>Please Enter Your Username</p>"; 
        }
        //Remove error message if username is entered
        else {
            usernameError.innerHTML = ""; 
            valid = true; 
        }

        //-------VALIDATE PASSWORD INPUT--------

        //Check if password is entered
        if(password.value.length == 0){
            valid = false; 
            passwordError.innerHTML = "<p>Please Enter Your Password</p>"; 
        }
        //Remove error message if username is entered
        else {
            passwordError.innerHTML = ""; 
            valid = true; 
        }
        

        //-------IF ALL FORM ENTRIES ARE VALID--------
        if (valid == true){
            
            let output = ""; 

            //Create new xmlhttp request
            const xhr = new XMLHttpRequest();

            //Open request
            xhr.open("GET", `../api/get9_login.php?username=${username.value.trim()}&password=${password.value.trim()}`);

            //When request loads
            xhr.addEventListener("load", (ev) => {

                //If request is succesful 
                if (xhr.status == 200) {
                    console.log(xhr);
                    //Get response
                    let apidata = xhr.responseText; 
                    console.log(apidata);

                    if(apidata == "password valid"){
                        let url = window.open("../user_pages/user_homepage.php", '_self'); 
                        console.log("Log in successful");
                    }

                    else if (apidata == "password invalid"){
                        passwordError.innerHTML = "<p>Incorrect password</p>"; 
                    }

                    else if (apidata == "user does not exist"){
                        usernameError.innerHTML = "<p>Incorrect username</p>"; 
                    }
                    else{
                        console.log("Error");
                    }
                }
                //Else if request is unsuccesful
                else{
                    console.log("Unable to load");
                }
            }); 
            //Send xhr
            xhr.send(); 
        }
    });
    
}); 