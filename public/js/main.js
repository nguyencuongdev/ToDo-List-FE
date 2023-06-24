const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");
const content = document.querySelector(".content");
const menu_hidden = document.querySelector("#menu_hidden");

const listTasksComplated = document.querySelector(
  ".content_mytask-compate-list"
);
const buttonShowTaskComlated = document.querySelector(
  ".content_mytask-complate-title"
);
const formDetailTask = document.querySelector(".detail");
const showDateNow = document.querySelector("#showDateNow");
const date = new Date(); // ngày tháng năm hiện tại
const buttonAddTask = document.querySelector("#add");
const formAddTask = document.querySelector("#form-add-task");
const audio = new Audio("/public/audios/tinhtinh.mp4");

let day = "";
let indexTask = 0;

menu.onclick = () => {
  if (
    formDetailTask.classList.contains("show") &&
    content.classList.contains("content-5")
  ) {
    content.classList.remove("content-5");
    content.classList.add("content-7");
  } else {
    content.classList.add("content-10");
  }
  sidebar.classList.add("hidden");
  menu_hidden.classList.remove("hidden");
};

menu_hidden.onclick = () => {
  if (
    formDetailTask.classList.contains("show") &&
    content.classList.contains("content-7")
  ) {
    content.classList.remove("content-7");
    content.classList.add("content-5");
  } else {
    content.classList.remove("content-10");
  }
  sidebar.classList.remove("hidden");
  menu_hidden.classList.add("hidden");
};

buttonShowTaskComlated.onclick = () => {
  ShowTaskFinished();
};

function ShowTaskFinished() {
  listTasksComplated.classList.toggle("hidden");
}

function noImportant(event) {
  event.stopPropagation();
  const buttonNoImportant = event.target;
  const buttonImportant =
    buttonNoImportant.parentNode.querySelector("#important");
  if (buttonImportant.classList.contains("hidden")) {
    buttonImportant.classList.remove("hidden");
    buttonNoImportant.classList.add("hidden");
  }
}
function important(event) {
  event.stopPropagation();
  const buttonImportant = event.target;
  const buttonNoImportant =
    buttonImportant.parentNode.querySelector("#noimportant");
  if (buttonNoImportant.classList.contains("hidden")) {
    buttonNoImportant.classList.remove("hidden");
    buttonImportant.classList.add("hidden");
  }
}
function ShowDayNow() {
  if (date.getDay() == 7) {
    day = "Chủ nhật";
  } else {
    day = "Thứ " + (date.getDay() + 1);
  }
  showDateNow.textContent = `${day}, ngày ${date.getDate()} tháng ${
    date.getMonth() + 1
  }, năm ${date.getFullYear()}`;
}
ShowDayNow();

function playTinhTinh() {
  let promise = audio.play();
  if (promise !== undefined) {
    promise
      .then((_) => {
        audio.play();
      })
      .catch((error) => {
        console.log("Lỗi phát nhạc");
      });
  }
}

function addTask(task) {
  const myTaskList = document.querySelector(".content_mytask-list");
  let myTaskItem = document.createElement("div");
  myTaskItem.setAttribute("data-index", indexTask);
  myTaskItem.classList.add("content_mytask-item");
  myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <a href="" id="updatefinish"  onclick="updatefinish(event)">
                                    <i class="fi fi-rr-circle" id="finish-icon"></i>
                                </a>
                                <h4 class="content_mytask-title" onclick=" event.stopPropagation();">${task.value}</h4>
                            </div>
                            <div title="Đánh dấu công việc quan trọng">
                                <i class="fi fi-rr-star" id="important" onclick="important(event)"></i>
                                <img src="./public/imgs/star.png" onclick="noImportant(event)" class="hidden" id="noimportant" alt="">
                            </div>
                             <div class="content_mytask-item-button">
                                <a href="" class="content_mytask-button-item edit" onclick="editTask(event)">
                                    Sửa task
                                    <i class="fi fi-rr-edit"></i>
                                </a>
                                <a href="" class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </a>
                            </div>`;
  myTaskItem.addEventListener("click", showDetailTask);
  myTaskItem.addEventListener("contextmenu", showButtonTask);
  indexTask++;
  task.value = "";
  myTaskList.prepend(myTaskItem);
}

function addTaskFinished(element) {
  const task = element.querySelector(".content_mytask-title");
  const myTaskCompleted = document.querySelector(
    ".content_mytask-compate-list"
  );
  const myTaskItem = document.createElement("div");
  myTaskItem.classList.add("content_mytask-item");
  myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                    <a href="" id="not-update-finish" onclick="updateTaskNotFinish(event)">
                                        <img src="./public/imgs/check-circle.png" alt="">
                                    </a>
                                    <h4 class="content_mytask-title">${task.textContent}</h4>
                                    </div>
                                    <i class="fi fi-rr-star" id="important" onclick="important(event)"></i>
                                    <img src="./public/imgs/star.png" class="hidden" 
                                    onclick="noImportant(event)" id="noimportant" alt="">
                                    `;
  myTaskCompleted.prepend(myTaskItem);
  listTasksComplated.classList.remove("hidden");
  playTinhTinh();
}

function addTaskNotFinish(task) {
  const myTaskList = document.querySelector(".content_mytask-list");
  const myTaskItem = document.createElement("div");
  myTaskItem.classList.add("content_mytask-item");
  myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <a href="" id="updatefinish"  onclick="updatefinish(event)">
                                    <i class="fi fi-rr-circle" id="finish-icon"></i>
                                </a>
                                <h4 class="content_mytask-title">${task.textContent}</h4>
                            </div>
                            <div title="Đánh dấu công việc quan trọng">
                                <i class="fi fi-rr-star" id="important" onclick="important(event)"></i>
                                <img src="./public/imgs/star.png" class="hidden" onclick="noImportant(event)" id="noimportant" alt="">
                            </div>`;
  task.value = "";
  myTaskList.prepend(myTaskItem);
}

function removeTaskComplated(element) {
  addTaskNotFinish(element);
}

function updatefinish(event) {
  event.preventDefault();
  event.stopPropagation();
  let elementTask = event.target.parentNode;
  while (!elementTask.classList.contains("content_mytask-item")) {
    elementTask = elementTask.parentNode;
  }
  addTaskFinished(elementTask);
  elementTask.remove();
}

function updateTaskNotFinish(event) {
  event.preventDefault();
  event.stopPropagation();
  let elementTask = event.target.parentNode;
  while (!elementTask.classList.contains("content_mytask-item")) {
    elementTask = elementTask.parentNode;
  }
  removeTaskComplated(elementTask);
  elementTask.remove();
}

formAddTask.onsubmit = function (e) {
  e.preventDefault();
  const inputTaskElement = document.querySelector("#input_task");
  if (inputTaskElement.value) {
    addTask(inputTaskElement);
  }
};
const closeFormDetailTask = formDetailTask.querySelector(
  ".detail_mytask-button>i"
);

const detailTaskTitle = formDetailTask.querySelector(".detail_mytask-title");

function showDetailTask(event) {
  const taskElement = event.target;
  const taskTitle = taskElement.querySelector(".content_mytask-title");
  detailTaskTitle.textContent = taskTitle.textContent;

  if (
    sidebar.classList.contains("hidden") &&
    content.classList.contains("content-10")
  ) {
    content.classList.remove("content-10");
    content.classList.add("content-7");
  } else {
    content.classList.add("content-5");
  }

  formDetailTask.classList.add("show");
  closeFormDetailTask.addEventListener("click", hiddenDetailTask);
}

function hiddenDetailTask() {
  if (
    !sidebar.classList.contains("hidden") &&
    content.classList.contains("content-5")
  ) {
    content.classList.remove("content-5");
  } else {
    content.classList.remove("content-7");
    content.classList.add("content-10");
  }
  formDetailTask.classList.remove("show");
  closeFormDetailTask.removeEventListener("click", hiddenDetailTask);
}

function showButtonTask(event) {
  event.preventDefault();
  const taskElement = event.target;
  console.log(taskElement);
  const buttonTask = taskElement.querySelector(".content_mytask-item-button");
  buttonTask.style.display = "block";
  function hiddenButtonTask() {
    buttonTask.style.display = "none";
    console.log("Hi");
  }
  window.addEventListener("click", hiddenButtonTask);
}
window.removeEventListener("click", hiddenDetailTask);

window.addEventListener("click", function () {});
