import { db } from '../db/firebase';
import { doc, setDoc } from 'firebase/firestore';

const userService = {
  async addUserDetails(
    userId: string,
    userDetails: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
    },
  ) {
    try {
      await setDoc(doc(db, 'users', userId), userDetails);
    } catch (error) {
      console.error('Error adding user details: ', error);
      throw error;
    }
  },
};

export default userService;
