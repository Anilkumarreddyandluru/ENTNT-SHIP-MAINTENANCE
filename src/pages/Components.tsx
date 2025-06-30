import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Plus, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const Components = () => {
  const components = [
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
  ];

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Components Management</h1>
          <p className="text-gray-600">Monitor and manage ship components</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Component
        </Button>
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
                <p className="text-2xl font-bold text-gray-900">2</p>
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
                <p className="text-2xl font-bold text-gray-900">1</p>
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
                <p className="text-2xl font-bold text-gray-900">1</p>
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

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View History
                </Button>
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Schedule Service
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Components;