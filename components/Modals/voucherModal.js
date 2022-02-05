import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Axios from 'axios';
import { API_URL } from '../../constants/urlApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/modal.module.css';
import Link from 'next/link';

export const BuyVoucherModal = () => {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const [checked, setChecked] = useState(true);
    const [focus, setFocus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [addAddress, setAddAddress] = useState({
        AddressName: '',
        RecipientName: '',
        RecipientPhone: 0,
        AddressCity: '',
        ZipCode: 0,
        Province: '',
        Districts: '',
        AddressDetail: ''
    });

    const onFill = (val, dataType) => {
        if (dataType === 'AddressName') {
            setAddAddress({ ...addAddress, AddressName: val.target.value });
        }
        if (dataType === 'RecipientName') {
            setAddAddress({ ...addAddress, RecipientName: val.target.value });
        }
        if (dataType === 'RecipientPhone') {
            setAddAddress({ ...addAddress, RecipientPhone: val.target.value });
        }
        if (dataType === 'AddressCity') {
            setAddAddress({ ...addAddress, AddressCity: val.target.value });
        }
        if (dataType === 'ZipCode') {
            setAddAddress({ ...addAddress, ZipCode: val.target.value });
        }
        if (dataType === 'AddressDetail') {
            setAddAddress({ ...addAddress, AddressDetail: val.target.value });
        }
        if (dataType === 'Districts') {
            setAddAddress({ ...addAddress, Districts: val.target.value });
        }
        if (dataType === 'Province') {
            setAddAddress({ ...addAddress, Province: val.target.value });
        }
    };


    const onSubmitData = () => {
        let Address_Label = addAddress.AddressName;
        let Recipient_Name = addAddress.RecipientName;
        let Recipient_Phone = addAddress.RecipientPhone;
        let City = addAddress.AddressCity;
        let Province = addAddress.Province;
        let Districts = addAddress.Districts;
        let Zip_Code = addAddress.ZipCode;
        let Full_Address = addAddress.AddressDetail;

        try {
            if (!Address_Label || !Districts || !Province || !Recipient_Name || !Recipient_Phone || !City || !Zip_Code || !Full_Address) throw { message: 'Data Must Be Filled' };

            const userdata = localStorage.getItem('userInfoToken');
            const userDataParse = JSON.parse(userdata);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${userDataParse.token}`
                }
            };

            Axios.post(`${API_URL}/user/userAddAddress`, { Address_Label, Recipient_Name, Recipient_Phone, City, Province, Districts, Zip_Code, Full_Address }, config)
                .then((res) => {
                    alert('Add Address Success!');
                    setOpenModal(false);
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
            <button onClick={onOpenModal}>Buy Gift Card</button>
            <Modal open={open} onClose={onCloseModal} center >
                <div className="text-center mt-2 border-dark border-2">
                    {errorMessage !== '' ?
                        <p className='text-danger p-0 m-0 my-2'>{errorMessage}</p>
                        :
                        null
                    }
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginBottom: '0.3rem' }}>Name</label>
                    <input type="text" id="Phone" className="form" placeholder="Full Name" />
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Phone" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Phone Number</label>
                    <div className={!focus ? styles.phoneInput : styles.phoneInputfocus}>
                        <span>+65</span>
                        <input type="number" id="Phone" className="form" placeholder="Phone Number" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
                    </div>
                </div>
                <div className={styles.forminput}>
                    <label htmlFor="Password" style={{ marginTop: '0.8rem', marginBottom: '0.3rem' }}>Message : </label>
                    <textarea className="form" placeholder="Message" style={{ height: 100 }} />
                </div>
                <div className="my-2 d-flex ">
                    <label htmlFor="radio-type">
                        <input type="checkbox" id='check-type' name='check-type' /> Buy as a gift.</label>
                </div>
                <div className="my-4 d-flex justify-content-end">
                    <button className={styles.buyButton} onClick={onSubmitData}>Buy Gift Card</button>
                </div>
            </Modal>
        </div>
    );
};