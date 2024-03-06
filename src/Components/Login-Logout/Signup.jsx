import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import Logo from "/logo.png";
import google from "/src/assets/Images/Google.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./Firebase";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("Sign up successful:", userCredential.user);
      alert("Sign up successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      // Handle error and provide feedback to the user
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Sign up successful:", userCredential.user);
      alert("Sign up successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      // Handle error and provide feedback to the user
    }
  };

  const handleFacebookSignUp = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Sign up successful:", userCredential.user);
      alert("Sign up successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div className="login-background lg:flex h-screen">
      <Link to="/">
        <button className="px-4 py-2 lg:ml-10 ml-1 mt-1 lg:mt-10 h-12 border-2 text-lg text-cyan-600 hover:bg-cyan-600 hover:text-cyan-200">
          Back
        </button>
      </Link>

      <div className=" grid place-items-center bg-center relative z-50 top-0 w-full h-full">
        <div className="bg-white text-center mx-auto grid grid-rows-7 gap-1 px-6 pt-0  rounded-lg lg:w-1/4">
          <img
            className="w-10 h-10 lg:w-32 border-4 border-cyan-950 mx-auto lg:h-32"
            src={Logo}
            alt="qq-logo"
          />
          <h1 className="text-cyan-900 font-extrabold lg:text-xl">
            Create an Account
          </h1>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              agreeToTerms: false,
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) {
                errors.firstName = "Required";
              }
              if (!values.lastName) {
                errors.lastName = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(values.password)) {
                errors.password =
                  "Password must contain at least one uppercase letter and one number";
              }
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
              }
              if (!values.agreeToTerms) {
                errors.agreeToTerms = "You must agree to the terms of service";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSignUp(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="row-span-6 bg-white grid grid-row-5 gap-2 ">
                <Field
                  className="px-4 h-14 rounded border-2 border-cyan-950 bg-gray-100 row-span-2"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <ErrorMessage
                  className="text-red-700 font-semibold"
                  name="firstName"
                  component="div"
                />
                <Field
                  className="px-4 h-14 rounded border-2 border-cyan-950 bg-gray-100 row-span-2"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  className="text-red-700 font-semibold"
                  name="lastName"
                  component="div"
                />
                <Field
                  className="px-4 h-14 rounded border-2 border-cyan-950 bg-gray-100 row-span-2"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                />
                <ErrorMessage
                  className="text-red-700 font-semibold"
                  name="email"
                  component="div"
                />
                <div className="w-full bg-gray-100 rounded relative h-14">
                  <Field
                    className="px-4 h-full w-full bg-gray-100 rounded border-2 border-cyan-950 row-span-2 pr-10"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                  />
                  <div className="absolute top-6 right-3">
                    {showPassword ? (
                      <FaEyeSlash
                        className="cursor-pointer text-cyan-950"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <FaEye
                        className="cursor-pointer text-cyan-950"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  className="text-red-700 font-semibold"
                  name="password"
                  component="div"
                />
                <Field
                  className="px-4 h-14 rounded border-2 border-cyan-950 bg-gray-100 row-span-2"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  className="text-red-700 font-semibold"
                  name="confirmPassword"
                  component="div"
                />
                <label className="flex flex-row gap-2 items-center mb-4  ">
                  <Field type="checkbox" name="agreeToTerms" className="" />
                  <span className="col-span-3">
                    {" "}
                    I agree to{" "}
                    <span className="  text-cyan-950  font-extrabold">
                      Quotes Quest&apos;s
                    </span>{" "}
                    Terms of Service
                  </span>
                </label>
                <button
                  className="bg-cyan-950 rounded font-extrabold h-14 text-cyan-100 row-span-1"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex flex-col justify-center gap-4">
            <button
              className="bg-red-500 flex flex-row items-center  justify-center lg:font-extrabold gap-4 px-4  py-2 rounded h-14 lg:h-14 text-white"
              onClick={handleGoogleSignUp}
            >
              <img
                src={google}
                className="-ml-4 w-5 bg-white rounded-full"
                alt=""
              />
              <>Sign up with Google</>
            </button>
            <button
              className="bg-blue-900 flex flex-row items-center justify-center lg:font-extrabold gap-4 px-4  py-2 rounded h-14 lg:h-14 text-white"
              onClick={handleFacebookSignUp}
            >
              <FaFacebook className="lg:text-xl" />
              <span>Sign up with Facebook</span>
            </button>
          </div>
          <Link className="font-bold" to="/login">
            Already have an account?{" "}
            <span className="font-extrabold">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
