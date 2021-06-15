import { observer } from 'mobx-react-lite';
import  React, { useState } from 'react'
import { Button, Card, Form, FormGroup } from 'react-bootstrap';
import TodoStore from './TodoStore';


/* This component will interact with store via Props */
interface TodoListProps{
    todoStore: TodoStore
}

function TodoList({todoStore}: TodoListProps) {

    const [item, setItem] = useState('');
    const status = todoStore.status;// Inside store this function written as a getter. So, we can 
    //access it as a property. 

    
    function handleSubmit(event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) { 
        if(value && value.trim().length > 0){
            event.preventDefault();
            todoStore.addTodo(value);
            setItem('');
        }
        else{
            alert('Please enter a value..!');
            event.preventDefault();
        }
    }
    
    return(
        <>
        <div className="App">
            <header className="App-header">             
                <Form style={{margin:'50px'}}>  
                    <Form.Group controlId="formBasicInput">
                        <Form.Label>Add todo now!</Form.Label>
                        <Form.Control type="input" placeholder="Enter todo here..." onChange={ (event) => {
                                        setItem(event.target.value);
                                    }
                            }
                            value={item}>                        
                        </Form.Control>
                        <Form.Text className="text-muted">
                            This will be saved locally!
                        </Form.Text>                        
                    </Form.Group>                    
                    <Button  style={{margin:'15px'}} variant="primary" type="submit" onClick= { (event) => {
                                                handleSubmit(event, item);}}>                    
                            Add Todo                    
                    </Button>{''}
                    <Form.Group >
                        <Form.Label>Completed: {status.completed}</Form.Label><br/>                   
                        <Form.Label>Remaining: {status.remaining}</Form.Label>
                    </Form.Group>
                    
                    {/*
                    * As soon as submit clicked, todos list will change (**Note: todos is a property of Store)
                    * By wrapping component inside a observer Higher Order Function,
                    * It will notify TodoList Component about state change
                    * So, it will re-render as soon as something changed 
                    */}
                    
                    <ul>
                        {todoStore.todos.map( (t) => {
                            return <div key={t.id}>  
                                        <FormGroup style={{display: 'flex'}}>                                  
                                            <Form.Check  inline type="checkbox" checked={t.isCompleted} label={t.title} onChange= {() => {
                                                todoStore.toggleTodo(t.id)}}  >
                                            </Form.Check>                                        
                                        </FormGroup>     
                                    </div>
                        })}
                    </ul>                              
                    <Card className="mb-3" style={{color:'black'}}>
                        <Card.Body>
                            <Card.Title>
                                Todozzz
                        </Card.Title>
                        <Card.Text>
                            This project is developed with <a href='https://reactjs.org/'>React</a> with <a href='https://mobx.js.org/README.html'> MobX</a> library (for state management) 
                        </Card.Text>
                        </Card.Body>
                    </Card>                            
                </Form>
            </header>
        </div>            
        </>
    )
}
export default observer(TodoList);



