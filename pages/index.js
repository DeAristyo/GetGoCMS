import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { Navbar } from '../components/navbar';
import { BuyVoucherModal } from '../components/Modals/voucherModal';
import { VoucherCarousel } from '../components/carousel';

export default function Home() {
  return (
    <div className={styles.cmsContainer}>
      <Head>
        <title>GetGo CMS eVoucher</title>
      </Head>
      <div className={styles.carouselContainer}>
        <p>AVAILABLE VOUCHERS</p>
        <VoucherCarousel />
      </div>
      <div className={styles.btnContainer}>
        <BuyVoucherModal />
      </div>
    </div>
  );
}
