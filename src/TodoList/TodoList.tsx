import { observer } from 'mobx-react-lite';
import  React, { useState } from 'react'
import TodoStore from './TodoStore';


/* This component will interact with store via Props */
interface TodoListProps{
    todoStore: TodoStore
}

function TodoList({todoStore}: TodoListProps) {

    const [item, setItem] = useState('');
    const status = todoStore.status;// Inside store this function written as a getter. So, we can 
    //access it as a property. 

    
    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: string) { 
        if(value){
            todoStore.addTodo(value);
            setItem('');
        }
    }
    
    return(
        <>
            <h1>Simple ToDo List</h1>
            <h5>
                <p>
                    <i style={{color:'red'}} >
                        Note: This project has used, <a href='https://reactjs.org/'>React</a> and <a href='https://mobx.js.org/README.html'>MobX </a>for state management
                        <br/>
                        <br/> 
                    </i>
                    * Type a todo and click on submit 
                    <br/>
                    <br/>
                    * When you completed an item click on that item to mark completed
                    <br/>
                    <br/>
                    * Click again to mark uncompleted
                </p>
            </h5>
            <input 
                type='text' 
                onChange={ (event) => {
                    setItem(event.target.value);
                    }
                }
                value={item}
            />

            <button onClick= { (event) => {
                    handleSubmit(event, item);                   
                }} 
            >
                Submit
            </button>

            <br/>
            Completed: {status.completed}
            <br/>
            Remaining: {status.remaining}
            

{/*
* As soon as submit clicked, todos list will change (**Note: todos is a property of Store)
* By wrapping component inside a observer Higher Order Function,
* It will notify TodoList Component about state change
* So, it will re-render as soon as something changed 
*/}
            <ul>
                {todoStore.todos.map( (t) => {
                    return <ul onClick = {() => {todoStore.toggleTodo(t.id)}} key={t.id}>
                                [{t.isCompleted ? 'X' : ' '}]{t.title} 
                            </ul>
                })}
            </ul>
        </>
    )
}
export default observer(TodoList);



