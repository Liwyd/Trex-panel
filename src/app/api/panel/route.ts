import { NextRequest, NextResponse } from 'next/server';

// Mock data for demonstration purposes
let mockPanels = [
  {
    id: 1,
    panelType: 'Xray',
    name: 'Main Panel',
    url: 'https://panel1.example.com',
    subUrl: 'https://sub1.example.com',
    username: 'admin',
    password: 'password',
    isActive: true,
  },
  {
    id: 2,
    panelType: 'V2Ray',
    name: 'Backup Panel',
    url: 'https://panel2.example.com',
    subUrl: 'https://sub2.example.com',
    username: 'admin',
    password: 'password',
    isActive: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockPanels);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch panels' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newPanel = await request.json();
    
    // Assign a new ID
    const panelToAdd = {
      ...newPanel,
      id: Math.max(...mockPanels.map(p => p.id), 0) + 1
    };
    
    mockPanels.push(panelToAdd);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Panel created successfully',
        panel: panelToAdd
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to create panel' 
      }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updatedData } = await request.json();
    
    const index = mockPanels.findIndex(panel => panel.id === id);
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Panel not found' 
        }, 
        { status: 404 }
      );
    }
    
    mockPanels[index] = { ...mockPanels[index], ...updatedData };
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Panel updated successfully',
        panel: mockPanels[index]
      }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to update panel' 
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
          message: 'Invalid panel ID' 
        }, 
        { status: 400 }
      );
    }
    
    const index = mockPanels.findIndex(panel => panel.id === id);
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Panel not found' 
        }, 
        { status: 404 }
      );
    }
    
    mockPanels.splice(index, 1);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Panel deleted successfully'
      }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to delete panel' 
      }, 
      { status: 500 }
    );
  }
}