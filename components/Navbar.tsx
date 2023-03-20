'use client'
import { signInWithPopup, GithubAuthProvider, getRedirectResult, signOut, signInWithRedirect } from 'firebase/auth';
import { auth } from '../auth/firebaseClient';

interface CurrentUser {
  uid: string,
  displayName: string|null;
  email: string|null,
}

class User implements CurrentUser {
  constructor(public uid: string, public displayName: string|null, public email: string|null) {}
}

export default function Navbar() {
  const provider = new GithubAuthProvider();


  const login = async() =>{
    provider.addScope('repo');
    await signInWithPopup(auth, provider).then(function(result) {

      var user = result.user;
      const currentUser = new User(user.uid, user.displayName, user.email)
      localStorage.setItem('currentUser', JSON.stringify(currentUser))

    fetch('https://www.niidl.net/userAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentUser)
    })
    .then(response => response.text())
    .then(data => {
      console.log('component/navbar.data',data)
      try{
        const parsedData = JSON.parse(data);
        localStorage.setItem('githubName', JSON.stringify(parsedData))
      } catch (error){
        console.error('Invalid response', error)
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  
}
  


  return (
    <div className={'navbar'}>
      <div className={'logo'}>niidl</div>
      
      <div>
        <button
        onClick={login}
        >
          Login
        </button>
        <button
        onClick={login}
        >
          Signup
        </button>
        <button
        onClick={async() => {
          console.log("signout")
          localStorage.removeItem('currentUser')
          localStorage.removeItem('githubName')
          await signOut(auth)
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}
