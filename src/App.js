import { element, render } from "./view/html-util.js";
import { EventEmitter } from "./EventEmitter.js";
import { TodoItemModel, todoIndex } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

// EventEmitterの使用例
const event = new EventEmitter();

event.addEventListener("test-event", () => console.log("One!"));
event.addEventListener("test-event", () => console.log("Two!"));

event.emit("test-event");



export class App {
    // TodoListModelを初期化
    #todoListModel = new TodoListModel();

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
       
        // TodoListModelで追加された時の処理を記
        this.#todoListModel.onChange(() => {
            const todoListElement = element`<ul></ul>`;
            this.#todoListModel.getTodoItems().forEach((todoItem) => {
                const todoItemElement = todoItem.complated
                ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s><button class="delete">x</button></li>`
                : element`<li><input type="checkbox" class="checkbox">${todoItem.title}<button class="delete">x</button></li>`

                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodoアイテムの完了状態を反転させる
                    this.#todoListModel.updateTodo({
                        id: todoItem.id,
                        complated: !todoItem.complated
                    });
                });

                const deleteButtonElement = todoItemElement.querySelector(".delete");
                deleteButtonElement.addEventListener("click", () => {
                    this.#todoListModel.deleteTodo({
                        id: todoItem.id
                    });
                });
                todoListElement.appendChild(todoItemElement);
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
        });

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            // 新しくTodoModelItemを生成
            const todoItem = new TodoItemModel({
                title: inputElement.value,
                complated: false
            })
            // TodoListModelに追加
            this.#todoListModel.addTodo(todoItem);

            inputElement.value = "";
        });
    }
}