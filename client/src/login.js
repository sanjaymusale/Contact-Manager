import React from 'react'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form>
                    <label>
                        Email : <input type="text" value={this.state.email} onChange={this.emailChange} />
                    </label><br />
                    <label>
                        Password : <input type="password" value={this.state.password} onChange={this.passwordChange} />
                    </label><br />
                    <input type="submit" />

                </form>
            </div>
        )
    }
}

export default Login