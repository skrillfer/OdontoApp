import React from "react";
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import Spinner from 'react-spinkit';

import dotenv from  'dotenv'

import io from "socket.io-client";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SocketExample from "./socket_example"
import LandingPage from "./landingpage/landingpage"
import SeatReservationPage from './pages/seat-reservation/seat-reservation.component';
import HeaderMain from './components/header-main/header-main.component';
import CheckOutPage from './pages/checkout-page/checkout-page.component';
import  SignInSignUpPage  from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import AdminPage from './pages/admin-page/admin-page.component';
import SelectCoursePage from './pages/select-course-page/select-course-page.component';
import TransactionResultPage from './pages/transaction-result-page/transaction-result-page.component';
import AlertCustom  from './components/alert-custom/alert-custom.component';
import OneSinglePaymentPage from './pages/one-single-payment-page/one-single-payment-page.component';

import { setSocket, setCurrentUser } from './redux/user/user.actions';
import { setStateSeat, setClockTime, setSpeaker, setCourse } from './redux/stage/stage.actions';
import { clearItemsCart } from './redux/cart/cart.actions';
import { removeAllAlerts, addAlert } from './redux/alert/alert.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartItemsCount, selectCartItems } from './redux/cart/cart.selectors';
import { selectAlertItems } from './redux/alert/alert.selectors';

import { CONST_SEAT_STATES, CONST_SPEAKERS_ENUM,STRINGS_ALERTS } from './assets/constants';

import  "./App.css"

let amountConected=0;
let socket;
let initialState={
  loading: true
};
export class App extends React.Component{

  constructor(props){
    dotenv.config();
    console.log(process.env.REACT_APP_BASE_URL)
    super(props);
    this.state  = { ...initialState };
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env.NODE_ENV);
      console.log(process.env.REACT_APP_SOCKET_URL)
      // socket = io({ path: "/socket.io" });
      socket = io({ path: process.env.REACT_APP_SOCKET_URL });

      // socket = io.connect(process.env.REACT_APP_SOCKET_URL || 'http://api', { forceNew: true, path: '/ws/socket.io' });
      // console.log(socket);
    }else {
      console.log(process.env.NODE_ENV);
      console.log(process.env.REACT_APP_SOCKET_URL);
      socket = io.connect(process.env.REACT_APP_SOCKET_URL);
    }

    socket.on( 'connect', function () {
      console.log( 'connected to server - ' );
    });
  
    socket.on( 'disconnect', function () {
      if(window.location.pathname==='/reservation' || window.location.pathname==='/checkout'){
        amountConected++;
        if(amountConected>=1){
          const {DISCONNECT_SOCKET,DISCONNECT_SOCKET_NOT_USER_LOGGED} = STRINGS_ALERTS;
          const { title, description} = localStorage.getItem('user')?
                                        {title:DISCONNECT_SOCKET.title, description: DISCONNECT_SOCKET.description}
                                        :{title:DISCONNECT_SOCKET_NOT_USER_LOGGED.title, description: DISCONNECT_SOCKET_NOT_USER_LOGGED.description};
          props.addAlert({text:description,style:'style',title:title});
          setTimeout(()=>{
            props.removeAllAlerts();
            window.location.reload();  
          },3500);
        }
      }
      console.log( 'disconnected to server' );
    });

    socket.emit('connected',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(initialStage)=>{
      console.log(initialStage)
      initialStage.forEach(seat=>{
        setStateSeat(seat);
      });
      this.setState({ loading: false });
    });
      
    const { setSocket, setStateSeat, setCurrentUser, setSpeaker, setCourse } = this.props;    
    setSocket(socket);
    
    socket.on('newSeatModified',function(seat){
      console.log(seat);
      setStateSeat(seat);
    });
    if(localStorage.getItem('user')) setCurrentUser(JSON.parse(localStorage.getItem('user')));
    if(localStorage.getItem('speaker')){
      let speakerLocal = JSON.parse(localStorage.getItem('speaker'));
      setSpeaker(speakerLocal.speaker);
      setCourse(
        speakerLocal.speaker===CONST_SPEAKERS_ENUM.both?
        CONST_SPEAKERS_ENUM.kim
        :speakerLocal.speaker);
    }
  }

  

  unlockAllSeats = () =>{
    const  { clearItemsCart, setStateSeat } = this.props;    
    var    { cartItems } = this.props;
    cartItems=cartItems.length? cartItems: JSON.parse(localStorage.getItem('cartItems')) || [] 
    
    cartItems.forEach(item=>{
      setStateSeat({...item, estado:CONST_SEAT_STATES.free })
      socket.emit(
        'seatModified',
        {   ...item,
          estado:CONST_SEAT_STATES.free,
          user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null
        },()=>{}
      );
    });
    clearItemsCart();
    localStorage.removeItem('cartItems');
  }
  
  componentDidMount(){
    const { setClockTime, history } = this.props;    
    
    if (window.performance) {
      if (performance.navigation.type === 1) {
        if((window.location.pathname==='/reservation' || window.location.pathname==='/checkout') && localStorage.getItem('user')){
          this.unlockAllSeats();
          if(JSON.parse(localStorage.getItem('user')).admin) return;//if admin then not timer
          socket.removeAllListeners('countdownStart');
          socket.on('countdownStart',function(time){
            setClockTime(time);
          });
          socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
          socket.emit('countdownStart',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(clockFinishMessage)=>{
            this.unlockAllSeats();
            socket.removeAllListeners('countdownStart');
            history.push('/reservation');
          });
        }else{
          if(!(window.location.pathname==='/checkout')){
            this.unlockAllSeats();
          }
          socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
          socket.removeAllListeners('countdownStart');
        }
      }
    }
  }


  componentWillUnmount() {
    socket.disconnect();
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged(this.props.location.pathname);
    }
  }
  
  async onRouteChanged(route_) {
    const { setStateSeat, setClockTime, history, removeAllAlerts } = this.props;    
    removeAllAlerts();
    if(route_==='/reservation'){
      await this.setState({ loading: true });
      await socket.emit('connected',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(initialStage)=>{
        initialStage.forEach(seat=>{
          setStateSeat(seat);
        });
        this.setState({ loading: false });  
      }); 
      //
    }
    if((route_==='/reservation' || route_==='/checkout') && localStorage.getItem('user')){
      if(!(route_==='/checkout')){
        await this.unlockAllSeats();
      }
      
      if(!(JSON.parse(localStorage.getItem('user')).admin)){
        socket.removeAllListeners('countdownStart');
        socket.on('countdownStart',function(time){
          setClockTime(time);
        });
        socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
        socket.emit('countdownStart',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null },(clockFinishMessage)=>{
          this.unlockAllSeats();
          socket.removeAllListeners('countdownStart');
          history.push('/reservation');
        });
      }
    }else{
      if(!(route_==='/checkout')){
        this.unlockAllSeats();
      }
      socket.emit('close-timer',{ user:localStorage.getItem('user')?{...JSON.parse(localStorage.getItem('user'))}:null });
      socket.removeAllListeners('countdownStart');
    }
    window.scrollTo(0, 0);
    
    
  }
  render(){
    const { props:{currentUser, cartItemsCount, alerts}, state:{loading}  } = this;
    return (
      <div >
        
        {loading?(<div style={{marginTop:'45vh',marginLeft:'50vw',width:'100%',textAlign:'center'}}>
              <Spinner 
                  name='ball-scale-multiple' 
                  color="black"
                  fadeIn="none"
                  style={{height:'50px', width:'50px'}}
              /></div>):
        <React.Fragment>
          <HeaderMain/>
          <Switch>
          <Route 
              exact 
              path="/" 
              component={LandingPage}
            />
            <Route 
              path='/one-single-payment' 
              render={()=><OneSinglePaymentPage/>} 
            />
            <Route  path='/reservation' render={()=>{   
                                                    return <SeatReservationPage/>
                                                }}
              />
            <Route  path='/socket' component={SocketExample}/>
            <Route  path='/report' render={()=>{
                      if(currentUser){
                        if(currentUser.admin){
                          return <AdminPage/>
                        }
                      }
                      return (<Redirect to='/select'/>)
              }}/>
            <Route  path='/select' render={() =><SelectCoursePage/>} />
            <Route  path='/paymentresult/:status/:reason' component={TransactionResultPage}/>
            <Route 
              exact 
              path="/checkout" 
              render={() =>{
                    console.log(cartItemsCount);
                    return !cartItemsCount? (
                    <Redirect to='/select'/>
                    ):(
                      <CheckOutPage/>
                    )
                  }
                }
            />

            <Route 
              exact 
              path="/signinsignup" 
              render={() =>
                currentUser? (
                  <Redirect to='/select'/>
                  ):(
                    <SignInSignUpPage/>
                  )
                }
            />
            
          </Switch>
          {alerts.length?alerts.map(({text,title,id})=>
              <AlertCustom  key={`alertCustom${id}`} id={id} text={text} title={title}/>
          ):null}
      
          </React.Fragment>}
      </div>
      )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItemsCount  : selectCartItemsCount,
  cartItems   : selectCartItems,
  alerts: selectAlertItems
});

const mapDispatchToProps = dispatch => ({
  setSocket : socket => dispatch(setSocket(socket)),
  setStateSeat : seat => dispatch(setStateSeat(seat)),
  setCurrentUser : user => dispatch(setCurrentUser(user)),
  clearItemsCart: ()  => dispatch(clearItemsCart()),
  setClockTime:     time => dispatch(setClockTime(time)),
  setSpeaker : speaker => dispatch(setSpeaker(speaker)),
  setCourse  : course => dispatch(setCourse(course)),
  removeAllAlerts : () => dispatch(removeAllAlerts()),
  addAlert        : _alert => dispatch(addAlert(_alert))
});



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));