import React, { useState, useEffect } from 'react'
import '../CSS/Todo.css'


const getLocalItmes = () => {
    let list = localStorage.getItem('taskList');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('taskList'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputTask, setinputTask] = useState('');
    const [items, setItems] = useState(getLocalItmes());
    const [taskSubmit, setTaskSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputTask) {
            alert(`Cant't submit with empty task....`);
        } else if (inputTask && !taskSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputTask }
                    }
                    return elem;
                })
            )
            setTaskSubmit(true);

            setinputTask('');

            setIsEditItem(null);
        } else {
            const allinputTask = { id: new Date().getTime().toString(), name: inputTask }
            setItems([...items, allinputTask]);
            setinputTask('')
        }
    }


    const deleteItem = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
    }


    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });
        console.log(newEditItem);

        setTaskSubmit(false);

        setinputTask(newEditItem.name);

        setIsEditItem(id);

    }


    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="outer-box">
                <div className="inner-box">
                    <figure>

                        <figcaption>Hey!! Add your tasks here....</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="Add Items..."
                            value={inputTask}
                            onChange={(e) => setinputTask(e.target.value)}
                        />
                        {
                            taskSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> :
                                <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }

                    </div>

                    <div className="allItems">

                        {
                            items.map((elem) => {
                                return (
                                    <div className="oneItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>

                    <div className="allItems">
                        <button className="btn " onClick={removeAll}><span className='dltBtn'> Remove All </span> </button>
                    </div>
                </div>

            </div>
            <div className="footer">Coded by Shobhit Kushwaha</div>

        </>
    )
}

export default Todo
