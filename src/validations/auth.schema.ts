import * as Yup from "yup";

export const LoginInSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
    password: Yup.string().required("Password required").min(3),
});


export const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
    password: Yup.string().required("Password required").min(3),
    confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});


export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"),
});


export const OTPSchema = Yup.object().shape({
    OTP: Yup.string()
        .required("Email is required").min(6)
});

export const SetPasswordSchema = Yup.object().shape({
    pin: Yup.string()
        .required("PIN is required")
        .matches(/^\d{4}$/, "PIN must be exactly 4 digits"),
    confirmPin: Yup.string()
        .required("Confirm PIN is required")
        .oneOf([Yup.ref("pin")], "PINs must match"),
});