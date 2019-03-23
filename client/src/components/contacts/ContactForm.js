import React from 'react'

import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
export default
    class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name ? props.name : '',
            email: props.email ? props.email : '',
            mobile: props.mobile ? props.mobile : '',
            nameError: '',
            emailError: '',
            MobileError: ''
        }
        this.handleEmail = this.handleEmail.bind(this)
    }
    validate = () => {
        let isError = false
        const error = {
            nameError: '',
            emailError: '',
            MobileError: ''

        }
        if (this.state.name.length === 0) {
            isError = true
            error.nameError = 'Please Provide Name'
        }
        if (this.state.email.length === 0) {
            isError = true
            error.emailError = 'Please Provide email  '
        }
        if (this.state.name.length < 5) {
            isError = true
            error.nameError = 'Must contain min 5 Character  '
        }
        if (this.state.mobile.length === 0) {
            isError = true
            error.mobileError = 'Please Provide Mobile Number'
        }
        if (this.state.mobile.length <= 9) {
            isError = true
            error.mobileError = 'Provide valid Number'
        }
        if (this.state.mobile.length > 10) {
            isError = true
            error.mobileError = 'Provide valid Number'
        }

        this.setState(() => ({
            ...this.state,
            ...error
        }))
        return isError
    }
    handleName = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }

    handleEmail(e) {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    handleMobile(e) {
        const mobile = e.target.value
        this.setState(() => ({ mobile }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let err = this.validate()
        if (!err) {
            const formData = {
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile
            }
            console.log('form submit', formData)
            this.props.handleContactSubmission(formData)
        }
    }

    render() {
        return (
            <div className="container" >
                <br />
                <p className="h3 text-center">{this.props.title}</p>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label>
                            Name :</Label>
                        <Input type="text" value={this.state.name} onChange={this.handleName} />
                        <FormText className="text-danger">{this.state.nameError}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Email :</Label>
                        <Input type="email" value={this.state.email} onChange={this.handleEmail} />
                        <FormText className="text-danger">{this.state.emailError}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            Mobile :</Label>
                        <Input type="text" value={this.state.mobile} onChange={this.handleMobile.bind(this)} />
                        <FormText className="text-danger">{this.state.mobileError}</FormText>
                    </FormGroup>
                    <FormGroup>
                        <p className="text-right">
                            <Button color="primary">Submit</Button>{' '}<Link className="btn btn-primary" to="/contacts">Back</Link>
                        </p>

                    </FormGroup>
                </Form>
            </div>



        )
    }
}

