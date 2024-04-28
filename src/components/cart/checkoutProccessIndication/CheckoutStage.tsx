import { useTranslation } from "@/src/contexts/TransContext";
import Link from "next/link";
import React from "react";
import { CheckoutStep } from "@/src/types/Types";

interface CheckoutStageProps {
    step: CheckoutStep;
}

const getCorrectStyleForStep = (step: CheckoutStep, label: string) => {
    if (step.isActive) {
        return (
            <span
                className={
                    "cart__checkout-step__active-page has-text-weight-bold"
                }
            >
                {label}
            </span>
        );
    } else if (step.isClickable) {
        return (
            <Link
                className={"cart__checkout-step__link"}
                href={`/${step.link}`}
            >
                {label}
            </Link>
        );
    } else {
        return (
            <span className={"cart__checkout-step__inactive-page"}>
                {label}
            </span>
        );
    }
};

const CheckoutStage = ({ step }: CheckoutStageProps) => {
    const trans = useTranslation();
    const label = trans(step.translationKey);
    return (
        <div
            className={
                "cart__checkout-step is-flex is-align-items-center is-justify-content-space-between mt-6 mt-4-mobile mb-2"
            }
        >
            {getCorrectStyleForStep(step, label)}
        </div>
    );
};

export default CheckoutStage;
