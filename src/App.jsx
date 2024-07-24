import { useState, useEffect, createElement } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CiCirclePlus } from "react-icons/ci";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const renderTodos = () => {
    return todos.map((todo, index) => (
      <div className='todo-list-item-container'>
        <p key={index} className={`todo-${index}`}>
          {todo}
        </p>
        <button onClick={() => deleteTodo(index + 1)}>delete</button>
        <button onClick={() => editTodo(index)}>edit</button>
      </div>
    ));
  };
  const deleteTodo = (index) => {
    localStorage.removeItem(`todo-${index}`);
    let temp = todos.filter((todo, i) => i !== index - 1);
    setTodos(temp);
  };
  const editTodo = (index) => {
    let el = document.querySelector(`.todo-${index}`);
    let currentIndex = index + 1;
    let input = document.createElement("input");
    input.setAttribute("value", el.textContent);
    el.replaceWith(input);
    const save = () => {
      const previous = document.createElement(el.tagName.toLocaleLowerCase());
      previous.textContent = input.value;
      localStorage.setItem(`todo-${currentIndex}`, input.value);
      input.replaceWith(previous);
    };
    input.addEventListener("blur", save, {
      once: true,
    });
    input.focus();
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        save();
      }
    });
  };
  const addTodo = () => {
    let storageIndex = localStorage.length;
    setTodos([...todos, input]);
    saveToLocalStorage(input, `todo-${storageIndex}`);
    setInput("");
  };
  const saveToLocalStorage = (todo, index) => {
    localStorage.setItem(index, todo);
  };
  useEffect(() => {
    if (localStorage.length > 0) {
      let temp = [];
      for (let i = 1; i < localStorage.length; i++) {
        temp.push(localStorage.getItem(`todo-${i}`));
      }
      setTodos(temp);
    }
  }, []);
  const showInputBox = () => {
    return (
      <input
        type='text'
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder='Add input'
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />
    );
  };
  return (
    <>
      <main>
        <h1>List what you want here</h1>
        <button onClick={() => setShowInput(!showInput)}>
          <CiCirclePlus className='icon-add' />
        </button>
        <section>
          {todos.length > 0 ? (
            <ul className='todo-list-container'>{renderTodos()} </ul>
          ) : (
            <h2>No inputs</h2>
          )}
        </section>
        {showInput && showInputBox()}
      </main>
    </>
  );
}

export default App;
