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
import { AdminForm } from '@/components/admin-form';

interface Admin {
  id: number;
  username: string;
  isActive: boolean;
  panel: string;
  traffic: number;
  expiryDate: string;
}

export default function AdminsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      fetchAdmins();
    }
  }, [user, router]);

  const fetchAdmins = async () => {
    try {
      // In a real application, fetch admins from API
      // For now, using mock data
      const mockAdmins: Admin[] = [
        {
          id: 1,
          username: 'admin1',
          isActive: true,
          panel: 'Panel A',
          traffic: 1024 * 1024 * 1024 * 50, // 50 GB
          expiryDate: '2024-12-31',
        },
        {
          id: 2,
          username: 'admin2',
          isActive: true,
          panel: 'Panel B',
          traffic: 1024 * 1024 * 1024 * 30, // 30 GB
          expiryDate: '2024-11-30',
        },
        {
          id: 3,
          username: 'admin3',
          isActive: false,
          panel: 'Panel C',
          traffic: 1024 * 1024 * 1024 * 20, // 20 GB
          expiryDate: '2024-10-15',
        },
      ];
      
      setAdmins(mockAdmins);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (id: number) => {
    try {
      // In a real application, make API call to toggle admin status
      setAdmins(prev => prev.map(admin => 
        admin.id === id ? { ...admin, isActive: !admin.isActive } : admin
      ));
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  const deleteAdmin = async (id: number) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      try {
        // In a real application, make API call to delete admin
        setAdmins(prev => prev.filter(admin => admin.id !== id));
      } catch (error) {
        console.error('Error deleting admin:', error);
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
          <h1 className="text-3xl font-bold">Admin Management</h1>
          <p className="text-muted-foreground">
            Manage administrators and their permissions
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>Add New Admin</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <AdminForm 
              onSubmit={() => {
                setOpenDialog(false);
                fetchAdmins(); // Refresh the list
              }}
              onCancel={() => setOpenDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administrators</CardTitle>
          <CardDescription>
            List of all administrators in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading admins...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Panel</TableHead>
                  <TableHead>Traffic</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.id}</TableCell>
                    <TableCell>{admin.username}</TableCell>
                    <TableCell>
                      <Badge variant={admin.isActive ? "default" : "destructive"}>
                        {admin.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.panel}</TableCell>
                    <TableCell>{(admin.traffic / (1024 ** 3)).toFixed(2)} GB</TableCell>
                    <TableCell>{new Date(admin.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAdminStatus(admin.id)}
                        >
                          {admin.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteAdmin(admin.id)}
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