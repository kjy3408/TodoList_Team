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
        const removeIndex = TodoService.getInstance().clearIndex;

        for(let i = 0; i < checkButtons.length; i++){
            if(checkButtons[i].checked){
                texts[i].style.textDecoration = 'line-through';
            }else {
                texts[i].style.textDecoration = 'none';
            }
            checkButtons[i].onclick = () => {                    
                if(checkButtons[i].checked){
                    texts[i].style.textDecoration = 'line-through';
                    todoList[i].checked = true;
                    removeIndex.push(i);
                     
                }else {
                    texts[i].style.textDecoration = 'none';
                    todoList[i].checked = false;
                    removeIndex.splice(removeIndex.indexOf(i), 1);
                    //선택삭제 과정중....
              
         
                }
                TodoService.getInstance().updateLocalStorage();
            }
        }
    }

    addEventAllClear() {
        const allClear = document.querySelector(".all-clear");
        allClear.onclick = () => {
            ModalService.getInstance().showAllClearModal();
        }
    }

    addEventInputKeyUp() {
        const mainInput = document.querySelector(".main-input");
        mainInput.onkeyup = () => {
            if(window.event.keyCode == 13){
                const mainInputButton = document.querySelector(".main-input-button");
                mainInputButton.click();
            }
        }
    }

    addEventSelectClear() {
        const selectClear = document.querySelector(".select-clear");
        
        selectClear.onclick = () => {
                console.log(TodoService.getInstance().clearIndex);
                ModalService.getInstance().showSelectClearModal();
                TodoService.getInstance().updateLocalStorage();
        }
    }

    addEventInputButtonClick() {
       const mainInputButton = document.querySelector(".main-input-button");
       mainInputButton.onclick = () => {
        const mainTodoInput = document.querySelector(".main-input");
        if(mainTodoInput.value.trim() !== "") {
            TodoService.getInstance().addTodo();
            mainTodoInput.value = ``;
        } else {
            alert("입력값이 없습니다.");
        }
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
        const editButtons = document.querySelectorAll(".edit-button");
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
    clearIndex = new Array();

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
        const checkButtons = document.querySelectorAll(".check-button");
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
            todoDateTime: `${String(nowDate.getHours()).padStart(2,"0")}:${String(nowDate.getMinutes()).padStart(2,"0")}:${String(nowDate.getSeconds()).padStart(2,"0")}`,
            todoContent: mainInput.value,
            checked: false,
        }

        this.todoList.push(todoObj);
        // this.todoList.push(checkObj);
        this.updateLocalStorage();
        this.loadTodoList();
     }
     
     loadTodoList() {
        const mainTodoUl = document.querySelector(".main-todo-ul");
        mainTodoUl.innerHTML = ``;
        this.todoList.forEach(todoObj => {
            mainTodoUl.innerHTML += `
            <div class="todo-date">${todoObj.todoDate} / ${todoObj.todoDateTime}</div>
            <li class="main-todo-li">
                <div class="main-todo-div">
                    <input type="checkbox" class="check-button" ${todoObj.checked ? "checked" : ""}>
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
        AddEvent.getInstance().addEventAllClear();
        AddEvent.getInstance().addEventSelectClear();
    }

     throttle(func, limit) {
        let inThrottle;
        return function () {
          const context = this;
          const args = arguments;
          if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
              inThrottle = false;
            }, limit);
          }
        };
      }

     goToTime() {
        const nowTime = document.querySelector(".now-time");
        const updateNowTime = () => {
            const nowDate = new Date();
            nowTime.innerHTML = `
                <h1 class="d-time">${nowDate.toLocaleTimeString()}</h1>
            `;
        }
        const throttledUpdateNowTime = this.throttle(updateNowTime, 1000);
        setInterval(throttledUpdateNowTime, 1);
     }

      nowTime() {
        const nowTime = document.querySelector(".now-time");
        const updateNowDate = () => {
            const nowDate = new Date();
            this.todoList.forEach(date => {
                nowTime.innerHTML = `
                    <h1 class="now-time">${nowDate.toLocaleTimeString()}</h1>
                    <h1 class="d-time">${date.todoDate}</h1>
                `;
            });
        }
        const throttleUpdateNowDate = this.throttle(updateNowDate, 1000);
        setInterval(throttleUpdateNowDate, 1);
     }

}




