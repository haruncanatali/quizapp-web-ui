import React, { useEffect, useState } from "react";
import ProjectNavbar from "../components/ProjectNavbar";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../defaults";
import { ToastContainer, toast } from "react-toastify";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAuth } from "../provider/authProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
    const {token} = useAuth()
    const [statistic, setStatistic] = useState({})
    const [authorsByPeriodsChart, setAuthorsByPeriodsChart] = useState(null)
    const [literariesByCategoriesChart, setLiterariesByCategoriesChart] = useState(null)
    const getStatistiscs = () => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token
        axios.get(baseUrl + "/CommonValues/Statistics")
        .then((response) => {
            setStatistic(response.data.data)
            setAuthorsByPeriodsChart(response.data.data.authorsByPeriods)
            toast.success(response.data.friendlyMessage)
        })
        .catch((error) => {
            console.log('hataa')
            setAuthorsByPeriodsChart(null)
        })
    }
    useEffect(() => {
        getStatistiscs()
    }, [])

    
    return (
        <>
            <ProjectNavbar />
            <Container id="statisticsDatas" className="mt-5">
                <Row>
                    <Col>
                    <Card style={{ width: '23rem', background: '#2ecc71', color: 'white'}}>
                        <Card.Body>
                        <Card.Title>Dönem Sayısı</Card.Title>
                        <Card.Text>
                            {statistic?.periodCount}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '23rem', background: '#34495e', color: 'white' }}>
                        <Card.Body>
                        <Card.Title>Eser Kategorisi Sayısı</Card.Title>
                        <Card.Text>
                            {statistic?.literaryCategoryCount}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '23rem', background: '#3498db', color: 'white' }}>
                        <Card.Body>
                        <Card.Title>Eser Sayısı</Card.Title>
                        <Card.Text>
                            {statistic?.literaryCount}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Card style={{ width: '23rem', background: '#5f27cd', color: 'white'}}>
                        <Card.Body>
                        <Card.Title>Yazar Sayısı</Card.Title>
                        <Card.Text>
                            {statistic?.authorCount}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '23rem', background: '#feca57', color: 'white' }}>
                        <Card.Body>
                        <Card.Title>Admin Sayısı</Card.Title>
                        <Card.Text>
                            {statistic?.adminCount}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card style={{ width: '23rem', background: '#f368e0', color: 'white' }}>
                        <Card.Body>
                        <Card.Title>Kullanıcı Sayısı</Card.Title>
                        <Card.Text>
                            {statistic?.userCount}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
            <Container id="chartsDatas" style={{marginTop:100}}>
                <Row>
                    <Col md='6'>
                        {
                            authorsByPeriodsChart !== null ? <Pie data={authorsByPeriodsChart} /> : null
                        }
                       
                    </Col>
                    <Col md='6'></Col>
                </Row>
            </Container>
            <ToastContainer/>
        </>
    )
}

export default Home