// import ToDoItem from '../Models/todo'

window.addEventListener('DOMContentLoaded', function () {
    var todoItems = initializeToDoItems();
    createToDoItemComponent(todoItems); 
    item = todoItems;
}, false);

class ToDoItem {
    constructor(id, title, priority, limit, isFinished ,isDeleted, createdAt, updatedAt){
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.limit = limit;
        this.isFinished = isFinished;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

// 初期値設定
function initializeToDoItems() {
    var todoItems = [
        new ToDoItem (
            1,
            "Play Monster Hunter",
            "HIGH",
            "2020/08/08",
            true,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            2,
            "Save Money",
            "HIGH",
            "2020/08/08",
            false,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            3,
            "Remove Project",
            "HIGH",
            "2020/08/08",
            false,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            4,
            "Study Vue",
            "HIGH",
            "2020/08/08",
            true,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            5,
            "Read Invert",
            "HIGH",
            "2020/08/08",
            false,
            false,
            "2020/08/08",
            "2020/08/08"
        )
    ]    
    return todoItems;
};

// UI部品作成
function createToDoItemComponent(todoItems) {
    todoItems.forEach(element => {
        var item = document.createElement('li');
        item.className = 'list-group-item';
        var input_checkBox = document.createElement('input');
        input_checkBox.type = 'checkbox';
        input_checkBox.name = 'toggle-is-finished-checkbox';
        input_checkBox.className = 'form-check-input';
        input_checkBox.checked = element.isFinished;
        input_checkBox.addEventListener('change', function(){
            onToggleCheckbox(element.id);
        });
        item.appendChild(input_checkBox);

        var id = document.createElement('a');
        id.textContent = element.id;
        id.class = 'id';
        item.appendChild(id);

        var title = document.createElement('a');
        title.textContent = element.title;
        title.class = 'title';
        item.appendChild(title);

        var priority = document.createElement('a');
        priority.textContent = element.priority;
        priority.class = 'priority';
        item.appendChild(priority);

        var limit = document.createElement('a');
        limit.textContent = element.limit;
        limit.class = 'limit';
        item.appendChild(limit);

        var input_editButton = document.createElement('input');
        input_editButton.type = 'button';
        input_editButton.name = 'edit-button';
        input_editButton.className = 'btn btn-primary';
        input_editButton.class = 'item-button';
        input_editButton.addEventListener('click', function(){
            onClickEditIcon(element.id)
        });
        item.appendChild(input_editButton);

        var input_deleteButton = document.createElement('input');
        input_deleteButton.type = 'button';
        input_deleteButton.name = 'delete-button';
        input_deleteButton.className = 'btn btn-primary';
        input_deleteButton.class='item-button';
        input_deleteButton.addEventListener('click', function(){
            onclickDeleteButton(element.id)
        });
        item.appendChild(input_deleteButton);

        var list = document.getElementById('todo-item-list');
        list.appendChild(item);
    });
};

function onClickPlusButton() {

}

function onToggleCheckbox(id, isFinished) {
    console.log(id);
}

function onClickEditIcon(id) {
    console.log('click:',id);
}

function onclickDeleteButton(id) {
    console.log('delete event:', id)
}