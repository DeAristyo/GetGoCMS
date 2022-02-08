import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Axios from 'axios';
import { API_URL } from '../../constants/urlApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/modal.module.css';
import { useSelector } from 'react-redux';
import { PaymentModal } from './paymentModal';

export const BuyVoucherModal = () => {
    const { userInfo } = useSelector((state) => state.userAuth);
    const { voucherDetail } = useSelector((state) => state.voucherDetailReducer);

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [dataToSend, setDataToSend] = useState({
        name: '',
        phone: userInfo.phone,
        voucher: 0,
        payment: 0,
        qty: 0,
        message: ''
    });
    const [disabledQty, setDisabledQty] = useState({
        max: 3,
        min: 0
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [toGift, setToGift] = useState(false);

    const onFill = (val, dataType) => {
        if (dataType === 'name') {
            setDataToSend({ ...dataToSend, name: val.target.value });
        }
        if (dataType === 'phone') {
            setDataToSend({ ...dataToSend, phone: val.target.value });
        }
        if (dataType === 'voucher') {
            setDataToSend({ ...dataToSend, voucher: val.target.value });
        }
        if (dataType === 'payment_method') {
            setDataToSend({ ...dataToSend, payment: val.target.value });
        }
        if (dataType === 'plusqty') {
            setDataToSend({ ...dataToSend, qty: dataToSend.qty + 1 });
        }
        if (dataType === 'minqty') {
            setDataToSend({ ...dataToSend, qty: dataToSend.qty - 1 });
        }
        if (dataType === 'message') {
            setDataToSend({ ...dataToSend, message: val.target.value });
        }
    };

    const onSubmitData = () => {
        let userPhone = dataToSend.phone;
        let payment_methods = dataToSend.payment;
        let qty = dataToSend.qty;
        let voucherID = dataToSend.voucher;
        let message = dataToSend.message;

        try {
            // if (!Voucher || !Quantity) throw { message: 'Select Voucher first' };

            // const userdata = localStorage.getItem('userInfoToken');
            // const userDataParse = JSON.parse(userdata);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'token': `${userDataParse.token}`
                }
            };

            Axios.post(`${API_URL}/cms/makePayments`, { userPhone, payment_methods, qty, voucherID, message }, config)
                .then((res) => {
                    alert('Buy voucher success');
                    setOpen(false);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const onSubmitGift = () => {
        let userPhone = dataToSend.phone;
        let payment_methods = dataToSend.payment;
        let qty = dataToSend.qty;
        let voucherID = dataToSend.voucher;
        let message = dataToSend.message;

        try {
            // if (!Voucher || !Quantity) throw { message: 'Select Voucher first' };

            // const userdata = localStorage.getItem('userInfoToken');
            // const userDataParse = JSON.parse(userdata);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    // 'token': `${userDataParse.token}`
                }
            };

            Axios.post(`${API_URL}/cms/sendGift`, { userPhone, payment_methods, qty, voucherID, message }, config)
                .then((res) => {
                    alert('Buy voucher success');
                    setOpen(false);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <button onClick={onOpenModal}>+ Buy Gift Card</button>
            <Modal open={open} onClose={onCloseModal} center >
                <div className="text-center mt-2 border-dark border-2">
                    {errorMessage !== '' ?
                        <p className='text-danger p-0 m-0 my-2'>{errorMessage}</p>
                        :
                        null
                    }
                </div>
                <div className={styles.voucherDrop}>
                    <h6>Vouchers :</h6>
                    <select
                        onChange={(val) => onFill(val, 'voucher')}
                        name='addPrdctCategory'
                        className='form-control'>
                        <option value='' hidden>Vouchers</option>
                        <option value='1'>$25</option>
                        <option value='2'>$50</option>
                        <option value='3'>$75</option>
                        <option value='4'>$100</option>
                        <option value='5'>$150</option>
                        <option value='6'>$200</option>
                        <option value='7'>$300</option>
                    </select>
                </div>
                <div className={styles.voucherDrop}>
                    <h6 className='mt-3'>Payment Method :</h6>
                    <select
                        onChange={(val) => onFill(val, 'payment_method')}
                        name='addPrdctCategory'
                        className='form-control'>
                        <option value='' hidden>Payment Method</option>
                        <option value='mastercard'>MasterCard (10% Discount)</option>
                        <option value='visa'>Visa (25% Discount)</option>
                        <option value='paypal'>PayPal</option>
                    </select>
                </div>
                <div className={styles.qtyContainer}>
                    <label htmlFor="">Quantity :</label>
                    <div className={styles.qtyItems}>
                        <div className={styles.qtyInput}>
                            <button onClick={(val) => onFill(val, 'minqty')} disabled={dataToSend.qty === disabledQty.min}>-</button>
                            <span>{dataToSend.qty}</span>
                            <button onClick={(val) => onFill(val, 'plusqty')} disabled={dataToSend.qty === disabledQty.max}>+</button>
                        </div>
                        {dataToSend.qty === disabledQty.max ?
                            <span className={styles.errQty}>You can only buy 3 voucher at a time!</span>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="my-2 d-flex ">
                    <label className='form-check-label' htmlFor="check-type">
                        <input className='form-check-input' type="checkbox" id='check-type' name='check-type' onChange={(e) => setToGift(e.target.checked)} /> Buy as a gift?</label>
                </div>
                {toGift ?
                    <>
                        <div className={styles.forminput}>
                            <label style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Recipient Name : </label>
                            <input className="form-control" placeholder="Recipient Name" onChange={(val) => onFill(val, 'name')} />
                        </div>
                        <div className={styles.forminput}>
                            <label style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Phone Number : </label>
                            <div className='input-group'>
                                <span className="input-group-text" id="Phone">+65</span>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='Phone'
                                    placeholder='Phone'
                                    aria-describedby="Phone"
                                    onChange={(val) => onFill(val, 'phone')}
                                />
                            </div>
                        </div>
                        <div className={styles.forminput}>
                            <label style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Message : </label>
                            <textarea
                                className="form-control"
                                placeholder="Message"
                                maxLength='200' style={{ height: 100 }}
                                onChange={(val) => onFill(val, 'message')} />
                        </div>
                    </>
                    :
                    null}
                <div className="my-4 d-flex justify-content-end">
                    {/* <PaymentModal paymentData={dataToSend} /> */}
                    {!toGift ?
                        <button onClick={onSubmitData} className={styles.buyButton}>Pay</button>
                        :
                        <button onClick={onSubmitGift} className={styles.buyButton}>Send Gift</button>
                    }
                </div>
            </Modal>
        </div>
    );
};