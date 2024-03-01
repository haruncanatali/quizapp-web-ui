import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ProjectNavbar from "../components/ProjectNavbar";
import axios from "axios";
import { baseUrl } from "../defaults";
import moment from "moment";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const LiteraryCategory = () => {
    const [literaryCategories, setLiteraryCategories] = useState([{}])
    const getLiteraryCategories = async() => {
        await axios.get(baseUrl + '/LiteraryCategories')
        .then((response) => {
            setLiteraryCategories(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getLiteraryCategories()
        console.log(literaryCategories)
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

    const handleCreate = async(e) => {
        e.preventDefault()
        await axios.post(baseUrl + '/LiteraryCategories', {name:createName, description:createDescription})
        .then((response) => {
            handleCreateClose()
            toast.success(response.data.friendlyMessage)
            getLiteraryCategories()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const [updateId, setUpdateId] = useState(0)
    const [updateName, setUpdateName] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')

    const getLiteraryCategory = async(id) => {
        console.log(id)
        await axios.get(baseUrl + '/LiteraryCategories/' + id)
        .then((response) => {
            setUpdateId(response.data.data.id)
            setUpdateName(response.data.data.name)
            setUpdateDescription(response.data.data.description)
        })
        .catch((error) => {
            toast.error('Hata meydana geldi.')
        })
    }

    const handleUpdate = async(e) => {
        e.preventDefault()
        await axios.put(baseUrl + '/LiteraryCategories', {id:updateId,name:updateName,description:updateDescription})
        .then((response) => {
            handleUpdateClose()
            toast.success(response.data.friendlyMessage)
            getLiteraryCategories()
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    const handleDelete = async(id) => {
        await axios.delete(baseUrl + '/LiteraryCategories/' + id)
        .then((response) => {
            handleDeleteClose()
            getLiteraryCategories()
            toast.success('Eser kategorisi başarıyla silindi.')
        })
        .catch((error) => {
            toast.error(error.response.data.error)
        })
    }

    return (
        <>
            <ProjectNavbar/>
            <p className="fs-1 mt-3 text-center">Eser Kategorileri Sayfası</p> <br/>
            <div id="periodsTable" style={{padding:10}}>
                <MDBTable style={{marginTop:10}} align='middle' striped hover bordered>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>Eser Kategorisi Adı</th>
                            <th scope="col">Oluşturulma Tarihi</th>
                            <th scope='col'>İşlemler</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {
                            literaryCategories?.map((literaryCategory) => (
                                <tr>
                                    <td>{literaryCategory.name}</td>
                                    <td>{moment(literaryCategory.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                    <td>
                                        <MDBBadge onClick={() => {
                                            getLiteraryCategory(literaryCategory.id)
                                            handleInfoShow()
                                        }} style={{cursor:'pointer'}} color='info' pill>
                                            Detay
                                        </MDBBadge>
                                        <MDBBadge onClick={handleCreateShow} style={{cursor:'pointer'}} color='success' pill>
                                            Ekle
                                        </MDBBadge>
                                        <MDBBadge onClick={() => {
                                            getLiteraryCategory(literaryCategory.id)
                                            handleUpdateShow()
                                        }} style={{cursor:'pointer'}} color='warning' pill>
                                            Güncelle
                                        </MDBBadge>
                                        <MDBBadge onClick={() => {
                                            setUpdateId(literaryCategory.id)
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
            <div id="createLiteraryCategoryModal">
                <Modal show={createShow} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Kategorisi Ekleme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleCreate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi Adı</Form.Label>
                                <Form.Control type="text" required onChange={(e) => {
                                    setCreateName(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi Açıklaması</Form.Label>
                                <Form.Control as="textarea" rows={3} required onChange={(e) => {
                                    setCreateDescription(e.target.value)
                                }}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleCreateClose}>
                                Kapat
                            </Button>
                            <Button variant="success" type="submit">
                                Ekle
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            <div id="updateLiteraryCategoryModal">
                <Modal show={updateShow} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Kategorisi Güncelleme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleUpdate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi Adı</Form.Label>
                                <Form.Control value={updateName} type="text" required onChange={(e) => {
                                    setUpdateName(e.target.value)
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi Açıklaması</Form.Label>
                                <Form.Control value={updateDescription} as="textarea" rows={3} required onChange={(e) => {
                                    setUpdateDescription(e.target.value)
                                }}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleUpdateClose}>
                                Kapat
                            </Button>
                            <Button variant="success" type="submit">
                                Güncelle
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
            <div id="deleteLiteraryCategoryModal">
                <Modal show={deleteShow} onHide={handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Kategorisi Silme Ekranı</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><span className="text-danger">Bu eser kategorisini silmek istediğinize emin misiniz? Eser kategorisi silindiğinde bu döneme bağlı eserler de silinecektir.</span></Modal.Body>
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
            <div id="infoLiteraryCategoryModal">
                <Modal show={infoShow} onHide={handleInfoClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eser Kategorisi Bilgi Ekranı</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi Adı</Form.Label>
                                <Form.Control value={updateName} type="text" disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Eser Kategorisi Açıklaması</Form.Label>
                                <Form.Control value={updateDescription} as="textarea" rows={3} disabled/>
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

export default LiteraryCategory