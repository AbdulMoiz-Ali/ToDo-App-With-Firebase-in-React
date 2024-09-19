import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../configration/firebaseconf';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const [loder, setloder] = useState(null)

  const signupfoam = (e) => {
    e.preventDefault();
    setloder(true)
    const userdata = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    };
    // console.log(userdata)

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        setDoc(doc(db, "users", user.uid), userdata).then((userRef) => {
          // console.log("succseass")
          console.log(user.uid)

        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        // console.log(errorMessage);
      }).finally(() => {
        setloder(false);
        navigate("/")
      });
  }






  const logingo = () => {
    // Navigate to specific path
    navigate('/login')
  }
  return (
    <>
      {/* <Link to={"/"} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"><button>back</button></Link> */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://i.ibb.co/RbVPLgH/todo.png" alt="todo" border="0" />

          {/* <img className="mx-auto h-10 w-auto" src="src/assets/todo.512x512.png" alt="Your Company" /> */}
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create An Account</h2>
        </div>
        {loder ? (
          <div className="loader mx-auto mt-4"></div>
        ) : (
          <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={signupfoam} className="space-y-6">
              <div className='mt-2'>
                <label className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                <div className="mt-2">
                  <input type="text" ref={name} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='mt-2'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input type="email" ref={email} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='mt-2'>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input type="password" ref={password} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className='mt-2'>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?
              <button onClick={logingo} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here...</button>
            </p>
          </div>)}
      </div>
    </>
  )
}


// export default user
export default Signup