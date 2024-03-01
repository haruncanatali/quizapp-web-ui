import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { baseUrl } from '../defaults';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-dropdown-select';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [genders, setGenders] = useState([{}])
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        gender: 0,
        phone: '',
        password: '',
        birthdate: '',
        email: ''
    })

    const handleRegisterInputChange = (e) => {        
        if(Array.isArray(e)){
            setFormData((prevData) => ({
                ...prevData,
                gender: e[0].value
            }))
        }
        else{
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
    
        const formLogin = new FormData();
        for (const key in formData) {
            formLogin.append(key, formData[key]);
        }

        await axios.post(baseUrl + '/Users', formLogin)
        .then((response) => {
            toast.success(response.data.friendlyMessage)
            navigate('/login')
        })
        .catch((error) => {
            console.log(error)
            toast.error('Hata meydana geldi.')
        })
    }

    const getGenders = async() => {
        await axios.get(baseUrl + "/CommonValues/Genders")
        .then((apiResponse) => {
            setGenders(apiResponse.data.data)
        })
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getGenders()
    }, [])

  return (
    <>
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
            <MDBRow>
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                        Beyninizi Test Edin:  <br />
                        <span style={{color: 'hsl(218, 81%, 75%)'}}>QuizApp ile Yarışın!</span>
                    </h1>
                    <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
                    QuizApp, kullanıcıların çeşitli konularda soruları yanıtladığı eğlenceli bir mobil uygulamadır; tarih, bilim, sanat ve daha fazlasıyla ilgili zorlayıcı sorular içerir. Kullanıcılar, puanlarını artırırken aynı zamanda bilgi düzeylerini de geliştirirler. Uygulama, interaktif ve kullanıcı dostu arayüzüyle dikkat çeker ve geniş bir soru veritabanıyla sürekli güncellenir.
                    </p>
                </MDBCol>
                <MDBCol md='6' className='position-relative'>
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <form onSubmit={handleRegister}>
                        <MDBCard className='my-5 bg-glass'>
                            <MDBCardBody className='p-5'>
                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Adınız' id='firstName' name='firstName' type='text' onChange={handleRegisterInputChange}/>
                                </MDBCol>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Soyadınız' id='surname' name='surname' type='text' onChange={handleRegisterInputChange}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol col='6'>
                                    <Select className='mb-4' placeholder='Cinsiyetiniz' options={genders} onChange={handleRegisterInputChange} required/>
                                </MDBCol>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Telefon Numaranız' id='phone' name='phone' type='text'  onChange={handleRegisterInputChange}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='E-Posta Adresiniz' id='email' name='email' type='email'  onChange={handleRegisterInputChange}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Şifreniz' id='password' name='password' type='password'  onChange={handleRegisterInputChange}/>
                                </MDBCol>
                                <MDBCol col='6'>
                                    <MDBInput wrapperClass='mb-4' label='Doğum Tarihiniz Örn: 1998-08-18' id='birthdate' name='birthdate' type='text'  onChange={handleRegisterInputChange}/>
                                </MDBCol>
                            </MDBRow>
                            <MDBBtn className='w-100 mb-4' size='md' type='submit'>Üye Ol</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        <ToastContainer/>
    </>
  );
}

export default Register