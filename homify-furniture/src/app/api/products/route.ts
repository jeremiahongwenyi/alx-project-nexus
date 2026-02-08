import { NextRequest, NextResponse } from 'next/server';
import { ref, set, get, update, remove } from 'firebase/database';
import { database } from '@/lib/firebase';

// GET all products or single product
export async function GET(request: NextRequest) {
  try {
    const productId = request.nextUrl.searchParams.get('id');
    const category = request.nextUrl.searchParams.get('category');
    
    if (productId) {
      // Get single product
      const productRef = ref(database, `products/${productId}`);
      const snapshot = await get(productRef);
      
      if (!snapshot.exists()) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        id: productId,
        ...snapshot.val(),
      });
    } else {
      // Get all products
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      
      const products: any[] = [];
      
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          const product = child.val();
          
          // Filter by category if specified
          if (!category || product.category === category) {
            products.push({
              id: child.key,
              ...product,
            });
          }
        });
      }
      
      return NextResponse.json(products );
    }
    
  } catch (error) {
    console.error('GET products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST: Create/Update product
export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const { id, isFeaturedProduct= false, ...data } = productData;
    
    if (!data.name || !data.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (id) {
      // Update existing product
      const productRef = ref(database, `products/${id}`);
      await update(productRef, {
        ...data,
        updatedAt: Date.now(),
      });
      
      return NextResponse.json({
        success: true,
        id,
        ...data,
      });
    } if(isFeaturedProduct) {


      const productsRef = ref(database, 'featuredproducts');
      const newProductRef = ref(database, `featuredproducts/${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      
      const productWithMetadata = {
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      await set(newProductRef, productWithMetadata);
      
      return NextResponse.json({
        success: true,
        id: newProductRef.key,
        ...productWithMetadata,
      });
    }  else {
      // Create new product
      const productsRef = ref(database, 'products');
      const newProductRef = ref(database, `products/${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      
      const productWithMetadata = {
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      await set(newProductRef, productWithMetadata);
      
      return NextResponse.json({
        success: true,
        id: newProductRef.key,
        ...productWithMetadata,
      });
    }
    
  } catch (error) {
    console.error('POST product error:', error);
    return NextResponse.json(
      { error: 'Failed to save product' },
      { status: 500 }
    );
  }
}