class ModalEvent1 {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ModalEvent1();
        }
        return this.#instance;
    }

    addEventCancelClick() {
        const modalCancelButton = document.querySelector(".modal-cancel-button");
        modalCancelButton.onclick = () => {
          ModalService1.getInstance().closeModel();
      };
    }

    addEventModifyOkClick(modifyIndex) {
        const modifyOkButton = document.querySelector(".modal-ok-button");
        modifyOkButton.onclick = () => {
          const editInput = document.querySelector(".edit-input-jy"); // 내가 쓰지 못한 코드
          TodoService.getInstance().todoList[modifyIndex].todoContent = editInput.value; // 내가 쓰지 못한 코드
          TodoService.getInstance().updateLocalStorage();
          ModalService1.getInstance().closeModel();
        };
    }
}

class ModalService1 {
    static #instance = null;
    static getInstance() {
      if (this.#instance == null) {
        this.#instance = new ModalService1();
      }
      return this.#instance;
    }

    showModel() {
      const modalContainer = document.querySelector(".modal-container");
      modalContainer.classList.remove("modal-hidden");
    }
    
    closeModel() {
      const modalContainer = document.querySelector(".modal-container");
      modalContainer.classList.add("modal-hidden");
    }


    showModifyModal(modifyIndex) {
      const modalSection = document.querySelector(".modal-section");

      const todoObj = TodoService.getInstance().todoList[modifyIndex]; // 내가 쓰지 못한 코드
          modalSection.innerHTML = `
            <div class="modal-header">
              <h1 class="modal-title">LIST 수정</h1>
            </div>
            <div class="modal-main">
              <p class="modal-message">${todoObj.todoDate}.${todoObj.todoDateTime}</p>
              <input type="text" class="edit-input-jy" value="${todoObj.todoContent}">
            </div>
            <div class="modal-footer">
              <button type="button" class="modal-ok-button">수정</button>
              <button type="button" class="modal-cancel-button">취소</button>
            </div>
          `;
        
        ModalEvent1.getInstance().addEventModifyOkClick(modifyIndex);
        ModalEvent1.getInstance().addEventCancelClick();
        this.showModel();
          

      }
}

// option-box를 숨겨놓았다가 다시 꺼낼수 있도록 하는 이벤트 메소드 들어 있음
class AsideEvent {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new AsideEvent();
      }
      return this.#instance;
    }

  // menuaside를 숨겨놓은 hidden-menu를 꺼내고 다시 숨길수 있도록 하는 메소드
    addEventShowMenuButton() {
        const menuButton = document.querySelector(".main-option-button");
        menuButton.onclick = () => {
          const menubox = document.querySelector(".option-box");
          if(menubox.classList.contains("option-box-hidden")) {
            menubox.classList.remove("option-box-hidden");
          }else {
            menubox.classList.add("option-box-hidden");
          }
        }
     } 
}
