import firebase from 'firebase/app'
import 'firebase/firestore'

class ApiService {
  signIn = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password)

  signUp = (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password)

  changeState = (callback) => firebase.auth().onAuthStateChanged(callback)

  getConferenceList = () =>
    firebase
      .firestore()
      .collection('events')
      .get()
}

export default new ApiService()
