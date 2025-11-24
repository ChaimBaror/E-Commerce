import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db/init';

export async function GET(request: NextRequest) {
  try {
    // בדיקת הרשאות - רק בפיתוח או עם אימות
    if (process.env.NODE_ENV === 'production') {
      const authHeader = request.headers.get('authorization');
      const secret = process.env.DB_INIT_SECRET || 'change-me-in-production';
      if (authHeader !== `Bearer ${secret}`) {
        return NextResponse.json(
          { error: 'Unauthorized. Set DB_INIT_SECRET in production.' },
          { status: 401 }
        );
      }
    }

    console.log('Starting database initialization...');
    const result = await initializeDatabase();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
      });
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to initialize database', 
          details: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Allow POST as well for easier testing
  return GET(request);
}

