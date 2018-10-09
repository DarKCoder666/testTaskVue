import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../../config/keys'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const settings = {/* your settings... */ timestampsInSnapshots: true};
const firestore = firebaseApp.firestore()
firestore.settings(settings);
export default firestore;