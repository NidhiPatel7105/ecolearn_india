import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notifications] = useState([
    { id: 1, title: 'Challenge Deadline', message: 'Water Conservation Challenge ends in 2 days', time: '2h ago', unread: true },
    { id: 2, title: 'Achievement Unlocked', message: 'You earned the "Green Warrior" badge!', time: '1d ago', unread: true },
    { id: 3, title: 'New Lesson Available', message: 'Climate Change Basics is now available', time: '2d ago', unread: false }
  ]);
  const [userStatus] = useState({
    name: 'Priya Sharma',
    ecoPoints: 1250,
    level: 'Green Champion',
    streak: 7
  });

  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'Home', tooltip: 'View your progress and available activities' },
    { label: 'Learn', path: '/interactive-lessons', icon: 'BookOpen', tooltip: 'Access interactive environmental lessons' },
    { label: 'Challenges', path: '/challenge-tracker', icon: 'Target', tooltip: 'Participate in real-world environmental challenges' },
    { label: 'Profile', path: '/student-profile', icon: 'User', tooltip: 'Manage your profile and view achievements' },
    { label: 'Leaderboard', path: '/school-leaderboard', icon: 'Trophy', tooltip: 'View school rankings and compete with peers' }
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const savedLanguage = localStorage.getItem('ecolearn-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('ecolearn-language', newLanguage);
  };

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer hover-scale"
              onClick={() => handleNavigation('/student-dashboard')}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Icon name="Leaf" size={24} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-semibold text-foreground">
                  EcoLearn India
                </h1>
                <p className="text-xs font-caption text-muted-foreground -mt-1">
                  Environmental Education Platform
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-smooth hover-scale ${
                  location?.pathname === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} className="mr-2" />
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* User Status Indicator */}
            <div 
              className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2 cursor-pointer hover-scale transition-smooth"
              onClick={() => handleNavigation('/student-profile')}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={16} color="white" />
                </div>
                <div className="text-sm">
                  <div className="font-mono font-medium text-foreground">{userStatus?.ecoPoints}</div>
                  <div className="text-xs text-muted-foreground">Level {userStatus?.level}</div>
                </div>
                <div className="flex items-center text-accent">
                  <Icon name="Flame" size={14} />
                  <span className="text-xs font-mono ml-1">{userStatus?.streak}</span>
                </div>
              </div>
            </div>

            {/* Connectivity Status */}
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-warning'}`} 
                 title={isOnline ? 'Online' : 'Offline - Some features may be limited'} />

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className="hidden sm:flex"
              title="Switch Language"
            >
              <span className="text-sm font-medium">
                {language === 'en' ? 'हिं' : 'EN'}
              </span>
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative"
                title="Notifications"
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-mono">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-modal z-50 animate-slide-up">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-heading font-medium text-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications?.map((notification) => (
                      <div
                        key={notification?.id}
                        className={`p-4 border-b border-border hover:bg-muted cursor-pointer transition-smooth ${
                          notification?.unread ? 'bg-accent/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-foreground">{notification?.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                            <span className="text-xs font-caption text-muted-foreground mt-2 block">
                              {notification?.time}
                            </span>
                          </div>
                          {notification?.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-1" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" size="sm" fullWidth>
                      View All Notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
              title="Menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border animate-slide-up">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center w-full px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                    location?.pathname === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} className="mr-3" />
                  {item?.label}
                </button>
              ))}
              
              {/* Mobile User Status */}
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{userStatus?.name}</div>
                      <div className="text-xs text-muted-foreground">{userStatus?.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-medium text-foreground">{userStatus?.ecoPoints}</div>
                    <div className="flex items-center text-accent text-xs">
                      <Icon name="Flame" size={12} />
                      <span className="ml-1">{userStatus?.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Language Toggle */}
              <Button
                variant="ghost"
                onClick={handleLanguageToggle}
                className="w-full justify-start mt-2"
              >
                <Icon name="Globe" size={18} className="mr-3" />
                Switch to {language === 'en' ? 'Hindi' : 'English'}
              </Button>
            </nav>
          </div>
        )}
      </header>
      {/* Click outside to close notifications */}
      {isNotificationOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}
    </>
  );
};

export default Header;