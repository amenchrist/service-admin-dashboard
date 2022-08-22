import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const [home, setHome] = useState(true);
    const [attendeesList, setAttendeesList] = useState(false);
    const [firstTimersList, setFirstTimersList] = useState(false);
    const [absenteesList, setAbsenteesList] = useState(false);
    const [userList, setUserList] = useState(false);
    const [user, setUser] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [productList, setProductList] = useState(false);
    const [product, setProduct] = useState(false);
    const [newProduct, setNewProduct] = useState(false);
    const [overView, setOverView] = useState(false);
    const [comingSoon, setComingSoon] = useState(false);


  const contextStateVars = {
    home, setHome, attendeesList, setAttendeesList, firstTimersList, setFirstTimersList,
    absenteesList, setAbsenteesList, userList, setUserList, user, setUser,
    newUser, setNewUser, productList, setProductList, product, setProduct,
    newProduct, setNewProduct, overView, setOverView, comingSoon, setComingSoon
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={contextStateVars}>
      {children}
    </StateContext.Provider>
  );
};

export const useAdminStateContext = () => useContext(StateContext);