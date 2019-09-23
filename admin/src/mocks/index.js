import conferences from './conferences'
import firebase from 'firebase/app'
import 'firebase/firestore'

export function saveEventsToFB() {
  const eventsRef = firebase.firestore().collection('events')
  conferences.forEach((conference) => eventsRef.add(conference))
}

//window.saveEventsToFB = saveEventsToFB

export function getCollectionFromDb() {
  const eventsRef = firebase.firestore().collection('events')
  eventsRef
    .get()
    .then((all) =>
      all.forEach((doc) => {
        const { title, ...rest } = doc.data()
        console.log(doc.id, '=>', title, '=>rest:: ', rest)
      })
    )
    .catch((err) => console.log('Error getting documents', err))
}

//window.getCollectionFromDb = getCollectionFromDb
