export const notification = (userName: string, context: string, message: string, link: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd;">
      <div style="background: #6A0DAD; color: white; text-align: center; padding: 20px;">
        <h1>Wandaforum Notifications</h1>
      </div>

      <div style="padding: 20px;">
        <p>Hello ${userName},</p>
        <p>${message}</p>
        <p>Click <a href="${link}" style="color: #6A0DAD;">here</a> to view.</p>
      </div>

      <div style="background: #6A0DAD; color: white; text-align: center; padding: 10px;">
        <p>Follow us on:</p>
        <a href="https://facebook.com" style="color: white; margin: 0 10px;">Facebook</a> |
        <a href="https://twitter.com" style="color: white; margin: 0 10px;">Twitter</a> |
        <a href="https://linkedin.com" style="color: white; margin: 0 10px;">LinkedIn</a>
      </div>
    </div>
  `;
};
