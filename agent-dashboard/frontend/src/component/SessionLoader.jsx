
import React, { useEffect, useContext } from 'react';
import API from '../api';
import { AppContext } from '../ContextApi/AppContext';

export default function SessionLoader() {
  const { setIsLogin, setUser, setShowModel, setAuthLoading ,user,islogin} = useContext(AppContext);

  const check = async () => {
    try {
      setAuthLoading(true);

      const res = await API.get('/auth/me', { withCredentials: true });
    //   console.log(res);
      const user = res?.data?.user || null;

      if (user) {
        setIsLogin(true);
        setUser(user);
        setShowModel(false);
      } else {
        setIsLogin(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setIsLogin(false);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };
  
  useEffect(() => {
  
    check(); // run once on refresh
    //   console.log(user,islogin)
  }, []);

  return null;
}

