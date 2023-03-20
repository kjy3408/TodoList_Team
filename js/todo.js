class AddEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new AddEvent();
        }
        return this.#instance;
    }

    addEventCheckBox() {
        const checkButtons = document.querySelectorAll(".check-button");
        const texts = document.querySelectorAll(".text");
        const todoList = TodoService.getInstance().todoList;

        for(let i = 0; i < checkButtons.length; i++){
            checkButtons[i].onclick = () => {
                if(checkButtons[i].checked){
                    texts[i].style.textDecoration = 'line-through';

                }else {

                }
            }
        }
    }   

    addEventInputButtonClick() {
       const mainInputButton = document.querySelector(".main-input-button");
       mainInputButton.onclick = () => {
        TodoService.getInstance().addTodo();
        const mainTodoInput = document.querySelector(".main-todo-input");
        mainTodoInput.value = ``;
       }
    }
    
    addEventRemoveTodoClick() {
        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach((removeButton, index) => {
            removeButton.onclick = () => {
                ModalService.getInstance().showRemoveModal(index);
            }
        });
    }

    addEventModifyOkClick() {
        const editButtons = document.querySelectorAll(
            ".edit-button"
          );
          editButtons.forEach((editButton, index) => {
            editButton.onclick = () => {
              ModalService1.getInstance().showModifyModal(index);
            };
          });
    }

}


class TodoService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new TodoService();
        }
        return this.#instance;
    }

    todoList = null;

    constructor() {
        if(localStorage.getItem('todo-list') == null) {
            this.todoList = new Array();
        }else {
            this.todoList = JSON.parse(localStorage.getItem('todo-list'));
        }
    }

    updateLocalStorage() {
        localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        this.loadTodoList();
    }

    addTodo() {
        const mainInput = document.querySelector(".main-input");
        const nowDate = new Date();

        const convertDay = (day) => {
            return day == 0 ? '일' :
                   day == 1 ? '월' :
                   day == 2 ? '화' :
                   day == 3 ? '수' :
                   day == 4 ? '목' :
                   day == 5 ? '금' : '토';
                   
        } 

        const todoObj = {
            todoDate: `${nowDate.getFullYear()}.${nowDate.getMonth() + 1}.${nowDate.getDate()}(${convertDay(nowDate.getDay())})`,
            todoDateTime: `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`,
            todoContent: mainInput.value
        }

        this.todoList.push(todoObj);
        this.updateLocalStorage();
        this.loadTodoList();
     }

     loadTodoList() {
        const mainTodoUl = document.querySelector(".main-todo-ul");
        mainTodoUl.innerHTML = ``;
        this.todoList.forEach(todoObj => {
            mainTodoUl.innerHTML += `
            <li class="main-todo-li">
                <div class="main-todo-div">
                    <input type="checkbox" class="check-button">
                </div>
                <div class="text">
                    ${todoObj.todoContent}
                </div>
                <div>
                    <button type="button" class="edit-button"><i class="fa-solid fa-pen"></i>
                    </button>
                </div>
                <div>
                    <button type="button" class="remove-button"><i class="fa-solid fa-circle-minus"></i>
                    </button>
                </div>
            </li>
                `;
        });
        
        AddEvent.getInstance().addEventCheckBox();
        AddEvent.getInstance().addEventRemoveTodoClick();
        AddEvent.getInstance().addEventModifyOkClick();
     }


}