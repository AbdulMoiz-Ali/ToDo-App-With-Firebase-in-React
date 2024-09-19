import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../configration/firebaseconf';

function Login() {
    const navigate = useNavigate();
    const email = useRef()
    const password = useRef()
    const [loder, setloder] = useState(null)
    // function loders(bloen) {
    //     if (bloen === true) {
    //         <div class="loader"></div>
    //     }

    // }
    const loginfoam = (e) => {
        e.preventDefault();
        setloder(true)
        // console.log(email.current.value, password.current.value);

        signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
        )
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // setloder()
                <div className="loader hidden"></div>
                // console.log(user);
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                // console.log(errorMessage);
            }).finally(() => {
                setloder(false); 
            });
    }



    const signupgo = () => {
        // Navigate to specific path
        navigate('/signup')
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://i.ibb.co/RbVPLgH/todo.png" alt="todo" border="0" />
                    {/* <img className="mx-auto h-10 w-auto" src="src/assets/todo.512x512.png" alt="Your Company" /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In To Your Account</h2>
                </div>
                {loder ? (
                    <div className="loader mx-auto mt-4"></div>
                ) : (
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={loginfoam} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input type="email" ref={email} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input ref={password} type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            </div>
                        </form>
                        {/* {loder && (
                            <div className="loader mx-auto mt-4"></div>
                        )} */}
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not registered?
                            <button onClick={signupgo} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create an account.</button>
                        </p>
                    </div>)}
            </div>
        </>
    )
}

export default Login