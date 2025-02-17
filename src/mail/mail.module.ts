import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    // Import the MailerModule and configure it
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST, // SMTP host (e.g., 'smtp.gmail.com')
        port: parseInt(process.env.EMAIL_PORT), // SMTP port (e.g., 587 for Gmail)
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.EMAIL_USER}>`, // Default sender email
      },
    }),
  ],
  providers: [MailService], // Register MailService as a provider
  exports: [MailService], controllers: [MailController], // Export MailService so other modules can use it
})
export class MailModule {}