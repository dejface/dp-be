import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { INFO_MAIL } from "@/src/utils/constants";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        const { email, name, message, phone } = req.body;

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.MAIL_SENDER_ADDRESS}`,
                pass: `${process.env.MAIL_SENDER_PASSWORD}`,
            },
        });

        const mailOptions: Mail.Options = {
            from: `"Infobot MILOUI" ${process.env.MAIL_SENDER_ADDRESS}`,
            to: INFO_MAIL,
            subject: "Email from Miloui.cz",
            text: `Email sent by ${name} <${email}> - ${
                phone === "" ? "no phone number provided" : phone
            }\n\n${message}`,
        };

        const sendMailPromise = () =>
            new Promise<string>((resolve, reject) => {
                transport.sendMail(mailOptions, function (err) {
                    if (!err) {
                        resolve("Email sent");
                    } else {
                        reject(err.message);
                    }
                });
            });

        try {
            await sendMailPromise();
            return res.status(200).json({ message: "Email sent" });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
