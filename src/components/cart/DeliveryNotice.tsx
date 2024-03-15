import { useTranslation } from "@/src/contexts/TransContext";

const DeliveryNotice = () => {
    const trans = useTranslation();
    return (
        <div>
            <span className={"is-size-7 mr-1"}>
                {trans("app.cart.delivery_until")}
            </span>
            <span className={"is-size-7 has-text-weight-bold"}>21.02.2024</span>
        </div>
    );
};

export default DeliveryNotice;
