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
        // const a = TodoService.getInstance().todoList
        modalOkButton.onclick = () => {
            const a = TodoService.getInstance().clearIndex;
            a.sort((a,b) => a-b);
            a.reverse();
            console.log("clearIndex...")
            console.log(a)
            console.log("todoList...")
            console.log(TodoService.getInstance().todoList);
            a.forEach(index => {
                TodoService.getInstance().todoList.splice(index, 1);
            });
                       
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