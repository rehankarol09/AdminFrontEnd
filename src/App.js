import React, { useEffect } from 'react';
import './App.css';
import {  Route, Switch } from 'react-router-dom'
import Home from './containers/Home';
import Orders from './containers/Order';
import Products from './containers/Product';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRouter from './components/util/PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import {  getInitialData, isUserLogin } from './actions';
import CategoryPage from './containers/Category';
import NewPage from './containers/Pages/NewPage';
//import NewPage from './containers/Pages/NewPage';


function App() {

const dispatch = useDispatch();
const auth = useSelector(state=>state.auth);

  useEffect(() => {
    if (!auth.authenthicate) {
            dispatch(isUserLogin());
    }
    if(auth.authenthicate)
    {
      dispatch(getInitialData());
    }
  },[auth.authenthicate]);

 

  return (
    <div className="App">
        <Switch>
        <PrivateRouter path="/" exact component={Home} />
        {/*<PrivateRouter path='/page' component={NewPage} />*/}
        <PrivateRouter path="/products" component={Products} />
        <PrivateRouter path="/orders" component={Orders} />
        <PrivateRouter path="/category" component={CategoryPage} />
        <PrivateRouter path="/page" component={NewPage} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        </Switch>
    </div>
  );
}

export default App;
