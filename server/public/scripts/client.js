$(document).ready(clickListeners);

function clickListeners() {
  //console.log(`This JQ is working`);
  $(`#submitButton`).on(`click`, addToList);
  $(`#taskList`).on(`click`, `#deleteTaskBtn`, deleteTasks);
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
          <td>${task.job_done}</td>
          <td>
              <button class="completeBtn">${task.job_done}</button>
          </td>
          <td>
              <button id="deleteTaskBtn">MAYBE NEXT WEEK</button>
          </td>
        </tr>
      `);
  }
}

function updateJobDone() {
  let idOfTask = $(this).parents("tr").data(`task-id`);

  let updateToDoList;

  if ($(this).parents(`tr`).children(`.completeBtn`).text() === "N") {
    updateToDoList = { job_done: "Y" };
  } else if ($(this).parents(`tr`).children(`.completeBtn`).text() === "Y") {
    updateToDoList = {
      job_done: "N",
    };
  } else {
    console.log(`Job Done Button BROKE`);
  }
  console.log(`We now update the to do list`, updateToDoList);
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
