import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would fetch these stats from a database
    // For now, we'll return mock data
    const stats = {
      totalAdmins: 12,
      activePanels: 5,
      totalTraffic: 128 * 1024 * 1024 * 1024, // 128 GB in bytes
      systemUptime: 99.9,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch dashboard stats' 
      }, 
      { status: 500 }
    );
  }
}