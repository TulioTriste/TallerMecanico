import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'apptallermecanico@gmail.com',       // your email
        pass: 'uyda xatq hybo epgn', // app password or actual password
    },
});