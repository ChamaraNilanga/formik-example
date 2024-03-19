import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import { registerUser } from '../../Service/AxiosService';

const LoginForm = () => {

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(3, "Password must be 3 characters at minimum")
            .required("Password is required"),
        name: Yup.string().required("Name is required"),
        role: Yup.string().required("Role is required"),
    });

    const handleSubmit = async(values, { setSubmitting }) => {
        console.log(values);
        try
        {const response = await registerUser(values);
        console.log(response);
        if(response.status === 200){
            alert("User Registered Successfully");
        }else{
            console.log(response.message);
            alert(response.response.data.message)
        }
        }catch(error){
            console.log(error);
            alert(error.response.data.message);
        }
        setSubmitting(false);
    };
  return (
    <div>
        <h1>Sign Up Form</h1>
    <Formik
      initialValues={{ email: '', password: '' , name: '', role: ''}}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage style={{color:'red'}} name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage style={{color:'red'}} name="password" component="div" />
          <Field type="text" name="name" />
          <ErrorMessage style={{color:'red'}} name="name" component="div" />
          <Field type="text" name="role" />
          <ErrorMessage style={{color:'red'}} name="role" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default LoginForm