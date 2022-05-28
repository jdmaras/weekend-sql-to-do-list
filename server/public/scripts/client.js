$(document).ready(clickListeners);

function clickListeners(){
    //console.log(`This JQ is working`);
    $(`#submitButton`).on(`click`, addToList)
    getTasks();
}

function addToList(e){
    e.preventDefault();
    //this keeps page from reloading
    //console.log(`This ADDS to list`)
}

function getTasks(){
    $.ajax({
        type: "GET",
        url: "/tasks"
    }).then ((response) => {
        console.log(`GET tasks - response`, response)
        //Append Tasks
        appendTaskList(response)
    }).catch ((err) => {
        alert(`error GETting list`, err);
    })
}
function appendTaskList(tasks) {
    //empty old data
    //$("#taskList").empty();
  
    for (let task of tasks) {
        console.log(tasks);
      //append row to table
      $("#taskList").append(`
        <tr data-task-id="${task.id}">
          <td>${task.clean}</td>
          <td>${task.day}</td>
          <td>${task.hours_alotted}</td>
        </tr>
      `);
    }
  }

// let el = $(`#taskList`);
//         //el.empty();
//         for (let i = 0; i < response.length; i++){
//             el.append(`<li>${response[i].clean}</li>`)
//         }

        // <td>
        //       <button class="deleteTaskBtn">DELETE ME</button>
        //   </td>