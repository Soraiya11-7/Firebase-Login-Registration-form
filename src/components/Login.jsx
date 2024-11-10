import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/Firebase.init";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";


const Login = () => {
    const emailRef = useRef();
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const email = e.target.email.value;

        console.log(email, password);
        // reset status
        setSuccess(false);
        setErrorMessage('');

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                if (!result.user.emailVerified) {
                    setErrorMessage('verify your email');
                }
                else {
                    setSuccess(true);
                }

            })
            .catch((error) => {
                console.log("Error: ", error.message);
                setErrorMessage(error.message);
            });
    }

    const handleForgetSecretKey = () => {
        console.log(emailRef.current.value);
        const email = emailRef.current.value;

        if (!email) {
            console.log('Incorrect email ');
        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Password reset email sent! Check your email')
                })
                .catch((error) => {
                    console.log(error.errorMessage);
                });
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" ref={emailRef} placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />

                            <label onClick={handleForgetSecretKey} className="label">
                                <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        success && <h3 className="text-green-500">User Login successful</h3>
                    }
                    {
                        errorMessage && <h3 className="text-red-500">{errorMessage}</h3>
                    }
                    <h3>New to this website? <Link to='/registration'>Create an account</Link></h3>
                </div>
            </div>
        </div>
    );
};

export default Login;