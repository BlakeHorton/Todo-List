import { useEffect, useState } from 'react'
import TrashButton from './components/TrashButton'
import PocketBase from 'pocketbase'
import CreateButton from './components/CreateButton'
const pb = new PocketBase('http://127.0.0.1:8090')

//TODO Make todos red when not done
//TODO make other cards blurred when not focused

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const records = await pb.collection('todos').getFullList(200, {
      sort: '-created',
    })
    setTodos(records)
    console.log(records)
  }
  async function deleteTodo(id) {
    await pb.collection('todos').delete(id)
  }
  async function updateTodo(id, todo) {
    await pb.collection('todos').update(id, todo)
  }
  async function createTodo() {
    const todoDraftIndex = todos.findIndex((todo) => todo.isDraft)
    const todoToCreate = todos[todoDraftIndex]
    if (!todoToCreate) return
    delete todoToCreate.isDraft
    const record = await pb.collection('todos').create(todoToCreate)
    const tempstate = [...todos]
    tempstate.splice(todoDraftIndex, 1, record)
    setTodos(tempstate)
  }

  return (
    <div className="bg-[#1dec99] min-w-screen min-h-screen p-10 text-slate-800">
      <div className="flex justify-center items-center">
        <div className="flex justify-center text-7xl mb-10 font-bold border-8 w-1/2 bg-[#ffffff]">
          TODOS
        </div>
      </div>
      <div className=" flex flex-wrap items-center gap-5 justify-center">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={
              todo.isDraft || todo.done
                ? 'border w-[500px] p-7 border-gray-300 bg-[#ffffff] shadow-md rounded-3xl'
                : 'border w-[500px] p-7 border-red-100 bg-red-100 shadow-md rounded-3xl'
            }
          >
            <div className="flex justify-between items-center">
              {todo.isDraft ? (
                <input
                  type="text"
                  onChange={(event) => {
                    const tempState = [...todos]
                    tempState.splice(index, 1)
                    const newTodo = {
                      ...todo,
                      title: event.target.value,
                    }
                    tempState.splice(index, 0, newTodo)
                    setTodos(tempState)
                  }}
                />
              ) : (
                <div className="text-xl font-extrabold underline italic">
                  {todo.title}
                </div>
              )}
              {todo.isDraft ? (
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-teal-300 text-white font-medium px-1 rounded-md"
                    onClick={createTodo}
                  >
                    Save
                  </button>
                  <TrashButton
                    onClick={() => {
                      const tempState = [...todos]
                      tempState.splice(index, 1)
                      setTodos(tempState)
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="border-emerald-500 focus:ring-0 text-emerald-500 p-2.5 rounded"
                    defaultChecked={todo.done}
                    onChange={(event) => {
                      const tempState = [...todos]
                      tempState.splice(index, 1)
                      const newTodo = {
                        ...todo,
                        done: event.target.checked,
                      }
                      tempState.splice(index, 0, newTodo)
                      setTodos(tempState)
                      updateTodo(newTodo.id, newTodo)
                    }}
                  />
                  <TrashButton
                    onClick={() => {
                      const tempState = [...todos]
                      tempState.splice(index, 1)
                      setTodos(tempState)
                      deleteTodo(todo.id)
                    }}
                  />
                </div>
              )}
            </div>
            <div className="mt-2">
              {todo.isDraft ? (
                <textarea
                  className="w-full h-[80px] min-h-[80px] max-h-[80px]"
                  onChange={(event) => {
                    const tempState = [...todos]
                    tempState.splice(index, 1)
                    const newTodo = {
                      ...todo,
                      body: event.target.value,
                    }
                    tempState.splice(index, 0, newTodo)
                    setTodos(tempState)
                  }}
                />
              ) : (
                <div className="text-normal h-[80px] max-h-[80px] overflow-y-scroll font-oswald ">
                  {todo.body}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <CreateButton
        onClick={() => {
          const alreadyHasDraft = todos.some((todo) => todo.isDraft)
          if (alreadyHasDraft) return
          const tempTodo = {
            title: '',
            body: '',
            done: false,
            isDraft: true,
          }
          const tempState = [...todos]
          tempState.splice(0, 0, tempTodo)
          setTodos(tempState)
        }}
      />
    </div>
  )
}

export default App
