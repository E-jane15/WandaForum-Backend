export const cancelAvailability = ({ userName }: { userName: string }) => `
   <div style="max-width: 380px; width: 100%; border: 1px rgb(159, 55, 170);margin: auto; font-family: Arial, sans-serif; \ padding: 30px; text-align: center; border-radius: 8px;">
    <div style="background-color: rgb(173, 13, 136); padding: 33px; height: 30%; border-radius: 8px 8px 0 0; color: white;">
    <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="80">
    
      <h2 style="margin: 0;">Availability Canceled</h2>
    </div>

    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(205, 145, 190, 0.1);">
      <h3 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h3>
      <p style="color: #555; font-size: 16px; line-height: 1.5;">
        Your availability slot has been successfully canceled.
      </p>
      <p style=" font-size: 16px; line-height: 1.5;">
        If this was a mistake, you can reschedule your availability at any time.
      </p>
      <p style="color:  rgb(120, 13, 173); font-size: 14px;">Thanks for using Wandaforum!</p>
    </div>

    <hr style="border-top: 1px solid #ddd; margin-top: 20px;"/>

    <footer style="text-align: center; font-size: 12px; padding: 10px;">
  <p>WandaForum Team</p>
  <p>Contact us at <a href="mailto:support@wanda.com" style="text-decoration: none; color: blue;">support@wanda.com</a></p>
  
 
  <div style="display: flex; justify-content: center; gap: 10px;">
    <a href="https://twitter.com" style="text-decoration: none;">
  <i class="fab fa-twitter" style="font-size: 24px;"></i>
</a>
<a href="https://facebook.com" style="text-decoration: none;">
  <i class="fab fa-facebook-f" style="font-size: 24px;"></i>
</a>
<a href="https://linkedin.com" style="text-decoration: none;">
  <i class="fab fa-linkedin-in" style="font-size: 24px;"></i>
</a>
  </div>
</footer>

  </div>
`;
