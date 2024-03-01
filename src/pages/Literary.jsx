import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ProjectNavbar from "../components/ProjectNavbar";
import axios from "axios";
import { baseUrl } from "../defaults";
import moment from "moment";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Literary = () => {
    const [literaries, setLiteraries] = useState([{}])
    const [authors, setAuthors] = useState([{}])
    const [periods, setPeriods] = useState([{}])
    const [literaryCategories, setLiteraryCategories] = useState([{}])

    const getLiteraries = async() => {
        await axios.get(baseUrl + "/Literaries")
        .then((response) => {
            setLiteraries(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const getAuthors = async() => {
        await axios.get(baseUrl + '/CommonValues/Authors')
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

    const getLiteraryCategories = async() => {
        await axios.get(baseUrl + "/CommonValues/LiteraryCategories")
        .then((response) => {
            setLiteraryCategories(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getLiteraries()
        getAuthors()
        getPeriods()
        getLiteraryCategories()
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
    const [createDescription, setCreateDescription] = useState('')
    const [createAuthorId, setCreateAuthorId] = useState(0)
    const [createLiteraryCategoryId, setCreateLiteraryCategoryId] = useState(0)
    const [createPeriodId, setCreatePeriodId] = useState(0)

    const handleCreate = async(e) => {
        e.preventDefault()

        const body = {
            name: createName,
            description: createDescription,
            authorId: createAuthorId,
            literaryCategoryId: createLiteraryCategoryId,
            periodId: createPeriodId
        }

        await axios.post(baseUrl + '/Literaries', body)
        .then((response) => {
            handleCreateClose()
            toast.success(response.data.friendlyMessage)
            getLiteraries()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const [updateId, setUpdateId] = useState(0)
    const [updateName, setUpdateName] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [updateAuthorId, setUpdateAuthorId] = useState(0)
    const [updateLiteraryCategoryId, setUpdateLiteraryCategoryId] = useState(0)
    const [updatePeriodId, setUpdatePeriodId] = useState(0)
    const [updateAuthorName, setUpdateAuthorName] = useState('')
    const [updatePeriodName, setUpdatePeriodName] = useState('')
    const [updateLiteraryCategoryName, setUpdateLiteraryCategoryName] = useState('')

    const getLiterary = async(id) => {
        console.log(id)
        await axios.get(baseUrl + '/Literaries/' + id)
        .then((response) => {
            setUpdateId(response.data.data.id)
            setUpdateName(response.data.data.name)
            setUpdateDescription(response.data.data.description)
            setUpdateAuthorId(response.data.data.authorId)
            setUpdateLiteraryCategoryId(response.data.data.literaryCategoryId)
            setUpdatePeriodId(response.data.data.periodId)
            setUpdatePeriodName(response.data.data.periodName)
            setUpdateAuthorName(response.data.data.authorFullName)
            setUpdateLiteraryCategoryName(response.data.data.literaryCategoryName)
        })
        .catch((error) => {
            toast.error('Hata meydana geldi.')
        })
    }

    const handleUpdate = async(e) => {
        e.preventDefault()

        const body = {
            id: updateId,
            name: updateName,
            description: updateDescription,
            authorId: updateAuthorId,
            literaryCategoryId: updateLiteraryCategoryId,
            periodId: updatePeriodId
        }

        await axios.put(baseUrl + '/Literaries', body)
        .then((response) => {
            handleUpdateClose()
            toast.success(response.data.friendlyMessage)
            getLiteraries()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const handleDelete = async(id) => {
        await axios.delete(baseUrl + '/Literaries/' + id)
        .then((response) => {
            handleDeleteClose()
            getLiteraries()
            toast.success('Yazar başarıyla silindi.')
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    return (
        <>
            <ProjectNavbar/>
            <p className="fs-1 mt-3 text-center">Eserler Sayfası</p> <br/>
            <div id="periodsTable" style={{padding:10}}>
                <MDBTable style={{marginTop:10}} align='middle' striped hover bordered>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Eser Adı</th>
                            <th scope="col">Yazar Adı</th>
                            <th scope="col">Dönem</th>
                            <th scope="col">Kategori</th>
                            <th scope="col">Oluşturulma Tarihi</th>
                            <th scope='col'>İşlemler</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            literaries?.map((literary) => (
                                <tr>
                                    <td>{literary.name}</td>
                                    <td>{literary.authorFullName}</td>
                                    <td>{literary.periodName}</td>
                                    <td>{literary.literaryCategoryName}</td>
                                    <td>{moment(literary.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                    <td>
                                        <MDBBadge onClick={() => {
                                            getLiterary(literary.id)
                                            handleInfoShow()
                                        }} style={{cursor:'pointer'}} color='info' pill>
                                            Detay
                                        </MDBBadge>
                                        <MDBBadge onClick={handleCreateShow} style={{cursor:'pointer'}} color='success' pill>
                                            Ekle
                                        </MDBBadge>
                                        <MDBBadge onClick={() => {
                                            getLiterary(literary.id)
                                            handleUpdateShow()
                                        }} style={{cursor:'pointer'}} color='warning' pill>
                                            Güncelle
                                        </MDBBadge>
                                        <MDBBadge onClick={() => {
                                            setUpdateId(literary.id)
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
            <div id="createLiteraryModal">
                <Modal show={createShow} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Ekleme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleCreate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Adı</Form.Label>
                                <Form.Control type="text" required onChange={(e) => {
                                    setCreateName(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Açıklaması</Form.Label>
                                <Form.Control as="textarea" rows={3} required onChange={(e) => {
                                    setCreateDescription(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Dönemi</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setCreatePeriodId(e.target.value)
                                }}>
                                    {
                                        periods?.map((period, index) => (
                                            index === 0 ?
                                            <option value={period.value} selected>{period.label}</option> :
                                            <option value={period.value}>{period.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setCreateLiteraryCategoryId(e.target.value)
                                }}>
                                    {
                                        literaryCategories?.map((literaryCategory, index) => (
                                            index === 0 ?
                                            <option value={literaryCategory.value} selected>{literaryCategory.label}</option> :
                                            <option value={literaryCategory.value}>{literaryCategory.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setCreateAuthorId(e.target.value)
                                }}>
                                    {
                                        authors?.map((author) => (
                                            <option value={author.value}>{author.label}</option>
                                        ))
                                    }
                                </Form.Select>
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
            <div id="updateLiteraryModal">
                <Modal show={updateShow} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Güncelleme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleUpdate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Adı</Form.Label>
                                <Form.Control value={updateName} type="text" required onChange={(e) => {
                                    setUpdateName(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Açıklaması</Form.Label>
                                <Form.Control value={updateDescription} as="textarea" rows={3} required onChange={(e) => {
                                    setUpdateDescription(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Dönemi</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setUpdatePeriodId(e.target.value)
                                }}>
                                    {
                                        periods?.map((period) => (
                                            period.value === updatePeriodId ? 
                                            <option value={period.value} selected>{period.label}</option>:
                                            <option value={period.value}>{period.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setUpdateLiteraryCategoryId(e.target.value)
                                }}>
                                    {
                                        literaryCategories?.map((literaryCategory) => (
                                            literaryCategory.value === updateLiteraryCategoryId ?
                                            <option value={literaryCategory.value} selected>{literaryCategory.label}</option> :
                                            <option value={literaryCategory.value} >{literaryCategory.label}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar</Form.Label>
                                <Form.Select required onChange={(e) => {
                                    setUpdateAuthorId(e.target.value)
                                }}>
                                    {
                                        authors?.map((author) => (
                                            author.value === updateAuthorId ?
                                            <option value={author.value} selected>{author.label}</option> :
                                            <option value={author.value}>{author.label}</option>
                                        ))
                                    }
                                </Form.Select>
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
            <div id="deleteLiteraryModal">
                <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Yazar Silme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><span className="text-danger">Bu eseri silmek istediğinize emin misiniz?</span></Modal.Body>
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
            <div id="infoLiteraryModal">
                <Modal show={infoShow} onHide={handleInfoClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Bilgi Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                        <Form.Group className="mb-3">
                                <Form.Label>Eser Adı</Form.Label>
                                <Form.Control value={updateName} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Açıklaması</Form.Label>
                                <Form.Control value={updateDescription} as="textarea" rows={3} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Dönemi</Form.Label>
                                <Form.Control value={updatePeriodName} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi</Form.Label>
                                <Form.Control value={updateLiteraryCategoryName} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Yazar</Form.Label>
                                <Form.Control value={updateAuthorName} type="text" disabled/>
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

export default Literary