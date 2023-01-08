import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    username: yup. 
    string()
    .min(3, ({min}) => `Username must be at least ${min} characters long`)
    .required('Username is required'),

    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required !'),
});


export const signUpValidationSchema = yup.object().shape({
    username: yup. 
    string()
    .min(3, ({min}) => `Username must be at least ${min} characters long`)
    .required("Username is required"),

    email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),

    password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),

    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),

    firstName: yup
    .string()
    .required('First name is required')
    .min(3, "First name must be at least 3 characters long")
    .max(20, "First name must be at most 20 characters long"),
    
    lastName: yup
    .string()
    .required('Last name is required')
    .min(3, "Last name must be at least 3 characters long")
    .max(20, "Last name must be at most 20 characters long"),
})
