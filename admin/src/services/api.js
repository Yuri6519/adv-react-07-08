import firebase from 'firebase/app'

class ApiService {
  signIn = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password)

  signUp = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password)

  changeState = (callback) => firebase.auth().onAuthStateChanged(callback)
}

export default new ApiService()
