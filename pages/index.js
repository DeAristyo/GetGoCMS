import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Relog } from '../redux/actions/auth';
import { useDispatch } from 'react-redux';

import { UserVoucher } from '../components/userVoucher';
import { BuyVoucherModal } from '../components/Modals/voucherModal';
import { VoucherCarousel } from '../components/carousel';

export default function Home() {

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem('accesstoken');
  //   if (token) {
  //     dispatch(Relog());
  //   }
  // }, []);

  return (
    <div className={styles.cmsContainer}>
      <Head>
        <title>GetGo CMS eVoucher</title>
      </Head>
      <div className={styles.carouselContainer}>
        <p>AVAILABLE VOUCHERS</p>
        <VoucherCarousel />
      </div>
      <div className={styles.voucherContainer}>
        <UserVoucher />
      </div>
    </div>
  );
}
