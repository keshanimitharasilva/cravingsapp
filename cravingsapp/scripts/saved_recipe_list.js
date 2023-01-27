//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {


    let tableBody = document.getElementById("recipeTableBody");
    let userID = document.getElementById(" ");


    function fillRecipeTable(){
        //Create new xml http request
        const xhr = new XMLHttpRequest();
        //Open request
        xhr.open("GET", `../api/get5_savedRecipeList.php/${userID}`);
        //When request loads
        xhr.addEventListener("load", (ev) => {
            //If xhr request succeeded
            if (xhr.status == 200) {
                //Get recipe data and parse
                const allRecipes = JSON.parse(xhr.response);
                console.log(allRecipes); 
                let output = ""; 
                //Get output for each table row
                allRecipes.forEach(function (getRecipe) {
                    output +=  `<tr>
                                    <td>${getRecipe.recipeName}<span class="hidden">${getRecipe.recipeId}</span></td>
                                    <td>${getRecipe.prepTime}</td> 
                                    <td id="recipeListButtons">
                                        <button class="recipeDelete" id="delete+${i}"><i class="fas fa-trash-alt"></i></button>
                                        <button class="recipeEdit" id="delete+${i}'><i class="fas fa-edit"></i></button>
                                    </td>
                                </tr>`
                });
                //Insert output into table row
                tableBody.insertAdjacentHTML("beforeend", `${output}`);
            } 
            //If xhr request didn't succeed
            else {
                //Insert HTML error message into table row 
                tableBody.insertAdjacentHTML("beforeend", "<tr><td>Something went wrong</td></tr>");
            }
        });
        //Send xhr request 
        xhr.send();
    }

    fillRecipeTable(); 

}); 