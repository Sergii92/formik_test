import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function RegistrationForm() {
  const options = [
    { key: "Email", value: "Email" },
    { key: "Telephone", value: "telephone" },
  ];

  const initialVaues = {
    email: "",
    password: "",
    confirmPassword: "",
    modeOfContact: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid e,ail Format").required("Is Required"),
    password: Yup.string().required("Is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password", "")], "Password must match")
      .required("Is Required"),
    modeOfContact: Yup.string().required("Is Required"),
    phone: Yup.string().when("modeOfContact", {
      is: "telephone",
      then: Yup.string().required("Is Required"),
    }),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialVaues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            <FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />
            <FormikControl
              control="radio"
              label="Mode of Contact"
              name="modeOfContact"
              options={options}
            />
            <FormikControl
              control="input"
              type="text"
              label="Phone number"
              name="phone"
            />
            <button type="submit" disabled={!formik.isValid}>
              SUBMIT
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegistrationForm;
