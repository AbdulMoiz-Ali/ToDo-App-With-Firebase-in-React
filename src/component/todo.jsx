import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../configration/firebaseconf';

function Todo() {
  const [todo, setTodo] = useState([]);
  const todotask = useRef();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'usertask', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setTodo(docSnap.data().todotask || []);
          }
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        }
      }
    };
    fetchTasks();
  }, [user]);








  const saveTasks = async (updatedTodo) => {
    if (user) {
      try {
        await setDoc(doc(db, 'usertask', user.uid), { todotask: updatedTodo });
      } catch (error) {
        console.error("Error saving tasks: ", error);
      }
    }
  };

  function createtodo(e) {
    e.preventDefault();
    const taskValue = todotask.current.value.trim();
    if (taskValue) {
      const updatedTodo = [...todo, { task: taskValue, timestamp: new Date().toISOString() }];
      setTodo(updatedTodo);
      saveTasks(updatedTodo);
      todotask.current.value = "";
    } else {
      alert("Please put a task!");
    }
  }

  const delet = (index) => {
    const updatedTodo = todo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
    saveTasks(updatedTodo);
  };

  const edit = (index) => {
    const currentTask = todo[index].task; // Access the task property
    const edittodo = prompt("Edit Task!", currentTask);
    if (edittodo !== null && edittodo.trim()) {
      const updatedTodo = todo.map((item, i) => (i === index ? { ...item, task: edittodo } : item));
      setTodo(updatedTodo);
      saveTasks(updatedTodo);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='flex flex-col items-center justify-cente'>
          <h1 className="text-2xl mb-4">Welcome to the ToDo App!</h1>
        </div>
        <form onSubmit={createtodo} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Task"
              ref={todotask}
              required
              className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
        {todo.length > 0 ? (
          todo.map((todoitemm, index) => (
            <div className="tasktodo" key={index}>
              <div className="mt-6 border-t border-gray-200 flex items-center justify-between py-4">
                <div className="flex-1">
                  <p className="font-bold leading-7 text-gray-900 sm:tracking-tight">{todoitemm.task}</p>
                  <p className="text-gray-600 text-sm">{new Date(todoitemm.timestamp).toLocaleString()}</p>
                </div>
                <div className="ml-4 flex space-x-2">
                  <button
                    onClick={() => delet(index)}
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-600"
                  >
                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m6 0l-3 3m3-3l-3-3M3 6h18M6 6V4a1 1 0 011-1h10a1 1 0 011 1v2M6 6h12M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6H6z" />
                    </svg>
                    Delete
                  </button>
                  <button
                    onClick={() => edit(index)}
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-green-600"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />                 </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>

          ))
        ) : (
          <h3 className="font-semibold text-lg mt-6 text-center p-4 text-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-md shadow-lg">Task Not Found!</h3>
        )}
      </div>
    </div>
  );
}

export default Todo;