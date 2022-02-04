import styles from '../styles/navbar.module.css';
import Link from 'next/link';

export const Navbar = () => {

    return (
        <div className={styles.nav}>
            <div className="content">
                <Link href='/signin'>Login</Link>
            </div>
        </div>
    );
};