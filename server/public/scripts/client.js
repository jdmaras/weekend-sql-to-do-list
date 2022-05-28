$(document).ready(clickListeners);

function clickListeners() {
  //console.log(`This JQ is working`);
  $(`#submitButton`).on(`click`, addToList);
  $(`#taskList`).on(`click`, `.deleteTaskBtn`, deleteTasks);
  getTasks();
}

function addToList(e) {
  e.preventDefault();
  let tasksBeingSent = {
    clean: $(`#whatYouClean`).val(),
    day: $(`#dayYouClean`).val(),
    hours_alotted: $(`#hoursYouClean`).val(),
  };
  console.log(`What I'm adding`, tasksBeingSent);
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: tasksBeingSent,
  })
    .then((response) => {
      console.log(`POST is sending this back:`, response);
      //getTasks();
    })
    .catch((err) => {
      alert(`ERROR adding item`, err);
    });
  //this keeps page from reloading
  //console.log(`This ADDS to list`)
}

function getTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    .then((response) => {
      console.log(`GET tasks - response`, response);
      //Append Tasks
      appendTaskList(response);
    })
    .catch((err) => {
      alert(`error GETting list`, err);
    });
}
function appendTaskList(tasks) {
  //empty old data
  $("#taskList").empty();
  for (let task of tasks) {
    //console.log(tasks);
    //append row to table
    $("#taskList").append(`
        <tr data-task-id="${task.id}">
          <td>${task.clean}</td>
          <td>${task.day}</td>
          <td>${task.hours_alotted}</td>
          <td>
              <button class="completeBtn">JOB DONE</button>
          </td>
          <td>
              <button class="deleteTaskBtn">MAYBE NEXT WEEK</button>
          </td>
        </tr>
      `);
  }
}

// DELETE IS COMING BACK UNDEFINED. LOOK BACK AT THE TR BECAUSE PROBABY NOT TARGETTING
// WHAT IT NEEDS TO BE

function deleteTasks() {
  let idOfTask = $(this).parents("tr").data(`task-id`);

  $.ajax({
    method: "DELETE",
    url: `/tasks/${idOfTask}`,
  })
    .then(() => {
      console.log(`DELETE CONNECTED`);
      getTasks();
    })
    .catch((err) => {
      console.log(`DELETE failed`, err);
    });
}
