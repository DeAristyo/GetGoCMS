import React, { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../constants/urlApi';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const Register = () => {

    const route = useRouter();

    const { userInfo } = useSelector((state) => state.userAuth);

    useEffect(() => {
        if (Object.keys(userInfo).length > 0) {
            route.push('/');
        }
    }, [userInfo]);

    const [focus, setFocus] = useState(false);
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState(0);
    const [upassword, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitData = async () => {
        let fullName = name;
        let phone = phoneNum;
        let password = upassword;

        try {
            if (!fullName || !phone || !password) throw { message: 'All Data Must Be Filled!' };

            Axios.post(`${API_URL}/auth/register`, { fullName, phone, password }, { withCredentials: true })
                .then((res) => {
                    alert('Registration Succesful! \nContinue to login page');
                    route.push('/signin');
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className={styles.signInContainer}>
            <Head>
                <title>Register | GetGo CMS eVoucher</title>
            </Head>
            <div className={styles.errMsg}>
                {errorMessage ?
                    <div class="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                    :
                    null
                }
            </div>
            <div className={styles.signInItems}>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginBottom: '0.3rem' }}>Name</label>
                    <input type="text" id="Phone" className="form" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Phone Number</label>
                    <div className={!focus ? styles.phoneInput : styles.phoneInputfocus}>
                        <span>+65</span>
                        <input type="number" id="Phone" className="form" placeholder="Phone Number" maxLength='11' onChange={(e) => setPhoneNum(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                    </div>
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Password" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Password</label>
                    <input type="password" id="Password" className="form" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.errMessage}>
                        {upassword === ''
                            ? null
                            : upassword.length >= 8
                                ? null
                                : `Password can't be less than 8 character`}
                    </div>
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Password" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Confirm Password</label>
                    <input type="password" id="Password" className="form" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <div className={styles.errMessage}>
                        {confirmPassword === ''
                            ? null
                            : upassword === confirmPassword
                                ? null
                                : 'Password Did not Match'}
                    </div>
                </div>
                <div className={styles.noAccount} style={{ marginTop: '0.8rem', fontSize: '12px' }}>
                    <span>Already have an account? <Link href='/signin' >Click Here</Link></span>
                </div>
                <div className={styles.formButton}>
                    <button onClick={onSubmitData}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;