import styles from '../styles/navbar.module.css';
import Link from 'next/link';
import Logo from '../public/assets/hhotel.png';
import Image from 'next/image';

export const Navbar = () => {

    return (
        <div className={styles.nav}>
            <div className={styles.navItems}>
                <Link href='/'>
                    <Image src={Logo} height={25} width={150} />
                </Link>
                <Link href='/signin'>Login</Link>
            </div>
        </div>
    );
};