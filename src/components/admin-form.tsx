'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface AdminFormData {
  username: string;
  password: string;
  isActive: boolean;
  panel: string;
  inboundId: number | null;
  marzbanInbounds: string;
  marzbanPassword: string;
  traffic: number;
  returnTraffic: boolean;
  expiryDate: string;
}

interface AdminFormProps {
  onSubmit: (data: AdminFormData) => void;
  onCancel: () => void;
  initialData?: Partial<AdminFormData>;
}

export function AdminForm({ onSubmit, onCancel, initialData }: AdminFormProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    username: initialData?.username || '',
    password: initialData?.password || '',
    isActive: initialData?.isActive ?? true,
    panel: initialData?.panel || '',
    inboundId: initialData?.inboundId || null,
    marzbanInbounds: initialData?.marzbanInbounds || '',
    marzbanPassword: initialData?.marzbanPassword || '',
    traffic: initialData?.traffic || 0,
    returnTraffic: initialData?.returnTraffic ?? false,
    expiryDate: initialData?.expiryDate || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: keyof AdminFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="panel">Panel</Label>
          <Input
            id="panel"
            name="panel"
            value={formData.panel}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="traffic">Traffic Limit (GB)</Label>
          <Input
            id="traffic"
            name="traffic"
            type="number"
            value={formData.traffic}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="inboundId">Inbound ID</Label>
          <Input
            id="inboundId"
            name="inboundId"
            type="number"
            value={formData.inboundId || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="marzbanInbounds">Marzban Inbounds</Label>
          <Input
            id="marzbanInbounds"
            name="marzbanInbounds"
            value={formData.marzbanInbounds}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="marzbanPassword">Marzban Password</Label>
          <Input
            id="marzbanPassword"
            name="marzbanPassword"
            type="password"
            value={formData.marzbanPassword}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
        />
        <Label htmlFor="isActive">Is Active</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="returnTraffic"
          name="returnTraffic"
          checked={formData.returnTraffic}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, returnTraffic: checked }))}
        />
        <Label htmlFor="returnTraffic">Return Traffic</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Admin</Button>
      </div>
    </form>
  );
}