import Router from "next/router";
import { useState } from "react";
import {
  HeadView,
  ErrorMessage,
  Input,
  Wrapper,
  Button,
  AnimatedBackground,
  ErrorMsg,
} from "../../components";
import fire from "../../config/firebase-config";
import styles from "./index.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export async function getServerSideProps() {
  return {
    props: {
      ssr: true,
    },
  };
}

export default function Sigin() {
  const [errorMessage, setErrorMessage] = useState("");
  const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required.")
        .email("This Email should be a valid email."),
      password: Yup.string()
        .required("Password is required.")
        .matches(
          passRegex,
          "Must Contain 8 Characters,\n Minimum One big letter,\n One Number"
        ),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          var user = response.user;
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: user.email,
              refreshToken: user.refreshToken,
              displayName: user.displayName,
            })
          );
          Router.push("/order/order-new");
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
        });
    },
  });

  const redirectToRegisteration = () => {
    Router.push("/auth/register");
  };

  return (
    <html lang={"en"}>
      <Wrapper>
        <HeadView title={"Børres burgers login"} />
        <title>Børres burgere</title>
        <main aria-label={"Login Page"} className={styles.innerContainer}>
          <AnimatedBackground>
            <div
              aria-label={"Login form Container"}
              className={styles.formContainer}
            >
              <form noValidate onSubmit={formik.handleSubmit}>
                <Input
                  type="email"
                  tabindex={"0"}
                  aria-label={"email input"}
                  name="email"
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMsg msg={formik.errors.email} />
                ) : null}
                <Input
                  type="password"
                  tabindex={"0"}
                  aria-label={"password input"}
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <ErrorMsg msg={formik.errors.password} />
                ) : null}
                <Button
                  onClick={formik.handleSubmit}
                  aria-label={"Login Button"}
                  title={"Login"}
                  accessKey={"key"}
                  className={styles.btnStyle}
                  titleStyle={{ color: "black" }}
                />
                <Button
                  onClick={redirectToRegisteration}
                  title={"New user?"}
                  aria-label={"Register Button"}
                  className={styles.btnStyle}
                  titleStyle={{ color: "black" }}
                />
              </form>
              {errorMessage && (
                <ErrorMessage
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              )}
            </div>
          </AnimatedBackground>
        </main>
      </Wrapper>
    </html>
  );
}
