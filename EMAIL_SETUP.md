# Email Configuration Setup

## Environment Variables

Add these variables to your `.env.local` file:

```env
# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

## Gmail Setup Instructions

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Google Account > Security > App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS` (not your regular Gmail password)

3. **Alternative Email Services**
   - You can use other email services like SendGrid, Mailgun, etc.
   - Update the transporter configuration in `src/lib/email.ts`

## Email Template Features

- Responsive HTML design
- Order details with product images
- Customer information
- Order ID for tracking
- Professional styling with your brand colors

## Testing

After setting up the environment variables, test the email functionality by completing a test order.
