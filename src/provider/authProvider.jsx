import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {baseUrl} from '../defaults'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [token, setToken_] = useState(localStorage.getItem("token"));
  const setToken = (newToken) => {
    setToken_(newToken)
  };

  const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refreshToken"))
  const setRefreshToken = (newRefreshToken) => {
    setRefreshToken_(newRefreshToken)
  }

  const [tokenExpireTime, setTokenExpireTime_] = useState(localStorage.getItem("tokenExpireTime"))
  const setTokenExpireTime = (newTokenExpireTime) => {
    setTokenExpireTime_(newTokenExpireTime)
  }

  const [refreshTokenExpireTime, setRefreshTokenExpireTime_] = useState(localStorage.getItem("refreshTokenExpireTime"))
  const setRefreshTokenExpireTime = (newRefreshTokenExpireTime) => {
    setRefreshTokenExpireTime_(newRefreshTokenExpireTime)
  }

  const checkTokenExpiration = () => {
    let state = false
    const currentDate = new Date()
    if(token !== 'null' && tokenExpireTime !== 'null' && currentDate < (new Date(tokenExpireTime))){
      return !state
    }
    else{
      if(refreshToken !== 'null' && refreshTokenExpireTime !== 'null' && currentDate < (new Date(refreshTokenExpireTime))){
        axios.get(baseUrl + '/Auth/RefreshToken?refreshToken=' + refreshToken)
        .then((response) => {
          setToken_(response.data.data.token)
          setRefreshToken_(response.data.data.refreshToken)
          setTokenExpireTime_(response.data.data.tokenExpireTime)
          setRefreshTokenExpireTime_(response.data.data.refreshTokenExpireTime)
        })
        return !state
      }
      else{
        setToken_()
        setRefreshToken_()
        setTokenExpireTime_()
        setRefreshTokenExpireTime_()
      }
    }
    return state
  }

  useEffect(() => {
    const result = checkTokenExpiration()
    if (result !== undefined && result) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
      localStorage.setItem('token',token)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('tokenExpireTime', tokenExpireTime)
      localStorage.setItem('refreshTokenExpireTime', refreshTokenExpireTime)

    } else {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('tokenExpireTime')
      localStorage.removeItem('refreshTokenExpireTime')
    }
  }, [token, tokenExpireTime, refreshToken, refreshTokenExpireTime]);

  const contextValue = useMemo(
    () => ({
      token,
      refreshToken,
      tokenExpireTime,
      refreshTokenExpireTime,
      setToken,
      setRefreshToken,
      setTokenExpireTime,
      setRefreshTokenExpireTime
    }),
    [token, refreshToken, tokenExpireTime, refreshTokenExpireTime]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;