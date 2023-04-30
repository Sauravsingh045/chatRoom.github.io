import { useEffect, useState } from 'react';
import { getDatabase, push, ref, set,onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import './App.css';

function Landing() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () =>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setUser({name:result.user.displayName, email: result.user.email})
    console.log(token, user);

  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  const [user, setUser] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');



  const updateHeight=()=>{
    const el = document.getElementById('chat');
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(()=>{
    onChildAdded(chatListRef, (data) => {
      setChats(chats=>[...chats,data.val()])
      setTimeout(()=>{
        updateHeight()

      },100)
    });
  },[])


  const sendChat = () => {

    const chatRef = push(chatListRef);
    set(chatRef, {
      user, message: msg 
    });
    setMsg('');
  };
  return (
    <div>
      {user.email? null: <div>
        {/* <input
          type="text"
          placeholder="Enter user to start"
          onBlur={(e) => setUser(e.target.value)}
        ></input> */}
        
       
       
    <div className='google-sign-in'> 
    <h2 style={{fontSize:'1cm'}}>Sign in to enter into the Chatroom</h2>
        <div>
        <img className='google'
      src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
      alt="google" style={{width:'3cm',height:'3cm',padding:'2px'}}/>
        </div>
      <button  onClick={e=>{googleLogin()}} style={{ borderRadius:'30%',marginLeft:'-3%',marginTop:'5%',padding:'4px'}}><h4>Google SignIn</h4></button>
      </div>
        
      </div>}
   { user.email? <div>
      <h3 style={{backgroundColor:'#B9EDDD',padding:'6px',width:'30%',height:'1.4cm',borderRadius:'20px',marginLeft:'1%',textAlign:'center',fontFamily:'cursive',fontSize:'6mm',padding:'20px'}}>User: {user.name}</h3>
      <div id="chat" className="chat-container">

        {chats.map((c,i) => (
          <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
            <p className="chatbox">
              <strong>{c.user.name}: </strong>
              <span>{c.message}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="btm">
        <input
          type="text"
          onInput={(e) => setMsg(e.target.value)}
          value={msg}
          placeholder="enter your chat"
        ></input>
        <button onClick={(e) => sendChat()}>Send</button>
      </div>
      </div> : null}
      </div>
  );
}

export default Landing;
