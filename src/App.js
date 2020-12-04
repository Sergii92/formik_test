import { useState } from "react";
import { theme, ThemeProvider } from "@chakra-ui/core";

import FormikContainer from "./components/FormikContainer";
import LoginForm from "./components/LoginForm";
import YoutubeForm from "./components/YoutubeForm";

import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
function App() {
  const [youtubeState, setYoutubeState] = useState(false);
  const [formikState, setFormikState] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [registrationForm, setRegistrationForm] = useState(false);
  const onSubmit = (e) => {
    const buttonName = e.target.name;
    if (buttonName === "Youtube") {
      setYoutubeState(!youtubeState);
      setFormikState(false);
      setLoginState(false);
      setRegistrationForm(false);
    } else if (buttonName === "Formik") {
      setYoutubeState(false);
      setFormikState(!formikState);
      setLoginState(false);
      setRegistrationForm(false);
    } else if (buttonName === "Login") {
      setYoutubeState(false);
      setFormikState(false);
      setLoginState(!loginState);
      setRegistrationForm(false);
    } else {
      setYoutubeState(false);
      setFormikState(false);
      setLoginState(false);
      setRegistrationForm(!registrationForm);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="buttonBlock">
          <button onClick={onSubmit} name="Youtube">
            Open Youtube Form
          </button>
          <button onClick={onSubmit} name="Formik">
            Open Formik
          </button>
          <button onClick={onSubmit} name="Login">
            Open Login Form
          </button>
          <button onClick={onSubmit} name="Registration">
            Open Registration Form
          </button>
        </div>
        {youtubeState ? <YoutubeForm /> : null}
        {formikState ? <FormikContainer /> : null}
        {loginState ? <LoginForm /> : null}
        {registrationForm ? <RegistrationForm /> : null}
      </div>
    </ThemeProvider>
  );
}

export default App;
