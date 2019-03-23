import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import ContactForm from './ContactForm'
import axios from '../config/axios-config';

export default class ContactNew extends React.Component {

    handleContactSubmission = (data) => {
        // console.log(data)
        axios.post('/contact', data,
            { headers: { 'x-auth': localStorage.getItem('authToken') } }
        )
            .then((response) => {
                // console.log(response.data)
                const contact = response.data
                this.props.history.push(`/contacts/${contact._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        //console.log('contact new', this.props)
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <br />

                        <ContactForm title="New Contact" handleContactSubmission={this.handleContactSubmission} />



                    </Col>
                </Row>

            </Container>
        )
    }
}

