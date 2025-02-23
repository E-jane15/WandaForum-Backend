// Updated interview rejection email template with improved styling matching the interview reminder template
export const interviewRejection = (userName: string, recipientName: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; }
        .container { max-width: 600px; width: 100%; margin: auto; padding: 20px; background: rgb(40, 31, 43); border-radius: 10px; box-shadow: 0 0 10px rgba(110, 72, 122, 0.1); color: #fff; }
        .header { background: #6a0dad; color: #fff; padding: 15px; text-align: center; font-size: 24px; border-radius: 10px 10px 0 0; }
        .content { padding: 20px; font-size: 16px; line-height: 1.6; }
        .content a { color: #6A0DAD; text-decoration: underline; }
        .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #ccc; }
        .footer a { text-decoration: none; color: #6A0DAD; margin: 0 10px; }
        .social-icons img { margin: 0 5px; width: 24px; height: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Wandaforum Interview Update</div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>We regret to inform you that your interview request has been <strong>rejected</strong> by ${recipientName}.</p>
          <p>We encourage you to try requesting another time or contact them directly for further details.</p>
          <p>
            <a href="#">Request Another Interview</a>
          </p>
          <p>If you have any questions or need assistance, feel free to reach out to us.</p>
          <p>Best regards,<br>The Wandaforum Team</p>
        </div>

        <footer class="footer">
          <p>Follow us on:</p>
          <div class="social-icons">
            <a href="https://twitter.com"><img src="https://i.postimg.cc/7hVzMk5J/twitter-icon.png" alt="Twitter"></a>
            <a href="https://facebook.com"><img src="https://i.postimg.cc/cLz1FS6b/facebook-icon.png" alt="Facebook"></a>
            <a href="https://linkedin.com"><img src="https://i.postimg.cc/1z1QF0WV/linkedin-icon.png" alt="LinkedIn"></a>
          </div>
          <p>&copy; ${new Date().getFullYear()} Wandaforum</p>
        </footer>
      </div>
    </body>
    </html>
  `;
};
