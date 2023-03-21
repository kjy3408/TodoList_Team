window.onload = () => {
    AddEvent.getInstance().addEventInputButtonClick();
    AddEvent.getInstance().addEventInputKeyUp();
    AddEvent.getInstance().addEventSelectClear();

 
    TodoService.getInstance().loadTodoList();
}