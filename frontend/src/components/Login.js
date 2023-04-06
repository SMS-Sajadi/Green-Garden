import React, {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

import { validate } from './validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from './toast.js';
//Styles and css
import Styles from '../templates/Signup.module.css';
//Assets
import bro from '../assets/images/Mobile login-bro 1.svg';
import homeIcon from '../assets/icons/home.svg';
//component
import ThemeChange from './ThemeChange';



const Login = () => {
const [data, setData] = useState({
    email: '',
    password: '',
});

const [errors, setErrors] = useState({});
const [touch, setTouch] = useState({});
const [dark, setDark] = useState('false');

useEffect(() => {
    setErrors(validate(data, 'login'));
}, [data, touch])

const changeHandeler = (event) => {

    setTouch({...touch, [event.target.name]: true});

    setData({...data, [event.target.name]: event.target.value})
    
};

const submitHandeler = (event) => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify(':) خوش آمدید', 'success');
        }
        else {
            setTouch({
                email: true,
                password: true,
            });
            notify('اطلاعات  نامعتبر است', 'error');
        }
      
}

const manageTheme = () => {
    setDark(!dark);
    console.log(dark)
}


    return (
        <div className={dark ?  Styles.container : Styles.containerDark }>
            <div onClick={manageTheme}>
                <ThemeChange />
            </div>
            
            <img className={Styles.home} src={homeIcon} alt=''/>

            <form onSubmit={submitHandeler} className={dark ?  Styles.signup: Styles.signupDark}>
                <h1 className={dark ? Styles.form_title : Styles.form_titleDark} id="signup" >ورود</h1>
                <div className={Styles.form_holder}>
                        <div className={Styles.input_div}>
                            <label className={dark ? Styles.input_lable : Styles.input_lableDark } >ایمیل</label>
                            <input 
                                type='email'  
                                className={(errors.email && touch.email) ? Styles.uncomplated : Styles.form_input} 
                                name='email'  
                                value={data.email} 
                                placeholder='ایمیل' 
                                onChange={changeHandeler} />
                            {errors.email && touch.email && <span>{errors.email}</span>}
                        </div>
                        <div className={Styles.input_div}>
                            <label className={dark ? Styles.input_lable : Styles.input_lableDark }>رمز عبور</label>
                            <input 
                                type='password'  
                                className={(errors.password && touch.password) ? Styles.uncomplated : Styles.form_input} 
                                name='password'  
                                value={data.password} 
                                placeholder='رمز عبور' 
                                onChange={changeHandeler}/>
                            {errors.password && touch.password && <span>{errors.password}</span>}
                        </div>
                </div>
                <div className={Styles.formButtons}>
                    <Link to="/signUp">حساب کاربری ندارید؟ ثبت نام</Link>
                    <button type='submit' className={dark ? Styles.submit_btn : Styles. submit_btnDark}>ورود</button>
                </div>
            </form>
            <ToastContainer />
            <div className={Styles.pic}>
                <img src={bro} alt=''/>
            </div>

        </div>
    );
};

export default Login;