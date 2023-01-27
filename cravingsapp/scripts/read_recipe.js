//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {

    /***********************************************************************************/
    /*                          GLOBAL VARIABLES                                       */
    /***********************************************************************************/

    let main = document.getElementsByClassName("readMain")[0]; 
    let recipeId = document.getElementsByClassName("readRecipeOptions").getAttribute("id"); 
    let saveBtn = document.getElementsByClassName("saveBtn")[0]; 
    let shareBtn = document.getElementsByClassName("shareBtn")[0]; 
    let editBtn = document.getElementsByClassName("editBtn")[0]; 
    
    /***********************************************************************************/
    /*                            GET RECIPE INFO                                      */
    /***********************************************************************************/
    getRecipe();
    function getRecipe(){

        //Create new xml http request
        const xhr = new XMLHttpRequest();

        //Open request
        xhr.open("GET", `../api/get3_readRecipe.php/${recipeId}`);

        let output ="";

        //When request loads
        xhr.addEventListener("load", (ev) => {

            //If xhr request succeeded
            if (xhr.status == 200) {

                //Get recipe data and parse
                const getRecipe = JSON.parse(xhr.getRecipe);
                console.log(getRecipe); 

                //Set the output
                output =    `<div class="readRecipe">

                                <div class="readRecipeOptions" id="${getRecipe.recipeId}">
                                    <button class="saveBtn"><i class="fas fa-bookmark"></i></button>
                                    <button class="shareBtn"><i class="fas fa-share-alt-square"></i></button>
                                    <button class="editBtn"><i class="fas fa-edit"></i></button>
                                </div>

                                <h2 class="readRecipeName">${getRecipe.recipeName}</h2>
                                <p class="readRecipeBy">Created By <span class="bold">${getRecipe.username}</span> at <span class="bold">${getRecipe.timeCreated}</span></p>
                                <p class="readRecipePrepTime"><i class="far fa-clock"></i>${getRecipe.prepTime}</p>

                                <ul class="ingList"></ul>

                                <p class="readRecipeInstructions">${getRecipe.directions}</p>

                            </div>`;

                //Include output onto the page
                main.innerHTML = `${output}`; 

                //Add the list of ingredients to the page
                let ingList = document.getElementsByClassName("ingList");
                getRecipe.getIng.forEach( ing =>{
                    ingList.insertAdjacentHTML("beforeend", `${getIng.ing}`)            
                });  

                //Get the div that holds the buttons 
                let btnDiv = document.getElementByID(`${getRecipe.recipeId}`); 

                //If the user has not allowed others to share posts, hide the share button
                let share = btnDiv.getElementsByClassName("shareBtn")[0]; 
                if (getRecipe.canShare == "No"){
                     share.classList.add = "hidden"; 
                }
                else{
                     share.classList.remove = "hidden"; 
                }

                //If the user has not allowed others to edit posts, hide the edit button
                let edit = btnDiv.getElementsByClassName("editBtn")[0]; 
                if (getRecipe.canEdit == "No"){
                    edit.classList.add = "hidden";
                }
                else{
                    edit.classList.remove = "hidden";
                }  
            } 
            //If xhr request didn't succeed
            else {
                console.log("Request failed"); 
            }
        });
        //Send xhr request 
        xhr.send();
    }


    /***********************************************************************************/
    /*                            USER SAVES THE POST                                   */
    /***********************************************************************************/
    saveBtn.addEventListener("click", (ev) =>{
        //Prevent default button behaviour
        ev.preventDefault(); 

        //Create variable to send
        let params = `postId=${recipeId}`; 

        //Insert message here
        msg = target.parentElement; 

        //Use POST XHR to send id to database table
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../api/post10_savePost.php"); 

        //If succesful, inform the user that the post has been saved
        if (xhr.status == 200) {
            msg.insertAdjacentHTML("beforeend", "<p>Post succesfully saved.</p>")
        }
        //If unsuccesful, inform user
        else{
            msg.insertAdjacentHTML("beforeend", "<p class='error'>Something went wrong.</p>")
        }
        //Send request
        xhr.send(params);
    });


    /***********************************************************************************/
    /*                            USER SHARES THE POST                                 */
    /***********************************************************************************/
    shareBtn.addEventListener("click", (ev) =>{
        //Prevent default button behaviour
        ev.preventDefault(); 

        //Store id of shared post in session
        //Code referenced from: https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
        sessionStorage.setItem("sharedPost",`${recipeId}`); 
        //Go to homepage
        let url = window.open(`../user_pages/user_homepage.php`, '_self'); 
    });

    /***********************************************************************************/
    /*                            USER EDITS THE POST                                   */
    /***********************************************************************************/
    editBtn.addEventListener("click", (ev) =>{
        //Prevent default button behaviour
        ev.preventDefault();

        //Store id of shared post in session
        //Code referenced from: https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
        sessionStorage.setItem("editPost",`${recipeId}`); 

        //Go to edit post page
        let url = window.open(`../user_pages/user_edit_post.php`, '_self'); 
    });
}); 