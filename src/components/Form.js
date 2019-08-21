import React, {useState} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const LoginForm = ({values, errors, touched}) => {
    const [user, setUser] = useState({ username: "", email: "", password: "", agree: "" });        
    return ( 
    // <div>

        <Form className="form-component">
        {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type="text" name ="name" placeholder="Name" />
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="email" name="email" placeholder="Email" />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="password" name="password" placeholder="Password"/>
            {/* {touched.agree && errors.agree && <p>{errors.agree}</p>} */}
            <label>
  <Field type="checkbox" name="tos" checked={values.tos} />
  Accept TOS
</label>
            <button>Submit</button>

        </Form>

    // </div>   
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

  //======VALIDATION SCHEMA==========
  validationSchema: Yup.object().shape({
    name: Yup.string()
    //   .email()
      .required("Name Required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email Required"),
    password: Yup.string()
      .min(6)
      .required("Password Required")
  }),
  //======END VALIDATION SCHEMA==========



    handleSubmit(values) {
        console.log(values)
        console.log("me")
        //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
      }
})(LoginForm);
 
export default FormikLoginForm;