import React, { useState, useEffect } from 'react';
import styles from '../styles/auth.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import { Login } from '../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {

    const { userInfo } = useSelector((state) => state.userAuth);

    const routers = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(userInfo).length > 0) {
            routers.push('/');
        }
    }, [userInfo]);

    const [focus, setFocus] = useState(false);
    const [phoneNum, setPhone] = useState(0);
    const [upassword, setPassword] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitData = async (e) => {
        e.preventDefault();
        let Phone = phoneNum;
        let Password = upassword;

        try {
            if (!Phone || !Password) throw { message: 'All Data Must Be Filled!' };

            dispatch(Login(Phone, Password));
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className={styles.signInContainer}>
            <Head>
                <title>Sign In | GetGo CMS eVoucher</title>
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
            <form onSubmit={onSubmitData}>
                <div className={styles.signInItems}>
                    <div className={styles.forminput}>
                        <label htmlFor="Phone" style={{ marginBottom: '0.3rem' }}>Phone Number</label>
                        <div className={!focus ? styles.phoneInput : styles.phoneInputfocus}>
                            <span>+65</span>
                            <input type="text" id="Phone" className="form" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                        </div>
                    </div>
                    <div className={styles.forminput}>
                        <label htmlFor="Password" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Password</label>
                        <input type="password" id="Password" className="form" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className={styles.noAccount} style={{ marginTop: '0.8rem', fontSize: '12px' }}>
                        <span>Don't have an account? <Link href='/register' >Click Here</Link></span>
                    </div>
                    <div className={styles.formButton}>
                        <button type='submit'>Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;