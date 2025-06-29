
# Ship Maintenance Dashboard

A comprehensive React-based dashboard for managing ship maintenance operations, built for ENTNT Maritime Systems.

## 🚢 Features

### Core Functionality
- **User Authentication**: Role-based access control (Admin, Inspector, Engineer)
- **Ships Management**: Complete CRUD operations for fleet management
- **Components Tracking**: Monitor ship components and maintenance schedules
- **Jobs Management**: Create, assign, and track maintenance jobs
- **Maintenance Calendar**: Visual scheduling and planning
- **KPI Dashboard**: Real-time metrics and performance indicators
- **Notification System**: In-app notifications for job updates
- **Responsive Design**: Works seamlessly across all devices

### User Roles & Permissions
- **Admin**: Full access to all features including ship/component/job management
- **Inspector**: View access to ships, components, jobs, and calendar
- **Engineer**: Access to jobs management and technical components

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: Tailwind CSS + Custom maritime theme
- **UI Components**: Shadcn/ui component library
- **Data Persistence**: localStorage (simulated backend)
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🏗️ Application Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Layout.tsx      # Main application layout
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── DataContext.tsx # Application data management
├── pages/             # Route components
│   ├── Login.tsx      # Authentication page
│   ├── Dashboard.tsx  # KPI dashboard
│   ├── Ships.tsx      # Fleet management
│   └── [other pages]
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd ship-maintenance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔐 Demo Credentials

Use these credentials to test different user roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@entnt.in | admin123 |
| Inspector | inspector@entnt.in | inspect123 |
| Engineer | engineer@entnt.in | engine123 |

## 📊 Data Management

The application uses localStorage to persist data, simulating a backend API. Data includes:

- **Users**: Authentication and role information
- **Ships**: Fleet vessel information
- **Components**: Ship equipment and parts tracking
- **Jobs**: Maintenance tasks and scheduling
- **Notifications**: System alerts and updates

## 🎨 Design System

### Color Palette
- **Primary**: Maritime Blue (#0066CC)
- **Secondary**: Ocean Blue (#00BFFF)
- **Accent**: Sea Foam (#40E0D0)
- **Status Colors**: Green (Active), Orange (Maintenance), Red (Critical)

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weights
- **Maritime Theme**: Ocean-inspired gradients and animations

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Collapsible sidebar navigation
- Adaptive grid layouts
- Touch-friendly interface elements
- Optimized mobile forms

## 🔒 Security Features

- **Role-based Access Control (RBAC)**
- **Protected routes** based on user permissions
- **Session persistence** with localStorage
- **Form validation** on all inputs
- **XSS protection** through React's built-in safeguards

## 📈 Performance Optimizations

- **Code splitting** with React lazy loading
- **Tree shaking** for optimal bundle size
- **Memoized components** to prevent unnecessary re-renders
- **Optimized images** and assets
- **Efficient state management** with Context API

## 🧪 Testing Strategy

The application includes:
- **Component testing** setup with React Testing Library
- **Type safety** with TypeScript
- **ESLint configuration** for code quality
- **Prettier formatting** for consistent code style

## 🚨 Known Issues & Limitations

1. **Data Persistence**: Uses localStorage instead of a real backend
2. **File Uploads**: Not implemented (would require backend integration)
3. **Real-time Updates**: No WebSocket support for live notifications
4. **Advanced Analytics**: Limited to basic KPI calculations
5. **Internationalization**: Currently English-only interface

## 🔮 Future Enhancements

- [ ] Backend API integration with Node.js/Express
- [ ] Real-time notifications with WebSockets
- [ ] Advanced reporting and analytics
- [ ] File upload capabilities for documentation
- [ ] Integration with maritime APIs
- [ ] Mobile app version (React Native)
- [ ] Multi-language support
- [ ] Advanced calendar features (drag-drop scheduling)

## 🛡️ Error Handling

The application includes comprehensive error handling:
- **Form validation** with user-friendly messages
- **API error simulation** with proper error states
- **Fallback UI components** for error boundaries
- **Toast notifications** for user feedback

## 📦 Deployment

The application is configured for easy deployment to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

### Deployment Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

This project follows standard React development practices:
- Use TypeScript for all new components
- Follow the existing folder structure
- Write meaningful commit messages
- Ensure responsive design principles
- Test across different user roles

## 📄 License

This project is developed for ENTNT Maritime Systems as part of a technical assessment.

## 📞 Support

For technical questions or issues:
- Email: hr@entnt.in
- Include: Screenshots, browser information, and steps to reproduce

---

**Built with ⚓ by ENTNT Maritime Systems**

*Last updated: June 2024*
