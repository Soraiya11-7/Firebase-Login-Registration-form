import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/Firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Registration = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [showSecretKey, setShowSecretKey] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const email = e.target.email.value;
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const image = e.target.image.value;
        console.log(email, password);


        //set error message 
        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage('please accept our terms and conditions');
            return;
        }


        if (password.length < 6) {
            setErrorMessage('password should be 6 characters or longer');
            return;
        }

        // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;


        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one uppercase and at least one lowercase and at least one digit and at least one special character ');
            return;
        }


        // create user.....
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setSuccess(true);

                // send verification email address
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Email verification sent!');
                    });

                // update profile
                const profile = {
                    displayName: name,
                    photoURL: image
                }  

                updateProfile(auth.currentUser, profile)
                   .then(() => {
                    console.log('User Profile updated!');
                  }).catch((error) => {
                    console.log('User Profile updated error!');
                  });

            })
            .catch((error) => {
                console.log('error', error.message);
                setErrorMessage(error.message);
                setSuccess(false);
            });

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Registration now!</h1>
                    <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User profile </span>
                            </label>
                            <input type="text" placeholder="image url" name="image" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <button onClick={() => setShowSecretKey(!showSecretKey)} className="absolute btn btn-xs top-12 right-2">
                                {
                                    showSecretKey ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>

                            <input
                                type={showSecretKey ? 'text' : 'password'}
                                placeholder="password"
                                name="password"
                                className="input input-bordered" required />

                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer justify-start">
                                <input type="checkbox" name='terms' className="checkbox" />
                                <span className="label-text ml-2">Accept our terms and conditions</span>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Registration</button>
                        </div>
                    </form>
                    {
                        errorMessage && <h3 className="text-red-500">{errorMessage}</h3>
                    }
                    {
                        success && <h3 className="text-green-500">Account is created Successfully</h3>
                    }
                    <h3>Already have an account? <Link to='/login'>Login</Link></h3>
                </div>
            </div>
        </div>
    );
};

export default Registration;