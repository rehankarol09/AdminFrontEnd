import React, { useEffect } from 'react';
import './App.css';
//import Layout from './components/Layout';
import {  Route, Switch } from 'react-router-dom'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRouter from './components/util/PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogin } from './actions';


function App() {

const dispatch = useDispatch();
const auth = useSelector(state=>state.auth);

  useEffect(() => {
    if (!auth.authenthicate) {
            dispatch(isUserLogin());
    }

  },[]);


  return (
    <div className="App">

        <Switch>
           <PrivateRouter path='/' exact component={Home}></PrivateRouter>
           <Route path='/Signin' component={Signin}></Route>
           <Route path='/Signup' component={Signup}></Route>
        </Switch>

      

    </div>
  );
}

export default App;
