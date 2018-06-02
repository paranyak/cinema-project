import firebase from "firebase"

firebase.initializeApp({
  apiKey: "AIzaSyCstdBarT3h05pF8uvnCspRFW7ojhk3GrE",
  authDomain: "cinema-project-16ed8.firebaseapp.com",
  databaseURL: "https://cinema-project-16ed8.firebaseio.com",
  projectId: "cinema-project-16ed8",
  storageBucket: "",
  messagingSenderId: "351784818207",
})

export async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
}

export async function logout() {
  return await firebase.auth().signOut()
}

export async function userAdditionalInfo(userId) {
  return await firebase
    .database()
    .ref("/users/" + userId)
    .once("value")
}

export async function signUp(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password)
}

export default firebase