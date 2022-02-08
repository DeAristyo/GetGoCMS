import React, { useState, useRef } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Axios from 'axios';
import { API_URL } from '../../constants/urlApi';
import styles from '../../styles/modal.module.css';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

export const DeleteVoucherModal = (props) => {

    const [openModal, setOpenModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onDeleteData = () => {
        let ID = props.data;
        console.log(ID);

        try {
            Axios.delete(`${API_URL}/cms/deleteVoucher/${ID}`)
                .then((res) => {
                    alert('Delete Voucher Success!');
                    onCloseModal();
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <button onClick={onOpenModal} className={styles.btnModal}>Delete</button>
            <Modal onClose={onCloseModal} open={open} center>
                <div className="delete-modal-container">
                    <div className="delete-header text-center">
                        <p>Delete Voucher</p>
                    </div>
                    <div className="delete-body text-center">
                        <p>Are you sure to delete this voucher?</p>
                    </div>
                    <div className="delete-button d-flex justify-content-center mt-4 mb-3">
                        <button
                            className={styles.batalDelBtn}
                            onClick={onCloseModal}>Cancle</button>
                        <button
                            className={styles.jadiDelBtn}
                            onClick={onDeleteData}>Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};