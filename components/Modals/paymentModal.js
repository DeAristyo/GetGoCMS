import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Axios from 'axios';
import { API_URL } from '../../constants/urlApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/modal.module.css';
import { useSelector } from 'react-redux';

export const PaymentModal = (props) => {
    const { userInfo } = useSelector((state) => state.userAuth);

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [toGift, setToGift] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(0);
    const [voucher, setVoucher] = useState(0);
    const [qty, setQty] = useState(0);
    const [message, setMessage] = useState('');
    const [disabledQty, setDisabledQty] = useState({
        max: 3,
        min: 0
    });
    const [checked, setChecked] = useState(true);
    const [focus, setFocus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitData = () => {
        let Name = props.paymentData.name;
        let Recipient_Phone = props.paymentData.phone;
        let Voucher = props.paymentData.voucher;
        let Quantity = props.paymentData.qty;
        let Message = props.paymentData.message;

        try {
            if (!Voucher || !Quantity) throw { message: 'Select Voucher first' };

            const userdata = localStorage.getItem('userInfoToken');
            const userDataParse = JSON.parse(userdata);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${userDataParse.token}`
                }
            };

            Axios.post(`${API_URL}/user/userAddAddress`, { Name, Recipient_Phone, Voucher, Quantity, Message }, config)
                .then((res) => {
                    alert('Add Address Success!');
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
            <button className={styles.buyButton} onClick={onOpenModal}>Buy Gift Card</button>
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
                    <input type="text" value={props.paymentData.voucherID} />
                </div>
                <div className={styles.qtyContainer}>
                    <label htmlFor="">Quantity :</label>
                    <div className={styles.qtyItems}>
                        <div className={styles.qtyInput}>
                            <button onClick={() => setQty(qty - 1)} disabled={qty === disabledQty.min}>-</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(qty + 1)} disabled={qty === disabledQty.max}>+</button>
                        </div>
                        {qty === disabledQty.max ?
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
                            <input className="form-control" placeholder="Recipient Name" />
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
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.forminput}>
                            <label style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Message : </label>
                            <textarea className="form-control" placeholder="Message" maxLength='200' style={{ height: 100 }} />
                        </div>
                    </>
                    :
                    null}
                <div className="my-4 d-flex justify-content-end">
                    <button className={styles.buyButton} onClick={onSubmitData} disabled={qty === 0 || qty > 3}>Buy Gift Card</button>
                </div>
            </Modal>
        </div>
    );
};