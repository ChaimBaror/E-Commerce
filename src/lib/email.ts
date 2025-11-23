import nodemailer from 'nodemailer';
import { Product } from '../types';

interface OrderData {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  total: number;
  orderId: string;
  paymentIntentId?: string | null;
  orderDate?: string;
}

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to other services
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate order confirmation email HTML
const generateOrderEmailHTML = (orderData: OrderData) => {
  const itemsHTML = orderData.items.map(item => {
    const itemTotal = item.product.price * item.quantity;
    return `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <img src="${item.product.image}" alt="${item.product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.product.name}</strong><br>
        <span style="color: #666; font-size: 12px;">${item.product.category || 'General'}</span>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        <strong>${item.quantity}</strong>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        <strong>₪${itemTotal.toFixed(2)}</strong><br>
        <span style="color: #666; font-size: 12px;">₪${item.product.price.toFixed(2)} each</span>
      </td>
    </tr>
  `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #6366f1;
        }
        .logo {
          font-size: 24px;
          font-weight: 800;
          color: #6366f1;
          margin-bottom: 10px;
        }
        .order-id {
          background: #f1f5f9;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          margin: 20px 0;
          font-family: monospace;
          font-weight: 600;
        }
        .customer-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .items-table th {
          background: #6366f1;
          color: white;
          padding: 12px;
          text-align: left;
        }
        .total-section {
          background: #f1f5f9;
          padding: 20px;
          border-radius: 8px;
          text-align: right;
          margin: 20px 0;
        }
        .total-amount {
          font-size: 24px;
          font-weight: 800;
          color: #6366f1;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
        }
        .button {
          display: inline-block;
          background: #6366f1;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Premium Store</div>
          <h1 style="color: #1e293b; margin: 0;">Order Confirmation</h1>
          <p style="color: #64748b; margin: 10px 0 0 0;">Thank you for your purchase!</p>
        </div>

        <div class="order-id">
          Order ID: ${orderData.orderId}
        </div>

        <div class="customer-info">
          <h3 style="color: #1e293b; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${orderData.fullName}</p>
          <p><strong>Email:</strong> ${orderData.email}</p>
          <p><strong>Phone:</strong> ${orderData.phone}</p>
          <p><strong>Address:</strong> ${orderData.address}</p>
          ${orderData.orderDate ? `<p><strong>Order Date:</strong> ${new Date(orderData.orderDate).toLocaleString('he-IL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>` : ''}
          ${orderData.paymentIntentId ? `<p style="font-size: 12px; color: #666;"><strong>Payment ID:</strong> ${orderData.paymentIntentId}</p>` : ''}
        </div>

        <h3 style="color: #1e293b;">Order Items</h3>
        <table class="items-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-amount">Total: ₪${orderData.total.toLocaleString()}</div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="#" class="button">Track Your Order</a>
        </div>

        <div class="footer">
          <p>If you have any questions about your order, please contact our customer service.</p>
          <p>Thank you for shopping with Premium Store!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (orderData: OrderData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Premium Store" <${process.env.EMAIL_USER}>`,
      to: orderData.email,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: generateOrderEmailHTML(orderData),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
};

// Generate unique order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};
