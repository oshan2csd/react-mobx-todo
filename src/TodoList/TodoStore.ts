import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";


interface TodoItem{
    id:number;
    title:string;
    isCompleted:boolean;
}

export default class TodoStore{

    todos: TodoItem[] = [];

    constructor() {
        // makeObservable(this, {
        //     todos: observable,
        //     addTodo:action,
        //     toggleTodo:action,
        //     status:computed
        // });

        makeAutoObservable(this);// can write cleaner code with AutoObservable

    }


    addTodo(title: string) {
        const item: TodoItem = {
            id: +Math.random().toFixed(4),
            title,
            isCompleted: false
        }
        this.todos.push(item);
    }

    /* If Id matches toggles complete sta tus */
    toggleTodo(id:number){
        const i = this.todos.filter(x=> x.id === id);
        if(i){
            i[0].isCompleted = !i[0].isCompleted;
        }
    }

    /* Calculate completed and remaining items */
    get status() {
        let completed = 0, remaining = 0;
        this.todos.forEach(td => {
            if(td.isCompleted){
                completed++;
            }
            else{
                remaining++;
            }               
        });
        return {completed,remaining}   //returning an object 
    }
}

/* This will be used in all other components */
export const Todo_Store =  new TodoStore();