export const generateInterviewReminder = (name: string, interviewDate: string, interviewTime: string, interviewLink: string) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interview Reminder</title>
          <style>
              body { font-family: Arial, sans-serif; }
              .container { padding: 20px; background-color: #f9f9f9; border-radius: 10px; }
              h2 { color:rgb(224, 0, 213); } /* Purple color */
              p { font-size: 16px; }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color:rgb(224, 0, 216);
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Hello ${name},</h2>
              <p>This is a friendly reminder about your upcoming interview.</p>
              <p><strong>📅 Date:</strong> ${interviewDate}</p>
              <p><strong>⏰ Time:</strong> ${interviewTime}</p>
              <p><strong>🔗 Join Here:</strong> <a href="${interviewLink}" target="_blank">Click to Join</a></p>
              <p>Make sure you're prepared and on time.</p>
              <p>Best of luck!</p>
              <p>— The Wandaforum Team</p>
          </div>
      </body>
      </html>
    `;
  };
  