export const interviewRejection = ( recipientName: string,requesterName) => {

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .container { max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { background: #6a0dad; color: #fff; padding: 15px; text-align: center; font-size: 24px; }
          .content { padding: 20px; text-align: center; }
          .footer { margin-top: 20px; text-align: center; font-size: 14px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Wandaforum Interview Update</div>
          <div class="content">
            <p>Hello <strong>${requesterName}</strong>,</p>
            <p>Unfortunately, <strong>${recipientName}</strong> has declined your interview request.</p>
            <p>You can try requesting another interview with a different user.</p>
            <p>Best Regards, <br> <strong>The Wandaforum Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  