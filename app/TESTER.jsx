//ARCHIVO FIREBASE;
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc,} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBxyrbFv7jxsSYf2j-fB82BCE6FwDfqPhw",
    authDomain: "olimpusgym-73582.firebaseapp.com",
    projectId: "olimpusgym-73582",
    storageBucket: "olimpusgym-73582.appspot.com",
    messagingSenderId: "1055233382884",
    appId: "1:1055233382884:web:a24a679a5b75a5955c4ff1",
    measurementId: "G-E8ZCQ5F06Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

// Función para subir los documentos a Firestore
export const subirArreglosAFirestore = async (Array, name) => {
    try {
      const clientesRef = collection(db, name); // Cambia 'PALABRA' por el nombre de la colección
      await Promise.all(Array.map(async (cliente) => {
        await addDoc(clientesRef, cliente);
      }));
      console.log('Documentos subidos exitosamente a Firestore');
    } catch (error) {
      console.error('Error al subir documentos a Firestore:', error);
    }
  }; //se usa con la siguiente función en un componente tsx
  /**
  useEffect(() => {
    subirArreglosAFirestore(clientes, name); // Pasar clientes como argumento
  }, []);
 */

  export async function getDocumentInfo(collectionName, documentId) {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }


// Función para obtener los IDs de todos los documentos en una colección
export async function getAllDocumentIds(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documentIds = querySnapshot.docs.map(doc => doc.id);
    return documentIds;
  } catch (error) {
    console.error('Error al obtener IDs de documentos:', error);
    return [];
  }
}

// Función para actualizar los datos de un documento en una colección
export async function updateDocument(collectionName, documentId, newData) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, newData);
    console.log('Documento actualizado exitosamente en Firestore');
  } catch (error) {
    console.error('Error al actualizar el documento en Firestore:', error);
  }
}

// Función para eliminar un documento de una colección
export async function deleteDocument(collectionName, documentId) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log('Documento eliminado exitosamente de Firestore');
  } catch (error) {
    console.error('Error al eliminar el documento de Firestore:', error);
  }
}

export async function registerNewUser(user) {
    try {
      const usersRef = collection(db, "users");
      await setDoc(doc(usersRef, user.uid), user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  export async function getUserInfo(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
  
  export async function userExists(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
  
    return docSnap.exists();
  }
  
  export async function updateUser(user) {
    console.log(user);
    try {
      const usersRef = collection(db, "users");
      await setDoc(doc(usersRef, user.uid), user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
//Este es el código que carga el formulario
  
  
