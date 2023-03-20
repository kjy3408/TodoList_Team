window.onload = () => {
    AddEvent.getInstance().addEventInputButtonClick();
 
    TodoService.getInstance().loadTodoList();
    TodoService.getInstance();
}