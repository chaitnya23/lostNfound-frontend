// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import { loginUser, signupUser } from '../helpers/use-auth';
import { toast } from 'react-toastify';
// import { GetAppContext } from '../context/app-context';

const firebaseConfig = {
  apiKey: "AIzaSyBXMaL28jBhn3EjiMSlxsOMtVF2dew05iY",
  authDomain: "lost-and-found-app-4f3a2.firebaseapp.com",
  projectId: "lost-and-found-app-4f3a2",
  storageBucket: "lost-and-found-app-4f3a2.appspot.com",
  messagingSenderId: "476843963189",
  appId: "1:476843963189:web:54cffde116c4d995f2127c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

// user context
export const signInWithGoogle = (setuser,setenableLoginPopup, roomNo, mobileNo, islogin)=>{

    auth.signInWithPopup(googleProvider).then((res)=>{
        // console.log(res.user._delegate.UserImpl);
        // setuser(res.user.)
        const {photoURL,email,displayName} = res.user;
        if(!email.includes("@iiitdwd.ac.in")){
            toast.error("use collage email id only!!");
            return;
        }
        setuser({profilePic:photoURL,email,name:displayName, roomNo, contact:mobileNo});
        setenableLoginPopup(false);

        loginUser({profilePic:photoURL,email,name:displayName, roomNo, contact:mobileNo},setuser);
        // else signupUser({profilePic:photoURL,email,name:displayName, roomNo, contact:mobileNo},setuser);
        
    }).catch((e)=>{
        console.log(e);
    })
}
