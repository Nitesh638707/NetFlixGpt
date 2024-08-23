
export const checkValidData=(email,password,name,mobNumber)=>{
    const isEmailValid= /^([a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(email);//? this expression comes from regex email validation 
    const isPassValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isEmailValid) return "Email ID is not valid";
    if(!isPassValid)  return "Password is not valid";


    return null;

};