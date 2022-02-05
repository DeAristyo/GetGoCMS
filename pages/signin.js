import React, { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import Head from 'next/head';
import Link from 'next/link';

const SignIn = () => {
    const [focus, setFocus] = useState(false);
    const [phone, setPhone] = useState(0);
    const [password, setPassword] = useState(0);

    return (
        <div className={styles.signInContainer}>
            <Head>
                <title>Sign In | GetGo CMS eVoucher</title>
            </Head>
            <div className={styles.signInItems}>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginBottom: '0.3rem' }}>Phone Number</label>
                    <div className={!focus ? styles.phoneInput : styles.phoneInputfocus}>
                        <span>+65</span>
                        <input type="text" id="Phone" className="form" placeholder="Phone Number" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                    </div>
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Password" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Password</label>
                    <input type="password" id="Password" className="form" placeholder="Phone Number" />
                </div>
                <div className={styles.noAccount} style={{ marginTop: '0.8rem', fontSize: '12px' }}>
                    <span>Don't have an account? <Link href='/register' >Click Here</Link></span>
                </div>
                <div className={styles.formButton}>
                    <button>Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;