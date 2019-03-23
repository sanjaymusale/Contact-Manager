import React from 'react'
import ContactForm from './ContactForm'
import axios from '../config/axios-config';
import { Container, Row, Col } from 'reactstrap'

export default
    class ContactEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: {},
            isLoaded: false
        }
        this.handleContactSubmission = this.handleContactSubmission.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/contact/${id}`, { headers: { 'x-auth': localStorage.getItem('authToken') } })
            .then((response) => {
                const contact = response.data
                this.setState(() => ({ contact, isLoaded: true }))
            })
            .catch((err) => {
                this.componentDidMount()
            })

    }
    handleContactSubmission(formData) {
        axios.put(`/contact/${this.state.contact._id}`, formData,
            { headers: { 'x-auth': localStorage.getItem('authToken') } })
            .then((response) => {
                this.props.history.push('/contacts')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <br />

                        {this.state.isLoaded &&
                            <ContactForm
                                title="Edit Contact"
                                name={this.state.contact.name}
                                email={this.state.contact.email}
                                mobile={this.state.contact.mobile}
                                handleContactSubmission={this.handleContactSubmission}
                            />
                        }
                    </Col>
                </Row>

            </Container>
        )
    }
}