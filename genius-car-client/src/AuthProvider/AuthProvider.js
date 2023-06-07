import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {signOut,createUserWithEmailAndPassword, getAuth,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] =useState();
    const [loading,setLoading] =useState(true);

    const registerUser =(email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn =(email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logOut = ()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubcribed = onAuthStateChanged(auth,(currentUser=>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        }));

        return ()=>unSubcribed();
    },[])


    const userInfo = {user,signIn,registerUser,logOut,loading };


    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;