import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@webrya.com',
      to,
      subject,
      text,
      html: html || text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendTaskAssignmentEmail({
  to,
  taskTitle,
  dueDate,
  propertyName,
}: {
  to: string;
  taskTitle: string;
  dueDate: string;
  propertyName: string;
}) {
  const subject = 'New Task Assigned';
  const text = `You have been assigned a new task: "${taskTitle}" for property "${propertyName}". Due date: ${dueDate}.`;
  const html = `
    <h2>New Task Assigned</h2>
    <p>You have been assigned a new task:</p>
    <ul>
      <li><strong>Task:</strong> ${taskTitle}</li>
      <li><strong>Property:</strong> ${propertyName}</li>
      <li><strong>Due Date:</strong> ${dueDate}</li>
    </ul>
    <p>Please log in to your account to view the details.</p>
  `;

  await sendEmail({ to, subject, text, html });
}

export async function sendTaskDueDateChangedEmail({
  to,
  taskTitle,
  newDueDate,
  propertyName,
}: {
  to: string;
  taskTitle: string;
  newDueDate: string;
  propertyName: string;
}) {
  const subject = 'Task Due Date Changed';
  const text = `The due date for task "${taskTitle}" for property "${propertyName}" has been changed to ${newDueDate}.`;
  const html = `
    <h2>Task Due Date Changed</h2>
    <p>The due date for your task has been updated:</p>
    <ul>
      <li><strong>Task:</strong> ${taskTitle}</li>
      <li><strong>Property:</strong> ${propertyName}</li>
      <li><strong>New Due Date:</strong> ${newDueDate}</li>
    </ul>
    <p>Please log in to your account to view the details.</p>
  `;

  await sendEmail({ to, subject, text, html });
}

export async function sendPropertyInviteEmail({
  to,
  inviterName,
  propertyName,
  role,
  inviteLink,
}: {
  to: string;
  inviterName: string;
  propertyName: string;
  role: string;
  inviteLink: string;
}) {
  const subject = `Invitation to join "${propertyName}"`;
  const text = `${inviterName} has invited you to join "${propertyName}" as a ${role}. Click here to accept: ${inviteLink}`;
  const html = `
    <h2>Property Invitation</h2>
    <p>${inviterName} has invited you to join <strong>${propertyName}</strong> as a <strong>${role}</strong>.</p>
    <p><a href="${inviteLink}" style="background: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Accept Invitation</a></p>
    <p>Or copy this link: ${inviteLink}</p>
  `;

  await sendEmail({ to, subject, text, html });
}
