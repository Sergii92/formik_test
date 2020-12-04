import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function FormikContainer() {
  const dropdownOptions = [
    { key: "Select an options", value: "", id: 0 },
    { key: "Option 1", value: "Option1", id: 1 },
    { key: "Option 2", value: "Option2", id: 2 },
    { key: "Option 3", value: "Option3", id: 3 },
  ];
  const radioOptions = [
    { key: "Option 1", value: "Option1", id: 1 },
    { key: "Option 2", value: "Option2", id: 2 },
    { key: "Option 3", value: "Option3", id: 3 },
  ];
  const checkboxOptions = [
    { key: "Option 1", value: "Option1", id: 1 },
    { key: "Option 2", value: "Option2", id: 2 },
    { key: "Option 3", value: "Option3", id: 3 },
  ];

  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Is Required"),
    description: Yup.string().required("Descriprion is required"),
    selectOption: Yup.string().required("selectOption is required"),
    radioOption: Yup.string().required("radioOption is required"),
    checkboxOption: Yup.array().required("checkboxOptions is required"),
    birthDate: Yup.date().required("date required").nullable(),
  });
  const onSubmit = (values) => console.log("Form Data", values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
              control="textarea"
              label="Description"
              name="description"
            />
            <FormikControl
              control="select"
              label="Select Options"
              name="selectOptions"
              options={dropdownOptions}
            />
            <FormikControl
              control="radio"
              label="Radio Topic"
              name="radioOption"
              options={radioOptions}
            />
            <FormikControl
              control="checkbox"
              label="Checkbox Topics"
              name="checkboxOption"
              options={checkboxOptions}
            />
            <FormikControl control="date" label="Pick date" name="birthDate" />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
