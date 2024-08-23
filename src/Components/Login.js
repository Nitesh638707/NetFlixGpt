import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {   createUserWithEmailAndPassword , signInWithEmailAndPassword,updateProfile } from "firebase/auth";

import { auth } from "../utils/firebase";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState("true");
  const navigate=useNavigate();
  const[errorMessage,setErrorMessage]=useState(null);
  const email=useRef(null);
  const password=useRef(null); 
  const name=useRef(null);
  const mobNumber=useRef(null);  
  const dispatch=useDispatch();
  const handleButtonClick=()=>{
    //?validate the form data
    //? we can get email and password enter by user by using state variable and put inside checkValidData function for validation 
    //? but we use second way we use useRef hook  that will work as references of input boxes and store their data that will entered by user and validate them

    //?checkValidData()
    //console.log(email.current.value);
    //console.log(password.current.value);
    
     

    const message=checkValidData(email.current.value,password.current.value);
    //console.log(message);
    setErrorMessage(message);
    if(message) return;

    //? if message is null then we can sign in/sign up users 
    if(!isSignInForm){
      //? sign up Logic
      
createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log(user);
    updateProfile(user, {
      displayName: name.current.value, 
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
      const {uid,email,displayName}=auth.currentUser;
      dispatch(addUser({uid:uid,email:email,displayName:displayName}));
      navigate("/browse");
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMessage(error.message);
    });
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  }); 
 
    }else{
      //? sign in Logic 
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {

    const user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });
  navigate("/browse")
    }

  };
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg" alt="logo"/>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4"> {isSignInForm?"Sign In":"Sign Up"}</h1>
        {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name" className="p-2 my-2 w-full bg-gray-700"/>)}
        {!isSignInForm && (<input ref={mobNumber}type="phone no" placeholder="Phone Number" className="p-2 my-2 w-full bg-gray-700"/>)}
        <input ref={email} type="text" placeholder="Email Address" className="p-2 my-2 w-full bg-gray-700"/>
        <input ref={password} type="password" placeholder="Password" className="p-2 my-2 w-full bg-gray-700"/>
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button  className="p-4 my-2 bg-red-700 w-full rounded-lg " onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
        <p className="py-6 cursor-pointer" onClick={toggleSignInForm} >{isSignInForm?"New to Netflix? Sign Up Now.":"Already registered? Sign Up Now."}</p>
      </form>
    </div>

  );
};

export default Login