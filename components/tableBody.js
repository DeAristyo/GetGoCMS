export const TableBody = (props) => {
    const format = (money) => {
        let formatMoney = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
        return formatMoney;
    };

    return (
        <tr className="text-center">
            <td>{props.productData.SKU}</td>
            <td>{props.productData.Name}</td>
            <td>{format(props.productData.Price)}</td>
            <td><img src={props.productData.Image} alt="" /></td>
            <td>
                <ProductDetailModal product={props.productData} />
                <EditProductModals product={props.productData} />
                <DeleteProductModal data={props.productData} />
            </td>
        </tr>
    );
}