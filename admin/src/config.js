import firebase from 'firebase/app'
import 'firebase/auth'

export const appName = 'advreact-2019-07-08'

const firebaseConfig = {
  apiKey: 'AIzaSyD0GfJDVQm4Gl_fxIi1BxKAbrSv2DFplbg',
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: '',
  messagingSenderId: '598344555033',
  appId: '1:598344555033:web:d1fc8628fc5b0f48'
}

firebase.initializeApp(firebaseConfig)
