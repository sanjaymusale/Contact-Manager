import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Register from './components/users/Register'
import Login from './components/users/Login'
import Contact from './components/contacts/Contacts-list'
import ContactNew from './components/contacts/ContactNew'
import ContactShow from './components/contacts/ContactShow'
import ContactEdit from './components/contacts/ContactEdit'
import Home from './components/home/home'
import Logout from "./components/users/Logout"
import NavBar from "./components/home/navbar";
import Dashboard from "./components/contacts/Dashboard";
import Footer from "./components/home/footer"
import PrivateRoute from './components/home/protected'


class App extends React.Component {

  render() {
    // console.log('app', this.props)
    const style = {
      background: '#f2f2f2',
      height: '550px'
    }
    return (

      < BrowserRouter >
        <>
          <NavBar />
          <div style={style}>

            <Switch>

              <Route exact path='/' component={Home} />
              <Route exact path='/user/register' component={Register} />
              <Route exact path='/user/login' component={Login} />
              <PrivateRoute exact path='/contacts' component={Contact} />
              <PrivateRoute exact path='/user' component={Dashboard} />
              <PrivateRoute exact path='/contacts/new' component={ContactNew} />
              <PrivateRoute exact path='/contacts' component={Contact} />
              <PrivateRoute exact path='/contacts/:id' component={ContactShow} />
              <PrivateRoute exact path='/contacts/edit/:id' component={ContactEdit} />
              <PrivateRoute exact path='/logout' component={Logout} /> */}

            </Switch>

          </div>
          <Footer />
        </>
      </BrowserRouter >
    );
  }
}



export default App
