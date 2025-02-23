export const otpVerificationEmail = (email: string, otp: string) => {

  return `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px; text-align: center; border-radius: 8px;">
      <div style="background-color: #6A0DAD; padding: 20px; border-radius: 8px 8px 0 0; color: white;">
        <h2 style="margin: 0;">Your OTP for WandaForum</h2>
      </div>
      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h3 style="color: #333; margin-bottom: 20px;">Hello, ${email}</h3>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          We received a request to verify your account. Your One-Time Password (OTP) is:
        </p>
        <div style="font-size: 24px; font-weight: bold; color: #6A0DAD; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          Please enter this OTP on the verification page to complete your registration.
        </p>
        <p style="color: #888; font-size: 14px;">If you did not request this, please ignore this email.</p>
      </div>
      <hr style="border-top: 1px solid #ddd; margin-top: 20px;"/>
      <footer style="text-align: center; font-size: 12px; color: #888; padding: 10px;">
        <p>WandaForum Team</p>
        <p>Contact us at <a href="mailto:support@wanda.com" style="color: #6A0DAD; text-decoration: none;">support@wanda.com</a></p>
      </footer>
    </div>
  `;
};
