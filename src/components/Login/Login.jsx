import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase';
const Login = () => {
    let [err, setErr] = useState('')
    let [success, setSuccess] = useState('')
    let emailRef = useRef()
    // console.log(emailRef)
    let auth = getAuth(app)

    let handleLogin = event => {
        event.preventDefault()
        let email = event.target.email.value
        let password = event.target.password.value
        console.log(email, password)
        setErr("")
        setSuccess('')
        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(password)) {
            setErr("Password must contain at least one Special Symbol.")
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setErr('')
                setSuccess('Login successfull')
                sendVarificationEmail(result.user)
            })
            .catch(er => {
                console.log(er)
                setErr(er.message)
                setSuccess('')
            })

    }
    let sendVarificationEmail = user => {
        sendEmailVerification(user)
        .then(result => {
            console.log(result)
            alert('please verify your email add address')
        })
    }

    let handleResetPassword = (event) => {
        const email = emailRef.current.value
        if(!email){
            alert('please write a email')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('please check your email')
        })
        .catch(error => {
            setErr(error.message)
        })
    }
    
    return (
        <div className='w-25 mx-auto mt-5'>
            <form onSubmit={handleLogin} >
                <h4 className='text-primary'>Places Login</h4>
                <input className='w-100 mb-4 rounded p-2' ref={emailRef} type="email" name="email" id="email" placeholder='white email' />
                <br />
                <input className='w-100 mb-4 rounded p-2' type="password" name="password" id="password" placeholder='write password' />
                <br />
                {
                    err && <p className='text-danger'>{err}</p>
                }
                {
                    success && <p className='text-success'>{success}</p>
                }
                <input className='w-100 mb-4 rounded p-2 btn btn-primary' type="submit" value="Login" />
            </form>
            
            <p><small>Foget passwore? Please </small><button onClick={handleResetPassword} className='btn btn-link'>reset password</button></p>
            <p><small>new this website? Please </small><Link to='/register'>Register</Link></p>
        </div>
    );
};

export default Login;