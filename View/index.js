'use strict';
var globalTodoItems;

// 追加モーダル制御用インスタンス
var addNewTaskModal = new bootstrap.Modal(document.getElementById('addNewTaskModal'), {
    toggle: true
});

// 編集モーダル制御用インスタンス
var editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'), {
    toggle: true
});

window.addEventListener('DOMContentLoaded', function () {
    // ToDo初期値設定
    var todoItems = initializeToDoItems();

    // ToDo明細作成、イベントハンドラ定義
    todoItems.filter(x => !x.isDeleted).forEach(element => {
        createToDoItemComponent(element); 
    });

    // プラスボタン押下時イベント
    document.getElementById('addToDoButton').addEventListener('click', function(){
        addNewTaskModal.toggle();
    }, false);

    // ToDo追加モーダル.追加ボタン押下時イベント
    document.getElementById('addTaskButton').addEventListener('click', function(){
        onClickSubmitTaskButton();
        addNewTaskModal.toggle();
    }, false);

    // ToDo追加モーダル.下Xボタン押下時イベント
    document.getElementById('bottomCloseButton').addEventListener('click', function(){
        addNewTaskModal.toggle();
    }, false);

    // ToDo追加モーダル.上Xボタン押下時イベント
    document.getElementById('topCloseButton').addEventListener('click', function(){
        addNewTaskModal.toggle();
    }, false);

    // ToDo編集モーダル.チェックボタン押下時イベント
    document.getElementById('editTaskButton').addEventListener('click', function(){
        onClickSubmitEditTaskButton();
        addNewTaskModal.toggle();
    }, false);

    // ToDo編集モーダル.下Xボタン押下時イベント
    document.getElementById('bottomEditTaskModalCloseButton').addEventListener('click', function(){
        editTaskModal.toggle();
    }, false);

    // ToDo編集モーダル.上Xボタン押下時イベント
    document.getElementById('topEditTaskModalCloseButton').addEventListener('click', function(){
        editTaskModal.toggle();
    }, false);

    globalTodoItems = todoItems;

}, false);

// アイテムクラス
class ToDoItem {
    constructor(id, title, priority, isFinished ,isDeleted, createdAt, updatedAt){
        this.id = id;
        this.title = title;
        this.priority = priority;
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
            "Study javascript",
            "HIGH",
            true,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            2,
            "Save Money",
            "HIGH",
            false,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            3,
            "Remove Project",
            "HIGH",
            false,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            4,
            "Study Vue",
            "HIGH",
            true,
            false,
            "2020/08/08",
            "2020/08/08"
        ),
        new ToDoItem (
            5,
            "Read Invert",
            "HIGH",
            false,
            false,
            "2020/08/08",
            "2020/08/08"
        )
    ]    
    return todoItems;
};

// ToDo明細作成、イベントハンドラ定義
function createToDoItemComponent(todoItem) {   
        var list = document.getElementById('todo-item-list');
        var item = document.createElement('li');
        item.className = 'list-group-item';
        list.appendChild(item);

        var row = document.createElement('row');
        item.appendChild(row);
    
        if(todoItem.isFinished){
            item.style.backgroundColor = '#e6e6fa';
        } else {
            item.style.backgroundColor = '';
        }

        var input_checkBox = document.createElement('input');
        input_checkBox.type = 'checkbox';
        input_checkBox.name = 'toggle-is-finished-checkbox';
        input_checkBox.className = 'form-check-input';
        input_checkBox.checked = todoItem.isFinished;
        input_checkBox.addEventListener('change', function(){
            onToggleCheckbox(todoItem.id, input_checkBox.checked);
            if(todoItem.isFinished){
                item.style.backgroundColor = '#e6e6fa';
            } else {
                item.style.backgroundColor = '';
            }
        });
        item.appendChild(input_checkBox);

        var id = document.createElement('a');
        id.textContent = todoItem.id;
        id.class = 'id';
        item.appendChild(id);

        var title = document.createElement('a');
        title.textContent = todoItem.title;
        title.class = 'title';
        item.appendChild(title);

        var priority = document.createElement('a');
        priority.textContent = todoItem.priority;
        priority.class = 'priority';
        item.appendChild(priority);

        var input_editButton = document.createElement('button');
        input_editButton.name = 'edit-button';
        input_editButton.className = 'btn btn-primary';
        input_editButton.class = 'item-button';
        input_editButton.addEventListener('click', function(){         
            onClickEditButton(todoItem.id, todoItem.title, todoItem.priority)
        }, false);
        item.appendChild(input_editButton);

        var pencil_icon = document.createElement('i');
        pencil_icon.className = 'bi bi-pen-fill';
        input_editButton.appendChild(pencil_icon);

        var input_deleteButton = document.createElement('button');
        input_deleteButton.name = 'delete-button';
        input_deleteButton.className = 'btn btn-primary';
        input_deleteButton.class='item-button';
        input_deleteButton.addEventListener('click', function(){
            onclickDeleteButton(todoItem.id, item, input_deleteButton)
        }, false);
        item.appendChild(input_deleteButton);

        var trush_icon = document.createElement('i');
        trush_icon.className = 'bi bi-trash-fill';
        input_deleteButton.appendChild(trush_icon);
};

// 追加モーダルチェックボタン押下時イベント
function onClickSubmitTaskButton(){
        var ids = globalTodoItems.map(function (p) {
            return p.id;
          });
    
        var id = Math.max.apply(null, ids) + 1;
        var title = document.getElementById('newTaskTextArea').value;
        var priority = document.getElementById('newTaskPrioritySelect').value;
        var isFinished = false;
        var isDeleted = false;
        var createdAt = new Date().toDateString();
        var updatedAt = new Date().toDateString();
    
        var todoItem = new ToDoItem(id, title, priority, isFinished, isDeleted, createdAt, updatedAt)
        createToDoItemComponent(todoItem);
        globalTodoItems.push(todoItem);
};

// チェックボックス押下時イベント
function onToggleCheckbox(id, checked) {
    globalTodoItems.find(x => x.id === id).isFinished = checked;
}

// 編集ボタン押下時イベント
function onClickEditButton(title, priority) {
    editTaskModal.toggle();
    var titleTextArea = document.getElementById('editTaskTextArea');
    titleTextArea.textContent = title;
    var prioritySelect = document.getElementById('editTaskModalPrioritySelect');
    prioritySelect.value = priority;
};

// 編集モーダル押下時イベント
function onClickSubmitEditTaskButton(){

};

// 削除ボタン押下時イベント
function onclickDeleteButton(id, items, input_deleteButton) {
    globalTodoItems.find(x => x.id === id).isDeleted = true;
    var selectedTodo = input_deleteButton.closest('li');
    items.removeChild(selectedTodo);
};