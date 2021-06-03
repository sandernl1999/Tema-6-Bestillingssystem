import Router from "next/router";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import fire from "../../config/firebase-config";
import {
  HeadView,
  ErrorMessage,
  Wrapper,
  Input,
  Button,
  AnimatedBackground,
  ErrorMsg,
} from "../../components";
import styles from "./index.module.css";
export async function getServerSideProps() {
  return {
    props: {
      ssr: true,
    },
  };
}

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$");
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required."),
      lastName: Yup.string().required("Last Name is required."),
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
      const { firstName, lastName, email, password } = values;
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const user = response.user;
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: user.email,
              refreshToken: user.refreshToken,
              displayName: `${firstName} ${lastName}`,
            })
          );
          Router.push("/order/order-new");
          fire
            .auth()
            .currentUser.updateProfile({
              displayName: `${firstName} ${lastName}`,
            })
            .then(() => {})
            .catch((e) => console.log(e));
          const db = fire.firestore();
          const colRef = db.collection("users");
          colRef
            .add({
              firstName,
              lastName,
              email,
            })
            .then(() => {});
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
        });
    },
  });

  const redirectToSignin = () => {
    Router.push("/auth/signin");
  };

  return (
    <html lang={"en"}>
      <Wrapper>
        <HeadView title={"Børres burgers"} />
        <title>Børres burgere</title>
        <main className={styles.innerContainer} aria-label={"Register Page"}>
          <AnimatedBackground>
            <div
              aria-label={"Register form Container"}
              className={styles.formContainer}
            >
              <form onSubmit={formik.handleSubmit}>
                <Input
                  name="firstName"
                  aria-label={"firstName input"}
                  onChange={formik.handleChange}
                  placeholder="First name"
                  tabindex={"0"}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <ErrorMsg msg={formik.errors.firstName} />
                ) : null}
                <Input
                  name="lastName"
                  aria-label={"lastName input"}
                  onChange={formik.handleChange}
                  placeholder="Last name"
                  tabindex={"0"}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <ErrorMsg msg={formik.errors.lastName} />
                ) : null}
                <Input
                  type="email"
                  name="email"
                  aria-label={"email input"}
                  onChange={formik.handleChange}
                  placeholder="Email"
                  tabindex={"0"}
                />
                {formik.touched.email && formik.errors.email ? (
                  <ErrorMsg msg={formik.errors.email} />
                ) : null}
                <Input
                  type="password"
                  name="password"
                  aria-label={"password input"}
                  onChange={formik.handleChange}
                  placeholder="Password"
                  tabindex={"0"}
                />
                {formik.touched.password && formik.errors.password ? (
                  <ErrorMsg msg={formik.errors.password} />
                ) : null}
                <Button
                  onClick={formik.handleSubmit}
                  title={"Register"}
                  titleStyle={{ color: "black" }}
                  aria-label={"register button"}
                  className={styles.btnStyle}
                />
                <Button
                  onClick={redirectToSignin}
                  title={"Have account?"}
                  titleStyle={{ color: "black" }}
                  aria-label={"Login page button"}
                  className={styles.btnStyle}
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
