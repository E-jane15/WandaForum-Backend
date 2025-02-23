export const forgotPasswordEmail = (userName: string,resetLink: string ) => {


    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto;">
        <div style="background-color: #6A0DAD; color: white; padding: 10px; text-align: center;">
          <h2>Reset Your Password</h2>
        </div>
  
        <p>Hello ${userName},</p>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="background-color: #6A0DAD; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </div>
  
        <p>If you did not request this, please ignore this email.</p>
        <br>
  
        <div style="background-color: #6A0DAD; color: white; padding: 10px; text-align: center;">
          <p>Follow us on:</p>
          <a href="https://facebook.com" style="margin: 0 10px;"><img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" width="30"/></a>
          <a href="https://twitter.com" style="margin: 0 10px;"><img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" width="30"/></a>
          <a href="https://linkedin.com" style="margin: 0 10px;"><img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" width="30"/></a>
        </div>
      </div>
    `;
  };
  