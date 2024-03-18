import React, { useEffect } from "react";
import { IconType } from "react-icons";

interface PopupModalProps {
    setIsModalOpen: (value: boolean) => void;
    Icon: IconType;
    text: string;
    iconColor: string;
}

const PopupModal = ({
    setIsModalOpen,
    Icon,
    text,
    iconColor,
}: PopupModalProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalOpen(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [setIsModalOpen]);

    return (
        <div className="modal is-active left-corner-modal">
            <div className="modal-content has-text-centered">
                <div className="box cart-modal__box has-background-light-beige">
                    <Icon
                        className={`is-size-1 mb-4 ${iconColor}`}
                        data-testid={"popup-modal-icon"}
                    />
                    <div className="is-size-4 has-text-weight-semibold mb-4">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;
