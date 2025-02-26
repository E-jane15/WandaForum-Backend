export const interviewFeedbackEmail = (email: string,Name: string, interviewDate: string, feedbackLink: string) => {
    return `
      <div style="max-width: 600px; width: 100%; margin: auto; font-family: Arial, sans-serif; padding: 30px; text-align: center; border-radius: 8px; border: 1px solid rgba(222, 191, 234, 0.2);">
    
       
    
        <div style="background-color: color: rgb(92, 6, 139); padding: 33px; border-radius: 8px 8px 0 0; color: white;">
           <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="90" style="margin-bottom: 20px;">
        <h2 style="margin: 0;">Your opinion Matters to us,!</h2>
        </div>
    c
        <div style="background-color: white; text-align: left; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(205, 145, 190, 0.1);">
          <h3 style="color: #333; margin-bottom: 20px;">Interview Date: <strong>${interviewDate}</strong></h3>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Thank you for participating in the mock interview on ${interviewDate}. We hope the session was insightful and helpful for your preparation.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.5;text-align: left;">
            To help us improve our services, we'd greatly appreciate it if you could take a moment to provide feedback.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Your input plays a key role in making WandaForum community even better for you and other users.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Please share your thoughts by clicking the button below:
          </p>
          <a href="${feedbackLink}" style="display: inline-block; padding: 12px 20px; background-color: rgb(92, 6, 139); color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">Give Feedback</a>
        </div>
    
        <hr style="border-top: 0px solid rgba(128, 13, 173, 0.2); margin-top: 20px;"/>
    
        <footer style="text-align: center; font-size: 12px; color: #888; padding: 10px;">
          <p style="color: rgb(60, 11, 84);">WandaForum Team</p>
          <p>Contact us at <a href="mailto:support@wanda.com" style="color: blue; text-decoration: none;">support@wanda.com</a></p>
          <p>Follow us on:</p>
          <a href="https://twitter.com" style="margin-right: 10px; color: blue; text-decoration: none;">Twitter</a>
          <a href="https://facebook.com" style="margin-right: 10px; color: blue; text-decoration: none;">Facebook</a>
          <a href="https://linkedin.com" style="color: blue; text-decoration: none;">LinkedIn</a>
          <p style="margin-top: 10px;">WandaForum &copy; 2025 | All Rights Reserved</p>
        </footer>
      </div>
    `;
  };
  