import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Plus, Clock, Ship, Edit, Trash2, Play } from "lucide-react";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  ship: string;
  date: string;
  time: string;
  type: string;
  priority: string;
  duration: string;
  description?: string;
}

const Calendar = () => {
  const { toast } = useToast();
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Engine Maintenance",
      ship: "MV Ocean Explorer",
      date: "2024-07-15",
      time: "09:00",
      type: "Maintenance",
      priority: "High",
      duration: "4 hours",
      description: "Routine engine maintenance and oil change"
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
      description: "Complete hull inspection for damage assessment"
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
      description: "GPS and navigation system calibration"
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
      description: "Replace damaged propeller blades"
    },
  ]);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    ship: '',
    date: '',
    time: '',
    type: 'Maintenance',
    priority: 'Medium',
    duration: '',
    description: ''
  });

  const handleScheduleTask = () => {
    if (newTask.title && newTask.ship && newTask.date && newTask.time) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title,
        ship: newTask.ship,
        date: newTask.date,
        time: newTask.time,
        type: newTask.type || 'Maintenance',
        priority: newTask.priority || 'Medium',
        duration: newTask.duration || '1 hour',
        description: newTask.description || ''
      };
      
      setUpcomingTasks([...upcomingTasks, task]);
      setNewTask({
        title: '',
        ship: '',
        date: '',
        time: '',
        type: 'Maintenance',
        priority: 'Medium',
        duration: '',
        description: ''
      });
      setIsScheduleDialogOpen(false);
      toast({
        title: "Task Scheduled",
        description: "New maintenance task has been successfully scheduled.",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      setUpcomingTasks(upcomingTasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ));
      setIsEditDialogOpen(false);
      setEditingTask(null);
      toast({
        title: "Task Updated",
        description: "Task has been successfully updated.",
      });
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setUpcomingTasks(upcomingTasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Task has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleStartTask = (taskId: number) => {
    const task = upcomingTasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: "Task Started",
        description: `Started "${task.title}" for ${task.ship}`,
      });
    }
  };

  const handleViewFullCalendar = () => {
    toast({
      title: "Full Calendar",
      description: "Opening full calendar view...",
    });
  };

  const handleShipSchedule = () => {
    toast({
      title: "Ship Schedule",
      description: "Opening ship schedule view...",
    });
  };

  const handleTimeTracking = () => {
    toast({
      title: "Time Tracking",
      description: "Opening time tracking interface...",
    });
  };

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
        
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Task</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title *</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ship-name">Ship Name *</Label>
                <Input
                  id="ship-name"
                  value={newTask.ship}
                  onChange={(e) => setNewTask({ ...newTask, ship: e.target.value })}
                  placeholder="Enter ship name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-date">Date *</Label>
                <Input
                  id="task-date"
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-time">Time *</Label>
                <Input
                  id="task-time"
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-type">Type</Label>
                <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-duration">Duration</Label>
                <Input
                  id="task-duration"
                  value={newTask.duration}
                  onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                  placeholder="e.g., 2 hours"
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleTask} className="bg-blue-600 hover:bg-blue-700">
                Schedule Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-task-title">Task Title *</Label>
                <Input
                  id="edit-task-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-ship-name">Ship Name *</Label>
                <Input
                  id="edit-ship-name"
                  value={editingTask.ship}
                  onChange={(e) => setEditingTask({ ...editingTask, ship: e.target.value })}
                  placeholder="Enter ship name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-task-date">Date *</Label>
                <Input
                  id="edit-task-date"
                  type="date"
                  value={editingTask.date}
                  onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-task-time">Time *</Label>
                <Input
                  id="edit-task-time"
                  type="time"
                  value={editingTask.time}
                  onChange={(e) => setEditingTask({ ...editingTask, time: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-task-type">Type</Label>
                <Select value={editingTask.type} onValueChange={(value) => setEditingTask({ ...editingTask, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-task-priority">Priority</Label>
                <Select value={editingTask.priority} onValueChange={(value) => setEditingTask({ ...editingTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-task-duration">Duration</Label>
                <Input
                  id="edit-task-duration"
                  value={editingTask.duration}
                  onChange={(e) => setEditingTask({ ...editingTask, duration: e.target.value })}
                  placeholder="e.g., 2 hours"
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="edit-task-description">Description</Label>
                <Textarea
                  id="edit-task-description"
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTask} className="bg-blue-600 hover:bg-blue-700">
              Update Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditTask(task)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the task "{task.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTask(task.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleStartTask(task.id)}
                      >
                        <Play className="h-4 w-4 mr-1" />
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
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleViewFullCalendar}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleShipSchedule}
              >
                <Ship className="h-4 w-4 mr-2" />
                Ship Schedule
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleTimeTracking}
              >
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
