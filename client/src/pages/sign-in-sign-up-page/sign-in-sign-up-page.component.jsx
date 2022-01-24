import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import { selectOptionSigninSignup } from '../../redux/stage/stage.selectors';
import { setOptionSigninSignup } from '../../redux/stage/stage.actions';
import './sign-in-sign-up-page.styles.css';

class SignInSigUpPage  extends React.Component{    
    render(){
        const { check, setOptionSigninSignup } =  this.props;    
        return(
        <div className='sign-in-and-sign-up' id={`check${check}`}>
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab-2" className="sign-in" defaultChecked={check}  />
                    <label id='lb-tab-1' htmlFor="tab-1" className="tab" onClick={()=>setOptionSigninSignup(true)} >Entrar</label>
                    <input id="tab-2" type="radio" name="tab-2" className="sign-up" defaultChecked={!check} />
                    <label id='lb-tab-2' htmlFor="tab-2" className="tab" onClick={()=>setOptionSigninSignup(false)}>Inscribirse</label>
                    <div className="login-form">                        
                        <SignIn/>       
                        <SignUp/>
                    </div>
                </div>
            </div>

        </div>
        )
    }
}
const mapStateToProps= () =>createStructuredSelector({
    check: selectOptionSigninSignup
});

const mapDispatchToProps = dispatch =>({
    setOptionSigninSignup : option => dispatch(setOptionSigninSignup(option))
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInSigUpPage);