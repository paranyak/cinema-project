
export async function login(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function logout() {
  return await firebase.auth().signOut();
}

export async function userAdditionalInfo(userId) {
  return await (firebase.database().ref('/users/' + userId).once('value'));
}

export async function signUp(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}
