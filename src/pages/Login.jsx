import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../defaults'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../provider/authProvider';

const Login = () => {

    const navigate = useNavigate()
    const {setToken, setRefreshToken, setTokenExpireTime, setRefreshTokenExpireTime} = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const routeRegister = () => {
        navigate('/register')
    }

    const handleLogin = async() => {
        await axios.post(baseUrl + '/Auth/Login', {Username:username,Password:password})
        .then((response) => {
            toast.success('Giriş başarılı oldu.')
            setToken(response.data.data.token)
            setRefreshToken(response.data.data.refreshToken)
            setTokenExpireTime(response.data.data.tokenExpireTime)
            setRefreshTokenExpireTime(response.data.data.refreshTokenExpireTime)
            navigate('/home')
        })
        .catch((apiError) => {
            toast.error(apiError.response.data.error)
        })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    } 

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

  return (
    <>
        <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
            <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
            </MDBCol>
            <MDBCol col='4' md='6' style={{padding:30}}>
            <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mb-0"><h3>QuizApp Admin Giriş Paneli</h3></p>
            </div>
            <div>
                <MDBInput wrapperClass='mb-4' label='E-Posta Adresiniz' id='formControlLg' type='email' size="lg" onChange={handleUsernameChange}/>
                <MDBInput wrapperClass='mb-4' label='Parolanız' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange}/>
            </div>
            <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg' onClick={() => handleLogin()}>GİRİŞ</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Hesabınız yok mu? <a href="" onClick={() => routeRegister()} className="link-danger">Üye olun</a></p>
            </div>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
        <ToastContainer/>
    </>
  );
}

export default Login;