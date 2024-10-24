import { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { fetchTodos } from '../../data/todos';

import './Todo.css'

const initItemsPerPage = 10

function Todo() {

    //todosRaw --> filters --> todos --> display
    const [todosRaw, setTodosRaw] = useState([]);

    //fiilter
    const [onlyWaiting, setOnlyWaiting] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(initItemsPerPage);

    //todos
    const [todos, setTodos] = useState([]);

    //display
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        // setCurrentPage( (p) => (p => numPages ? numPages : p) );
        setCurrentPage(1)
    }, [numPages])

    useEffect(() => {
        console.log('currentPage', currentPage);
    }, [currentPage])

    useEffect(() => {
        console.log('itemsPerPage', itemsPerPage);
        setNumPages(Math.ceil(todosRaw.length / itemsPerPage));
    }, [itemsPerPage, todosRaw])

    useEffect(() => {
        console.log('onlyWaiting', onlyWaiting);
    }, [onlyWaiting])

    useEffect(() => {
        setTodosRaw(fetchTodos());
        setCurrentPage(1);
    }, []) //first load

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter((todo) => !todo.completed))
        } else {
            //show all
            setTodos(todosRaw);
        }
    }, [todosRaw, onlyWaiting, itemsPerPage])

    //event handlers
    function deleteClick(id) {

        const todoRemain = todosRaw.filter((todo) => {

            if (todo.id !== id) {
                return todo;
            }

        })

        // setTodosRaw(todoRemain);
    }

    function wattingClick(id) {
        const todoSelected = todosRaw.find((todo) => {

            if (todo.id === id) {
                return todo;
            }
        })

        todoSelected.completed = true;


        setTodosRaw([...todosRaw]); //for re-render
    }

    function addClick(id, title) {
        const newItem = {
            id,
            title,
            completed: false,
            userId: 1,
        }

        setTodosRaw([...todosRaw, newItem]); //works
    }

    //modal
    const [show, setShow] = useState(false);

    const newIdRef = useRef();
    const newTitleRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='todo-container'>
            {/* modal */}
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title><span className='bi bi-plus-lg'>&nbsp; Add Todo</span></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID :</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                disabled
                                value={
                                    Number(todosRaw.reduce((prev, todo) => {
                                        return todo.id > prev ? todo.id : prev
                                    }, 0)) + 1
                                }
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Title :</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newTitleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <span className='bi bi-x-lg'>&nbsp; Cancel</span>

                    </Button>
                    <Button variant="primary" onClick={() => {
                        const id = newIdRef.current.value
                        const title = newTitleRef.current.value.trim()
                        if (title === '') {
                            alert('Title cannot be empty')
                            newTitleRef.current.value
                            newTitleRef.current.focus()
                        }else{
                            addClick(id, title)
                            handleClose()                            
                        }
                    }}>
                        <span className='bi bi-plus-lg'>&nbsp; ADD</span>

                    </Button>
                </Modal.Footer>

            </Modal>

            {/* filter */}
            <div className='todo-filter-container'>
                <div className="form-check form-switch">
                    <input className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        
                        // checked 
                        onClick={(e) => { setOnlyWaiting(e.target.checked) }}
                    />
                    <label className="form-check-label"
                        htmlFor="flexSwitchCheckChecked"
                    >
                        Show only &nbsp;
                        <button className='btn btn-warning'
                        >
                            waiting &nbsp;
                            <span className='bi bi-clock'></span>
                        </button>
                    </label>
                </div>

                <select className="form-select"
                    aria-label="Default select example"
                    defaultValue={5}
                    style={{ width: '200px' }}
                    onChange={(e) => { setItemsPerPage(e.target.value) }}
                >
                    <option value={5} selected>5 items per page</option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </select>
            </div>

            {/* table */}
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr >
                        <th style={{ width: '10%' }} valign='middle'>ID</th>
                        <th valign='middle'>TITLE</th>
                        <th style={{ textAlign: 'right',width:'20%'}} >
                            COMPLETED
                            &nbsp;
                            <button className='btn btn-primary'
                                onClick={() => { handleShow() }}>
                                <span className='bi bi-plus-circle'></span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {

                        //itemsPerPage = 5
                        //currentPage = 1
                        //items (human readable) = 1-5
                        //items (js) = 0-4
                        //items (js) = min-max
                        // min = (currentPage - 1) * itemsPerPage
                        // max = currentPage * itemsPerPage -1

                        todos.filter((todo, index) => {
                            const min = (currentPage - 1) * itemsPerPage
                            const max = currentPage * itemsPerPage - 1
                            return index >= min && index <= max
                        })

                            .map((todo) => {
                                return (
                                    <tr key={todo.id}>
                                        <td valign='middle'><span className='badge bg-secondary'
                                            style={{ width: '3rem' }}>

                                            {todo.id}

                                        </span>
                                        </td>

                                        <td style={{ textAlign: 'left' }} valign='middle'>

                                            {todo.title}

                                        </td>

                                        <td style={{ textAlign: 'right' }} valign='middle'>
                                            <button className={'btn ' + (todo.completed ? 'btn-success' : 'btn-warning')}
                                                onClick={() => { wattingClick(todo.id) }}>

                                                {todo.completed ? 'Done' : 'Waiting'}
                                                &nbsp;

                                                <span className='bi bi-clock'></span>

                                            </button>

                                            <button className='btn btn-danger'
                                                onClick={() => { deleteClick(todo.id) }}
                                            ><span className='bi bi-trash'></span></button>

                                        </td>
                                    </tr>
                                )
                            })}
                </tbody>
            </table>

            {/* page control */}
            <div>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => { setCurrentPage(1) }}
                    disabled={currentPage === 1}
                >First</button>

                <button className='btn btn-outline-primary todo-space'
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >Previous</button>

                <span className='todo-space'>{currentPage}&nbsp;/&nbsp; {numPages} </span>

                <button className='btn btn-outline-primary todo-space'
                    onClick={() => currentPage < numPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === numPages}
                >Next</button>

                <button className='btn btn-outline-primary todo-space'
                    onClick={() => { setCurrentPage(numPages) }}
                    disabled={currentPage === numPages}
                >Last</button>

            </div>
        </div>
    );
}

export default Todo;