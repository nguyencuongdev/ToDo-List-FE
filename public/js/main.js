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
const showDateNow = document.querySelector("#showDateNow");
const date = new Date(); // ngày tháng năm hiện tại
const buttonAddTask = document.querySelector("#add");
const formAddTask = document.querySelector("#form-add-task");
const audio = new Audio("/public/audios/tinhtinh.mp4");

let day = "";
let indexTask = 0;

menu.onclick = () => {
  sidebar.style.transform = "translateX(-100%)";
  sidebar.style.transition = "all 0.6s linear";
  content.style.left = "0";
  content.style.width = "100%";
  content.style.transition = "all 0.6s linear";
  menu_hidden.classList.toggle("hidden");
};

menu_hidden.onclick = () => {
  sidebar.style.transform = "translateX(0)";
  content.style.left = "20%";
  content.style.width = "80%";
  content.style.transition = "all 0.6s linear";
  menu_hidden.classList.toggle("hidden");
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
                                <h4 class="content_mytask-title">${task.value}</h4>
                            </div>
                            <div title="Đánh dấu công việc quan trọng">
                                <i class="fi fi-rr-star" id="important" onclick="important(event)"></i>
                                <img src="./public/imgs/star.png" onclick="noImportant(event)" class="hidden" id="noimportant" alt="">
                            </div>`;
  myTaskItem.addEventListener("click", showDetailTask);
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
  let elementParent = event.target.parentNode;
  while (!elementParent.classList.contains("content_mytask-item")) {
    elementParent = elementParent.parentNode;
  }
  addTaskFinished(elementParent);
  elementParent.remove();
}

function updateTaskNotFinish(event) {
  event.preventDefault();
  let elementParent = event.target.parentNode;
  while (!elementParent.classList.contains("content_mytask-item")) {
    elementParent = elementParent.parentNode;
  }
  removeTaskComplated(elementParent);
  elementParent.remove();
}

formAddTask.onsubmit = function (e) {
  e.preventDefault();
  const inputTaskElement = document.querySelector("#input_task");
  if (inputTaskElement.value) {
    addTask(inputTaskElement);
    playTinhTinh();
  }
};

function showDetailTask(event) {
  const taskElement = event.target;
  console.log(taskElement);
  const taskTitle = taskElement.querySelector(".content_mytask-title");
  console.log(taskTitle);
  const formDetailTask = document.querySelector(".detail");
  const detailTaskTitle = formDetailTask.querySelector(".detail_mytask-title");
  console.log(detailTaskTitle);
  detailTaskTitle.textContent = taskTitle.textContent;
  formDetailTask.classList.add("show");
  const closeFormDetailTask = document.querySelector(".detail_mytask-button>i");
  closeFormDetailTask.onclick = () => {
    formDetailTask.classList.remove("show");
  };
}
