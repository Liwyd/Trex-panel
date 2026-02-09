'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PanelFormData {
  panelType: string;
  name: string;
  url: string;
  subUrl: string;
  username: string;
  password: string;
  isActive: boolean;
}

interface PanelFormProps {
  onSubmit: (data: PanelFormData) => void;
  onCancel: () => void;
  initialData?: Partial<PanelFormData>;
}

export function PanelForm({ onSubmit, onCancel, initialData }: PanelFormProps) {
  const [formData, setFormData] = useState<PanelFormData>({
    panelType: initialData?.panelType || 'Xray',
    name: initialData?.name || '',
    url: initialData?.url || '',
    subUrl: initialData?.subUrl || '',
    username: initialData?.username || '',
    password: initialData?.password || '',
    isActive: initialData?.isActive ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: keyof PanelFormData, value: string) => {
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
          <Label htmlFor="panelType">Panel Type</Label>
          <Select 
            value={formData.panelType} 
            onValueChange={(value) => handleSelectChange('panelType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select panel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Xray">Xray</SelectItem>
              <SelectItem value="V2Ray">V2Ray</SelectItem>
              <SelectItem value="SS">Shadowsocks</SelectItem>
              <SelectItem value="Trojan">Trojan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Panel Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="url">Panel URL</Label>
          <Input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subUrl">Subscription URL</Label>
          <Input
            id="subUrl"
            name="subUrl"
            type="url"
            value={formData.subUrl}
            onChange={handleChange}
          />
        </div>
        
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
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Panel</Button>
      </div>
    </form>
  );
}