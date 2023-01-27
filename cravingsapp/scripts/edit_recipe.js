//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => { 

    /***********************************************************************************/
    /*                          GLOBAL VARIABLES                                       */
    /***********************************************************************************/
    
    let createRecForm = document.getElementById("createRecipeForm"); 
    //Recipe name
    let recipeName = document.getElementById("recipeName"); 
    let recipeNameError = document.getElementById("recipeNameError"); 
    //Prep time
    let prepTime = document.getElementById("prepTime");
    let prepTimeError = document.getElementById("prepTimeError"); 
    //Directions 
    let directions = document.getElementById("directions");
    let directionsError = document.getElementById("directionsError");
    //Ingredients
    let ingButton = document.getElementById("addMoreIng"); 
    let ingDiv = document.getElementById("ingDiv"); 
    let ingInput = document.getElementsByClassName("ingredients")[0]; 
    let ingError = document.getElementById("inEr");
    //Radio
    let yesShare = document.getElementById("yesShare");
    let noShare = document.getElementById("noShare"); 
    let yesEdit = document.getElementById("yesEdit");
    let noEdit = document.getElementById("noEdit");

    //Get id of post edited from session storage
    let postId = sessionStorage.getItem("editPost");


    /***********************************************************************************/
    /*                LOAD A FORM WITH THE PRE-EXISTING FORM ENTRIES                    */
    /***********************************************************************************/
    loadForm(); 
    function loadForm(){

        //Create new xml http request
        const xhr = new XMLHttpRequest();

        //Open request
        xhr.open("GET", `../api/get3_readRecipe.php/${postId}`);

        //When request loads
        xhr.addEventListener("load", (ev) => {

            //If xhr request succeeded
            if (xhr.status == 200) {

                //Get recipe data and parse
                const getRecipe = JSON.parse(xhr.response);
                console.log(getRecipe);  

                //Set the value of each form input with xhr response results
                recipeName.value = `${getRecipe.recipeName}`; 
                prepTime.value = `${getRecipe.prepTime}`; 
                directions.value = `${getRecipe.directions}`; 
                //For each ingredient add an input field and fill its value
                getRecipe.getIng.forEach(ing =>{
                    ingDiv.insertAdjacentHTML("beforeend", `<div class='tag-container'><div><input class='ingredients' name='ingredients[]' type='text' value='${ing}'/></div></div>`); 
                }); 
            }
            //If xhr request didn't succeed, show an error message
            else {
                createRecForm.innerHTML = "<p class='error'>Something went wrong</p>"; 
                console.log("error"); 
            }
        });
        //Send xhr request 
        xhr.send();
   }
    
    
    /***********************************************************************************/
    /*            SET DEFAULT EDITING AND SHARING SETTINGS ON RADIO BUTTONS            */
    /***********************************************************************************/
    settings(); 
    function settings(){
        //Create new xml http request
        const xhr = new XMLHttpRequest();

        //Open request
        xhr.open("GET", "../api/get8_defaultShareEdit.php");

        //When request loads
        xhr.addEventListener("load", (ev) => {

            //If xhr request succeeded
            if (xhr.status == 200) {

                //Get recipe data and parse
                const getSetting = JSON.parse(xhr.response);
                console.log(getSetting);

                //Select the default post sharing setting
                if(getSetting.share == "Yes"){
                    yesShare.setAttribute("checked"); 
                    noShare.removeAttribute("checked"); 
                }
                else if(getSetting.share == "No"){
                    yesShare.removeAttribute("checked"); 
                    noShare.setAttribute("checked"); 
                }
                else{
                    yesShare.removeAttribute("checked"); 
                    noShare.removeAttribute("checked"); 
                }

                //Select the default post editing setting
                if(getSetting.edit == "Yes"){
                    yesEdit.setAttribute("checked"); 
                    noEdit.removeAttribute("checked"); 
                }
                else if(getSetting.edit == "No"){
                    yesEdit.removeAttribute("checked"); 
                    noEdit.setAttribute("checked"); 
                }
                else{
                    yesEdit.removeAttribute("checked"); 
                    noEdit.removeAttribute("checked"); 
                }

            }
            else{
                console.log("Something went wrong"); 
            }
        }); 
        //Send request
        xhr.send(); 
    }

    /***********************************************************************************/
    /*                         CLICK 'ADD INGREDIENTS' BUTTON                            */
    /***********************************************************************************/

    ingButton.addEventListener("click", (ev) => { 
        //Prevent default behaviour
        ev.preventDefault(); 
        //Add another input field for ingredients
        ingDiv.insertAdjacentHTML("beforeend", "<div class='tag-container'><div><input class='ingredients' name='ingredients[]' type='text' placeholder='flour'/></div></div>"); 
    });


    /***********************************************************************************/
    /*                               DO ON FORM SUBMIT                                 */
    /***********************************************************************************/
    createRecForm.addEventListener("submit", (ev) =>{

        //Prevent default behaviour
        ev.preventDefault();

        //Set valid to true
        let valid = true; 

        //-------VALIDATE RECIPE NAME--------
        if(recipeName.value.length == 0){
            recipeNameError.innerHTML = "<p>*Please Enter A Valid Recipe Name</p>"; 
            valid = false; 
        }
        else{
            recipeNameError.innerHTML = "";  
            valid = true; 
        }

        //-------VALIDATE PREP TIME--------
        if(prepTime.value.length == 0){
            prepTimeError.innerHTML = "<p>*Please Enter A Valid Prep Time in Minutes</p>"; 
            valid = false;
        }
        else{
            prepTimeError.innerHTML = "";
            valid = true;  
        }

        //-------VALIDATE INGREDIENTS--------
        if(ingInput.value.length == 0){
            ingError.innerHTML = "<p>*Please Enter Ingredients</p>";
            valid = false;  
        }
        else{
            ingError.innerHTML = ""; 
            valid = true; 
        }

        //-------VALIDATE DIRECTIONS--------
        if(directions.value.length == 0){
            valid = false;
            directionsError.innerHTML = "<p>*Please Enter Valid Directions</p>"; 
        }
        else{
            directionsError.innerHTML = ""; 
            valid = true; 
        }

        //IF ALL FORM ENTRIES ARE VALID
        if (valid == true){
            //Create an ID for the recipe
            let postId = Math.random()*100;

            //Post recipe form entries
            postFormData(postId); 
        }
    });

    /***********************************************************************************/
    /*                                 POST FORM DATA                                  */
    /***********************************************************************************/
    function postFormData(postId){

        //Timestamp
        //Code referenced from: https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        let time = today.toDateString();

        //Create formdata object 
        let recFormData = new FormData(document.forms.createRecForm); 

        //Append post id to form data
        recFormData.append("id", `${postId}`); 

        //Append post time created to form data
        recFormData.append("timeCreated", `${time}`); 

        //Use POST XHR to send form data
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../api/post2_createRecipe.php"); 
        xhr.send(recFormData);
    }

}); 