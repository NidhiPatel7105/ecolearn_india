import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LeaderboardTable from './components/LeaderboardTable';
import TopAchieversSpotlight from './components/TopAchieversSpotlight';
import SchoolStatsPanel from './components/SchoolStatsPanel';
import FilterControls from './components/FilterControls';
import MobileLeaderboardCard from './components/MobileLeaderboardCard';

const SchoolLeaderboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    timePeriod: 'monthly',
    grade: 'all',
    activity: 'all',
    view: 'individual'
  });

  // Mock current user
  const currentUser = {
    id: 'user-456',
    name: 'Priya Sharma',
    ecoPoints: 1250
  };

  // Mock leaderboard data
  const [students] = useState([
    {
      id: 'user-123',
      name: 'Arjun Patel',
      class: '10th A',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2850,
      streak: 15,
      badges: ['Green Warrior', 'Eco Champion', 'Water Saver'],
      recentActivity: 'Completed Water Conservation Challenge',
      lastActive: '2 hours ago'
    },
    {
      id: 'user-456',
      name: 'Priya Sharma',
      class: '9th B',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2650,
      streak: 12,
      badges: ['Energy Expert', 'Waste Warrior'],
      recentActivity: 'Planted 5 trees in school garden',
      lastActive: '1 hour ago'
    },
    {
      id: 'user-789',
      name: 'Rahul Kumar',
      class: '11th C',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2400,
      streak: 8,
      badges: ['Tree Planter', 'Climate Hero'],
      recentActivity: 'Led recycling awareness campaign',
      lastActive: '3 hours ago'
    },
    {
      id: 'user-101',
      name: 'Sneha Reddy',
      class: '8th A',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2200,
      streak: 20,
      badges: ['Green Warrior', 'Water Saver', 'Energy Expert'],
      recentActivity: 'Completed energy audit challenge',
      lastActive: '4 hours ago'
    },
    {
      id: 'user-202',
      name: 'Vikram Singh',
      class: '12th B',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2100,
      streak: 6,
      badges: ['Waste Warrior', 'Climate Hero'],
      recentActivity: 'Organized beach cleanup drive',
      lastActive: '5 hours ago'
    }
  ]);

  // Mock top achievers data
  const [topAchievers] = useState([
    {
      id: 'user-123',
      name: 'Arjun Patel',
      class: '10th A',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2850,
      streak: 15,
      recentAchievements: [
        { type: 'challenge', title: 'Water Conservation Master', date: '2 days ago' },
        { type: 'community', title: 'Led school cleanup drive', date: '1 week ago' },
        { type: 'environmental', title: 'Planted 50 trees', date: '2 weeks ago' }
      ],
      contributions: [
        { label: 'Trees Planted', value: '50' },
        { label: 'Waste Sorted', value: '25kg' },
        { label: 'Energy Saved', value: '120kWh' }
      ]
    },
    {
      id: 'user-456',
      name: 'Priya Sharma',
      class: '9th B',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2650,
      streak: 12,
      recentAchievements: [
        { type: 'lesson', title: 'Climate Change Expert', date: '1 day ago' },
        { type: 'challenge', title: 'Energy Efficiency Champion', date: '3 days ago' }
      ],
      contributions: [
        { label: 'Lessons', value: '45' },
        { label: 'Challenges', value: '28' },
        { label: 'Points', value: '2.6K' }
      ]
    },
    {
      id: 'user-789',
      name: 'Rahul Kumar',
      class: '11th C',
      school: 'Green Valley High School',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      ecoPoints: 2400,
      streak: 8,
      recentAchievements: [
        { type: 'community', title: 'Recycling Ambassador', date: '2 days ago' },
        { type: 'environmental', title: 'Carbon Footprint Reducer', date: '1 week ago' }
      ],
      contributions: [
        { label: 'Campaigns', value: '12' },
        { label: 'Participants', value: '200+' },
        { label: 'Impact', value: 'High' }
      ]
    }
  ]);

  // Mock school statistics
  const [schoolStats] = useState([
    {
      type: 'trees',
      label: 'Trees Planted',
      value: 1250,
      unit: 'trees',
      progress: 78,
      monthlyIncrease: 85,
      target: 1600,
      achievement: 'Forest Guardian School'
    },
    {
      type: 'waste',
      label: 'Waste Segregated',
      value: 2500,
      unit: 'kg',
      progress: 65,
      monthlyIncrease: 180,
      target: 3800,
      achievement: null
    },
    {
      type: 'energy',
      label: 'Energy Saved',
      value: 15000,
      unit: 'kWh',
      progress: 85,
      monthlyIncrease: 1200,
      target: 18000,
      achievement: 'Energy Star School'
    },
    {
      type: 'water',
      label: 'Water Conserved',
      value: 8500,
      unit: 'liters',
      progress: 72,
      monthlyIncrease: 650,
      target: 12000,
      achievement: null
    },
    {
      type: 'students',
      label: 'Active Students',
      value: 450,
      unit: 'students',
      progress: 90,
      monthlyIncrease: 25,
      target: 500,
      achievement: 'High Participation'
    },
    {
      type: 'challenges',
      label: 'Challenges Completed',
      value: 1850,
      unit: 'challenges',
      progress: 92,
      monthlyIncrease: 120,
      target: 2000,
      achievement: 'Challenge Champions'
    }
  ]);

  // Mock active competitions
  const [activeCompetitions] = useState([
    {
      id: 'comp-1',
      name: 'Green School Challenge',
      description: 'School-wide environmental competition with exciting prizes',
      participants: 156,
      endDate: '15 Dec 2024',
      status: 'active',
      joined: true
    },
    {
      id: 'comp-2',
      name: 'Water Warriors',
      description: 'Water conservation challenge for all grade levels',
      participants: 89,
      endDate: '10 Dec 2024',
      status: 'ending-soon',
      joined: false
    }
  ]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ecolearn-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        timePeriod: 'monthly',
        grade: 'all',
        activity: 'all',
        view: 'individual'
      });
      setSearchQuery('');
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleViewProfile = (studentId) => {
    navigate('/student-profile', { state: { studentId } });
  };

  const handleJoinCompetition = (competitionId) => {
    // Mock join competition logic
    console.log('Joining competition:', competitionId);
  };

  const filteredStudents = students?.filter(student => {
    if (searchQuery) {
      return student?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
             student?.class?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
             student?.badges?.some(badge => badge?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    }
    return true;
  });

  const content = {
    en: {
      title: 'School Leaderboard',
      subtitle: 'Compete with peers and celebrate environmental achievements',
      backToDashboard: 'Back to Dashboard'
    },
    hi: {
      title: 'स्कूल लीडरबोर्ड',
      subtitle: 'साथियों के साथ प्रतिस्पर्धा करें और पर्यावरणीय उपलब्धियों का जश्न मनाएं',
      backToDashboard: 'डैशबोर्ड पर वापस जाएं'
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/student-dashboard')}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    {content?.[currentLanguage]?.backToDashboard}
                  </Button>
                </div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  {content?.[currentLanguage]?.title}
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  {content?.[currentLanguage]?.subtitle}
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">12</div>
                  <div className="text-sm text-muted-foreground">School Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">2</div>
                  <div className="text-sm text-muted-foreground">Active Competitions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Filters and Stats */}
            <div className="lg:col-span-4 space-y-6">
              <FilterControls
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={setSearchQuery}
                searchQuery={searchQuery}
                onJoinCompetition={handleJoinCompetition}
                activeCompetitions={activeCompetitions}
              />
              
              <SchoolStatsPanel schoolStats={schoolStats} />
            </div>

            {/* Right Column - Leaderboard and Top Achievers */}
            <div className="lg:col-span-8 space-y-6">
              {/* Desktop Leaderboard Table */}
              {!isMobile && (
                <LeaderboardTable
                  students={filteredStudents}
                  currentUser={currentUser}
                  onViewProfile={handleViewProfile}
                />
              )}

              {/* Mobile Leaderboard Cards */}
              {isMobile && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading font-semibold text-foreground">Rankings</h3>
                    <span className="text-sm text-muted-foreground">
                      {filteredStudents?.length} students
                    </span>
                  </div>
                  {filteredStudents?.map((student, index) => (
                    <MobileLeaderboardCard
                      key={student?.id}
                      student={student}
                      rank={index + 1}
                      currentUser={currentUser}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              )}

              {/* Top Achievers Spotlight */}
              <TopAchieversSpotlight
                topAchievers={topAchievers}
                onViewProfile={handleViewProfile}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-muted/30 border-t border-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-muted-foreground">
                  Rankings updated every hour • Last update: 2 hours ago
                </span>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Target"
                  iconPosition="left"
                  onClick={() => navigate('/challenge-tracker')}
                >
                  View Challenges
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => navigate('/interactive-lessons')}
                >
                  Start Learning
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchoolLeaderboard;