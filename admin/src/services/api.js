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

  getPeopleList = () =>
    firebase
      .firestore()
      .collection('people')
      .get()

  savePerson = (id, data) =>
    firebase
      .firestore()
      .collection('people')
      .doc(id)
      .set(data)

  getPerson = (id) =>
    firebase
      .firestore()
      .collection('people')
      .doc(id)
      .get()
}

export default new ApiService()
