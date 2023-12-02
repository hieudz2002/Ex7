import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';


export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState();
  const [errMessage, setErrMessage] = useState(null);
  const Users = firestore().collection('users');

  let loginUser = async (email, password) => {
 
  Users.doc(email).onSnapshot( user => {
    if(!user.exists) {
      setErrMessage("err")
      return;
    }
    const res =  user.data();
     setUserInfo(res);
     setErrMessage(null);
  });
}

  let logoutUser = () => {
    setUserInfo(null);
   
  };
  let contextData = {
    errMessage,
    userInfo,
    loginUser,
    logoutUser,
  };
  return (
    <UserContext.Provider value={{...contextData}}>{children}</UserContext.Provider>
  );
};