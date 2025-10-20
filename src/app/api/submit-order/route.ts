import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authToken = process.env.API_AUTH_TOKEN;
    // Map over the received cartItems array to build the products payload.
    const productsPayload = body.cartItems.map((item: any) => ({
      product_id: item.crmProductId,
      quantity: item.quantity,
      // The external API expects 'list_price' for each item.
      // We'll calculate the subtotal for each line item.
      list_price: item.discountedPrice * item.quantity,
    }));
    const fields = {
      name: body.name,
      phone: body.phone,
      email: body.email,
      address: 'VN',
      products: productsPayload,
      organization: body.companyName || '',
      orgadress: body.companyAddress || '',
      mst: body.taxCode || '',
    };

    const apiResponse = await fetch('http://api.phongchongvirus.com/api/order/datmua', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken || '',
      },
      body: JSON.stringify(fields),
    });

    if (!apiResponse.ok) {
      throw new Error(`External API failed with status: ${apiResponse.status}`);
    }

    const responseData = await apiResponse.json();
    
    const params = new URLSearchParams({
        id: responseData.orderid,
        if: responseData.orderhash,
        customerName: body.name,
        customerEmail: body.email,
        customerPhone: body.phone,
        totalAmount: String(body.totalPrice),
        paymentMethod: body.paymentMethod || 'qr', // <-- Add this line
        companyName: body.companyName || '',
        // Add the entire cart as a stringified JSON parameter
        cart: JSON.stringify(body.cartItems),
    });

    const redirectUrl = `/payment-status?${params.toString()}`;

    return NextResponse.json({ redirectUrl });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Failed to process order.' }, { status: 500 });
  }
}