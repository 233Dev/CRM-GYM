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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();

export const subirJsonAFirestore = async (Array, name) => {
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

export async function registerNewUser(user) {
  try {
    const usersRef = collection(db, "usuarios");
    await setDoc(doc(usersRef, user.uid), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getDocumentInfo(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function getUserInfo(uid) {
  const docRef = doc(db, "Usuarios", uid);
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

export async function fetchLinkData(uid) {
  const links = [];
  const q = query(collection(db, "links"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const link = { ...doc.data() };
    link.docId = doc.id;
    console.log(link);
    links.push(link);
  });
  return links;
}

export async function insertNewLink(link) {
  try {
    const linksRef = collection(db, "links");
    const res = await addDoc(linksRef, link);
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function existsUsername(username) {
  const users = [];
  const q = query(collection(db, "users"), where("username", "==", username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    users.push(doc.data());
  });
  return users.length > 0 ? users[0].uid : null;
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await fetchLinkData(uid);
  return {
    profile: profileInfo,
    links: linksInfo,
  };
}

export async function getUserProfilePhoto(usernamePhoto) {
  const imagesRef = ref(storage, `images/${usernamePhoto}`);
}

export async function setUserProfilePhoto(uid, file) {
  const storage = getStorage();
  const mountainImagesRef = ref(storage, `images/${uid}`);
  const res = await uploadBytes(mountainImagesRef, file);
  console.log("file uploaded", res);
  return res;
}

export async function getProfilePhotoUrl(profilePicture) {
  const profileRef = ref(storage, profilePicture);
  console.log(profilePicture);
  const url = await getDownloadURL(profileRef);
  console.log({ url });
  return url;
}

export async function logout() {
  await auth.signOut();
}

export async function deleteLink(docId) {
  await deleteDoc(doc(db, "links", docId));
}

export async function updateLink(docId, link) {
  const res = await setDoc(doc(db, "links", docId), link);
  console.log("update link", docId, link, res);
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