import styles from '../styles/comp.module.css';
import hStyles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { VoucherTable } from './voucherTable';
import { BuyVoucherModal } from './Modals/voucherModal';
import noVoucher from '../public/assets/noVoucher.svg';

export const UserVoucher = () => {
    const { userInfo } = useSelector((state) => state.userAuth);

    if (Object.keys(userInfo).length === 0) {
        return (
            <div className={styles.noVoucherContainer}>
                <p>No Voucher!</p>
                <Image src={noVoucher} width={500} height={150} />
                <p><Link href='/signin'>Login</Link> First to see your vouchers here! <br />
                    Or <Link href='/register' >Create an account</Link> if you don't have one</p>
            </div>
        );
    }

    return (
        <>
            <div className={hStyles.btnContainer}>
                <BuyVoucherModal />
            </div>
            <div className={styles.voucherContainer}>
                {/* <p>No Voucher!</p>
                <Image src={noVoucher} width={500} height={150} />
                <p><Link href='/signin'>Login</Link> First to see your vouchers here! <br />
                    Or <Link href='/register' >Create an account</Link> if you don't have one</p> */}
                <VoucherTable />
            </div>
        </>
    );
};