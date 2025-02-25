export const availabilityConfirmation = ({ startTime, endTime }) => `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
  <img src="https://postimg.cc/qgr2g5ND" alt="Wandaprep Logo" width="150" style="margin-bottom: 20px;">
    <h2 style="color: #6a0dad;">WandaForum - Availability Scheduled</h2>
    <p>Your availability has been successfully scheduled.</p>
    <p><strong>Start Time:</strong> ${startTime}</p>
    <p><strong>End Time:</strong> ${endTime}</p>
    <hr>
    <footer style="margin-top: 20px;">
    <>
      <p>Stay connected with us:</p>
    
      <a href="https://twitter.com/wandaforum">Twitter</a> | 
      <a href="https://facebook.com/wandaforum">Facebook</a>
    </footer>
  </div>
`;
