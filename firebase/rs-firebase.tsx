import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useState, useEffect, useCallback } from 'react';
const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const auth = firebase.auth();

const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("The user is logged in");
    } else {
      console.log("The user is not logged in");
    }
  });


const loginWithGoogle = async () => {
    try {
    var provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);}
    catch(e) {
        console.log(e);
    }
}

const logout = () => {
    firebase.auth().signOut();
  }

const useFirebaseAuth = () => {
    if (typeof window !== 'undefined') {
        
    loginWithGoogle();
      }
}

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({loggedIn: true, email: user.email});
    } else {
      callback({loggedIn: false});
    }
  });
}

function ProvideUser(props) {
    const [user, setUser] = useState( {loggedIn: false} );
    useEffect(() => {
      const unsubscribe = onAuthStateChange(setUser);
      return () => {
        unsubscribe();
      }
    }, []);

    return (
      <UserProvider value={user}>
        {props.children}
      </UserProvider>
    );
  }
export {
  ProvideUser,
  UserContext,
    loginWithGoogle,
    logout,
    auth,
    firebase
};