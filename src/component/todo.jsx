import React, { useRef, useState } from 'react'

function Todo() {
  const [todo, setTodo] = useState([]);
  const todotask = useRef();
  function createtodo(e) {
    e.preventDefault();
    if (todotask.current.value === "") {
      alert("plese put task!");
    } else {
      todo.push(todotask.current.value);
      setTodo([...todo]);
      console.log(todo);
      todotask.current.value = "";
    }
  }
  const delet = (index) => {
    console.log("delet", index);
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const edit = (index) => {
    console.log("edit", index);
    const edittodo = prompt("edit Task!");
    todo.splice(index, 1, edittodo);
    setTodo([...todo]);
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={createtodo} className="space-y-6">
            <div>
              <div className="mt-2">
                <input type="text" placeholder="Task" ref={todotask} autocomplete="task" required className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
            </div>
          </form>
          {todo.length > 0 ? (
            todo.map((todoitemm, index) => {
              return (
                <div className="tasktodo" key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} className="mt-6 border-t border-gray-100"><p className="font-bold leading-7 text-gray-900 sm:tracking-tight">{todoitemm}</p>
                    <div className="px-4 py-4 ml-10 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <button onClick={() => delet(index)} type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        delete
                      </button>
                      <button onClick={() => edit(index)} type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>Task Not Found!</h3>
          )}
        </div>
      </div>
    </>
  )
}

export default Todo