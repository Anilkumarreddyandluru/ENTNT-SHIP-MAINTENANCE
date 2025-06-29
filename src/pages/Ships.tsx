
import React, { useState } from 'react';
import { useData, Ship } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Search, 
  Anchor, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Calendar,
  Ruler,
  Building
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Ships = () => {
  const { ships, addShip, updateShip, deleteShip, components, jobs } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingShip, setEditingShip] = useState<Ship | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active' as Ship['status'],
    type: '',
    yearBuilt: new Date().getFullYear(),
    length: 0,
    owner: ''
  });

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ship.imo.includes(searchTerm) ||
                         ship.flag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      imo: '',
      flag: '',
      status: 'Active',
      type: '',
      yearBuilt: new Date().getFullYear(),
      length: 0,
      owner: ''
    });
    setEditingShip(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingShip) {
      updateShip(editingShip.id, formData);
      toast.success('Ship updated successfully');
      setEditingShip(null);
    } else {
      addShip(formData);
      toast.success('Ship added successfully');
      setShowAddDialog(false);
    }
    
    resetForm();
  };

  const handleEdit = (ship: Ship) => {
    setFormData({
      name: ship.name,
      imo: ship.imo,
      flag: ship.flag,
      status: ship.status,
      type: ship.type,
      yearBuilt: ship.yearBuilt,
      length: ship.length,
      owner: ship.owner
    });
    setEditingShip(ship);
  };

  const handleDelete = (ship: Ship) => {
    if (window.confirm(`Are you sure you want to delete ${ship.name}?`)) {
      deleteShip(ship.id);
      toast.success('Ship deleted successfully');
    }
  };

  const getStatusColor = (status: Ship['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Docked': return 'bg-blue-100 text-blue-800';
      case 'Out of Service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShipStats = (shipId: string) => {
    const shipComponents = components.filter(c => c.shipId === shipId);
    const shipJobs = jobs.filter(j => j.shipId === shipId);
    return {
      components: shipComponents.length,
      activeJobs: shipJobs.filter(j => j.status === 'Open' || j.status === 'In Progress').length,
      criticalComponents: shipComponents.filter(c => c.status === 'Critical').length
    };
  };

  const canEdit = user?.role === 'Admin';
  const canDelete = user?.role === 'Admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Anchor className="w-8 h-8 mr-3 text-blue-600" />
            Fleet Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your ship fleet and monitor vessel status</p>
        </div>
        {canEdit && (
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gradient-maritime">
                <Plus className="w-4 h-4 mr-2" />
                Add Ship
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Ship</DialogTitle>
                <DialogDescription>
                  Enter the details for the new ship in your fleet.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ship Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imo">IMO Number *</Label>
                    <Input
                      id="imo"
                      value={formData.imo}
                      onChange={(e) => setFormData({...formData, imo: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flag">Flag State *</Label>
                    <Input
                      id="flag"
                      value={formData.flag}
                      onChange={(e) => setFormData({...formData, flag: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: Ship['status']) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="Docked">Docked</SelectItem>
                        <SelectItem value="Out of Service">Out of Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Ship Type *</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      placeholder="e.g., Container Ship"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData({...formData, yearBuilt: parseInt(e.target.value)})}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (m)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={formData.length}
                      onChange={(e) => setFormData({...formData, length: parseFloat(e.target.value)})}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner">Owner *</Label>
                    <Input
                      id="owner"
                      value={formData.owner}
                      onChange={(e) => setFormData({...formData, owner: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => {setShowAddDialog(false); resetForm();}}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gradient-maritime">
                    Add Ship
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search ships by name, IMO, or flag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
            <SelectItem value="Docked">Docked</SelectItem>
            <SelectItem value="Out of Service">Out of Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShips.map((ship) => {
          const stats = getShipStats(ship.id);
          return (
            <Card key={ship.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Anchor className="w-5 h-5 mr-2 text-blue-600" />
                      {ship.name}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {ship.flag}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(ship.status)}>
                    {ship.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">IMO</p>
                    <p className="font-medium">{ship.imo}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">{ship.type}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="text-gray-600">{ship.yearBuilt}</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="text-gray-600">{ship.length}m</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs">
                  <Building className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-600">{ship.owner}</span>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-xs bg-gray-50 rounded-lg p-2">
                  <div className="text-center">
                    <div className="font-medium">{stats.components}</div>
                    <div className="text-gray-500">Components</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-orange-600">{stats.activeJobs}</div>
                    <div className="text-gray-500">Active Jobs</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-medium ${stats.criticalComponents > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {stats.criticalComponents}
                    </div>
                    <div className="text-gray-500">Critical</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                  <Link to={`/ships/${ship.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <div className="space-x-2">
                    {canEdit && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(ship)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Ship</DialogTitle>
                            <DialogDescription>
                              Update the ship information below.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Same form fields as add dialog */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Ship Name *</Label>
                                <Input
                                  id="edit-name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-imo">IMO Number *</Label>
                                <Input
                                  id="edit-imo"
                                  value={formData.imo}
                                  onChange={(e) => setFormData({...formData, imo: e.target.value})}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-flag">Flag State *</Label>
                                <Input
                                  id="edit-flag"
                                  value={formData.flag}
                                  onChange={(e) => setFormData({...formData, flag: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select value={formData.status} onValueChange={(value: Ship['status']) => setFormData({...formData, status: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                                    <SelectItem value="Docked">Docked</SelectItem>
                                    <SelectItem value="Out of Service">Out of Service</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-type">Ship Type *</Label>
                                <Input
                                  id="edit-type"
                                  value={formData.type}
                                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-yearBuilt">Year Built</Label>
                                <Input
                                  id="edit-yearBuilt"
                                  type="number"
                                  value={formData.yearBuilt}
                                  onChange={(e) => setFormData({...formData, yearBuilt: parseInt(e.target.value)})}
                                  min="1900"
                                  max={new Date().getFullYear()}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-length">Length (m)</Label>
                                <Input
                                  id="edit-length"
                                  type="number"
                                  value={formData.length}
                                  onChange={(e) => setFormData({...formData, length: parseFloat(e.target.value)})}
                                  min="0"
                                  step="0.1"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-owner">Owner *</Label>
                                <Input
                                  id="edit-owner"
                                  value={formData.owner}
                                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                                  required
                                />
                              </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                              <Button type="button" variant="outline" onClick={resetForm}>
                                Cancel
                              </Button>
                              <Button type="submit" className="gradient-maritime">
                                Update Ship
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    )}
                    {canDelete && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(ship)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredShips.length === 0 && (
        <div className="text-center py-12">
          <Anchor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ships found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'Get started by adding your first ship to the fleet'}
          </p>
          {canEdit && !searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setShowAddDialog(true)} className="gradient-maritime">
              <Plus className="w-4 h-4 mr-2" />
              Add First Ship
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Ships;
