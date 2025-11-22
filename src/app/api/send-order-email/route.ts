import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, generateOrderId } from '../../../lib/email';
import { useCartStore } from '../../../stores/cartStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, address, phone, cart, total } = body;

    // Validate required fields
    if (!fullName || !email || !address || !phone || !cart || !total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Prepare order data
    const orderData = {
      fullName,
      email,
      address,
      phone,
      items: cart.map((item: any) => ({
        product: item,
        quantity: 1, // You might want to track quantity in your cart
      })),
      total,
      orderId,
    };

    // Send email
    const emailResult = await sendOrderConfirmationEmail(orderData);

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        orderId,
        message: 'Order confirmation email sent successfully',
        messageId: emailResult.messageId,
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: emailResult.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in send-order-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
