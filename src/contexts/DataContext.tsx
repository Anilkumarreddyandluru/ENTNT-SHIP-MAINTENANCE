
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Ship {
  id: string;
  name: string;
  imo: string;
  flag: string;
  status: 'Active' | 'Under Maintenance' | 'Docked' | 'Out of Service';
  type: string;
  yearBuilt: number;
  length: number;
  owner: string;
}

export interface Component {
  id: string;
  shipId: string;
  name: string;
  serialNumber: string;
  installDate: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: 'Good' | 'Needs Attention' | 'Critical';
  type: string;
}

export interface Job {
  id: string;
  componentId: string;
  shipId: string;
  type: 'Inspection' | 'Repair' | 'Replacement' | 'Routine Maintenance';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedEngineerId: string;
  scheduledDate: string;
  completedDate?: string;
  title: string;
  description: string;
  estimatedHours: number;
}

export interface Notification {
  id: string;
  type: 'job_created' | 'job_updated' | 'job_completed' | 'maintenance_due';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface DataContextType {
  ships: Ship[];
  components: Component[];
  jobs: Job[];
  notifications: Notification[];
  addShip: (ship: Omit<Ship, 'id'>) => void;
  updateShip: (id: string, ship: Partial<Ship>) => void;
  deleteShip: (id: string) => void;
  addComponent: (component: Omit<Component, 'id'>) => void;
  updateComponent: (id: string, component: Partial<Component>) => void;
  deleteComponent: (id: string) => void;
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_DATA = {
  ships: [
    {
      id: 's1',
      name: 'Ever Given',
      imo: '9811000',
      flag: 'Panama',
      status: 'Active' as const,
      type: 'Container Ship',
      yearBuilt: 2018,
      length: 400,
      owner: 'Evergreen Marine'
    },
    {
      id: 's2',
      name: 'Maersk Alabama',
      imo: '9164263',
      flag: 'USA',
      status: 'Under Maintenance' as const,
      type: 'Container Ship',
      yearBuilt: 1998,
      length: 508,
      owner: 'Maersk Line'
    },
    {
      id: 's3',
      name: 'MSC Oscar',
      imo: '9703291',
      flag: 'Panama',
      status: 'Active' as const,
      type: 'Container Ship',
      yearBuilt: 2015,
      length: 395,
      owner: 'MSC'
    }
  ],
  components: [
    {
      id: 'c1',
      shipId: 's1',
      name: 'Main Engine',
      serialNumber: 'ME-1234',
      installDate: '2020-01-10',
      lastMaintenanceDate: '2024-03-12',
      nextMaintenanceDate: '2024-09-12',
      status: 'Good' as const,
      type: 'Engine'
    },
    {
      id: 'c2',
      shipId: 's2',
      name: 'Navigation Radar',
      serialNumber: 'RAD-5678',
      installDate: '2021-07-18',
      lastMaintenanceDate: '2023-12-01',
      nextMaintenanceDate: '2024-06-01',
      status: 'Needs Attention' as const,
      type: 'Navigation'
    },
    {
      id: 'c3',
      shipId: 's1',
      name: 'Propeller System',
      serialNumber: 'PROP-9012',
      installDate: '2020-01-15',
      lastMaintenanceDate: '2024-01-20',
      nextMaintenanceDate: '2024-07-20',
      status: 'Good' as const,
      type: 'Propulsion'
    }
  ],
  jobs: [
    {
      id: 'j1',
      componentId: 'c1',
      shipId: 's1',
      type: 'Inspection' as const,
      priority: 'High' as const,
      status: 'Open' as const,
      assignedEngineerId: '3',
      scheduledDate: '2024-07-05',
      title: 'Main Engine Quarterly Inspection',
      description: 'Comprehensive inspection of main engine components',
      estimatedHours: 8
    },
    {
      id: 'j2',
      componentId: 'c2',
      shipId: 's2',
      type: 'Repair' as const,
      priority: 'Critical' as const,
      status: 'In Progress' as const,
      assignedEngineerId: '3',
      scheduledDate: '2024-07-02',
      title: 'Radar System Calibration',
      description: 'Recalibrate navigation radar after anomaly detection',
      estimatedHours: 4
    }
  ],
  notifications: [
    {
      id: 'n1',
      type: 'job_created' as const,
      title: 'New Job Created',
      message: 'Main Engine Quarterly Inspection has been scheduled',
      read: false,
      createdAt: new Date().toISOString()
    }
  ]
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ships, setShips] = useState<Ship[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedShips = localStorage.getItem('ships');
    const savedComponents = localStorage.getItem('components');
    const savedJobs = localStorage.getItem('jobs');
    const savedNotifications = localStorage.getItem('notifications');

    setShips(savedShips ? JSON.parse(savedShips) : INITIAL_DATA.ships);
    setComponents(savedComponents ? JSON.parse(savedComponents) : INITIAL_DATA.components);
    setJobs(savedJobs ? JSON.parse(savedJobs) : INITIAL_DATA.jobs);
    setNotifications(savedNotifications ? JSON.parse(savedNotifications) : INITIAL_DATA.notifications);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addShip = (ship: Omit<Ship, 'id'>) => {
    const newShip = { ...ship, id: `s${Date.now()}` };
    const updatedShips = [...ships, newShip];
    setShips(updatedShips);
    saveToStorage('ships', updatedShips);
  };

  const updateShip = (id: string, shipData: Partial<Ship>) => {
    const updatedShips = ships.map(ship => 
      ship.id === id ? { ...ship, ...shipData } : ship
    );
    setShips(updatedShips);
    saveToStorage('ships', updatedShips);
  };

  const deleteShip = (id: string) => {
    const updatedShips = ships.filter(ship => ship.id !== id);
    setShips(updatedShips);
    saveToStorage('ships', updatedShips);
  };

  const addComponent = (component: Omit<Component, 'id'>) => {
    const newComponent = { ...component, id: `c${Date.now()}` };
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    saveToStorage('components', updatedComponents);
  };

  const updateComponent = (id: string, componentData: Partial<Component>) => {
    const updatedComponents = components.map(component => 
      component.id === id ? { ...component, ...componentData } : component
    );
    setComponents(updatedComponents);
    saveToStorage('components', updatedComponents);
  };

  const deleteComponent = (id: string) => {
    const updatedComponents = components.filter(component => component.id !== id);
    setComponents(updatedComponents);
    saveToStorage('components', updatedComponents);
  };

  const addJob = (job: Omit<Job, 'id'>) => {
    const newJob = { ...job, id: `j${Date.now()}` };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    saveToStorage('jobs', updatedJobs);
    
    addNotification({
      type: 'job_created',
      title: 'New Job Created',
      message: `${job.title} has been scheduled`,
      read: false
    });
  };

  const updateJob = (id: string, jobData: Partial<Job>) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, ...jobData } : job
    );
    setJobs(updatedJobs);
    saveToStorage('jobs', updatedJobs);

    if (jobData.status === 'Completed') {
      addNotification({
        type: 'job_completed',
        title: 'Job Completed',
        message: `Job has been marked as completed`,
        read: false
      });
    } else if (jobData.status) {
      addNotification({
        type: 'job_updated',
        title: 'Job Updated',
        message: `Job status updated to ${jobData.status}`,
        read: false
      });
    }
  };

  const deleteJob = (id: string) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    saveToStorage('jobs', updatedJobs);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification = {
      ...notification,
      id: `n${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    saveToStorage('notifications', updatedNotifications);
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    saveToStorage('notifications', updatedNotifications);
  };

  return (
    <DataContext.Provider value={{
      ships,
      components,
      jobs,
      notifications,
      addShip,
      updateShip,
      deleteShip,
      addComponent,
      updateComponent,
      deleteComponent,
      addJob,
      updateJob,
      deleteJob,
      markNotificationAsRead,
      addNotification
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
