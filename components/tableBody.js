import { useSelector } from "react-redux";
import { DeleteVoucherModal } from "./Modals/deleteVoucher";
import { EditVoucher } from "./Modals/editVoucher";
import 'bootstrap/dist/css/bootstrap.css';

export const TableBody = () => {
    const { userVoucherss } = useSelector((state) => state.userAuth);

    const format = (money) => {
        let formatMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(money);
        return formatMoney;
    };

    if (userVoucherss === undefined || Object.keys(userVoucherss) === 0) {
        return (
            <div className="container text-center">
                <p>LOADING . . .</p>
            </div>
        );
    }
    return (
        userVoucherss.map((val) => {
            return (
                <tr className="text-center">
                    <td>{val.voucher_code}</td>
                    <td>{format(val.amount)}</td>
                    <td>{val.expiry_date}</td>
                    <td>
                        <EditVoucher code={val.voucher_code} desc={val.description} />
                        <DeleteVoucherModal data={val.iduvoucher} />
                    </td>
                </tr>
            );
        })
    );
};