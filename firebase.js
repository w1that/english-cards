import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, query, where } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyClgWCNhe18LpI7oAnYXgBPMmPC7wDh5ok",
    authDomain: "english-cards-2ffce.firebaseapp.com",
    projectId: "english-cards-2ffce",
    storageBucket: "english-cards-2ffce.appspot.com",
    messagingSenderId: "699265554985",
    appId: "1:699265554985:web:87fba30f1fbf0a25c35a38"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getWords = (user, setSets, setLoading) => {
  const setsRef = collection(db, "sets");
  const q = query(setsRef, where("userId", "==", user.id));
  getDocs(q).then((res) => {
    res.forEach((doc) => {
      setSets((prev) => [...prev, { data: doc.data(), id: doc.id }]);
    });
  }).then(()=>setLoading(false))
};


export function getAllSets(setAllSets, allWords) {
  getDocs(collection(db, "sets")).then((res) => {
    res.forEach((doc) => {
      setAllSets((prev) => [
        ...prev,
        {
          id: doc.id,
          title: doc.data().title,
          userId: doc.data().userId,
          words: allWords.filter((word) => word.data.setId === doc.id),
        },
      ]);
    });
  });
}

export function getAllWords(setAllWords, setGotAllWords) {
  getDocs(collection(db, "words"))
    .then((res) => {
      res.forEach((doc) => {
        setAllWords((prev) => [...prev, { id: doc.id, data: doc.data() }]);
      });
    })
    .then(() => setGotAllWords(true));
}