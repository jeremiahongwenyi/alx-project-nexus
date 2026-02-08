import { NextRequest, NextResponse } from 'next/server';
import { 
  ref, 
  push, 
  set, 
  get, 
  remove,
  query,
  orderByChild,
  limitToLast 
} from 'firebase/database';
import { database } from '@/lib/firebase';
import { log } from 'console';

// GET: Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const ordersRef = ref(database, 'orders');
    const limit = request.nextUrl.searchParams.get('limit');
    
    let ordersQuery = query(ordersRef, orderByChild('createdAt'));
    
    if (limit) {
      ordersQuery = query(ordersQuery, limitToLast(parseInt(limit)));
    }
    
    const snapshot = await get(ordersQuery);
    
    if (!snapshot.exists()) {
      return NextResponse.json({ orders: [] });
    }
    
    const orders: any[] = [];
    snapshot.forEach((child) => {
      orders.push({
        id: child.key,
        ...child.val(),
      });
    });
    
    // Reverse for newest first
    orders.reverse();
    
    return NextResponse.json({ orders });
    
  } catch (error) {
    console.error('GET orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST: Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    console.log('Received order data:', orderData);
    
    if (!orderData.customerName || !orderData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const ordersRef = ref(database, 'orders');
    const newOrderRef = push(ordersRef);
    
    const orderWithMetadata = {
      ...orderData,
      id: newOrderRef.key,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'pending',
    };
    
    await set(newOrderRef, orderWithMetadata);
    
    return NextResponse.json({
      success: true,
      orderId: newOrderRef.key,
      ...orderWithMetadata,
    });
    
  } catch (error) {
    console.error('POST order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// DELETE: Remove order
export async function DELETE(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'No orderId provided' },
        { status: 400 }
      );
    }
    
    const orderRef = ref(database, `orders/${orderId}`);
    await remove(orderRef);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('DELETE order error:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}