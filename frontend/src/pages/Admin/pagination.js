import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import styles from './styles.module.css';

const Pagination = (props) => {

    function handleClickLeft() {
        props.handlePagination(-1);
    }

    function handleClickRight() {
        props.handlePagination(1);
    }

    return (
        <div className={styles.pagination_arrows}>
            <button onClick={handleClickLeft}>
                <FiChevronLeft size={25} />
            </button>
            <button onClick={handleClickRight}>
                <FiChevronRight size={25} />
            </button>
        </div>
    );
}

export default Pagination;