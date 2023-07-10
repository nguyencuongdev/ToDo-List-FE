const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');
const content = document.querySelector('.content');
const menu_hidden = document.querySelector('#menu_hidden');
const url = '  http://localhost:3000/tasks';

const listTasksComplated = document.querySelector(
    '.content_mytask-compate-list',
);
const buttonShowTaskComlated = document.querySelector(
    '.content_mytask-complate-title',
);
const formDetailTask = document.querySelector('.detail');
const showDateNow = document.querySelector('#showDateNow');
const date = new Date(); // ngày tháng năm hiện tại
const buttonAddTask = document.querySelector('#add');
const formAddTask = document.querySelector('#form-add-task');
const audio = new Audio('/public/audios/tinhtinh.mp4');

let day = '';
let indexTask = 1;

menu.onclick = () => {
    if (
        formDetailTask.classList.contains('show') &&
        content.classList.contains('content-5')
    ) {
        content.classList.remove('content-5');
        content.classList.add('content-7');
    } else {
        content.classList.add('content-10');
    }
    sidebar.classList.add('hidden');
    menu_hidden.classList.remove('hidden');
};

menu_hidden.onclick = () => {
    if (
        formDetailTask.classList.contains('show') &&
        content.classList.contains('content-7')
    ) {
        content.classList.remove('content-7');
        content.classList.add('content-5');
    } else {
        content.classList.remove('content-10');
    }
    sidebar.classList.remove('hidden');
    menu_hidden.classList.add('hidden');
};

buttonShowTaskComlated.onclick = () => {
    ShowTaskFinished();
};

function ShowTaskFinished() {
    listTasksComplated.classList.toggle('hidden');
}

function noImportant(event) {
    event.stopPropagation();
    let buttonNoImportant = event.target;
    buttonNoImportant = buttonNoImportant.parentNode;
    const buttonImportant =
        buttonNoImportant.parentNode.querySelector('#important');
    if (buttonImportant.classList.contains('hidden')) {
        buttonImportant.classList.remove('hidden');
        buttonNoImportant.classList.add('hidden');
    }
}
function important(event) {
    event.stopPropagation();
    let buttonImportant = event.target;
    buttonImportant = buttonImportant.parentNode;
    const buttonNoImportant =
        buttonImportant.parentNode.querySelector('#noimportant');
    if (buttonNoImportant.classList.contains('hidden')) {
        buttonNoImportant.classList.remove('hidden');
        buttonImportant.classList.add('hidden');
    }
}
function ShowDayNow() {
    if (date.getDay() == 0) {
        day = 'Chủ nhật';
    } else {
        day = 'Thứ ' + (date.getDay() + 1);
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
            .then(_ => {
                audio.play();
            })
            .catch(error => {
                console.log('Lỗi phát nhạc');
            });
    }
}
const myTaskList = document.querySelector('.content_mytask-list');

function createTask(
    List,
    id,
    name,
    description = '',
    important = false,
    status = false,
) {
    let myTaskItem = document.createElement('div');
    myTaskItem.setAttribute('data-index', id);
    myTaskItem.classList.add('content_mytask-item');
    myTaskItem.innerHTML = `  <div class="content_mytask-group">
                                <button id="updatefinish" onclick="updatefinish(event)">
                                    <i class="fi fi-rr-circle" id="finish-icon"></i>
                                </button>
                                <h4 class="content_mytask-title" onclick=" event.stopPropagation();">${name}</h4>
                            </div>
                            <div title="Đánh dấu công việc quan trọng">
                               <button id="important" onclick="important(event)">
                                   <i class="fi fi-rr-star"></i>
                                </button>
                                <button id="noimportant" class="hidden" onclick="noImportant(event)">
                                    <img src="./public/imgs/star.png">
                                </button>
                            </div>
                             <div class="content_mytask-item-button">
                                <button class="content_mytask-button-item edit" onclick="editTask(event)">
                                    Sửa task
                                    <i class="fi fi-rr-edit"></i>
                                </button>
                                <button class="content_mytask-button-item delete" onclick="deleteTask(event)">
                                    Xóa task
                                    <i class="fi fi-rr-trash"></i>
                                </button>
                                </div>
                            </div>`;
    myTaskItem.addEventListener('click', showDetailTask);
    myTaskItem.addEventListener('contextmenu', showButtonTask);
    List.prepend(myTaskItem);
}

function addTaskFinished(element) {
    const name = element.querySelector('.content_mytask-title').textContent;
    const id = element.getAttribute('data-index');
    createTask(listTasksComplated, id, name);
    playTinhTinh();
}

function addTaskNotFinish(element) {
    const task = element.querySelector('.content_mytask-title');
    let id = element.getAttribute('data-index');
    createTask(myTaskList, id, task.textContent);
}

function updatefinish(event) {
    event.preventDefault();
    event.stopPropagation();
    let elementTask = event.target.parentNode;
    while (!elementTask.classList.contains('content_mytask-item')) {
        elementTask = elementTask.parentNode;
    }
    addTaskFinished(elementTask);
    elementTask.remove();
}

function updateTaskNotFinish(event) {
    event.preventDefault();
    event.stopPropagation();
    let elementTask = event.target.parentNode;
    while (!elementTask.classList.contains('content_mytask-item')) {
        elementTask = elementTask.parentNode;
    }
    addTaskNotFinish(elementTask);
    elementTask.remove();
}

formAddTask.onsubmit = async function (e) {
    e.preventDefault();
    const inputTaskElement = document.querySelector('#input_task');
    if (inputTaskElement.value) {
        createTask(myTaskList, indexTask, inputTaskElement.value);
        const formTask = new FormData(this);
        const task = {
            id: indexTask,
            name: formTask.get('name'),
            description: '',
            important: false,
            status: false,
        };
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        inputTaskElement.value = '';
        indexTask++;
    }
};
const closeFormDetailTask = formDetailTask.querySelector(
    '.detail_mytask-button>i',
);

const detailTaskTitle = formDetailTask.querySelector('.detail_mytask-title');

function showDetailTask(event) {
    const taskElement = event.target;
    const taskTitle = taskElement.querySelector('.content_mytask-title');
    detailTaskTitle.textContent = taskTitle.textContent;

    if (
        sidebar.classList.contains('hidden') &&
        content.classList.contains('content-10')
    ) {
        content.classList.remove('content-10');
        content.classList.add('content-7');
    } else {
        content.classList.add('content-5');
    }

    formDetailTask.classList.add('show');
    closeFormDetailTask.addEventListener('click', hiddenDetailTask);
}

function hiddenDetailTask() {
    if (
        !sidebar.classList.contains('hidden') &&
        content.classList.contains('content-5')
    ) {
        content.classList.remove('content-5');
    } else {
        content.classList.remove('content-7');
        content.classList.add('content-10');
    }
    formDetailTask.classList.remove('show');
    closeFormDetailTask.removeEventListener('click', hiddenDetailTask);
}

async function editTask(event) {
    event.stopPropagation(); // ngăn chặn sự kiện nổi bọt

    // lấy ra task cần sửa
    let taskElement = event.target;
    while (!taskElement.classList.contains('content_mytask-item')) {
        taskElement = taskElement.parentNode;
    }

    //show form update and listen event submit
    const formUpdate = document.querySelector('#form-update');
    formUpdate.classList.add('show');
    const btnCloseFormUpdate = formUpdate.querySelector('.form-update-btn');
    const inputOldName = formUpdate.querySelector('#old-name');
    inputOldName.value = taskElement.querySelector(
        '.content_mytask-title',
    ).textContent;

    const inputNewName = formUpdate.querySelector('#new-name');
    const errElement = formUpdate.querySelector('.message');

    //form upadate dialog
    const formDialogUpdate = formUpdate.querySelector('.form-update-dialog');
    //onsubmit form update
    formDialogUpdate.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (inputNewName.value != inputOldName.value) {
            const task = {
                id: taskElement.getAttribute('data-index'),
                name: inputNewName.value,
                description: '',
                important: false,
                status: false,
            };
            //call api to server update task
            await fetch(url + '/' + task.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            //change name task in UI
            taskElement.querySelector('.content_mytask-title').textContent =
                inputNewName.value;
            //close form update
            inputOldName.value = '';
            inputNewName.value = '';
            formUpdate.classList.remove('show');
            alert('Cập nhật thành công!');
        } else {
            errElement.textContent = 'Tên task không được trùng với tên cũ';
        }
    });

    //listen event click button close form update
    function hiddenFormUpdate(e) {
        e.preventDefault();
        formUpdate.classList.remove('show');
        btnCloseFormUpdate.removeEventListener('click', hiddenFormUpdate);
    }
    btnCloseFormUpdate.addEventListener('click', hiddenFormUpdate);
}

async function deleteTask(event) {
    event.stopPropagation();
    console.log(event.target);
}

function showButtonTask(event) {
    event.preventDefault();
    const taskElement = event.target;
    console.log(taskElement);
    const buttonTask = taskElement.querySelector('.content_mytask-item-button');
    buttonTask.style.display = 'block';
    function hiddenButtonTask() {
        buttonTask.style.display = 'none';
    }
    window.addEventListener('click', hiddenButtonTask);
}
window.removeEventListener('click', hiddenDetailTask);

window.addEventListener('click', function () {});
window.addEventListener('load', async function () {
    try {
        const res = await fetch(url);
        const tasks = await res.json();
        tasks.forEach(task => {
            if (task.status) {
                createTask(listTasksComplated, task.id, task.name);
                indexTask++;
            } else {
                createTask(myTaskList, task.id, task.name);
                indexTask++;
            }
        });
    } catch (err) {
        console.log(err);
    }
});
