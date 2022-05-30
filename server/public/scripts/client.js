$(document).ready(clickListeners);

function clickListeners() {
  //console.log(`This JQ is working`);
  $(`#submitButton`).on(`click`, addToList);
  $(`#taskList`).on(`click`, `#deleteTaskBtn`, deleteTasks);
  $(`#taskList`).on(`click`, `.completeBtn`, updateJobDone);
  getTasks();
}

function addToList(e) {
  e.preventDefault();
  let tasksBeingSent = {
    clean: $(`#whatYouClean`).val(),
    day: $(`#dayYouClean`).val(),
    hours_alotted: $(`#hoursYouClean`).val(),
    job_done: $(`#isJobDone`).val(),
  };
  console.log(`What I'm adding`, tasksBeingSent);
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: tasksBeingSent,
  })
    .then((response) => {
      console.log(`POST is sending this back:`, response);
      getTasks();
    })
    .catch((err) => {
      alert(`ERROR adding item`, err);
    });
  //this keeps page from reloading
  //console.log(`This ADDS to list`)
}

// Getting DB info from server
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

//appending data to DOM
function appendTaskList(tasks) {
  //empty old data
  $("#taskList").empty();
  for (let task of tasks) {
    //console.log(tasks);
    //append row to table
    //data-task allows you to attach to specific id in row of
    $("#taskList").append(`
        <tr data-task-id="${task.id}">
          <td>${task.clean}</td>
          <td>${task.day}</td>
          <td>${task.hours_alotted}</td>
          <td class="taskJobDone">${task.job_done}</td>
          <td>
              <button class="completeBtn">IS THE JOB DONE</button>
          </td>
          <td>
              <button id="deleteTaskBtn">MAYBE NEXT WEEK</button>
          </td>
        </tr>
      `);
  }
}
//<button class="completeBtn">${task.job_done}</button>

function updateJobDone() {
  let idOfTask = $(this).parents("tr").data(`task-id`);

  let updateToDoList;

  if ($(this).parents(`tr`).children(`.taskJobDone`).text() === "N") {
    updateToDoList = { job_done: "Y" };
  } else if ($(this).parents(`tr`).children(`.taskJobDone`).text() === "Y") {
    updateToDoList = {
      job_done: "N",
    };
  } else {
    console.log(`Job Done Button BROKE`);
  }
  //setting up if or elses has been one of my not strong suits
  // this one worked the same from our Koala group project
  console.log(`We now update the to do list`, updateToDoList.job_done);
  $.ajax({
    method: "PUT",
    url: `/tasks/${idOfTask}`,
    data: updateToDoList,
  })
    .then((res) => {
      console.log(`PUT transfer updated!`);
      getTasks();
    })
    .catch((err) => {
      console.log(`the PUT failed`, err);
      alert(`IT FAILED`);
    });
}

function deleteTasks() {
  let idOfTask = $(this).parents("tr").data(`task-id`);
  console.log(`idOfTask is`, idOfTask);
  $.ajax({
    method: "DELETE",
    url: `/tasks/${idOfTask}`,
  })
    .then(() => {
      console.log(`DELETE CONNECTED`);
      getTasks();
    })
    .catch((err) => {
      console.log(`DELETE failed - client side`, err);
    });
}
