import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import StatsOverview from './components/StatsOverview';
import BadgeCollection from './components/BadgeCollection';
import ActivityHistory from './components/ActivityHistory';
import EcoImpactTracker from './components/EcoImpactTracker';
import LeaderboardRanking from './components/LeaderboardRanking';
import GoalSetting from './components/GoalSetting';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('en');
  const [goals, setGoals] = useState([]);

  // Mock user profile data
  const userProfile = {
    id: 'student_001',
    name: "Priya Sharma",
    email: "priya.sharma@student.edu",
    school: "Delhi Public School, Vasant Kunj",
    class: "Class 10-B",
    location: "New Delhi, India",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    ecoPoints: 1250,
    currentLevel: "Green Champion",
    nextLevel: "Eco Warrior",
    levelProgress: 750,
    nextLevelTarget: 1000,
    streak: 7,
    joinDate: "2024-01-15",
    totalActivities: 89,
    completionRate: 87
  };

  // Mock statistics data
  const statsData = {
    lessonsCompleted: 24,
    totalLessons: 36,
    challengesCompleted: 15,
    totalChallenges: 20,
    badgesEarned: 8,
    totalBadges: 15,
    communityRank: 12,
    totalStudents: 450
  };

  // Mock badges data
  const badgesData = [
    {
      id: 1,
      name: "Eco Warrior",
      description: "Complete 20 environmental challenges",
      type: "eco-warrior",
      category: "challenges",
      earned: true,
      earnedDate: "2024-08-15",
      requirement: "20/20 challenges"
    },
    {
      id: 2,
      name: "Water Saver",
      description: "Save 1000 liters of water through conservation",
      type: "water-saver",
      category: "challenges",
      earned: true,
      earnedDate: "2024-08-20",
      requirement: "1000L saved"
    },
    {
      id: 3,
      name: "Knowledge Seeker",
      description: "Complete all lessons in 3 different topics",
      type: "knowledge-seeker",
      category: "learning",
      earned: true,
      earnedDate: "2024-08-25",
      requirement: "3/3 topics"
    },
    {
      id: 4,
      name: "Energy Master",
      description: "Reduce energy consumption by 500 kWh",
      type: "energy-master",
      category: "challenges",
      earned: false,
      requirement: "350/500 kWh saved",
      progress: { current: 350, target: 500 }
    },
    {
      id: 5,
      name: "Tree Planter",
      description: "Plant and care for 10 trees",
      type: "tree-planter",
      category: "challenges",
      earned: false,
      requirement: "7/10 trees planted",
      progress: { current: 7, target: 10 }
    },
    {
      id: 6,
      name: "Community Leader",
      description: "Influence 50 people to adopt eco-friendly practices",
      type: "community-leader",
      category: "community",
      earned: false,
      requirement: "32/50 people influenced",
      progress: { current: 32, target: 50 }
    }
  ];

  // Mock activity history
  const activitiesData = [
    {
      id: 1,
      type: "lesson",
      title: "Water Conservation Techniques",
      description: "Completed interactive lesson on rainwater harvesting",
      date: "2024-09-04",
      points: 50,
      category: "Water Management",
      status: "completed",
      score: 95
    },
    {
      id: 2,
      type: "challenge",
      title: "School Waste Audit",
      description: "Conducted comprehensive waste segregation audit",
      date: "2024-09-03",
      points: 100,
      category: "Waste Management",
      status: "completed",
      score: 88
    },
    {
      id: 3,
      type: "achievement",
      title: "Water Saver Badge Earned",
      description: "Achieved water conservation milestone",
      date: "2024-09-02",
      points: 75,
      category: "Achievement",
      status: "completed"
    },
    {
      id: 4,
      type: "quiz",
      title: "Climate Change Quiz",
      description: "Scored 90% on climate science assessment",
      date: "2024-09-01",
      points: 30,
      category: "Climate Science",
      status: "completed",
      score: 90
    },
    {
      id: 5,
      type: "challenge",
      title: "Energy Audit Challenge",
      description: "Home energy consumption tracking",
      date: "2024-08-31",
      points: 80,
      category: "Energy Conservation",
      status: "in-progress"
    }
  ];

  // Mock environmental impact data
  const impactData = {
    waterSaved: 1250,
    energySaved: 350,
    wasteReduced: 45,
    treesPlanted: 7,
    carbonReduced: 125,
    peopleInfluenced: 32,
    monthlyActions: 18,
    impactScore: 78,
    monthlyGrowth: 15,
    goals: [
      { title: "Water Conservation", current: 8, target: 10 },
      { title: "Energy Saving", current: 6, target: 8 },
      { title: "Waste Reduction", current: 12, target: 15 }
    ]
  };

  // Mock ranking data
  const userRanking = {
    userId: 'student_001',
    schoolRank: 12,
    regionalRank: 45
  };

  const schoolRanking = [
    {
      id: 'student_002',
      name: "Arjun Patel",
      school: "Delhi Public School, Vasant Kunj",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      points: 1850,
      level: "Eco Master",
      streak: 15,
      badges: ['eco-warrior', 'water-saver', 'energy-master']
    },
    {
      id: 'student_003',
      name: "Sneha Gupta",
      school: "Delhi Public School, Vasant Kunj",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      points: 1720,
      level: "Green Champion",
      streak: 12,
      badges: ['knowledge-seeker', 'community-leader']
    },
    {
      id: 'student_004',
      name: "Rahul Singh",
      school: "Delhi Public School, Vasant Kunj",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      points: 1680,
      level: "Green Champion",
      streak: 9,
      badges: ['tree-planter', 'waste-reducer']
    }
  ];

  const regionalRanking = [
    {
      id: 'student_005',
      name: "Kavya Reddy",
      location: "Hyderabad, Telangana",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      points: 2150,
      level: "Eco Master",
      streak: 22,
      badges: ['eco-warrior', 'energy-master', 'community-leader']
    },
    {
      id: 'student_006',
      name: "Aditya Kumar",
      location: "Mumbai, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      points: 1950,
      level: "Eco Master",
      streak: 18,
      badges: ['water-saver', 'tree-planter']
    }
  ];

  // Initialize goals
  useEffect(() => {
    const savedLanguage = localStorage.getItem('ecolearn-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Initialize with some default goals
    setGoals([
      {
        id: 1,
        title: "Complete 5 lessons this month",
        target: 5,
        current: 3,
        category: "learning",
        deadline: "2024-09-30",
        createdDate: "2024-09-01"
      },
      {
        id: 2,
        title: "Plant 3 trees in school",
        target: 3,
        current: 1,
        category: "impact",
        deadline: "2024-10-15",
        createdDate: "2024-08-15"
      }
    ]);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'badges', label: 'Badges', icon: 'Award' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'impact', label: 'Impact', icon: 'Leaf' },
    { id: 'rankings', label: 'Rankings', icon: 'Trophy' },
    { id: 'goals', label: 'Goals', icon: 'Target' }
  ];

  const handleEditProfile = () => {
    // Navigate to profile edit page or open modal
    console.log('Edit profile clicked');
  };

  const handleShareAchievement = () => {
    // Share achievement functionality
    if (navigator.share) {
      navigator.share({
        title: 'My EcoLearn Achievement',
        text: `I've earned ${userProfile?.ecoPoints} eco points and achieved ${userProfile?.currentLevel} level on EcoLearn India!`,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I've earned ${userProfile?.ecoPoints} eco points and achieved ${userProfile?.currentLevel} level on EcoLearn India! Check out my progress: ${window.location?.href}`;
      navigator.clipboard?.writeText(text);
      alert('Achievement details copied to clipboard!');
    }
  };

  const handleShareBadge = (badge) => {
    const text = `I just earned the "${badge?.name}" badge on EcoLearn India! ${badge?.description}`;
    if (navigator.share) {
      navigator.share({
        title: `${badge?.name} Badge Earned`,
        text: text,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(text);
      alert('Badge achievement copied to clipboard!');
    }
  };

  const handleUpdateGoal = (goalId, updates) => {
    if (updates === null) {
      // Delete goal
      setGoals(goals?.filter(goal => goal?.id !== goalId));
    } else {
      // Update goal
      setGoals(goals?.map(goal => 
        goal?.id === goalId ? { ...goal, ...updates } : goal
      ));
    }
  };

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsOverview stats={statsData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityHistory activities={activitiesData?.slice(0, 5)} />
              <EcoImpactTracker impactData={impactData} />
            </div>
          </div>
        );
      case 'badges':
        return <BadgeCollection badges={badgesData} onShareBadge={handleShareBadge} />;
      case 'activity':
        return <ActivityHistory activities={activitiesData} />;
      case 'impact':
        return <EcoImpactTracker impactData={impactData} />;
      case 'rankings':
        return (
          <LeaderboardRanking 
            userRanking={userRanking}
            schoolRanking={schoolRanking}
            regionalRanking={regionalRanking}
          />
        );
      case 'goals':
        return (
          <GoalSetting 
            goals={goals}
            onUpdateGoal={handleUpdateGoal}
            onAddGoal={handleAddGoal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Profile - EcoLearn India</title>
        <meta name="description" content="View your environmental learning progress, achievements, and impact tracking on EcoLearn India platform." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <ProfileHeader 
              userProfile={userProfile}
              onEditProfile={handleEditProfile}
              onShareAchievement={handleShareAchievement}
            />

            {/* Tab Navigation */}
            <div className="bg-card rounded-lg shadow-card mb-6">
              <div className="border-b border-border">
                <nav className="flex overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === tab?.id
                          ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      {tab?.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {renderTabContent()}
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
              <Button
                variant="default"
                size="icon"
                onClick={() => window.location.href = '/challenge-tracker'}
                className="w-12 h-12 rounded-full shadow-lg"
                title="Start New Challenge"
              >
                <Icon name="Plus" size={20} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => window.location.href = '/interactive-lessons'}
                className="w-12 h-12 rounded-full shadow-lg"
                title="Continue Learning"
              >
                <Icon name="BookOpen" size={20} />
              </Button>
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default StudentProfile;