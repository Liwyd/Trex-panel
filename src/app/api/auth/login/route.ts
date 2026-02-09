import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // In a real application, you would validate credentials against a database
    // For now, we'll simulate a successful login
    if (username && password) {
      // Return a mock user object
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          username: username,
          role: 'admin'
        }
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        }, 
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during login' 
      }, 
      { status: 500 }
    );
  }
}