// src/stores/userStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth, db } from '../db/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const useUserStore = defineStore('userStore', () => {
  const user: any = ref(null);
  const userDetails: any = ref(null);

  const fetchUserDetails = async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      userDetails.value = docSnap.data();
    } else {
      console.log('No such document!');
    }
  };

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
      await fetchUserDetails(firebaseUser.uid);
    } else {
      user.value = null;
      userDetails.value = null;
    }
  });

  return { user, userDetails, fetchUserDetails };
});

export default useUserStore;
