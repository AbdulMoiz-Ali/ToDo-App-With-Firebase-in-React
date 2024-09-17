import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { auth, db } from '../configration/firebaseconf';
import Todo from '../component/todo';

function Home() {
  let userData;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
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
          console.log(userData.name)
          // getAllProducts();
          // getAllProducts();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(user)
      console.log(uid, "===> loged in");

    } else {
      console.log("errr")
    }
  });
  return (
    <Todo />
  )
}

export default Home