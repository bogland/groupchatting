import { setAuth } from 'components/reducers/AuthReducer';
import { checkAuth } from 'components/services/authService';
import { ErrorCode } from 'components/services/model';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token: string = localStorage.token;
    const res = await checkAuth(token);
    if (res.errorCode == ErrorCode.Error) return;
    dispatch(setAuth({ token: localStorage.token }));
  };
  return { verifyAuth };
};

export default useAuth;
