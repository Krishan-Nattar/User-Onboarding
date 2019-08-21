import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// const handleUser = (name,email) =>{
//     console.log(name);
//     console.log(email);
//     setUser(name)
// }
// { values, errors, touched },...props
const LoginForm = (props) => {
    let values=props.values;
    let errors = props.errors;
    let touched = props.touched;
    const [user, setUser] = useState([]); 
    // console.log(props.status)

    // if(props.status != ''){
    //     setUser(props.status)
    //     props.setStatus('');
    // }
  
  return (

    <Form className="form-component">
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="text" name="name" placeholder="Name" />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
      {touched.tos && errors.tos && <p>{errors.tos}</p>}
      <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
      <button>Submit</button>
    </Form>

  );
};

const FormikLoginForm = withFormik({
    

  mapPropsToValues({ name, email, password, tos }) {
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
      .required("Name Required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email Required"),
    password: Yup.string()
      .min(6)
      .required("Password Required"),
    tos: Yup
    .boolean()
    .oneOf([true], 'Must Accept Terms and Conditions')
  }),
  //======END VALIDATION SCHEMA==========

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    if (values.email === "waffle@syrup.com") {
        setErrors({ email: "That email is already taken" });
      } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
        //   console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
          let user = res.data.name;
          let email = res.data.email;
        //   setStatus({ name: user, email:email });
        //   setUser([...user, {name:user, email:email}])
        // handleUser(user, email)
        //   console.log(props.handleUsers);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }

  }
})(LoginForm);

export default FormikLoginForm;
