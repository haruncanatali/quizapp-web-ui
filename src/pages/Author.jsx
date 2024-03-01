import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ProjectNavbar from "../components/ProjectNavbar";
import axios from "axios";
import { baseUrl, imageUrl } from "../defaults";
import moment from "moment";
import { Button, Form, Image } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Author = () => {
    const [authors, setAuthors] = useState([{}])
    const [periods, setPeriods] = useState([{}])
    const getAuthors = async() => {
        await axios.get(baseUrl + '/Authors')
        .then((response) => {
            setAuthors(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    const getPeriods = async() => {
        await axios.get(baseUrl + "/CommonValues/Periods")
        .then((response) => {
            setPeriods(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getAuthors()
        getPeriods()
    }, [])

    const [createShow, setCreateShow] = useState(false);
    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);
    const [updateShow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const handleUpdateShow = () => setUpdateShow(true);
    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);
    const [infoShow, setInfoShow] = useState(false);
    const handleInfoClose = () => setInfoShow(false);
    const handleInfoShow = () => setInfoShow(true);

    const [createName, setCreateName] = useState('')
    const [createSurname, setCreateSurname] = useState('')
    const [createBio, setCreateBio] = useState('')
    const [createPeriodId, setCreatePeriodId] = useState(0)
    const [createPhoto, setCreatePhoto] = useState(null)

    const handleCreate = async(e) => {
        e.preventDefault()

        const formAuthor = new FormData();
        formAuthor.append('name',createName)
        formAuthor.append('surname',createSurname)
        formAuthor.append('bio',createBio)
        formAuthor.append('periodId',createPeriodId)
        formAuthor.append('photo', createPhoto)

        await axios.post(baseUrl + '/Authors', formAuthor)
        .then((response) => {
            handleCreateClose()
            toast.success(response.data.friendlyMessage)
            getAuthors()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const [updateId, setUpdateId] = useState(0)
    const [updateName, setUpdateName] = useState('')
    const [updateSurname, setUpdateSurname] = useState('')
    const [updateBio, setUpdateBio] = useState('')
    const [updatePeriodId, setUpdatePeriodId] = useState(0)
    const [updatePeriodName, setUpdatePeriodName] = useState('')
    const [updatePhoto, setUpdatePhoto] = useState(null)

    const getAuthor = async(id) => {
        console.log(id)
        await axios.get(baseUrl + '/Authors/' + id)
        .then((response) => {
            setUpdateId(response.data.data.id)
            setUpdateName(response.data.data.name)
            setUpdateSurname(response.data.data.surname)
            setUpdateBio(response.data.data.bio)
            setUpdatePeriodId(response.data.data.periodId)
            setUpdatePhoto(response.data.data.photo)
            setUpdatePeriodName(response.data.data.periodName)
        })
        .catch((error) => {
            toast.error('Hata meydana geldi.')
        })
    }

    const handleUpdate = async(e) => {
        e.preventDefault()

        const formAuthor = new FormData();
        formAuthor.append('id',updateId)
        formAuthor.append('name',updateName)
        formAuthor.append('surname',updateSurname)
        formAuthor.append('bio',updateBio)
        formAuthor.append('periodId',updatePeriodId)
        formAuthor.append('photo', updatePhoto)

        await axios.put(baseUrl + '/Authors', formAuthor)
        .then((response) => {
            handleUpdateClose()
            toast.success(response.data.friendlyMessage)
            getAuthors()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const handleDelete = async(id) => {
        await axios.delete(baseUrl + '/Authors/' + id)
        .then((response) => {
            handleDeleteClose()
            getAuthors()
            toast.success('Yazar başarıyla silindi.')
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    return (
        <>
            <ProjectNavbar/>
            <p className="fs-1 mt-3 text-center">Yazarlar Sayfası</p> <br/>
            <div id="periodsTable" style={{padding:10}}>
                <MDBTable style={{marginTop:10}} align='middle' striped hover bordered>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Yazar</th>
                            <th scope="col">Dönem</th>
                            <th scope="col">Oluşturulma Tarihi</th>
                            <th scope='col'>İşlemler</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            authors?.map((author) => (
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                        <img
                                            src={imageUrl + author.photo}
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{author.fullName}</p>
                                        </div>
                                        </div>
                                    </td>
                                    <td>{author.periodName}</td>
                                    <td>{moment(author.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                    <td>
                                        <MDBBadge onClick={() => {
                                            getAuthor(author.id)
                                            handleInfoShow()
                                        }} style={{cursor:'pointer'}} color='info' pill>
                                            Detay
                                        </MDBBadge>
                                        <MDBBadge onClick={handleCreateShow} style={{cursor:'pointer'}} color='success' pill>
                                            Ekle
                                        </MDBBadge>
                                        <MDBBadge onClick={() => {
                                            getAuthor(author.id)
                                            handleUpdateShow()
                                        }} style={{cursor:'pointer'}} color='warning' pill>
                                            Güncelle
                                        </MDBBadge>
                                        <MDBBadge onClick={() => {
                                            setUpdateId(author.id)
                                            handleDeleteShow()
                                        }} style={{cursor:'pointer'}} color='danger' pill>
                                            Sil
                                        </MDBBadge>
                                    </td>
                                </tr>
                            ))
                        }
                    </MDBTableBody>
                </MDBTable>
            </div>
            <div id="createAuthorModal">
                <Modal show={createShow} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yazar Ekleme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleCreate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Adı</Form.Label>
                                <Form.Control type="text" required onChange={(e) => {
                                    setCreateName(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Soyadı</Form.Label>
                                <Form.Control type="text" required onChange={(e) => {
                                    setCreateSurname(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Biyografisi</Form.Label>
                                <Form.Control as="textarea" rows={3} required onChange={(e) => {
                                    setCreateBio(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Dönemi</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setCreatePeriodId(e.target.value)
                                }}>
                                    {
                                        periods?.map((period) => (
                                            <option value={period.value}>{period.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Fotoğrafı</Form.Label>
                                <Form.Control type="file" required onChange={(e) => {
                                    const { files } = e.target;
                                    setCreatePhoto(files[0])
                                } } />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" type="submit">
                                Ekle
                            </Button>
                            <Button variant="danger" onClick={handleCreateClose}>
                                Kapat
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            <div id="updateAuthorModal">
                <Modal show={updateShow} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yazar Güncelleme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleUpdate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Adı</Form.Label>
                                <Form.Control value={updateName} type="text" required onChange={(e) => {
                                    setUpdateName(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Soyadı</Form.Label>
                                <Form.Control value={updateSurname} type="text" required onChange={(e) => {
                                    setUpdateSurname(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Biyografisi</Form.Label>
                                <Form.Control value={updateBio} as="textarea" rows={3} required onChange={(e) => {
                                    setUpdateBio(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Dönemi</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setUpdatePeriodId(e.target.value)
                                }}>
                                    {
                                        periods?.map((period) => (
                                            period.value === updatePeriodId ? 
                                            <option value={period.value} selected>{period.label}</option>
                                            : <option value={period.value}>{period.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Fotoğrafı</Form.Label>
                                <Form.Control type="file" onChange={(e) => {
                                    const { files } = e.target;
                                    setUpdatePhoto(files[0])
                                } } />
                                <Form.Text muted>
                                    <span className="text-danger">*Mevcutta yazar fotoğrafı tanımlıdır. Güncellemek isterseniz bu kısımdan fotoğraf yükleyebilirsiniz. Zorunlu değildir.</span>
                                </Form.Text>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" type="submit">
                                Güncelle
                            </Button>
                            <Button variant="danger" onClick={handleUpdateClose}>
                                Kapat
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            <div id="deleteAuthorModal">
                <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yazar Silme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><span className="text-danger">Bu yazarı silmek istediğinize emin misiniz? Yazar silindiğinde bu yazara bağlı eserler de silinecektir.</span></Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {handleDelete(updateId)}}>
                            SİL
                        </Button>
                        <Button variant="primary" onClick={handleDeleteClose}>
                            Ekle
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div id="infoAuthorModal">
                <Modal show={infoShow} onHide={handleInfoClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yazar Bilgi Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Adı</Form.Label>
                                <Form.Control value={updateName} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Soyadı</Form.Label>
                                <Form.Control value={updateSurname} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Biyografisi</Form.Label>
                                <Form.Control value={updateBio} as="textarea" rows={3} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Dönemi</Form.Label>
                                <Form.Control value={updatePeriodName} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar Fotoğrafı</Form.Label>
                                <Image height={350} width={450} src={imageUrl + updatePhoto} thumbnail />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleInfoClose}>
                                Kapat
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Author