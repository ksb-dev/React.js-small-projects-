import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let localStorageList = localStorage.getItem("list");

  if (localStorageList) {
    return JSON.parse(localStorage.getItem("list"));
  }
  else {
    return [];
  }
}

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Please enter value");
    }
    else if (name && isEditing) {
      const newList = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name }
        }
        return item;
      });
      setList(newList);
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "Edited successfully");
    }
    else {
      showAlert(true, 'success', "Item added successfully");

      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
      setAlert({ show, type, msg });

      /*setTimeout(() => {
        setAlert({ show: true });
      }, 1000);*/
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Empty List');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item Removed');
    
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  const editItem = (id) => {

    const specificItem = list.find((item) => item.id === id);

    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])

  return (

    <section className="section-center">

      <form className="grocery-form" onSubmit={handleSubmit}>

        {
          alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>
        }

        <h3>grocery bud</h3>

        <div className="form-control">

          <input
            type="text"
            className="grocery"
            placeholder="e.g banana"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" className="submit-btn">
            {
              isEditing ? 'edit' : 'submit'
            }
          </button>

        </div>

      </form>

      {
        list.length > 0 &&
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button onClick={clearList} className="clear-btn">clear items</button>
        </div>
      }

    </section>
  )
}

export default App;