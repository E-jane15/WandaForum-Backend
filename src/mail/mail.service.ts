
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { generateInterviewReminder } from 'src/emails-templates/interviewReminder';

import { otpVerificationEmail } from 'src/emails-templates/verificationEmail';
import { cancelAvailability} from 'src/emails-templates/cancelAvailability';
import { forgotPasswordEmail } from 'src/emails-templates/forgotPasswordEmail';
import { availabilityConfirmation } from 'src/emails-templates/availabilityConfirmation';
import { confirmInterview } from 'src/emails-templates/confirmInterview';
import { interviewFeedback } from 'src/emails-templates/interviewFeedback';
import { interviewRejection } from 'src/emails-templates/interviewRejection';

import { notification } from 'src/emails-templates/notification';
import { peerMockInterviewConfirm } from 'src/emails-templates/peerMockInterviewConfirm';
import { rejectionEmail } from 'src/emails-templates/peerMockInterviewRequestEmail';
import { link } from 'fs';
@Injectable()
export class MailService {
  // sendRejectInterviewNotification(email: any, userName: string, recipientName: string) {
  //   throw new Error('Method not implemented.');
  // }
  // sendInterviewRejection(to :string, requesterName: string, recipientName: string);
  // async sendInterviewRejectionEmail(
  //   email: string,
  //   recipientName: string,
  //   requesterName: string,
  // ): Promise<void> {
  //   const htmlContent = interviewRejection(recipientName, requesterName);

  //   try {
  //     await this.mailerService.sendMail({
  //       to: email,
  //       from: process.env.EMAIL_USER,  // Email from your environment variable
  //       subject: 'Interview Rejection Notification',
  //       html: htmlContent,
  //     });
  //   } catch (error) {
  //     console.error(`Failed to send interview rejection email to ${email}: ${error.message}`);
  //     throw new Error('Failed to send interview rejection email');
  //   }
  // }
   
  
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

 
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }


  async sendInterviewReminderEmail(to: string, interviewTime: string, interviewDate: string, recipientName: string, interviewLink: string) {
    const subject = 'Interview Reminder from Wandaforum';
    const name = recipientName;
    // Generate the HTML content using the interview reminder template
    const htmlContent = generateInterviewReminder(name, interviewDate, interviewTime, interviewLink,recipientName);
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent, // Use the generated HTML content from the template
      });
      this.logger.log(`Sent interview reminder to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send interview reminder to ${to}: ${error.message}`);
    }
  }
  // notification 

  async sendNotificationEmail(email: string, userName: string, context: string, message: string, link: string) {
    try {
      const emailContent = notification(userName, context, message, link);

      await this.mailerService.sendMail({
        to: email,
        subject: `New Notification - ${context} | Wandaforum`,
        html: emailContent,
      });

      console.log(`Notification email sent to ${email}`);
      return { success: true, message: `Notification email sent to ${email}` };
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      return { success: false, message: `Failed to send email to ${email}` };
    }
  }

//on click sends the rejction email

// Send rejection email to the recipient
async sendRejectionEmail(
  email: string,
  requesterName: string,
  recipientName: string,
  interviewId: string
) {
  try {
    const emailContent = rejectionEmail(requesterName, recipientName, interviewId);

    // Send rejection email to the recipient (the person rejecting the interview)
    await this.mailerService.sendMail({
      to: email,
      subject: `Interview Request | Reject Confirmation`,
      html: emailContent,
    });

    console.log(`Rejection email sent to ${email}`);
    return { success: true, message: `Email sent to ${email}` };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return { success: false, message: `Failed to send email to ${email}` };
  }
}

// Send rejection confirmation email to the requester
async sendRejectionConfirmationToRequester(
  requesterEmail: string,
  requesterName: string,
  recipientName: string
) {
  try {
    const confirmationContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: red;">Interview Request Rejected</h2>
        <p>Hello ${requesterName},</p>
        <p>Unfortunately, your interview request has been <strong>rejected</strong> by ${recipientName}.</p>
        <p>You can try requesting another time or contact them directly.</p>
        <hr style="border: 0; height: 1px; background: #ddd;">
        <footer style="text-align: center; padding: 10px;">
          <p>Follow us on:</p>
          <a href="https://twitter.com" style="margin-right: 10px;">Twitter</a>
          <a href="https://facebook.com" style="margin-right: 10px;">Facebook</a>
          <a href="https://linkedin.com">LinkedIn</a>
        </footer>
      </div>
    `;

    // Send rejection confirmation to the requester
    await this.mailerService.sendMail({
      to: requesterEmail,
      subject: `Interview Request Rejected | Wandaforum`,
      html: confirmationContent,
    });

    console.log(`Rejection confirmation email sent to ${requesterEmail}`);
    return { success: true, message: `Email sent to ${requesterEmail}` };
  } catch (error) {
    console.error(`Failed to send rejection confirmation email: ${error.message}`);
    return { success: false, message: `Failed to send rejection confirmation email to ${requesterEmail}` };
  }
}
// noted

// 




//rejection--interview--------
async sendInterviewRejection(
  email: string,
  recipientName: string,
  requesterName: string
): Promise<string> {
  // Generate the email content using the interview rejection template
  const emailContent = interviewRejection(recipientName, requesterName);

  try {
    // Send the rejection email
    await this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: `Interview Request Declined | Wandaforum`,
      html: emailContent,
    });

    // Log successful email sending and return the success message
    console.log(`Interview rejection email sent to ${email}`);
    return `Email successfully sent to ${email}`;
  } catch (error) {
    // Log the error and throw a new error with a clear message
    this.logger.error(`Failed to send interview rejection email to ${email}: ${error.message}`);
    throw new Error(`Failed to send email to ${email}. Error: ${error.message}`);
  }
}


 // peer mock 
 async sendPeerMockInterviewConfirmation(
  email: string,
  requesterName: string,
  interviewDate: string,
  meetingLink: string,
  recipientName: string
) {
  try {
    const emailContent = peerMockInterviewConfirm(requesterName, interviewDate, meetingLink, recipientName);

    await this.mailerService.sendMail({
      to: email,
      subject: `Peer Mock Interview Confirmed - ${interviewDate} | Wandaforum`,
      html: emailContent,
    });

    console.log(`Peer Mock Interview Confirmation email sent to ${email}`);
    return { success: true, message: `Email sent to ${email}` };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return { success: false, message: `Failed to send email to ${email}` };
  }
}

  /**
   * Sends an OTP email for email verification
   */
  // 
  async sendOtpEmail(email: string, otp: string): Promise<string> {
  
    const htmlContent = otpVerificationEmail(email, otp)

    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Verify Your Email',
        html: htmlContent,
      });
      return otp;
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${email}: ${error.message}`);
      throw new Error('Failed to send OTP email');
    }

//


  }
//forgot password 



//
async sendForgotPasswordEmail(email: string, userName: string, resetLink: string) {
  try {
    const emailContent = forgotPasswordEmail(userName, resetLink);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password - WandaForum',
      html: emailContent,
    });

    console.log(`Forgot password email sent to ${email}`);
    return { success: true, message: `Password reset email sent to ${email}` };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return { success: false, message: `Failed to send email to ${email}` };
  }
}


//notification 




//rejection email
async sendInterviewRejectionEmail(email: string, userName: string, recipientName: string) {
  try {
    const emailContent = interviewRejection(userName, recipientName);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Interview Request Rejected - WandaForum',
      html: emailContent,
    });

    console.log(`Interview rejection email sent to ${email}`);
    return { success: true, message: `Interview rejection email sent to ${email}` };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return { success: false, message: `Failed to send email to ${email}` };
  }
}





//feed back email
async sendInterviewFeedbackEmail(email: string, userName: string, interviewDate: string, feedbackLink: string) {
  try {
    const emailContent = interviewFeedback(email,userName, interviewDate, feedbackLink);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Share Your Mock Interview Feedback - WandaForum',
      html: emailContent,
    });

    console.log(`Interview feedback email sent to ${email}`);
    return { success: true, message: `Interview feedback email sent to ${email}` };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return { success: false, message: `Failed to send email to ${email}` };
  }
}



//confirm interview

async sendInterviewConfirmationEmail(
  email: string,
  requesterName: string,
  recipientName: string,
  interviewDate: string,
  interviewTime: string,
  acceptLink: string,
  rejectLink: string,
) {
  try {
    const emailContent = confirmInterview(
      requesterName,
      interviewDate,
      interviewTime,
      acceptLink,
      rejectLink,
      recipientName
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Interview Confirmation - WandaForum',
      html: emailContent,
    });

    console.log(`Interview confirmation email sent to ${email}`);
    return { success: true, message: `Confirmation email sent to ${email}` };
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return { success: false, message: `Failed to send email to ${email}` };
  }
}

// cancel interview 

// Send cancellation email to the user when they cancel their availability
async sendCancelAvailabilityEmail(userEmail: string, userName: string) {
  try {
    const emailContent = cancelAvailability({ userName });

    // Send cancellation email to the user
    await this.mailerService.sendMail({
      to: userEmail,
      subject: `Availability Cancelled | Wandaforum`,
      html: emailContent,
    });

    console.log(`Cancellation email sent to ${userEmail}`);
    return { success: true, message: `Email sent to ${userEmail}` };
  } catch (error) {
    console.error(`Failed to send cancellation email: ${error.message}`);
    return { success: false, message: `Failed to send cancellation email to ${userEmail}` };
  }
}









  //availability confirmation
  async sendAvailabilityConfirmation(email: string, startTime: string, endTime: string) {
    try {
      const emailContent = availabilityConfirmation({ startTime, endTime });

      await this.mailerService.sendMail({
        to: email,
        subject: 'Availability Scheduled - WandaForum',
        html: emailContent,
      });

      console.log(`Availability confirmation email sent to ${email}`);
      return { success: true, message: `Confirmation email sent to ${email}` };
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      return { success: false, message: `Failed to send email to ${email}` };
    }
  }

  //cancel availablity 
  async sendAvailabilityCancellation(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Availability Canceled',
      template: 'availabilityCancellation',
      context: { name },
    });
  }

//forgot
// async sendForgotPasswordEmail(email: string, userName: string, resetToken: string) {
//   const resetLink = `https://yourfrontend.com/reset-password?token=${resetToken}`;

//   await this.mailerService.sendMail({
//     to: email,
//     subject: 'Password Reset Request',
//     template: './forgotPassword', // Use the corresponding email template
//     context: {
//       userName,
//       resetLink,
//     },
//   });
// }












  /**
   * Sends a welcome email
   */
  async sendWelcomeEmail(to: string, userName: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Welcome to Wandaforum!',
        html: `
          <html>
          <body>
            <h1>Hello, ${userName}!</h1>
            <p>Welcome to Wandaforum! We're excited to have you on board.</p>
            <p>Start exploring interview questions, mock interviews, and more!</p>
            <br>
            <p>Best regards,<br>The Wandaforum Team</p>
          </body>
          </html>
        `,
      });
      this.logger.log(`Welcome email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Error sending welcome email to ${to}: ${error.message}`);
    }
  }
}
