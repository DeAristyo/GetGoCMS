import React, { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import Link from 'next/link';
import Head from 'next/head';

const Register = () => {

    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className={styles.signInContainer}>
            <Head>
                <title>Register | GetGo CMS eVoucher</title>
            </Head>
            <div className={styles.signInItems}>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginBottom: '0.3rem' }}>Name</label>
                    <input type="text" id="Phone" className="form" placeholder="Full Name" />
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Phone Number</label>
                    <div className={!focus ? styles.phoneInput : styles.phoneInputfocus}>
                        <span>+65</span>
                        <input type="number" id="Phone" className="form" placeholder="Phone Number" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                    </div>
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Password" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Password</label>
                    <input type="password" id="Password" className="form" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.errMessage}>
                        {password === ''
                            ? null
                            : password.length >= 8
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
                            : password === confirmPassword
                                ? null
                                : 'Password Did not Match'}
                    </div>
                </div>
                <div className={styles.noAccount} style={{ marginTop: '0.8rem', fontSize: '12px' }}>
                    <span>Already have an account? <Link href='/signin' >Click Here</Link></span>
                </div>
                <div className={styles.formButton}>
                    <button>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Register;