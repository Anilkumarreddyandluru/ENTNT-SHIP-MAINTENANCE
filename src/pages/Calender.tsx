import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus, Clock, Ship } from "lucide-react";

const Calendar = () => {
  const upcomingTasks = [
    {
      id: 1,
      title: "Engine Maintenance",
      ship: "MV Ocean Explorer",
      date: "2024-07-15",
      time: "09:00",
      type: "Maintenance",
      priority: "High",
      duration: "4 hours",
    },
    {
      id: 2,
      title: "Hull Inspection",
      ship: "SS Atlantic",
      date: "2024-07-18",
      time: "14:00",
      type: "Inspection",
      priority: "Medium",
      duration: "2 hours",
    },
    {
      id: 3,
      title: "Navigation System Check",
      ship: "MV Pacific Star",
      date: "2024-07-20",
      time: "11:00",
      type: "Inspection",
      priority: "Low",
      duration: "1 hour",
    },
    {
      id: 4,
      title: "Propeller Replacement",
      ship: "MV Ocean Explorer",
      date: "2024-07-25",
      time: "08:00",
      type: "Repair",
      priority: "Critical",
      duration: "8 hours",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Maintenance':
        return 'bg-green-100 text-green-800';
      case 'Inspection':
        return 'bg-blue-100 text-blue-800';
      case 'Repair':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Calendar</h1>
          <p className="text-gray-600">Schedule and track maintenance activities</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Task
        </Button>
      </div>

      {/* Calendar Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(task.type)}`}>
                          {task.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Ship className="h-4 w-4" />
                          <span>{task.ship}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{task.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{task.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-xs text-gray-500">Duration: {task.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Tasks</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending</span>
                <span className="font-semibold text-orange-600">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Overdue</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Ship className="h-4 w-4 mr-2" />
                Ship Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Time Tracking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
