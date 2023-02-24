const SignupValidator = (values) => {
    let errors={};

     if(!values.name){
        errors.fullname="Please type your name."
     }
     if(!values.email){
        errors.email="Email is required."
     } else if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]/.test(values.email)){
        errors.email="Email is invalid. Format-abc@gxyz.com"
     }
     if(!values.password){
        errors.password="Password is required."
     }else if(!/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+]).{8,}$/.test(values.password)){
        console.log(typeof(values.password))
        errors.password="password should contain atleast 8 characters, an uppercase, lowercase, number and special characters"
     }
     
     //else if(/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*+]).{6,}$/.test(values.password)){
       // console.log("inside")
        //errors.password="Password Should contain asci charcters"
     //}
     
     


  return errors;
}

export default SignupValidator