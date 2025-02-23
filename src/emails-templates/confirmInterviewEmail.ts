export const confirmInterviewEmail = (context: { requester: string, interviewee: string, date: string, time: string, link: string }) => {
  return `
    <div style="max-width: 600px; margin: auto; font-family: Arial, text-align:center; sans-serif; border: 1px solid #ddd; padding: 20px;">
     <img src="https://i.postimg.cc/qgr2g5ND/logo.png" alt="Wandaprep Logo" width="150" style="margin-right: 10px;">
    <div style="background-color: #6A0DAD; padding: 15px; text-align: center; color: white; font-size: 20px;">
        Interview Confirmation
      </div>
      
      <p>Hi ${context.requester},</p>
      <p>Your interview request with <strong>${context.interviewee}</strong> has been accepted.</p>
      <p><strong>Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${context.date}</li>
        <li><strong>Time:</strong> ${context.time}</li>
      </ul>
  
      <p>Click the link below to view your interview:</p>
      <a href="${context.link}" style="display: inline-block; padding: 10px 20px; background-color: #6A0DAD; color: white; text-decoration: none; border-radius: 5px;">View Interview</a>
  
      <hr/>
  
      <div style="background-color:rgb(162, 13, 173); padding: 10px; text-align: center; color: white;">
        <p>Follow us on:</p>
        <a href="https://facebook.com" style="color: white; margin: 0 10px;">Facebook</a> | 
        <a href="https://twitter.com" style="color: white; margin: 0 10px;">Twitter</a> | 
        <a href="https://linkedin.com" style="color: white; margin: 0 10px;">LinkedIn</a>
      </div>
    </div>
  `;
};
