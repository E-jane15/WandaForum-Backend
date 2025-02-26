export const availabilityConfirmation = ({ startTime, endTime, name }) => {
  return `
    <div style="max-width: 380px; width: 100%; margin: auto; font-family: Arial, sans-serif; padding: 30px; text-align: center; border-radius: 8px; border: 2px solid rgba(128, 13, 173, 0.2);">
      
      <div style="background-color: rgb(208, 145, 202); padding: 33px; border-radius: 8px 8px 0 0; color: white;">
        <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="90">
        <h2 style="margin: 0;">Availability Scheduled</h2>
      </div>

      <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(205, 145, 190, 0.1);">
        <h3 style="color: #333; margin-bottom: 20px;">Hello ${name},</h3>
        
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          Your availability has been successfully scheduled. Here are the details:
        </p>

        <div style="font-size: 16px; font-weight: bold; color: rgb(208, 145, 202); margin: 20px 0;">
          <p><strong>Start Time:</strong> ${startTime}</p>
          <p><strong>End Time:</strong> ${endTime}</p>
        </div>

        <h3 style="color: #333; margin-top: 20px;">Availability Schedule</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <th style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px; background-color: rgb(128, 13, 173); color: white;">Day</th>
            <th style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px; background-color: rgb(128, 13, 173); color: white;">Available Time</th>
            <th style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px; background-color: rgb(128, 13, 173); color: white;">Duration</th>
            <th style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px; background-color: rgb(128, 13, 173); color: white;">Notes</th>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Monday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">9 AM - 12 PM</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">1 hour</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Tuesday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">1 PM - 5 PM</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">30 minutes</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Wednesday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">9 AM - 3 PM</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">1 hour</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">No appointments after 3 PM</td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Thursday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">9 AM - 12 PM</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">1 hour</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Friday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">1 PM - 4 PM</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">30 minutes</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Saturday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Unavailable</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
          </tr>
          <tr>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Sunday</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;">Unavailable</td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
            <td style="border: 1px solid rgba(128, 13, 173, 0.2); padding: 8px;"></td>
          </tr>
        </table>

        <p style="color:rgb(208, 145, 202); font-size: 16px; line-height: 1.5; margin-top: 20px;">
          Thank you for using WandaForum. If you need further assistance, feel free to reach out.
        </p>
      </div>

      <hr style="border-top: 1px solid rgba(128, 13, 173, 0.2); margin-top: 20px;"/>

      <footer style="text-align: center; font-size: 12px; color: #888; padding: 10px;">
        <p style="color: rgb(92, 6, 139);">WandaForum Team</p>
        <p>Contact us at <a href="mailto:support@wanda.com" style="color: rgb(111, 7, 167); text-decoration: none;">support@wanda.com</a></p>
        <p style="color: rgb(36, 11, 128);">Stay connected with us:</p>
        <a href="https://twitter.com" style="color: rgb(94, 8, 244); margin-right: 10px; text-decoration: none;">Twitter</a>
        <a href="https://facebook.com" style="color: rgb(20, 48, 208); margin-right: 10px; text-decoration: none;">Facebook</a>
        <a href="https://linkedin.com" style="color: rgb(11, 22, 235); text-decoration: none;">LinkedIn</a>
      
      
        </footer>
    </div>
  `;
};