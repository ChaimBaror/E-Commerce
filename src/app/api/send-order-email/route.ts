import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail, generateOrderId } from '../../../lib/email';
import { CartItem } from '../../../types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, address, phone, cart, total, paymentIntentId } = body;

    // Validate required fields
    if (!fullName || !email || !address || !phone || !cart || !total) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate cart is an array and not empty
    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty or invalid' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Prepare order data with correct quantity from cart items
    const orderData = {
      fullName,
      email,
      address,
      phone,
      items: cart.map((item: CartItem) => ({
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category || 'General',
          description: item.description || '',
          rating: item.rating || 0,
          reviews: item.reviews || 0,
        },
        quantity: item.quantity || 1, // Use quantity from cart item
      })),
      total: Number(total),
      orderId,
      paymentIntentId: paymentIntentId || null,
      orderDate: new Date().toISOString(),
    };

    // Send email through server
    const emailResult = await sendOrderConfirmationEmail(orderData);

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        orderId,
        message: 'Order confirmation email sent successfully',
        messageId: emailResult.messageId,
      });
    } else {
      console.error('Failed to send email:', emailResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: emailResult.error 
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error in send-order-email API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}
