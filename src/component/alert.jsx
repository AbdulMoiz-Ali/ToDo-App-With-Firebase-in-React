import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpModal({ isOpen, onClose }) {
    const navigator = useNavigate()
    function gosignup() {
        navigator("signup")
    }
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h2 className="text-xl font-bold text-center text-gray-800">Sign Up Now!</h2>
                        <p className="mt-2 text-center text-gray-600">
                            You need to sign up to save your task history. Please create an account to continue.
                        </p>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    // Handle sign-up logic
                                    console.log('Sign Up');
                                    onClose();
                                    gosignup();
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default SignUpModal