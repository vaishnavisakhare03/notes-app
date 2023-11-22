// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notes-app-5e623.firebaseapp.com",
  projectId: "notes-app-5e623",
  storageBucket: "notes-app-5e623.appspot.com",
  messagingSenderId: "585676801487",
  appId: "1:585676801487:web:c9afee4977e0c51ca03eba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFileToFirebase(image_url:string, name:string) {
    try{
        const response = await fetch(image_url)
        const buffer = await response.arrayBuffer()
        const file_name = name.replace(' ', '')+Date.now + '.jpeg'
        const storageRef = ref(storage, file_name)
        await uploadBytes(storageRef, buffer, {
            contentType:'image.jpeg'
        })
        const firebase_url = await getDownloadURL(storageRef)
        return firebase_url
    }catch(error){
        console.log(error)
    }
}