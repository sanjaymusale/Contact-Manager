import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {Alert} from 'reactstrap'
const Home = (props) => {
  const { person } = props

    return (
        <div>
            <Jumbotron>
                <h1 className="display-3" >Welcome To Contact Manager</h1>
                <p className="lead">This is a your Personalized Contacts Manager.</p>
                <hr className="my-2" />
                <div style={{ width:"50%"}}>
                {!person.isAuthenticated ?
                  <>
                  <Alert color="warning">
                  <p>You can Login with these Credentials</p>
                  <p>Email : user@gmail.com</p>
                  <p>Password : user123</p>
                  </Alert>
                  </>
                  :
                  <></>


              }
                </div>
                <p className="lead">
                {!person.isAuthenticated ?
                    <Link to='/user/login' className="btn btn-primary">Get Started >></Link>
                    :
                    <Link to='/contacts' className="btn btn-primary">Get Started >></Link>
                  }
                </p>
            </Jumbotron>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        person: state.users
    }
}
export default connect(mapStateToProps)(Home)
