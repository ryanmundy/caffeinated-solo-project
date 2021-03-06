import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './UserPage.css';
import Dashboard from '../Dashboard/Dashboard';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div id="welcomeUser">
    <h1 id="welcome">
      Welcome, { props.user.username }!
    </h1>
    {/* <p>Your ID is: {props.user.id}</p> */}
    {props.user.admin ? 'You are an administrator' : 'This is your dashboard'}
    
    <Dashboard user={props.user.username} id={props.user.id} admin={props.user.admin}/>
    <LogOutButton className="log-in" />
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
