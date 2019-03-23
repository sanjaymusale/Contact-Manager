import React from 'react'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <h2>RegisterForm</h2>
                <form action='/register' method="POST">
                    <label>
                        UserName : <input type="text" value={this.state.username} onChange={this.nameChange} />
                    </label><br />
                    <label>
                        Email : <input type="text" value={this.state.username} onChange={this.emailChange} />
                    </label><br />
                    <label>
                        Password : <input type="password" value={this.state.username} onChange={this.passwordChange} />
                    </label><br />
                    <input type="submit" />

                </form>
            </div>

        )
    }
}

export default Register