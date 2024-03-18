import Layout from "@/src/components/Layout";
import ContactForm from "@/src/components/contact/ContactForm";
import Tiles from "@/src/components/contact/Tiles";
import ContactBanner from "@/src/components/contact/ContactBanner";

const ContactIndex = () => {
    return (
        <Layout fullWidthBanner={<ContactBanner />}>
            <Tiles />
            <ContactForm />
        </Layout>
    );
};

export default ContactIndex;
