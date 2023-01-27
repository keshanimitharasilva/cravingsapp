let Recipes = 
[
{Recipe: 'Khaled recipe'},
{Recipe: 'Om recipe'},
{Recipe: 'Ayaan recipe'}
];

let list = document.getElementById('list');

function setList(group) { //all the recipe will be passed to group(This appens recipe to list)
    clearList();
    for(let recp of group){
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        let text = document.createTextNode(recp.Recipe);
        item.appendChild(text);
        list.appendChild(item);
    }
}
if(group.length === 0) { //if no results found
    setNoResults();
}

function clearList(){ //This will remove all list items from inside list
    while(list.firstChild)    //We make sure we have no duplication
    list.removeChild(list.firstChild);                    
}

function getRelevancy(value, searchTerm) { //This will compare the two and return number based on relevancy
    if(value === searchTerm)               //If the match is exact we want maximum relevancy
    {
      return 420;  //We want this number to be the highest because input is equal to search term
    }
    else if (value.startsWith(term)) { //We decrease relevancy as input matches less and less
      return 69;
        
    } else
    return 0;
}

function  setNoResults() {
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        let text = document.createTextNode('Not found');
        item.appendChild(text);
        list.appendChild(item);
}
let searchInput = document.getElementById('searchBar');

searchInput.addEventListener('input'), (event) => {
    let value = event.target.value;
    if(value && value.trim().length > 0){
       value = value.trim().toLowerCase(); 
       setList(Recipes.filter(recp => {
           return recp.Recipe.includes(value); //This is case sensitive hence we lower case everything

       }).sort((recpA, recpB) =>{ //We return the score of recpB - recpA
        return getRelevancy(recpB.Recipe, value) - getRelevancy(recpA.Recipe, value)
       }));
    }
    else
    {
        clearList();
    }
};