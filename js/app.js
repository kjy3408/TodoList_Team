window.onload = () => {
    TodoService.getInstance().goToTime();
    TodoService.getInstance().nowTime();
    AddEvent.getInstance().addEventInputButtonClick();
    AddEvent.getInstance().addEventInputKeyUp();

 
    TodoService.getInstance().loadTodoList();
}