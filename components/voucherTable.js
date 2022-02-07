import React, { useState, useEffect } from "react";
import Axios from "axios";
import styles from '../styles/comp.module.css';

import { TableBody } from "./tableBody";

export const VoucherTable = () => {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(4);

    // useEffect(() => {
    //     fetchProduct();
    // }, []);

    const [productList, setProductList] = useState([]);

    console.log(productList);

    const fetchProduct = () => {
        Axios.get(`${API_URL}/admin/fetchProduct`)
            .then((result) => {
                setProductList(result.data.data);
                setMaxPage(Math.ceil(result.data.data.length / itemPerPage));
                // console.table(result.data.data);
            })
            .catch(() => {
                alert('fetchProduct gagal');
            });
    };

    const renderProducts = () => {
        const startingIndex = (page - 1) * itemPerPage; //0
        let rawData = [...productList];

        const currentPage = rawData.slice(
            startingIndex,
            startingIndex + itemPerPage
        );
        return currentPage.map((val) => {
            if (val.Category_ID.toLowerCase().includes(props.category) && val.Name.toLowerCase().includes(props.product)) {
                return <TableBody productData={val} product={props.product} category={props.category} />;
            }
        });
    };

    const nextPageHandler = () => {
        if (page !== maxPage) {
            setPage(prev => prev + 1);
        }
    };

    const prevPageHandler = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    // if (productList.length < 1) {
    //     return (
    //         <div className="loading text-center mt-5">
    //             <h2>Loading . . .</h2>
    //         </div>
    //     );
    // }

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
                <tbody>{renderProducts()}</tbody>
            </table>
            <div className="d-flex flex-row justify-content-center align-items-center mt-3">
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
            </div>
        </div>
    );
};