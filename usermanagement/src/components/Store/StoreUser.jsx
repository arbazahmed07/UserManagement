import React, { createContext, useState } from 'react';  
export const UserContext = createContext();

function StoreUser({ children }) {
  const [users, setUsers] = useState([]);
  const [removeuser,setRemoveuser]=useState([]);

  return (
    <UserContext.Provider value={{ users, setUsers, removeuser, setRemoveuser }}>
      {children}
    </UserContext.Provider>
  );
}

export default StoreUser;
