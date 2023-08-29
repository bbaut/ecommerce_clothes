import {initializeApp} from 'firebase/app';
import {getAuth, 
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBN49_-hAoz0KPwS9-JCrfb_8SJ99VJ130",
    authDomain: "store-clothing-db-257d5.firebaseapp.com",
    projectId: "store-clothing-db-257d5",
    storageBucket: "store-clothing-db-257d5.appspot.com",
    messagingSenderId: "968416512535",
    appId: "1:968416512535:web:0872ba4f83cff3aa892a52"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    promp: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopoup = () => signInWithPopup(auth, googleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {displayName: 'brandon'}
    ) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
  }
  export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = () => signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);