import { signInWithGooglePopoup, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopoup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Account
            </button>
        </div>
    )
}

export default SignIn
