class ModalEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalEvent();
        }
        return this.#instance;
    }

    addEventRemoveOkClick(removeIndex) {
        const modalOkButton = document.querySelector(".modal-ok-button");
        modalOkButton.onclick = () => {
            TodoService.getInstance().todoList.splice(removeIndex, 1);
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }

    addEventAllClearOkClick() {
        const modalOkButton = document.querySelector(".modal-ok-button");
        modalOkButton.onclick = () => {
            TodoService.getInstance().todoList = new Array();
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }

     addEventSelectClearOkClick() {
        const modalOkButton = document.querySelector(".modal-ok-button"); 
        modalOkButton.onclick = () => {
            TodoService.getInstance().clearIndex.sort((a,b) => a-b);
            TodoService.getInstance().clearIndex.reverse();
            console.log("clearIndex...")
            console.log(TodoService.getInstance().clearIndex)
            console.log("todoList...")
            console.log(TodoService.getInstance().todoList);
            TodoService.getInstance().clearIndex.forEach(index => {
                TodoService.getInstance().todoList.splice(index, 1);
            });
            TodoService.getInstance().clearIndex = new Array();
            console.log("reset clearIndex...")
            console.log(TodoService.getInstance().clearIndex)
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }

    addEventCancelClick() {
        const modalCancelButton = document.querySelector(".modal-cancel-button");
        modalCancelButton.onclick = () => {
            ModalService.getInstance().closeModal();
        }
    }
}

class ModalService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ModalService();
        }
        return this.#instance;
    }

    showModal() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("modal-hidden");
    }

    closeModal() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.add("modal-hidden")
    }

    showRemoveModal(removeIndex) {
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
        <div class="modal-header">
                <h1 class="modal-title">LIST 삭제</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">List를 삭제하시겠습니까?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">확인</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
        ModalEvent.getInstance().addEventRemoveOkClick(removeIndex);
        ModalEvent.getInstance().addEventCancelClick();
        this.showModal();   
    }

    showAllClearModal() {
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
        <div class="modal-header">
                <h1 class="modal-title">LIST 삭제</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message" style="red">전체삭제 하시겠습니까?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">확인</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
        ModalEvent.getInstance().addEventAllClearOkClick();
        ModalEvent.getInstance().addEventCancelClick();
        this.showModal();
        
    }

    showSelectClearModal() {
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
        <div class="modal-header">
                <h1 class="modal-title">LIST 삭제</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">선택된 List를 삭제하시겠습니까?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">확인</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
        
        ModalEvent.getInstance().addEventSelectClearOkClick();
        ModalEvent.getInstance().addEventCancelClick();
        this.showModal();   
    }
}