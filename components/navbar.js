import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import Logo from '../public/assets/hhotel.png';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Logout } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

export const Navbar = () => {

    const dispatch = useDispatch();

    const info = useSelector((state) => state.userAuth);
    const { userInfo } = info;
    console.log(info);
    console.log(userInfo);

    const OnLogout = (e) => {
        e.preventDefault();
        dispatch(Logout());
    };

    return (
        <div className={styles.nav}>
            <div className={styles.navItems}>
                <Link href='/'>
                    <Image src={Logo} height={28} width={150} />
                </Link>
                {Object.keys(userInfo).length === 0 ?
                    <Link href='/signin'>Login</Link>
                    :
                    <div class={styles.dropdown}>
                        <button class={styles.dropbtn}>Wellcome, {userInfo.name}</button>
                        <div class={styles.dropdownContent}>
                            <button onClick={OnLogout}>Logout</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};