//ALLOW EXPLICITLY DECLARING VARIABLES
"use strict"; 

//ENSURE HTML IS FULLY PARSED BEFORE EXECUTING JAVASCRIPT
window.addEventListener("DOMContentLoaded", () => {

    /***********************************************************************************/
    /*                          GLOBAL VARIABLES                                       */
    /***********************************************************************************/

    let main = document.getElementById("homePageMain"); 
    let saveBtn = document.querySelectorAll(".saveBtn");
    let shareBtn = document.querySelectorAll(".shareBtn");
    let editBtn = document.querySelectorAll(".editBtn"); 


    /***********************************************************************************/
    /*                                 USER SAVES A POST                               */
    /***********************************************************************************/
    saveBtn.forEach( btn =>{

        btn.addEventListener("click", (ev) =>{
            //Prevent default button behaviour
            ev.preventDefault(); 

            //Get the recipe Id from the post
            clickedBtnId = btn.parentElement.getAttribute("id"); 

            //Create variable to send
            let params = `postId=${clickedBtnId}`; 

            //Insert message here
            msg = btn.parentElement; 

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
    }); 


    /***********************************************************************************/
    /*                       USER SHARES A POST FROM HOMEPAGE                          */
    /***********************************************************************************/
    shareBtn.forEach( btn =>{
        btn.addEventListener("click", (ev) =>{

            //Prevent default button behaviour
            ev.preventDefault();

            //Get the recipe Id from the post
            let postId = btn.parentElement.getAttribute("id"); 

            //Call function to get the shared post using AJAX
            xhrSharedPost(postId); 
            
        }); 
    }); 

    /***********************************************************************************/
    /*    FUNCTION: USER SHARES A POST FROM AN EXTERNAL PAGE (FROM WITHIN A POST)      */
    /***********************************************************************************/

    //Call function to get the shared post using AJAX
    xhrSharedPost(); 

    function xhrSharedPost(){
         //Create new xml http request
         const xhr = new XMLHttpRequest();

        //Get the recipe ID from session storage
        //Code referenced from: https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
        let sharedPostID = sessionStorage.getItem("sharedPost"); 

         //Open request
         xhr.open("GET", `../api/get7_sharePost.php?id=${sharedPostID}`);

         //When request loads
         xhr.addEventListener("load", (ev) => {

             let output = ""; 

             //If xhr request succeeded
             if (xhr.status == 200) {

                 //Get recipe data and parse
                 const getRecipe = JSON.parse(xhr.response);
                 console.log(getRecipe);  
                 
                 //Set the output
                 output = `<div class="homeUserPost">
                                 <div class = "postIsShared"> 
                                     <p><i class="fas fa-retweet"></i> ${getRecipe.sharedBy} shared this post</p>
                                 <div>

                                 <div class="homePostUsername"> 
                                     <img src="../img/vector/default_propic.png" alt="Profile picture" class="postProfilePic"/>
                                     <p>${getRecipe.username}</p>
                                     <p class="recipeId hidden">${getRecipe.recipeId}</p>
                                     <p class="timePosted">${getRecipe.timeCreated}</p>
                                 </div>

                                 <div class="homeUserPost2">

                                     <div class="recipeName">
                                         <a href="user_read_recipe.php" class="recipeLink">
                                             <p>${getRecipe.recipeName}</p>
                                         </a>
                                     </div>

                                     <div class="recipeDescription">
                                         <p class="description">${getRecipe.directions}</p>
                                         <p class="prepTime"><i class="far fa-clock"></i>${getRecipe.prepTime}</p>
                                     </div>

                                     <div class="recipeImage"> 
                                         <a href="user_read_recipe.php" class="recipeLink"> 
                                             <img src="../img/promo/noodle.jpg" alt="Image of recipe" class="imageOfRecipe">
                                         </a>
                                     </div>
                                     
                                 </div>

                                 <div class="userPostOptions" id="${getRecipe.recipeId}">
                                     <button class="opBtn saveBtn"><i class="fas fa-bookmark"></i></button>
                                     <button class="opBtn shareBtn"><i class="fas fa-share-alt-square"></i></button>
                                     <button class="opBtn editBtn"><i class="fas fa-edit"></i></button>
                                 </div>
                             </div>`; 
                 //Insert output into main
                 main.insertAdjacentHTML("afterbegin", `${output}`); 

                 //Get the div that holds the buttons
                 let i = document.getElementByID(`${getRecipe.recipeId}`); 

                 //If the user has not allowed others to share posts, hide the share button
                 let share = i.getElementsByClassName("shareBtn")[0]; 
                 if (getRecipe.canShare == "No"){
                     share.classList.add = "hidden"; 
                 }
                 else {
                     share.classList.remove = "hidden"; 
                 }

                 //If the user has not allowed others to edit posts, hide the edit button
                 let edit = i.getElementsByClassName("editBtn")[0]; 
                 if (getRecipe.canEdit == "No"){
                     edit.classList.add = "hidden";
                 }
                 else{
                     edit.classList.remove = "hidden";
                 } 
             }
             //If xhr request didn't succeed, show an error message
             else {
                 output = "Something went wrong."; 
                 main.insertAdjacentHTML("afterbegin", `${output}`); 
             }
         });
         //Send xhr request 
         xhr.send();
    }


    /***********************************************************************************/
    /*                                USER EDITS A POST                                 */
    /***********************************************************************************/
    editBtn.forEach( btn =>{
        btn.addEventListener("click", (ev) =>{
            //Prevent default button behaviour
            ev.preventDefault(); 

            //Get the recipe Id from the post
            postId = btn.parentElement.getAttribute("id"); 

            //Store id of shared post in session
            //Code referenced from: https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
            sessionStorage.setItem("editPost",`${postId}`); 

            //Go to edit post page
            let url = window.open(`../user_pages/user_edit_post.php`, '_self'); 
        }); 
        

    }); 
    

}); 