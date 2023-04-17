import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase';
import { Link } from 'react-router-dom';

const Register = () => {
    let auth = getAuth(app)
    let [err, setErr] = useState('')
    let [success, setSuccess] = useState('')
    let handlRdgister = event => {
        event.preventDefault()
        let email = event.target.email.value
        let password = event.target.password.value
        let name = event.target.name.value
        console.log(email, password)

        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(password)) {
            setErr( "Password must contain at least one Special Symbol.")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                let loggin = result.user
                console.log(loggin)
                event.target.reset()
                setErr('')
                setSuccess('user has been created successfully')
                updateProfile(result.user, {displayName: name})
                .then(() => {
                    alert('update profile name')
                })
                .catch(error => {
                    console.log(error.message)
                })
            })
            .catch(er => {
                console.log(er)
                setErr(er.message)
                setSuccess('')
            })
    }

    let handleEmail = (event) => {
        console.log(event.target.value)
    }
    let handlePasswordBlur = event => {
        console.log(event.target.value)
    }
    return (
        <div>

            <form className='w-25 mx-auto mt-5' onSubmit={handlRdgister}>
                <h4 className='text-primary'>Places Register</h4>
                <input className='w-100 mb-4 rounded p-2' type="text" name="name" id="name" placeholder='white name' />
                <br />
                <input className='w-100 mb-4 rounded p-2' onChange={handleEmail} type="email" name="email" id="email" placeholder='white email' />
                <br />
                <input className='w-100 mb-4 rounded p-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='write password' />
                <br />
                {
                    err && <p className='text-danger'>{err}</p>
                }
                {
                    success && <p className='text-success'>{success}</p>
                }
                <input className='w-100 mb-4 rounded p-2 btn btn-primary' type="submit" value="Register" />
                <p><small>You have already an account? Please <Link to='/login'>login</Link></small></p>
            </form>
        </div>
    );
};

export default Register;