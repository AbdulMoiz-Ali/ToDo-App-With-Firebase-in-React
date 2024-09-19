import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../configration/firebaseconf';
import Todo from '../component/todo';
import SignUpModal from '../component/alert';

function Home() {
  let userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  // const [loder, setloder] = useState(null)


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserAuthenticated(!!user);
    });

    const timer = setTimeout(() => {
      if (!isUserAuthenticated && !hasShownAlert) {
        setIsModalOpen(true);
        setHasShownAlert(true);
      }
    }, 5000); // 50 seconds

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [hasShownAlert, isUserAuthenticated]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // console.log(uid)
      // setloder(false);
      getDoc(doc(db, "users", uid))
        .then((snapshot) => {
          userData = snapshot.data();
          // const name = document.getElementById("name-add");
          // const email = document.getElementById("email-add");
          // name.innerHTML = userData.firstname;
          // email.innerHTML = userData.email;
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ uid, firstName: userData.firstname })
          );
          // console.log(userData.name)
          // getAllProducts();
          // getAllProducts();

        })
        .catch((err) => {
          // console.log(err);
        });
      // console.log(user)
      console.log(uid, "===> loged in");

    } else {
      // console.log("errr")
      // setloder(false)
    }
  });




  return (
    <>
      <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Todo />
    </>

  )
}

export default Home