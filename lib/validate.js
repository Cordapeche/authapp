export default function login_validate(values) {
    const errors = {};
// Email validation
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length <8 || values.password.length > 20) {
        errors.password = "Password must be longer than 8 and lass than 20 characters long";
    } else if (values.password.includes(" ")){
        errors.password = "Invalide password"
    }

    return errors;
}

export function registerValidate(values){
    const errors = {};

    if(!values.username) {
        errors.username = "Required";
    } else if(values.username.includes(" ")){
        errors.username = "Invalide Username"
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

     // Password validation
     if (!values.email) {
        errors.email = "Required";
    } else if (values.password.length <8 || values.password.length > 20) {
        errors.password = "Password must be longer than 8 and lass than 20 characters long";
    } else if (values.password.includes(" ")){
        errors.password = "Invalide password"
    }

     // Confirm password validation
     if (!values.cpassword) {
        errors.cpassword = "Required";
    } else if (values.password !== values.cpassword) {
        errors.password = "Password does not match";
    } else if (values.cpassword.includes(" ")){
        errors.cpassword = "Invalide password"
    }

    return errors;
}