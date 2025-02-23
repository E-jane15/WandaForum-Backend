
export const confirmInterview = (requesterName: string,interviewDate:string,interviewTime: string,acceptLink: string,rejectLink: string, recipientName: string ) => {


    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="150" style="margin-right: 10px;">
          <title>Interview Confirmation</title>
          <style>
              body { font-family: Arial, sans-serif; }
              .container { padding: 20px; background-color: #f9f9f9; border-radius: 10px; text-align: center; }
              h2 { color:rgb(122, 10, 122); } /* Purple color */
              p { font-size: 16px; }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4A00E0;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  margin: 10px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Hello ${recipientName},</h2>
              <p>${requesterName} has requested an interview with you.</p>
              <p><strong>📅 Date:</strong> ${interviewDate}</p>
              <p><strong>⏰ Time:</strong> ${interviewTime}</p>
              <p>Do you want to accept or reject this interview request?</p>
              <a class="button" href="${acceptLink}" style="background-colour: purple;">Accept</a>
              <a class="button" href="${rejectLink}" style="background-color: red;">Reject</a>
              <p>Best regards,</p>
              <p>— The Wandaforum Team</p>
              <footer style="text-align: center; padding: 10px;">
        <p>Follow us on:</p>
        <a href="https://twitter.com" style="margin-right: 10px;">Twitter</a>
        <a href="https://facebook.com" style="margin-right: 10px;">Facebook</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </footer>
          </div>
      </body>
      </html>
    `;
  };
  