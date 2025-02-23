export const cancelAvailability = ({ userName }: { userName: string }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
    <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="150" style="margin-right: 10px;">
    .header { background-color:rgb(173, 13, 141); color: white; padding: 10px; text-align: center; font-size: 20px; }
    .footer { background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 14px; }
    .button { background-color: #6a0dad; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Wandaforum</div>
    <p>Hi ${userName},</p>
    <p>You have successfully canceled your availability slot.</p>
    <p>If this was a mistake, you can reschedule your availability anytime.</p>
    <p>Thanks for using Wandaforum!</p>
   <footer style="text-align: center; padding: 10px;">
        <p>Follow us on:</p>
        <a href="https://twitter.com" style="margin-right: 10px;">Twitter</a>
        <a href="https://facebook.com" style="margin-right: 10px;">Facebook</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </footer>
    </div>
  </div>
</body>
</html>
`;
