export let todoIndex = 0;

export class TodoItemModel {
    /** @type {number}  TodoアイテムのID */
    id;
    /** @type {string} Todoアイテムのタイトル */
    title;
    /** @type {boolean} Todoアイテムが完了済みならばtrue, そうでない場合はfalse */
    complated;

    /**
     * @param {{ title: string, complated: boolean}}
     */
    constructor({ title, complated}) {
        this.id = todoIndex++;
        this.title = title;
        this.complated = complated;
    }
}
