export const cancelAvailability = ({ userName }: { userName: string }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; }
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
    <div class="footer">
      <p>Follow us on social media:</p>
      <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a>
    </div>
  </div>
</body>
</html>
`;
