import { ref } from "vue";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

import { firbaseAuth } from "./useFirebase";

const isAuthenticated = ref(false);

const user = ref("");

// const usersFromDB = [
//   { username: "admin", password: "admin", name: "Administrator" },
//   { username: "rromanve", password: "rromanve", name: "Rodolfo" },
// ];

const useAuth =  () => {
  const login = async (username, password) => {
    const res = await signInWithEmailAndPassword(
      firbaseAuth, 
      username,
       password
       );

       if(res.user) {
         isAuthenticated.value = true;
         user.value = res.user.email;
       }
  //   const userFromDB = usersFromDB.find(
  //     (user) => user.username === username && user.password === password
  //   );

  //   if (userFromDB) {
  //     isAuthenticated.value = true;
  //     user.value = userFromDB.name;
   // }
  };
  const signup = async (username, password) => {
    const res = await createUserWithEmailAndPassword(
      firbaseAuth, 
      username,
       password
       );

       if(res.user) {
         isAuthenticated.value = true;
         user.value = res.user.email;
       }
  };

  const logout = async () => {
    await signOut(firbaseAuth);
    isAuthenticated.value = false;
    user.value = "";
  };

  return { isAuthenticated, login, signup, logout, user };
};

export default useAuth;
