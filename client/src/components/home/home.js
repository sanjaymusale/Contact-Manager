import React from 'react';
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom'


const Home = (props) => {


    return (
        <div>
            <Jumbotron>
                <h1 className="display-3" >Welcome To Contact Manager</h1>
                <p className="lead">This is a your Personalized Contacts Manager.</p>
                <hr className="my-2" />
                <p></p>
                <p className="lead">
                    <Link to='/user/register' className="btn btn-primary">Get Started >></Link>
                </p>
            </Jumbotron>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}
export default Home