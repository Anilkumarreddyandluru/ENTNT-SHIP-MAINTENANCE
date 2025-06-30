import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ship, MapPin, Calendar, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Ships = () => {
  const { toast } = useToast();
  const [ships, setShips] = useState([
    {
      id: 1,
      name: "MV Ocean Explorer",
      type: "Container Ship",
      status: "Active",
      location: "Port A",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-07-15",
      health: 95,
    },
    {
      id: 2,
      name: "SS Atlantic",
      type: "Bulk Carrier",
      status: "Maintenance",
      location: "Dry Dock",
      lastMaintenance: "2024-06-01",
      nextMaintenance: "2024-12-01",
      health: 78,
    },
    {
      id: 3,
      name: "MV Pacific Star",
      type: "Oil Tanker",
      status: "Active",
      location: "Port B",
      lastMaintenance: "2024-02-20",
      nextMaintenance: "2024-08-20",
      health: 92,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedShip, setSelectedShip] = useState(null);
  const [newShip, setNewShip] = useState({
    name: "",
    type: "",
    status: "Active",
    location: "",
    health: 100,
  });

  const shipTypes = ["Container Ship", "Bulk Carrier", "Oil Tanker", "Cargo Ship", "Passenger Ship"];
  const statusOptions = ["Active", "Maintenance", "Docked"];
  const locations = ["Port A", "Port B", "Port C", "Dry Dock", "At Sea"];

  const handleAddShip = () => {
    if (!newShip.name || !newShip.type || !newShip.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const ship = {
      ...newShip,
      id: Math.max(...ships.map(s => s.id)) + 1,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setShips([...ships, ship]);
    setNewShip({ name: "", type: "", status: "Active", location: "", health: 100 });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Ship added successfully",
    });
  };

  const handleEditShip = (ship) => {
    setSelectedShip(ship);
    setIsEditDialogOpen(true);
  };

  const handleUpdateShip = () => {
    setShips(ships.map(s => 
      s.id === selectedShip.id ? selectedShip : s
    ));
    setIsEditDialogOpen(false);
    setSelectedShip(null);
    
    toast({
      title: "Success",
      description: "Ship updated successfully",
    });
  };

  const handleDeleteShip = (id) => {
    setShips(ships.filter(s => s.id !== id));
    toast({
      title: "Success",
      description: "Ship deleted successfully",
    });
  };

  const handleViewShip = (ship) => {
    setSelectedShip(ship);
    setIsViewDialogOpen(true);
  };

  const handleScheduleMaintenance = (ship) => {
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance scheduled for ${ship.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ships</h1>
          <p className="text-gray-600">Manage your fleet of ships</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Ship
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Ship</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ship Name</Label>
                <Input
                  id="name"
                  value={newShip.name}
                  onChange={(e) => setNewShip({...newShip, name: e.target.value})}
                  placeholder="Enter ship name"
                />
              </div>
              <div>
                <Label htmlFor="type">Ship Type</Label>
                <Select value={newShip.type} onValueChange={(value) => setNewShip({...newShip, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ship type" />
                  </SelectTrigger>
                  <SelectContent>
                    {shipTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={newShip.location} onValueChange={(value) => setNewShip({...newShip, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="health">Health (%)</Label>
                <Input
                  id="health"
                  type="number"
                  min="0"
                  max="100"
                  value={newShip.health}
                  onChange={(e) => setNewShip({...newShip, health: parseInt(e.target.value)})}
                />
              </div>
              <Button onClick={handleAddShip} className="w-full">
                Add Ship
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ships.map((ship) => (
          <Card key={ship.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Ship className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {ship.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{ship.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ship.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : ship.status === 'Maintenance'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {ship.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{ship.location}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Health Status</span>
                  <span className="font-medium text-gray-900">{ship.health}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      ship.health >= 90 ? 'bg-green-500' :
                      ship.health >= 70 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${ship.health}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Maintenance</span>
                  <span className="text-gray-900">{ship.lastMaintenance}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Maintenance</span>
                  <span className="text-gray-900">{ship.nextMaintenance}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewShip(ship)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleScheduleMaintenance(ship)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditShip(ship)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteShip(ship.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ship</DialogTitle>
          </DialogHeader>
          {selectedShip && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Ship Name</Label>
                <Input
                  id="edit-name"
                  value={selectedShip.name}
                  onChange={(e) => setSelectedShip({...selectedShip, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Select 
                  value={selectedShip.location} 
                  onValueChange={(value) => setSelectedShip({...selectedShip, location: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={selectedShip.status} 
                  onValueChange={(value) => setSelectedShip({...selectedShip, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-health">Health (%)</Label>
                <Input
                  id="edit-health"
                  type="number"
                  min="0"
                  max="100"
                  value={selectedShip.health}
                  onChange={(e) => setSelectedShip({...selectedShip, health: parseInt(e.target.value)})}
                />
              </div>
              <Button onClick={handleUpdateShip} className="w-full">
                Update Ship
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ship Details</DialogTitle>
          </DialogHeader>
          {selectedShip && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Name</Label>
                  <p className="mt-1">{selectedShip.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <p className="mt-1">{selectedShip.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <p className="mt-1">{selectedShip.status}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Location</Label>
                  <p className="mt-1">{selectedShip.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Health</Label>
                  <p className="mt-1">{selectedShip.health}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Maintenance</Label>
                  <p className="mt-1">{selectedShip.lastMaintenance}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ships;
