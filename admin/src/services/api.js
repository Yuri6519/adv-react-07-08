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

  delConf = (id) =>
    firebase
      .firestore()
      .collection('events')
      .doc(id)
      .delete()

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

  delPerson = (id) =>
    firebase
      .firestore()
      .collection('people')
      .doc(id)
      .delete()

  subscribeForPeople = (callback) =>
    firebase
      .firestore()
      .collection('people')
      //      .onSnapshot(snapshot => callback(snapshot))
      .onSnapshot(callback) // the same as above

  subscribeForConf = (callback) =>
    firebase
      .firestore()
      .collection('events')
      .onSnapshot((snapshot) => callback(snapshot))
}

export default new ApiService()
