window.onload = () => {
    AddEvent.getInstance().addEventInputButtonClick();
    AddEvent.getInstance().addEventInputKeyUp();


 
    TodoService.getInstance().loadTodoList();
}