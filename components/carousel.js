import React from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from "next/image";
import styles from "../styles/Home.module.css";

import tFive from '../public/assets/Vouchers/25.png';
import fTeen from '../public/assets/Vouchers/50.png';
import stFive from '../public/assets/Vouchers/75.png';
import hundred from '../public/assets/Vouchers/100.png';
import hfTeen from '../public/assets/Vouchers/150.png';
import tHundred from '../public/assets/Vouchers/200.png';
import thHundred from '../public/assets/Vouchers/300.png';

export const VoucherCarousel = () => {
    return (
        <Carousel autoPlay infiniteLoop interval={5000} showThumbs={false} >
            <div>
                <Image src={tFive} alt="image1" />
                <p className="legend">$25</p>

            </div>
            <div>
                <Image src={fTeen} alt="image2" />
                <p className="legend">$50</p>

            </div>
            <div>
                <Image src={stFive} alt="image3" />
                <p className="legend">$75</p>

            </div>
            <div>
                <Image src={hundred} alt="image4" />
                <p className="legend">$100</p>

            </div>
            <div>
                <Image src={hfTeen} alt="image5" />
                <p className="legend">$150</p>
            </div>
            <div>
                <Image src={tHundred} alt="image5" />
                <p className="legend">$200</p>
            </div>
            <div>
                <Image src={thHundred} alt="image5" />
                <p className="legend">$300</p>
            </div>
        </Carousel>
    );
};