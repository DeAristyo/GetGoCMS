import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from '../styles/comp.module.css';
import noVoucher from '../public/assets/noVoucher.svg';
import { useSelector } from "react-redux";
import Image from "next/image";

import { TableBody } from "./tableBody";
import { API_URL } from "../constants/urlApi";

export const VoucherTable = () => {
    const { userInfo } = useSelector((state) => state.userAuth);
    const { userVoucherss } = useSelector((state) => state.userAuth);

    // const [page, setPage] = useState(1);
    // const [maxPage, setMaxPage] = useState(0);
    // const [itemPerPage, setItemPerPage] = useState(4);

    // useEffect(() => {
    //     if (Object.keys(userInfo).length > 0) {
    //         setvoucherList(userVouchers)
    //         setMaxPage(Math.ceil(re));
    //     }
    // }, [userInfo]);

    // const [voucherList, setvoucherList] = useState([]);

    // console.log(voucherList);

    // const fetchVoucher = () => {
    //     Axios.post(`${API_URL}/cms/getAllUserVoucher`, userInfo.phone)
    //         .then((result) => {
    //             setvoucherList(result.data.data);
    //             setMaxPage(Math.ceil(result.data.data.length / itemPerPage));
    //             console.table(result.data.data);
    //         })
    //         .catch(() => {
    //             alert('fetchVoucher failed');
    //         });
    // };

    // const renderProducts = () => {
    //     const startingIndex = (page - 1) * itemPerPage; //0
    //     let rawData = [...voucherList];

    //     const currentPage = rawData.slice(
    //         startingIndex,
    //         startingIndex + itemPerPage
    //     );
    //     return currentPage.map((val) => {
    //         if (val.Category_ID.toLowerCase().includes(props.category) && val.Name.toLowerCase().includes(props.product)) {
    //             return <TableBody voucherData={val} />;
    //         }
    //     });
    // };

    // const nextPageHandler = () => {
    //     if (page !== maxPage) {
    //         setPage(prev => prev + 1);
    //     }
    // };

    // const prevPageHandler = () => {
    //     if (page > 1) {
    //         setPage(prev => prev - 1);
    //     }
    // };

    if (userVoucherss === undefined || Object.keys(userVoucherss) === 0) {
        return (
            <div className={styles.noVoucherContainer}>
                <p>No Voucher!</p>
                <Image src={noVoucher} width={500} height={150} />
                <p>You have no eVoucher</p>
            </div>
        );
    }

    return (
        <div className='table-container container p-0'>
            <table className='table m-0'>
                <thead className='thead-light text-center'>
                    <tr>
                        <th>Voucher Code</th>
                        <th>Voucher Amounts</th>
                        <th>Expiry Date</th>
                        <th colSpan='2'>Action</th>
                    </tr>
                </thead>
                <tbody><TableBody /></tbody>
            </table>
            {/* <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                <button
                    className={styles.pageBtn}
                    onClick={prevPageHandler}
                    disabled={page === 1}
                >
                    {'<'}
                </button>
                <div className="text-center mb-3 mx-2">
                    <strong> Page {page} of {maxPage}</strong>
                </div>
                <button
                    className={styles.pageBtn}
                    onClick={nextPageHandler}
                    disabled={page === maxPage}
                >
                    {'>'}
                </button>
            </div> */}
        </div>
    );
};