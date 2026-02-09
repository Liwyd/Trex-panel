'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PanelForm } from '@/components/panel-form';

interface Panel {
  id: number;
  panelType: string;
  name: string;
  url: string;
  subUrl: string;
  username: string;
  isActive: boolean;
}

export default function PanelsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [panels, setPanels] = useState<Panel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      fetchPanels();
    }
  }, [user, router]);

  const fetchPanels = async () => {
    try {
      // In a real application, fetch panels from API
      // For now, using mock data
      const mockPanels: Panel[] = [
        {
          id: 1,
          panelType: 'Xray',
          name: 'Main Panel',
          url: 'https://panel1.example.com',
          subUrl: 'https://sub1.example.com',
          username: 'admin',
          isActive: true,
        },
        {
          id: 2,
          panelType: 'V2Ray',
          name: 'Backup Panel',
          url: 'https://panel2.example.com',
          subUrl: 'https://sub2.example.com',
          username: 'admin',
          isActive: true,
        },
        {
          id: 3,
          panelType: 'SS',
          name: 'Shadowsocks Panel',
          url: 'https://panel3.example.com',
          subUrl: '',
          username: 'admin',
          isActive: false,
        },
      ];
      
      setPanels(mockPanels);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching panels:', error);
      setLoading(false);
    }
  };

  const togglePanelStatus = async (id: number) => {
    try {
      // In a real application, make API call to toggle panel status
      setPanels(prev => prev.map(panel => 
        panel.id === id ? { ...panel, isActive: !panel.isActive } : panel
      ));
    } catch (error) {
      console.error('Error toggling panel status:', error);
    }
  };

  const deletePanel = async (id: number) => {
    if (confirm('Are you sure you want to delete this panel?')) {
      try {
        // In a real application, make API call to delete panel
        setPanels(prev => prev.filter(panel => panel.id !== id));
      } catch (error) {
        console.error('Error deleting panel:', error);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Panel Management</h1>
          <p className="text-muted-foreground">
            Manage your proxy panels and connections
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>Add New Panel</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Panel</DialogTitle>
            </DialogHeader>
            <PanelForm 
              onSubmit={() => {
                setOpenDialog(false);
                fetchPanels(); // Refresh the list
              }}
              onCancel={() => setOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proxy Panels</CardTitle>
          <CardDescription>
            List of all configured proxy panels
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading panels...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Subscription URL</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {panels.map((panel) => (
                  <TableRow key={panel.id}>
                    <TableCell className="font-medium">{panel.id}</TableCell>
                    <TableCell>
                      <Badge variant={panel.panelType === 'Xray' ? "default" : 
                                    panel.panelType === 'V2Ray' ? "secondary" : "outline"}>
                        {panel.panelType}
                      </Badge>
                    </TableCell>
                    <TableCell>{panel.name}</TableCell>
                    <TableCell>
                      <a href={panel.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {panel.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      {panel.subUrl ? (
                        <a href={panel.subUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {panel.subUrl}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">Not set</span>
                      )}
                    </TableCell>
                    <TableCell>{panel.username}</TableCell>
                    <TableCell>
                      <Badge variant={panel.isActive ? "default" : "destructive"}>
                        {panel.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => togglePanelStatus(panel.id)}
                        >
                          {panel.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deletePanel(panel.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}