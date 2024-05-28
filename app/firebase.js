import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = { //Pasar a un .ENV despues para proteger los datos de la DB
    apiKey: "AIzaSyBxyrbFv7jxsSYf2j-fB82BCE6FwDfqPhw",
    authDomain: "olimpusgym-73582.firebaseapp.com",
    projectId: "olimpusgym-73582",
    storageBucket: "olimpusgym-73582.appspot.com",
    messagingSenderId: "1055233382884",
    appId: "1:1055233382884:web:a24a679a5b75a5955c4ff1",
    measurementId: "G-E8ZCQ5F06Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

export const uploadArrayToFirestore = async (arreglo, name) => {
  try {
    const clientesRef = collection(db, name);
    const promises = arreglo.map(item => addDoc(clientesRef, item));
    await Promise.allSettled(promises);
    console.log('Arreglo subido exitosamente a Firestore');
  } catch (error) {
    console.error('Error al subir documentos a Firestore:', error);
  }
}

export async function updateDocument(collectionName, documentId, newData) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, newData);
    console.log('Documento actualizado exitosamente en Firestore');
  } catch (error) {
    console.error('Error al actualizar el documento en Firestore:', error);
  }
}

export async function updateImageURLInFirestore(collectionName, documentId, imageURLField, imageURL) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, { [imageURLField]: imageURL });
    console.log('URL de imagen actualizada en Firestore');
  } catch (error) {
    console.error('Error al actualizar la URL de imagen en Firestore:', error);
  }
}

export async function uploadImageToStorage(file, folderName, imageName) {
  try {
    const storageRef = ref(storage, `${folderName}/${imageName}`);
    await uploadBytes(storageRef, file);
    console.log('Imagen subida exitosamente a Firebase Storage');
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error al subir la imagen a Firebase Storage:', error);
    return null;
  }
}

export async function fetchAndFilter(coleccion, filterField, filterValues, setState) {
  try {
    const documentIds = await getAllDocumentIds(coleccion);
    const data = await Promise.all(documentIds.map(async (docId) => {
      const document = await getDocumentInfo(coleccion, docId);
      document.id = docId; //ListaClientes depende de que la colección contenga este id para relacizar bien la edicion de los datos.
      return document;
    }));

    let filteredData;
    if (filterField && filterValues && filterValues.length > 0) {
      filteredData = data.filter(item => filterValues.includes(item[filterField]));
    } else {
      filteredData = data; // Devuelve la colección completa si no se proporcionan criterios de filtro
    }

    setState(filteredData);
  } catch (error) {
    console.error(`Error al obtener y filtrar datos de la colección ${coleccion}:`, error);
  }
}

// Función para crear o actualizar un documento en una subcolección, similar a fetchANdFilter, pero sin ".filter()"
export async function manageSubcollectionDocument(
  collectionName, 
  documentId, 
  subcollectionName = null, 
  subcollectionDocumentId = null, 
  data = null,
  callId = null // Añade este parámetro
) {
  try {
    console.log(`Call ID: ${callId}, Collection: ${collectionName}, Document: ${documentId}, Subcollection: ${subcollectionName}, SubcollectionDocumentId: ${subcollectionDocumentId}`);
    let docRef;

    if (subcollectionName) {
      if (subcollectionDocumentId) {
        docRef = doc(db, collectionName, documentId, subcollectionName, subcollectionDocumentId);
      } else {
        // Si no se proporciona un ID de documento, crear un nuevo documento con ID generado automáticamente en la subcolección
        const subcollectionRef = collection(db, collectionName, documentId, subcollectionName);
        const newDocRef = await addDoc(subcollectionRef, data || {});
        console.log(`Call ID: ${callId}, Documento creado exitosamente con ID: ${newDocRef.id}`);
        return (await getDoc(newDocRef)).data();
      }
    } else {
      docRef = doc(db, collectionName, documentId);
    }

    if (data) {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, data);
        console.log(`Call ID: ${callId}, Documento actualizado exitosamente`);
      } else {
        await setDoc(docRef, data);
        console.log(`Call ID: ${callId}, Documento creado exitosamente`);
      }

      const updatedDocSnap = await getDoc(docRef);
      return updatedDocSnap.data();
    } else {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.error(`Call ID: ${callId}, El documento no existe`);
        return null;
      }
    }
  } catch (error) {
    console.error(`Call ID: ${callId}, Error al crear o actualizar el documento:`, error);
    return null;
  }
}


// Función para obtener todos los documentos de una subcolección si documentId está vacío (talvez ya no sea necesario)
export async function fetchSubcollectionDocuments(
  collectionName, 
  documentId, 
  subcollectionName, 
  filterField = null, 
  filterValues = null, 
  setState = null
) {
  try {
    const subcollectionRef = documentId
      ? collection(db, collectionName, documentId, subcollectionName)
      : collection(db, collectionName, subcollectionName);

    const querySnapshot = await getDocs(subcollectionRef);
    const documents = querySnapshot.docs.map(docSnap => ({
      ...docSnap.data(),
      id: docSnap.id
    }));

    let filteredData;
    if (filterField && filterValues && filterValues.length > 0) {
      filteredData = documents.filter(item => filterValues.includes(item[filterField]));
    } else {
      filteredData = documents;
    }

    if (setState) {
      setState(filteredData);
    }

    return filteredData;
  } catch (error) {
    console.error(`Error al obtener documentos de la subcolección ${subcollectionName}:`, error);
    return [];
  }
}


export async function registerNewUser(user) {
  try {
    const usersRef = collection(db, "usuarios");
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

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

export async function getDocumentInfo(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

export async function existsUsername(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty ? querySnapshot.docs[0].data().uid : null;
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await fetchLinkData(uid);
  return {
    profile: profileInfo,
    links: linksInfo,
  };
}

export async function logout() {
  await auth.signOut();
}

export async function deleteDocument(collectionName, documentId) {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    console.log('Documento eliminado exitosamente de Firestore');
  } catch (error) {
    console.error('Error al eliminar el documento de Firestore:', error);
  }
}