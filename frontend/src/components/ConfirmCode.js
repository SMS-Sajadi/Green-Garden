import React from 'react';
import { useNavigate } from 'react-router-dom';
//message
import {notify} from './toast.js';
//verification tool
import VerificationInput from "react-verification-input";
//API
import axios from 'axios';
//CSS
import '../templates/verifyCode.css'
//svg
import flower from '../templates/images/img/poppy flower-amico (1).svg';


const ConfirmCode = () => {

    const navigate = useNavigate();


    const handleCode = async (event) =>{
        var res = {};      
        
        const context = {
            code: event,
        }

        await axios.post('http://localhost:8000/accounts/verify/', context)
            .then(response => res = response);

        if(res.data.is_ok){
            notify('با موفقیت ثبت نام شدید', 'success');
            navigate("/login");
        }
        else{
            notify('رمز واردشده مطابقت ندارد', 'error');
        }

    }



    return (
        <div className={'cont'}>
            <div className={'box'}>
                <h1 className={"title"}>تایید کد </h1>
                <span>کد ارسال شده به ایمیل خود را در باکس زیر وارد کنید </span>

                <VerificationInput
                    classNames={{
                        characterInactive: "inprt_active",
                        characterSelected: "input_select",
                      }}
                      length = {4}
                      validChars = {'0-9'}
                      placeholder = {'_'}
                      autoFocus = {true}
                      onComplete = {handleCode}
                />

            </div>
            <img alt='' src={flower}/>


        </div>
    );
};

export default ConfirmCode;