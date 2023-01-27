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


    /***********************************************************************************/
    /*                         CLICK ADD INGREDIENTS BUTTON                            */
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

        //-------VALIDATE RECIPE NAME--------
        if(recipeName.value.length == 0){
            ev.preventDefault();
            recipeNameError.innerHTML = "<p>*Please Enter A Valid Recipe Name</p>"; 
        }
        else{
            recipeNameError.innerHTML = "";  
        }

        //-------VALIDATE PREP TIME--------
        if(prepTime.value.length == 0){
            ev.preventDefault();
            prepTimeError.innerHTML = "<p>*Please Enter A Valid Prep Time in Minutes</p>"; 
        }
        else{
            prepTimeError.innerHTML = ""; 
        }

        //-------VALIDATE INGREDIENTS--------
        if(ingInput.value.length == 0){
            ev.preventDefault();
            ingError.innerHTML = "<p>*Please Enter Ingredients</p>";
        }
        else{
            ingError.innerHTML = ""; 
        }

        //-------VALIDATE DIRECTIONS--------
        if(directions.value.length == 0){
            ev.preventDefault();
            directionsError.innerHTML = "<p>*Please Enter Valid Directions</p>"; 
        }
        else{
            directionsError.innerHTML = ""; 
        }
    });

}); 