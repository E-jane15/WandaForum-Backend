

    export const peerMockInterviewConfirm = (requesterName: string, interviewDate:string, meetingLink: string, recipientName: string) => {  
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mock Interview Confirmed</title>
          <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
              .container {max-width: 380px; width: 100%; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto; }
              <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="150" style="margin-right: 10px;">
              .header { text-align: center; padding: 10px 0; }
              .header img { width: 150px; }
              .content { text-align: center; padding: 20px; }
              .content h2 { color: #333; }
              .content p { color: #666; font-size: 16px; }
              .btn { display: inline-block; padding: 12px 20px; background-color: #6a0dad; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px; }
              .footer { text-align: center; font-size: 14px; color: #777; padding: 15px 0; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="https://yourdomain.com/logo.png" alt="Wandaforum Logo">
              </div>
              <div class="content">
                  <h2>Your Peer Mock Interview is Confirmed! 🎉</h2>
                  <p>Hello ${requesterName},</p>
                  <p>Great news! <strong>${recipientName}</strong> has accepted your mock interview request.</p>
                  <p><strong>Interview Date:</strong> ${interviewDate}</p>
                  <p>Click below to join your interview:</p>
                  <a href="${meetingLink}" class="btn">Join Interview</a>
              </div>
              
              <footer style="text-align: center; padding: 10px;">
        <p>Follow us on:</p>
        <a href="https://twitter.com" style="margin-right: 10px;">Twitter</a>
        <a href="https://facebook.com" style="margin-right: 10px;">Facebook</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </footer>
                  <p>Need help? Contact support at <a href="mailto:support@wandaforum.com">support@wandaforum.com</a></p>
                  <p>Wandaforum &copy; 2025 | All Rights Reserved</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  