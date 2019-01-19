import Firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAfZNIvnVFCr4S1d9V3RrA31iDaatGRKLk',
  authDomain: 'bizzy-bee.firebaseapp.com',
  databaseURL: 'https://bizzy-bee.firebaseio.com',
  projectId: 'bizzy-bee',
  storageBucket: 'bizzy-bee.appspot.com',
  messagingSenderId: '988796373265',
}

export const FirebaseApp = Firebase.initializeApp(config)

export let db = FirebaseApp.database()
