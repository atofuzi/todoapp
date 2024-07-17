import { element, render } from "./view/html-util.js";

export class App {
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        const todoListElement = element`<ul></ul>`;
        
        let todoItemCount = 0;

        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(`入力値の値: ${inputElement.value}`);

            const todoItemElement = element`<li>${inputElement.value}</li>`;
            todoListElement.appendChild(todoItemElement);

            render(todoListElement, containerElement);

            todoItemCount += 1;
            todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;

            inputElement.value = "";
        });
    }
}