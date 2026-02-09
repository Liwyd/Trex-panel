import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration purposes
let mockAdmins = [
  {
    id: 1,
    username: 'admin1',
    isActive: true,
    panel: 'Panel A',
    inboundId: 1,
    marzbanInbounds: 'inbound1',
    marzbanPassword: 'pass1',
    traffic: 1024 * 1024 * 1024 * 50, // 50 GB
    returnTraffic: true,
    expiryDate: '2024-12-31',
  },
  {
    id: 2,
    username: 'admin2',
    isActive: true,
    panel: 'Panel B',
    inboundId: 2,
    marzbanInbounds: 'inbound2',
    marzbanPassword: 'pass2',
    traffic: 1024 * 1024 * 1024 * 30, // 30 GB
    returnTraffic: false,
    expiryDate: '2024-11-30',
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockAdmins);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newAdmin = await request.json();
    
    // Assign a new ID
    const adminToAdd = {
      ...newAdmin,
      id: Math.max(...mockAdmins.map(a => a.id), 0) + 1
    };
    
    mockAdmins.push(adminToAdd);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Admin created successfully',
        admin: adminToAdd
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to create admin' 
      }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updatedData } = await request.json();
    
    const index = mockAdmins.findIndex(admin => admin.id === id);
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Admin not found' 
        }, 
        { status: 404 }
      );
    }
    
    mockAdmins[index] = { ...mockAdmins[index], ...updatedData };
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Admin updated successfully',
        admin: mockAdmins[index]
      }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to update admin' 
      }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');
    
    if (isNaN(id)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid admin ID' 
        }, 
        { status: 400 }
      );
    }
    
    const index = mockAdmins.findIndex(admin => admin.id === id);
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Admin not found' 
        }, 
        { status: 404 }
      );
    }
    
    mockAdmins.splice(index, 1);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Admin deleted successfully'
      }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to delete admin' 
      }, 
      { status: 500 }
    );
  }
}