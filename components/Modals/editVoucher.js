import React, { useState, useRef } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Axios from 'axios';
import { API_URL } from '../../constants/urlApi';
import styles from '../../styles/modal.module.css';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image';

import evoucher from '../../public/assets/Vouchers/evoucher.png';

export const EditVoucher = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [toGift, setToGift] = useState(false);
    const [phoneGift, setPhoneGift] = useState(0);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onSendGift = async () => {
        const code = props.code;
        const giftPhone = phoneGift;
        try {
            // const userdata = localStorage.getItem('accesstoken');
            // const userDataParse = JSON.parse(userdata);
            if (!giftPhone || giftPhone.length < 11) throw { message: 'Phone Number is not valid' };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'token': `${userDataParse.token}`
                }
            };

            Axios.patch(`${API_URL}/cms/editVoucher`, { code, giftPhone }, config)
                .then((res) => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMessage(err.message);
                });
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <>
            <button onClick={onOpenModal} className={styles.btnModal}>Edit</button>
            <Modal onClose={onCloseModal} open={open} center>
                <Image src={evoucher} />
                <h3>Description</h3>
                <p>{props.desc}</p>
                <div className="inputContainer">
                    <h4>Voucher Code</h4>
                    <input style={{ textAlign: 'center', width: '15rem', height: '3rem', fontWeight: 'bolder' }} name='voucher-code' type="text" value={props.code} disabled />
                    <div style={{ marginTop: '0.6rem', marginBottom: '0.6rem' }}>
                        <label className='form-check-label' htmlFor="check-type">
                            <input className='form-check-input' type="checkbox" id='check-type' name='check-type' onChange={(e) => setToGift(e.target.checked)} /> Send as a gift?</label>
                    </div>
                    {errorMessage !== '' ?
                        <p className='text-danger p-0 m-0 my-2'>{errorMessage}</p>
                        :
                        null
                    }
                    {toGift ?
                        <>
                            <div className={styles.forminput}>
                                <label style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Input Recipient Phone : </label>
                                <div className='input-group'>
                                    <span className="input-group-text mb-2" id="Phone">+65</span>
                                    <input
                                        type='text'
                                        className='form-control mb-2'
                                        id='Phone'
                                        placeholder='Phone'
                                        aria-describedby="Phone"
                                        onChange={(e) => setPhoneGift(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.sendButton}>
                                <button onClick={onSendGift}>Send Voucher</button>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            </Modal>
        </>
    );
};