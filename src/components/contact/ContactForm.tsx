"use client";

import { useForm } from "react-hook-form";
import { sendMail } from "@/src/utils/sendMail";
import { useState } from "react";
import { FormData } from "@/src/types/Types";
import { CgDanger } from "react-icons/cg";
import { GoCheckCircle } from "react-icons/go";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";
import PopupModal from "@/src/components/PopupModal";
import { SUCCESS } from "@/src/utils/constants";
import classNames from "classnames";
import { getPhonePattern } from "@/src/utils/getPhonePattern";

const ContactForm = () => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();
    const [emailStatus, setEmailStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const phonePattern = getPhonePattern(locale);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        const status = await sendMail(setIsModalOpen, data).then((status) => {
            setIsLoading(false);
            return status;
        });
        setEmailStatus(status);
        if (status === SUCCESS) {
            reset();
        }
    };

    const OpenModal = () => {
        const popupProps = {
            setIsModalOpen,
            Icon: emailStatus === SUCCESS ? GoCheckCircle : CgDanger,
            text: trans(
                emailStatus === SUCCESS
                    ? "app.contact.email_sent"
                    : "app.contact.email_error",
            ),
            iconColor:
                emailStatus === SUCCESS
                    ? "has-text-success"
                    : "has-text-danger",
        };

        return <PopupModal {...popupProps} />;
    };

    return (
        <div className="container">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="box is-shadowless contact-form"
            >
                <div className="contact-form-title mt-3 mb-5 has-text-centered">
                    {trans("app.contact.form_title")}
                </div>
                <div className="columns is-gapless is-centered">
                    <div className="column is-8 is-offset-2">
                        <div className="field">
                            <label
                                className="label contact-form-label"
                                htmlFor="name"
                            >
                                {`${trans("app.contact.name")}:`}
                                <span className="ml-1 has-text-danger">*</span>
                            </label>
                            <div className="control">
                                <input
                                    className={classNames(
                                        "input contact-form-input-field",
                                        {
                                            "is-danger": errors.name,
                                        },
                                    )}
                                    type="text"
                                    id="name"
                                    {...register("name", {
                                        required: trans(
                                            "app.contact.field_required",
                                        ),
                                    })}
                                />
                                {errors.name && (
                                    <p className="help is-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="field column">
                                <label
                                    className="label contact-form-label"
                                    htmlFor="email"
                                >
                                    {`${trans("app.contact.email")}:`}
                                    <span className="ml-1 has-text-danger">
                                        *
                                    </span>
                                </label>
                                <div className="control">
                                    <input
                                        className={classNames(
                                            "input contact-form-input-field",
                                            {
                                                "is-danger": errors.email,
                                            },
                                        )}
                                        type="email"
                                        id="email"
                                        {...register("email", {
                                            required: trans(
                                                "app.contact.field_required",
                                            ),
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="help is-danger">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="field column">
                                <label
                                    className="label contact-form-label"
                                    htmlFor="phone"
                                >
                                    {`${trans("app.contact.phone")}:`}
                                </label>
                                <div className="control">
                                    <input
                                        className="input contact-form-input-field"
                                        placeholder={trans(
                                            "app.contact.placeholder_phone",
                                        )}
                                        type="tel"
                                        id="phone"
                                        {...register("phone", {
                                            pattern: {
                                                value: phonePattern,
                                                message: trans(
                                                    "app.contact.invalid_phone",
                                                ),
                                            },
                                        })}
                                    />
                                    {errors.phone && (
                                        <p className="help is-danger">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label
                                className="label contact-form-label"
                                htmlFor="message"
                            >
                                {`${trans("app.contact.message")}:`}
                                <span className="ml-1 has-text-danger">*</span>
                            </label>
                            <div className="control">
                                <textarea
                                    className={classNames(
                                        "textarea contact-form-input-field",
                                        {
                                            "is-danger": errors.message,
                                        },
                                    )}
                                    id="message"
                                    rows={4}
                                    {...register("message", {
                                        required: trans(
                                            "app.contact.field_required",
                                        ),
                                    })}
                                ></textarea>
                                {errors.message && (
                                    <p className="help is-danger">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button
                                    className={classNames(
                                        "confirm-button has-full-width contact-form-button mt-4",
                                        {
                                            "confirm-button__loading":
                                                isLoading,
                                        },
                                    )}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? trans("app.contact.sending")
                                        : trans("app.contact.send_message")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen && <OpenModal />}
            </form>
        </div>
    );
};

export default ContactForm;
