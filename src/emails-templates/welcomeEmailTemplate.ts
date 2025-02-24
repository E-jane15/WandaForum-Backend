export const welcomeEmailTemplate = (userName: string) => {
    return `
      <div style="max-width: 380px; width: 100%; margin: auto; font-family: Arial, sans-serif; background-color: rgb(169, 129, 166); padding: 30px; text-align: center; border-radius: 8px;">
        <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaforum Logo" width="90" />
  
        <div style="background-color: rgb(128, 13, 173); padding: 33px; border-radius: 8px 8px 0 0; color: white;">
          <h2 style="margin: 0;">Welcome to Wandaforum!</h2>
        </div>
  
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(205, 145, 190, 0.1);">
          <h3 style="color: #333; margin-bottom: 20px;">Hello, ${userName} 👋</h3>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            We're thrilled to have you join the Wandaforum community!
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Explore interview questions, schedule mock interviews, and connect with professionals.
          </p>
          <a href="https://wandaforum.com" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #6A0DAD; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Get Started 🚀
          </a>
          <p style="color: #888; font-size: 14px; margin-top: 20px;">If you have any questions, we’re here to help.</p>
        </div>
  
        <hr style="border-top: 1px solid #ddd; margin-top: 20px;" />
        <footer style="text-align: center; font-size: 12px; color: #888; padding: 10px;">
          <p>The Wandaforum Team</p>
          <p>Contact us at <a href="mailto:support@wanda.com" style="color: rgb(236, 227, 241); text-decoration: none;">support@wanda.com</a></p>
        </footer>
      </div>
    `;
  };
  