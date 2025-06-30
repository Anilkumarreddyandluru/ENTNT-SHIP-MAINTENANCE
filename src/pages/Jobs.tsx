import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Calendar,
    User,
    Wrench,
    AlertCircle,
    CheckCircle,
    Clock,
    Play
} from 'lucide-react';

interface Job {
    id: string;
    title: string;
    description: string;
    shipName: string;
    component: string;
    assignedTo: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    status: 'Pending' | 'In Progress' | 'Completed' | 'On Hold';
    dueDate: string;
    createdDate: string;
    estimatedHours: number;
}

const Jobs = () => {
    const { toast } = useToast();
    const [jobs, setJobs] = useState<Job[]>([
        {
            id: '1',
            title: 'Engine Oil Change',
            description: 'Replace engine oil and filters for routine maintenance',
            shipName: 'Atlantic Voyager',
            component: 'Main Engine',
            assignedTo: 'John Smith',
            priority: 'Medium',
            status: 'In Progress',
            dueDate: '2024-01-15',
            createdDate: '2024-01-01',
            estimatedHours: 4
        },
        {
            id: '2',
            title: 'Hull Inspection',
            description: 'Complete hull inspection and damage assessment',
            shipName: 'Pacific Explorer',
            component: 'Hull',
            assignedTo: 'Sarah Johnson',
            priority: 'High',
            status: 'Pending',
            dueDate: '2024-01-20',
            createdDate: '2024-01-02',
            estimatedHours: 8
        },
        {
            id: '3',
            title: 'Navigation System Calibration',
            description: 'Calibrate GPS and navigation systems',
            shipName: 'Arctic Pioneer',
            component: 'Navigation',
            assignedTo: 'Mike Chen',
            priority: 'Critical',
            status: 'Completed',
            dueDate: '2024-01-10',
            createdDate: '2023-12-28',
            estimatedHours: 6
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [newJob, setNewJob] = useState<Partial<Job>>({
        title: '',
        description: '',
        shipName: '',
        component: '',
        assignedTo: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: '',
        estimatedHours: 0
    });

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.shipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || job.priority === filterPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleCreateJob = () => {
        if (newJob.title && newJob.shipName && newJob.assignedTo) {
            const job: Job = {
                id: Date.now().toString(),
                title: newJob.title,
                description: newJob.description || '',
                shipName: newJob.shipName,
                component: newJob.component || '',
                assignedTo: newJob.assignedTo,
                priority: newJob.priority as Job['priority'],
                status: newJob.status as Job['status'],
                dueDate: newJob.dueDate || '',
                createdDate: new Date().toISOString().split('T')[0],
                estimatedHours: newJob.estimatedHours || 0
            };

            setJobs([...jobs, job]);
            setNewJob({
                title: '',
                description: '',
                shipName: '',
                component: '',
                assignedTo: '',
                priority: 'Medium',
                status: 'Pending',
                dueDate: '',
                estimatedHours: 0
            });
            setIsCreateDialogOpen(false);
            toast({
                title: "Job Created",
                description: "New job has been successfully created.",
            });
        }
    };

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
        setIsEditDialogOpen(true);
    };

    const handleUpdateJob = () => {
        if (editingJob) {
            setJobs(jobs.map(job => job.id === editingJob.id ? editingJob : job));
            setIsEditDialogOpen(false);
            setEditingJob(null);
            toast({
                title: "Job Updated",
                description: "Job has been successfully updated.",
            });
        }
    };

    const handleDeleteJob = (jobId: string) => {
        setJobs(jobs.filter(job => job.id !== jobId));
        toast({
            title: "Job Deleted",
            description: "Job has been successfully deleted.",
            variant: "destructive",
        });
    };

    const handleStartJob = (jobId: string) => {
        setJobs(jobs.map(job =>
            job.id === jobId ? { ...job, status: 'In Progress' as const } : job
        ));
        toast({
            title: "Job Started",
            description: "Job status has been updated to In Progress.",
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'In Progress': return <Clock className="w-4 h-4 text-blue-600" />;
            case 'On Hold': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
            default: return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'On Hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
                    <p className="text-gray-600">Manage maintenance jobs and work orders</p>
                </div>

                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Job
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Job</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title *</Label>
                                <Input
                                    id="title"
                                    value={newJob.title}
                                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                    placeholder="Enter job title"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="shipName">Ship Name *</Label>
                                <Input
                                    id="shipName"
                                    value={newJob.shipName}
                                    onChange={(e) => setNewJob({ ...newJob, shipName: e.target.value })}
                                    placeholder="Enter ship name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="component">Component</Label>
                                <Input
                                    id="component"
                                    value={newJob.component}
                                    onChange={(e) => setNewJob({ ...newJob, component: e.target.value })}
                                    placeholder="Enter component"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="assignedTo">Assigned To *</Label>
                                <Input
                                    id="assignedTo"
                                    value={newJob.assignedTo}
                                    onChange={(e) => setNewJob({ ...newJob, assignedTo: e.target.value })}
                                    placeholder="Enter assignee name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={newJob.priority} onValueChange={(value) => setNewJob({ ...newJob, priority: value as Job['priority'] })}>
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
                                <Label htmlFor="status">Status</Label>
                                <Select value={newJob.status} onValueChange={(value) => setNewJob({ ...newJob, status: value as Job['status'] })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="On Hold">On Hold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input
                                    id="dueDate"
                                    type="date"
                                    value={newJob.dueDate}
                                    onChange={(e) => setNewJob({ ...newJob, dueDate: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                                <Input
                                    id="estimatedHours"
                                    type="number"
                                    value={newJob.estimatedHours}
                                    onChange={(e) => setNewJob({ ...newJob, estimatedHours: Number(e.target.value) })}
                                    placeholder="0"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={newJob.description}
                                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                    placeholder="Enter job description"
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreateJob} className="bg-blue-600 hover:bg-blue-700">
                                Create Job
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit Job</DialogTitle>
                    </DialogHeader>
                    {editingJob && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-title">Job Title *</Label>
                                <Input
                                    id="edit-title"
                                    value={editingJob.title}
                                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                                    placeholder="Enter job title"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-shipName">Ship Name *</Label>
                                <Input
                                    id="edit-shipName"
                                    value={editingJob.shipName}
                                    onChange={(e) => setEditingJob({ ...editingJob, shipName: e.target.value })}
                                    placeholder="Enter ship name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-component">Component</Label>
                                <Input
                                    id="edit-component"
                                    value={editingJob.component}
                                    onChange={(e) => setEditingJob({ ...editingJob, component: e.target.value })}
                                    placeholder="Enter component"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-assignedTo">Assigned To *</Label>
                                <Input
                                    id="edit-assignedTo"
                                    value={editingJob.assignedTo}
                                    onChange={(e) => setEditingJob({ ...editingJob, assignedTo: e.target.value })}
                                    placeholder="Enter assignee name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-priority">Priority</Label>
                                <Select value={editingJob.priority} onValueChange={(value) => setEditingJob({ ...editingJob, priority: value as Job['priority'] })}>
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
                                <Label htmlFor="edit-status">Status</Label>
                                <Select value={editingJob.status} onValueChange={(value) => setEditingJob({ ...editingJob, status: value as Job['status'] })}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="On Hold">On Hold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-dueDate">Due Date</Label>
                                <Input
                                    id="edit-dueDate"
                                    type="date"
                                    value={editingJob.dueDate}
                                    onChange={(e) => setEditingJob({ ...editingJob, dueDate: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-estimatedHours">Estimated Hours</Label>
                                <Input
                                    id="edit-estimatedHours"
                                    type="number"
                                    value={editingJob.estimatedHours}
                                    onChange={(e) => setEditingJob({ ...editingJob, estimatedHours: Number(e.target.value) })}
                                    placeholder="0"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editingJob.description}
                                    onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                                    placeholder="Enter job description"
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateJob} className="bg-blue-600 hover:bg-blue-700">
                            Update Job
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search jobs, ships, or assignees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterPriority} onValueChange={setFilterPriority}>
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Priority</SelectItem>
                                <SelectItem value="Critical">Critical</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">Job Title</TableHead>
                            <TableHead className="font-semibold">Ship</TableHead>
                            <TableHead className="font-semibold">Component</TableHead>
                            <TableHead className="font-semibold">Assigned To</TableHead>
                            <TableHead className="font-semibold">Priority</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Due Date</TableHead>
                            <TableHead className="font-semibold">Hours</TableHead>
                            <TableHead className="font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredJobs.map((job) => (
                            <TableRow key={job.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-900">{job.title}</div>
                                        {job.description && (
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {job.description}
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{job.shipName}</TableCell>
                                <TableCell>{job.component || '-'}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-gray-400" />
                                        {job.assignedTo}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${getPriorityColor(job.priority)} border`}>
                                        {job.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {getStatusIcon(job.status)}
                                        <Badge className={`ml-2 ${getStatusColor(job.status)} border`}>
                                            {job.status}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                        {job.dueDate || '-'}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                                        {job.estimatedHours}h
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            onClick={() => handleEditJob(job)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the job "{job.title}".
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                        {job.status === 'Pending' && (
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => handleStartJob(job.id)}
                                            >
                                                <Play className="w-4 h-4 mr-1" />
                                                Start
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                        <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Wrench className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                            <p className="text-2xl font-semibold text-gray-900">{jobs.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {jobs.filter(job => job.status === 'Pending').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {jobs.filter(job => job.status === 'In Progress').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Completed</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {jobs.filter(job => job.status === 'Completed').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
