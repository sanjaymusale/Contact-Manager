import React from 'react'
import axios from '../config/axios-config';
import jwtDecode from 'jwt-decode'

import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { setUser } from '../../actions/users'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            redirect: false,
            toggle: false,
            emailError: '',
            passwordError: '',
            loginFail: false

        }
    }
    validate = () => {
        let isError = false
        const error = {
            emailError: '',
            passwordError: ''

        }

        if (this.state.email.length === 0) {
            isError = true
            error.emailError = 'Please Provide email  '
        }

        if (this.state.password.length === 0) {
            isError = true
            error.passwordError = 'Please Provide Password'
        }


        this.setState(() => ({
            ...this.state,
            ...error
        }))
        return isError
    }
    emailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email, loginFail: false }))
    }
    passwordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({ password, loginFail: false }))
    }
    submitHandle = (e) => {
        e.preventDefault()
        let err = this.validate()
        if (!err) {
            const formData = {
                email: this.state.email,
                password: this.state.password
            }
            // console.log(formData)
            axios.post('/user/login', formData)
                .then((response) => {
                    // console.log(response)
                    if (response.data.error) {
                        // console.log('error')
                        this.setState(() => ({ loginFail: true }))
                    }
                    else {
                        // console.log('m=success', jwtDecode(response.data))
                        localStorage.setItem('authToken', response.data)
                        this.props.dispatch(setUser(jwtDecode(response.data)))
                        this.setState(() => ({ redirect: true }))
                    }


                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    showpass = (event) => {
        let checked = event.target.checked
        this.setState((prevstate) => ({ toggle: checked }))

    }

    render() {
        return (
            <div className="container">
                {this.state.redirect && <Redirect to='/user' />}
                <br />
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col border border-primary shadow-lg p-3 mb-5 bg-white rounded p-4 m-4">
                        <p className="h3 text-center">Login</p>
                        {this.state.loginFail && <Alert color="warning">
                            Invalid Email and Password
                        </Alert>}
                        <Form onSubmit={this.submitHandle} >

                            <FormGroup>
                                <Label for="email"></Label>
                                <Input type="email" name="email" value={this.state.email} onChange={this.emailChange} placeholder="Email" />
                                <FormText color="">{this.state.emailError}</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password"></Label>
                                <Input type={this.state.toggle ? "text" : "password"} name="password" value={this.state.password} onChange={this.passwordChange.bind(this)} placeholder="Password" />
                                <FormText color="">{this.state.passwordError}</FormText>
                            </FormGroup>
                            <FormGroup>
                                <FormText><input type="checkbox" name="toggle" onChange={this.showpass} />   Show Password</FormText>
                            </FormGroup>


                            <p className="text-center"><Button color="primary" size="lg" block>Login</Button></p>
                        </Form >
                    </div>
                    <div className="col">

                    </div>
                </div>
            </div>

        )
    }
}

export default connect()(Login)