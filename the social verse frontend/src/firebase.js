import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

/*
const firebaseConfig = {
    apiKey: 'AIzaSyDsGStQLpANN-Bt-P8fRdkA0gHn7oo7UH8',
    authDomain: 'the-social-verse.firebaseapp.com',
    projectId: 'the-social-verse',
    storageBucket: 'the-social-verse.firebasestorage.app',
    messagingSenderId: '92606592374',
    appId: '1:92606592374:web:12bae5df25a55f144fb657',
}
*/

// const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
