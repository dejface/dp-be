import { useTranslation } from "@/src/contexts/TransContext";

const ContactBanner = () => {
    const trans = useTranslation();
    return (
        <section className="hero is-medium hero-contact-banner">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="contact-banner has-text-centered">
                        <div className="subtitle is-size-2">
                            {trans("app.contact.banner_title")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactBanner;
