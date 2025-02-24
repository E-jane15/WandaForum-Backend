
// export const generateInterviewReminder= (name: string, interviewDate: string, interviewTime: string, interviewLocation: string) => {

    export const generateInterviewReminder = (name: string,interviewDate: string, interviewTime: string, interviewLocation: string, interviewLink: string) => {
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .container { max-width: 600px; width: 100%; margin: auto; padding: 20px; background:rgb(232, 223, 235); border-radius: 10px; box-shadow: 0 0 10px rgba(110, 72, 122, 0.1); }
              .header { background: #6a0dad; color: #fff; padding: 15px; text-align: center; font-size: 24px; }
              .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
              .footer a { text-decoration: none; color: #6A0DAD; margin: 0 10px; }
              .social-icons img { margin: 0 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">Wandaforum Interview Reminder</div>
              <div style="padding: 20px;">
                <p>Hi ${name},</p>
                <p>This is a friendly reminder that your interview is scheduled for:</p>
                <div style="font-size: 16px; color: #6A0DAD; margin: 20px 0; text-align: left;">
                  <p><strong>Date:</strong> ${interviewDate}</p>
                  <p><strong>Time:</strong> ${interviewTime}</p>
                  <p><strong>Location:</strong> ${interviewLocation}</p>
                </div>
                <p>To join the interview, click here: <a href="${interviewLink}" style="color: #6A0DAD;">Click here to join</a></p>
                <p>If you have any questions or need to reschedule, feel free to reach out to us.</p>
                <p>Best regards,<br>The Wandaforum Team</p>
      
                <footer class="footer">
                  <p>Follow us on:</p>
                  <div class="social-icons">
                    <a href="https://twitter.com"><img src="https://i.postimg.cc/7hVzMk5J/twitter-icon.png" alt="Twitter" width="24" height="24"></a>
                    <a href="https://facebook.com"><img src="https://i.postimg.cc/cLz1FS6b/facebook-icon.png" alt="Facebook" width="24" height="24"></a>
                    <a href="https://linkedin.com"><img src="https://i.postimg.cc/1z1QF0WV/linkedin-icon.png" alt="LinkedIn" width="24" height="24"></a>
                  </div>
                  <p>&copy; ${new Date().getFullYear()} Wandaforum</p>
                </footer>
              </div>
            </div>
          </body>
          </html>
        `;
      };
      