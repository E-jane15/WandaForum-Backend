export const rejectionEmail = (requesterName: string, recipientName: string, interviewId: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { max-width: 380px; width: 100%; margin: auto; padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
      <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="150" style="margin-right: 10px;">
        .header { background: #6a0dad; color: #fff; padding: 15px; text-align: center; font-size: 24px; }
        .content { padding: 20px; text-align: center; }
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background:rgb(177, 36, 149);
          border-radius: 5px;
          text-decoration: none;
          margin-top: 20px;
        }
        .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Interview Request</div>
        <div class="content">
          <p>Hello <strong>${recipientName}</strong>,</p>
          <p>You have received an interview request from <strong>${requesterName}</strong>.</p>
          <p>If you do not wish to accept this request, click below to reject it:</p>
          <a class="button" href="https://yourdomain.com/interviews/${interviewId}/reject" target="_blank">Reject Interview</a>
          <p>Best Regards, <br> <strong>The Wandaforum Team</strong></p>
          <footer style="text-align: center; padding: 10px;">
        <p>Follow us on:</p>
        <a href="https://twitter.com" style="margin-right: 10px;">Twitter</a>
        <a href="https://facebook.com" style="margin-right: 10px;">Facebook</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </footer>
        </div>
      </div>
    </body>
    </html>
  `;
};
