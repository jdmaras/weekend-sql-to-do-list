$(document).ready(clickListeners);

function clickListeners(){
    //console.log(`This JQ is working`);
    $(`#submitButton`).on(`click`, addToList)
}

function addToList(e){
    e.preventDefault();
    //this keeps page from reloading
    //console.log(`This ADDS to list`)
}