import nodemailer from 'nodemailer';
import settings from '@restapp/config';

export default nodemailer.createTransport(settings.mailer);
