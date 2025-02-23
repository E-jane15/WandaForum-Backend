export const interviewRejection = (userName: string, recipientName: string) => {
    
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
     
    <h2 style="color: red;">Interview Request Rejected</h2>
      <p>Hello ${userName},</p>
      <p>Unfortunately, your interview request has been <strong>rejected</strong> by ${recipientName}.</p>
      <p>You can try requesting another time or contact them directly.</p>
  
      <hr style="border: 0; height: 1px; background: #ddd;">
      
      <footer style="text-align: center; padding: 10px;">
        <p>Follow us on:</p>
        <a href="https://twitter.com" style="margin-right: 10px;">Twitter</a>
        <a href="https://facebook.com" style="margin-right: 10px;">Facebook</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </footer>
    </div>
    `;
  }
  