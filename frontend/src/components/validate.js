export const validate = (data, type) => {
      const errors = {};
      var validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var validPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
      var validPhone = /^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;

      
      if(!data.email){
            errors.email = 'ایمیل الزامی '
      }
      else if(!data.email.match(validEmail)){
            errors.email = 'ایمیل نامعتبر'
      }
      else{
            delete errors.email
      }

      if(!data.phone){
            errors.phone = 'شماره الزامی '
      }
      else if(!data.phone.match(validPhone)){
            errors.phone = 'شماره نامعتبر'
      }
      else{
            delete errors.phone
      }


      if(!data.password){
            errors.password = 'رمز الزامی'
      }
      else if(!data.password.match(validPassword)){
            errors.password = 'حداقل 5 کارکتر و یک حرف انگلیسی'
      }
      else{
            delete errors.password
      }


      if (type === 'signup'){

            if(!data.name.trim()){
                  errors.name = 'نام نامعتبر'
            }
            else{
                  delete errors.name
            }

            if(!data.confirmPassword){
                  errors.confirmPassword = 'تایید الزامی است'
            }
            else if(data.password !== data.confirmPassword){
                  errors.confirmPassword = "رمز عبور یکسان نیست"
            }
            else{
                  delete errors.confirmPassword
            }
      
            if(data.isAccepted){
                  delete errors.isAccepted
            }
            else{
                  errors.isAccepted = 'پذیرش الزامی '
            }
      
      

      }

      return errors;
}