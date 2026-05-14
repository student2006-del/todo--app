const taskInput = document.getElementById("task-input");

const addBtn = document.getElementById("add-btn");

const taskList = document.getElementById("task-list");

const filterBtns = document.querySelectorAll(".filter-btn");


let tasks = [];


function renderTasks(filter = "all") {

  taskList.innerHTML = "";


  let filteredTasks = tasks;


  if (filter === "active") {

    filteredTasks = tasks.filter(task => !task.completed);

  }


  if (filter === "completed") {

    filteredTasks = tasks.filter(task => task.completed);

  }


  filteredTasks.forEach((task, index) => {

    const taskDiv = document.createElement("div");

    taskDiv.classList.add("task");


    taskDiv.innerHTML = `

            <div class="task-left">

                <div class="check">

                    ${task.completed ? "✔" : ""}

                </div>

                <p style="
                    text-decoration: ${task.completed ? "line-through" : "none"};
                    opacity: ${task.completed ? "0.6" : "1"};
                ">

                    ${task.text}

                </p>

            </div>

            <span class="delete">
                🗑
            </span>

        `;



    const check = taskDiv.querySelector(".check");


    check.addEventListener("click", () => {

      task.completed = !task.completed;

      renderTasks(filter);

    });


    const deleteBtn = taskDiv.querySelector(".delete");


    deleteBtn.addEventListener("click", () => {

      const realIndex = tasks.indexOf(task);

      tasks.splice(realIndex, 1);

      renderTasks(filter);

    });


    taskList.appendChild(taskDiv);

  });

}


addBtn.addEventListener("click", () => {

  const text = taskInput.value.trim();


  if (text === "") {

    return;

  }


  tasks.push({

    text: text,

    completed: false

  });


  taskInput.value = "";


  renderTasks();

});



taskInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    addBtn.click();

  }

});


filterBtns.forEach(button => {

  button.addEventListener("click", () => {


    document
      .querySelector(".filter-btn.active")
      .classList.remove("active");


    button.classList.add("active");


    renderTasks(button.dataset.filter);

  });

});


renderTasks();
