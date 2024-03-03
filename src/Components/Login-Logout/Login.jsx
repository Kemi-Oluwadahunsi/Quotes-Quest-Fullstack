import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '/logo.png';
import google from '/src/assets/Images/Google.png';
import { FaFacebook } from 'react-icons/fa';
import { auth } from './Firebase';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log('Sign in successful:', userCredential.user);
      alert('Sign in successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Email or Password invalid');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', userCredential.user);
      alert('Sign in successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Error signing in with Google');
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', userCredential.user);
      alert('Sign in successful');
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Error signing in with Facebook');
    }
  };

  return (
    <div className="h-screen grid place-items-center bg-center login-background">
      <div className="bg-white text-center lg:-mt-12 mx-auto grid grid-rows-5 lg:h-formHeight gap-2 px-4 pt-0 rounded-lg lg:w-1/4">
        <img
          className="w-10 h-10 lg:w-32 rounded-full border-4 border-cyan-950 mx-auto lg:h-32"
          src={Logo}
          alt="motiva logo"
        />
        <h1 className="text-cyan-900 font-extrabold lg:text-xl lg:-mb-10">
          Welcome back, Sign In
        </h1>
        {error && <div className="text-red-700 font-semibold ">{error}</div>}
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Password is Required";
            } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(values.password)) {
              errors.password =
                "Password must contain at least one capital letter and one number";
            }
            return errors;
          }}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="row-span-3 bg-white grid grid-row-6 gap-2">
              <Field
                className="px-4 h-8 lg:h-14 rounded border-2 border-cyan-950 bg-gray-100 row-span-2"
                type="email"
                name="email"
                placeholder="Email Address"
              />
              <ErrorMessage
                className="text-red-700 font-semibold"
                name="email"
                component="div"
              />
              <div className="w-full bg-gray-100 rounded relative h-8 b lg:h-14">
                <Field
                  className="px-4 h-full w-full bg-gray-100 rounded border-2 border-cyan-950 row-span-2 pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                />
                <div className="absolute top-2 lg:top-6 right-3">
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
              <div className="grid grid-cols-2">
                <label className="justify-self-start">
                  <Field type="checkbox" name="rememberMe" className="mr-2" />
                  Remember me
                </label>
                <span className="justify-self-end font-semibold">
                  Forgot Password?
                </span>
              </div>
              <button
                className="bg-cyan-950 rounded h-8 lg:h-14 text-cyan-100 lg:font-extrabold row-span-1"
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <span className="mx-auto lg:font-bold text-cyan-950">OR</span>
        <div className="flex flex-col justify-center gap-4">
          <button
            className="bg-red-500 flex flex-row items-center justify-center lg:font-extrabold gap-4 px-4 py-2 rounded h-8 lg:h-14 text-white"
            onClick={handleGoogleSignIn}
          >
            <img
              src={google}
              className="-ml-4 w-5 bg-white rounded-full"
              alt="Google Logo"
            />
            <span>Sign in with Google</span>
          </button>
          <button
            className="bg-blue-900 flex flex-row items-center justify-center lg:font-extrabold gap-4 px-4 py-2 rounded h-8 lg:h-14 text-white"
            onClick={handleFacebookSignIn}
          >
            <FaFacebook className="lg:text-xl" />
            <span>Sign in with Facebook</span>
          </button>
        </div>
        <Link className="font-bold" to="/signUp">
          No Account? <span className="font-extrabold">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
