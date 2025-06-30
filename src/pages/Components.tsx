import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, Plus, AlertTriangle, CheckCircle, Clock, Trash2, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Components = () => {
  const { toast } = useToast();
  const [components, setComponents] = useState([
    {
      id: 1,
      name: "Main Engine",
      ship: "MV Ocean Explorer",
      type: "Engine",
      status: "Good",
      lastInspection: "2024-05-15",
      nextInspection: "2024-08-15",
      health: 95,
    },
    {
      id: 2,
      name: "Navigation System",
      ship: "SS Atlantic",
      type: "Electronics",
      status: "Maintenance Required",
      lastInspection: "2024-06-01",
      nextInspection: "2024-07-01",
      health: 65,
    },
    {
      id: 3,
      name: "Hull Structure",
      ship: "MV Pacific Star",
      type: "Structure",
      status: "Good",
      lastInspection: "2024-04-20",
      nextInspection: "2024-10-20",
      health: 88,
    },
    {
      id: 4,
      name: "Propeller",
      ship: "MV Ocean Explorer",
      type: "Propulsion",
      status: "Critical",
      lastInspection: "2024-06-10",
      nextInspection: "2024-06-25",
      health: 45,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [newComponent, setNewComponent] = useState({
    name: "",
    ship: "",
    type: "",
    status: "Good",
    health: 100,
  });

  const ships = ["MV Ocean Explorer", "SS Atlantic", "MV Pacific Star"];
  const componentTypes = ["Engine", "Electronics", "Structure", "Propulsion", "Safety"];
  const statusOptions = ["Good", "Maintenance Required", "Critical"];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Maintenance Required':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'Critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-green-100 text-green-800';
      case 'Maintenance Required':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddComponent = () => {
    if (!newComponent.name || !newComponent.ship || !newComponent.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const component = {
      ...newComponent,
      id: Math.max(...components.map(c => c.id)) + 1,
      lastInspection: new Date().toISOString().split('T')[0],
      nextInspection: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setComponents([...components, component]);
    setNewComponent({ name: "", ship: "", type: "", status: "Good", health: 100 });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Component added successfully",
    });
  };

  const handleEditComponent = (component) => {
    setSelectedComponent(component);
    setIsEditDialogOpen(true);
  };

  const handleUpdateComponent = () => {
    setComponents(components.map(c => 
      c.id === selectedComponent.id ? selectedComponent : c
    ));
    setIsEditDialogOpen(false);
    setSelectedComponent(null);
    
    toast({
      title: "Success",
      description: "Component updated successfully",
    });
  };

  const handleDeleteComponent = (id) => {
    setComponents(components.filter(c => c.id !== id));
    toast({
      title: "Success",
      description: "Component deleted successfully",
    });
  };

  const handleViewComponent = (component) => {
    setSelectedComponent(component);
    setIsViewDialogOpen(true);
  };

  const handleScheduleService = (component) => {
    toast({
      title: "Service Scheduled",
      description: `Service scheduled for ${component.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Components Management</h1>
          <p className="text-gray-600">Monitor and manage ship components</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Component</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Component Name</Label>
                <Input
                  id="name"
                  value={newComponent.name}
                  onChange={(e) => setNewComponent({...newComponent, name: e.target.value})}
                  placeholder="Enter component name"
                />
              </div>
              <div>
                <Label htmlFor="ship">Ship</Label>
                <Select value={newComponent.ship} onValueChange={(value) => setNewComponent({...newComponent, ship: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ship" />
                  </SelectTrigger>
                  <SelectContent>
                    {ships.map(ship => (
                      <SelectItem key={ship} value={ship}>{ship}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newComponent.type} onValueChange={(value) => setNewComponent({...newComponent, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
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
                  value={newComponent.health}
                  onChange={(e) => setNewComponent({...newComponent, health: parseInt(e.target.value)})}
                />
              </div>
              <Button onClick={handleAddComponent} className="w-full">
                Add Component
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {components.filter(c => c.status === 'Good').length}
                </p>
                <p className="text-sm text-gray-600">Good Condition</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {components.filter(c => c.status === 'Maintenance Required').length}
                </p>
                <p className="text-sm text-gray-600">Needs Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {components.filter(c => c.status === 'Critical').length}
                </p>
                <p className="text-sm text-gray-600">Critical Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Components List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {components.map((component) => (
          <Card key={component.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {component.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{component.ship} • {component.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(component.status)}
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(component.status)}`}>
                    {component.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Health Status</span>
                  <span className="font-medium text-gray-900">{component.health}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      component.health >= 80 ? 'bg-green-500' :
                      component.health >= 60 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${component.health}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Inspection</span>
                  <span className="text-gray-900">{component.lastInspection}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Inspection</span>
                  <span className="text-gray-900">{component.nextInspection}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewComponent(component)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleScheduleService(component)}
                >
                  Schedule Service
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditComponent(component)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteComponent(component.id)}
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
            <DialogTitle>Edit Component</DialogTitle>
          </DialogHeader>
          {selectedComponent && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Component Name</Label>
                <Input
                  id="edit-name"
                  value={selectedComponent.name}
                  onChange={(e) => setSelectedComponent({...selectedComponent, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-health">Health (%)</Label>
                <Input
                  id="edit-health"
                  type="number"
                  min="0"
                  max="100"
                  value={selectedComponent.health}
                  onChange={(e) => setSelectedComponent({...selectedComponent, health: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={selectedComponent.status} 
                  onValueChange={(value) => setSelectedComponent({...selectedComponent, status: value})}
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
              <Button onClick={handleUpdateComponent} className="w-full">
                Update Component
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Component Details</DialogTitle>
          </DialogHeader>
          {selectedComponent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Name</Label>
                  <p className="mt-1">{selectedComponent.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Ship</Label>
                  <p className="mt-1">{selectedComponent.ship}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Type</Label>
                  <p className="mt-1">{selectedComponent.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <p className="mt-1">{selectedComponent.status}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Health</Label>
                  <p className="mt-1">{selectedComponent.health}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Last Inspection</Label>
                  <p className="mt-1">{selectedComponent.lastInspection}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Components;
