import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
const savedValues = {
  name: "Sergii",
  email: "SM@gmail.com",
  channel: "Veb",
  comments: "Welcom",
  address: "221b Baker Street",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  console.log("Form Data", values);
  console.log("submit props", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("E-mail is Required"),
  channel: Yup.string().required("Chanel is Required"),
  comments: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};
const YoutubeForm = () => {
  const [formValues, setFormValues] = useState(null);

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={() => onSubmit}
      validateOnMount
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load save data
            </button>
            <button type="reset">Reset</button>
            <div className="form_control">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
              />
              <ErrorMessage name="name" component={TextError} />
            </div>
            <div className="form_control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form_control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="Youtube channel name"
              />
              <ErrorMessage name="channel" component={TextError} />
            </div>
            <div className="form_control">
              <label htmlFor="comments">Comments</label>
              <Field
                id="comments"
                name="comments"
                as="textarea"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form_control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props;

                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.toched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className="form_control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form_control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>
            <div className="form_control">
              <label htmlFor="primaryPh">Primaty phone bunber</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>
            <div className="form_control">
              <label htmlFor="secondaryPh">Secondary phone bunber</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>
            <div className="form_control">
              <label>List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;

                  return (
                    <div>
                      {phNumbers.map((phnumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}

                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <button
              type="button"
              onClick={() => {
                formik.validateField("comments");
                formik.setFieldTouched("comments");
              }}
            >
              Validate comments
            </button>
            <button
              type="button"
              onClick={() => {
                formik.validateForm();
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                });
              }}
            >
              Validate All
            </button>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
