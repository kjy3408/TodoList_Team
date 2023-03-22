window.onload = () => {
    TodoService.getInstance().nowTime();

    AsideEvent.getInstance().addEventShowMenuButton();
    AddEvent.getInstance().addEventInputButtonClick();
    AddEvent.getInstance().addEventInputKeyUp();
 
    TodoService.getInstance().loadTodoList();
}