import React, {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';

import { validate } from './validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from './toast.js';
//Styles and css
import Styles from '../templates/Signup.module.css';
import '../templates/box.css';
//Asseets
import girl from '../assets/images/Florist-cuate 1.svg';
import homeIcon from '../assets/icons/home.svg';
//component
import ThemeChange from './ThemeChange';




const SignUp = () => {
const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isAccepted: false,
});

const [errors, setErrors] = useState({});
const [touch, setTouch] = useState({});
const [dark, setDark] = useState('false');

useEffect(() => {
    setErrors(validate(data, 'signup'));
}, [data, touch])

const changeHandeler = (event) => {

    setTouch({...touch, [event.target.name]: true});

    if(event.target.name === 'isAccepted'){
        setData({...data, [event.target.name]: event.target.checked})
    }
    else{
        setData({...data, [event.target.name]: event.target.value})
    }
};

// const focusHandeler = event => {
//     setTouch({...touch, [event.target.name]: true});
// }


const submitHandeler = (event) => {
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify('با موفقیت ثبت نام شدید', 'success');
        }
        else {
            setTouch({
                name: true,
                email: true,
                phone: true,
                password: true,
                confirmPassword: true,
                isAccepted: true,
            });
            notify('اطلاعات نامعتبر است', 'error');

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
                <h1 className={dark ? Styles.form_title : Styles.form_titleDark} id="signup" >ثبت نام</h1>
                <div className={Styles.form_holder}>
                        <div className={Styles.input_div}>
                            <label className={dark ? Styles.input_lable : Styles.input_lableDark }>نام کاربری</label>
                            <input 
                                type='text' 
                                className={(errors.name && touch.name) ? Styles.uncomplated : Styles.form_input}  
                                name='name'  
                                value={data.name} 
                                placeholder='نام کاربری' 
                                onChange={changeHandeler}/>
                            
                            {errors.name && touch.name && <span>{errors.name}</span>}
                        </div>
                        <div className={Styles.input_div}>
                            <label className={dark ? Styles.input_lable : Styles.input_lableDark }>ایمیل</label>
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
                            <label className={dark ? Styles.input_lable : Styles.input_lableDark }>شماره تلفن</label>
                            <input 
                                type='text'  
                                className={(errors.phone && touch.phone) ? Styles.uncomplated : Styles.form_input} 
                                name='phone'  
                                value={data.phone} 
                                placeholder='شماره تلفن' 
                                onChange={changeHandeler} />
                            {errors.phone && touch.phone && <span>{errors.phone}</span>}
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
                        <div className={Styles.input_div}>
                            <label className={dark ? Styles.input_lable : Styles.input_lableDark }>تایید رمز عبور</label>
                            <input 
                                type="password" 
                                 className={(errors.confirmPassword && touch.confirmPassword) ? Styles.uncomplated : Styles.form_input} 
                                name='confirmPassword' 
                                value={data.confirmPassword} 
                                placeholder='تایید رمز عبور' 
                                onChange={changeHandeler}/>
                            {errors.confirmPassword && touch.confirmPassword && <span className={Styles.err}>{errors.confirmPassword}</span>}
                        </div>
                        <div className={Styles.accept_div}>
                            <div className={Styles.chekbox_div}>
                                    <label className={dark ? Styles.accept : Styles.input_lableDark }>قوانین مربوطه را می‌پذیرم</label>

                                    <div className="checkbox-wrapper-12">
                                    <div className="cbx">
                                        <input id="cbx-12"
                                         type="checkbox"  
                                         name='isAccepted'  
                                        value={data.isAccepted}
                                        onChange={changeHandeler} />
                                        <label ></label>
                                        <svg className='svgBox' width="15" height="14"  fill="none">
                                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                                        </svg>
                                    </div>
                                    
                                    </div>
                            </div>
                            {errors.isAccepted && touch.isAccepted && <span>{errors.isAccepted}</span>}
                        </div>
                </div>
                <div className={Styles.formButtons}>
                    <Link to="/login">ورود</Link>
                    <button type='submit' className={dark ? Styles.submit_btn : Styles. submit_btnDark}>ثبت نام</button>
                </div>
            </form>
            <ToastContainer />
            <div className={Styles.pic}>
                <img src={girl} alt=''/>
            </div>
        </div>
    );
};

export default SignUp;