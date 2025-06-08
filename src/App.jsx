import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const[todo,setTodo]=useState("")
  const[todos,setTodos]=useState([])

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    console.log("Loaded from localStorage:", todoString);
    if (todoString) {
      try {
        const todos = JSON.parse(todoString);
        setTodos(todos);
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error);
        setTodos([]);
      }
    }
  }, [])
  

  const saveToLS = (updatedTodos) => {
    console.log("Saving to localStorage:", updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEdit =(e,id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete =(e,id)=>{
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  }

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleChange =(e)=>{
    setTodo(e.target.value)
    
  }

  const handleCheckbox =(e)=>{
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  }
  return (
    <>
    <Navbar />
    <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gray-900 min-h-[80vh] md:w-1/2'>
      <h1 className='font-bold text-center text-xl text-gray-100'>TaskMate – Your trusty companion for getting things done.</h1>
      <div className='addTodo my-5 flex flex-col gap-4'>
        <h2 className='text-lg font-bold text-gray-300'>Add a Todo</h2>
        <input 
          onChange={handleChange} 
          value={todo} 
          type="text" 
          className='w-full rounded-full px-5 bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500' 
        />
        <button 
          onClick={handleAdd} 
          disabled={todo.length <= 3} 
          className='bg-violet-700 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-gray-100 rounded-md'
        >
          Save
        </button>
      </div>
      <h2 className='text-lg font-bold text-gray-300'>Your Todo</h2>
      <div className='todos'>
        {todos.length === 0 && <div className='m-5 text-gray-500'>No Todos to Display</div>}
        {todos.map(item => {
          return (
            <div key={item.id} className='todo flex md:w-1/2 my-3 justify-between bg-gray-800 p-3 rounded-md'>
              <div className='flex gap-5'>
                <input 
                  name={item.id} 
                  onChange={handleCheckbox} 
                  type="checkbox" 
                  value={item.isCompleted} 
                  className='accent-violet-500' 
                />
                <div className={item.isCompleted ? "line-through text-gray-500" : "text-gray-100"}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button 
                  onClick={(e) => handleEdit(e, item.id)} 
                  className='bg-violet-700 hover:bg-violet-800 p-3 py-1 text-sm font-bold text-gray-100 rounded-md mx-1'
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={(e) => { handleDelete(e, item.id) }} 
                  className='bg-red-700 hover:bg-red-800 p-3 py-1 text-sm font-bold text-gray-100 rounded-md mx-1'
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </>
  )
}

export default App
