import { observer } from 'mobx-react-lite';
import  React, { useState } from 'react'
import { Card } from 'react-bootstrap';
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
                </p>
                <Card>
                    <Card.Body>
                         Type a todo and click on submit<br/>
                         When you completed an item click on that item to mark completed<br/>
                         Click again to mark uncompleted
                    </Card.Body>
                </Card>
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
                    return <div key={t.id}>
                                <input type='Checkbox' checked={t.isCompleted} onChange= {() => {
                                    todoStore.toggleTodo(t.id)}} >
                                </input>   
                                {t.title}    
                            </div>
                })}
            </ul>
            
        </>
    )
}
export default observer(TodoList);



