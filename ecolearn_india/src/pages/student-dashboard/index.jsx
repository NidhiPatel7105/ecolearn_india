import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressSummaryCard from './components/ProgressSummaryCard';
import QuickAccessGrid from './components/QuickAccessGrid';
import AchievementPanel from './components/AchievementPanel';
import ActivityFeed from './components/ActivityFeed';

const StudentDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock user progress data
  const userProgress = {
    name: "Priya Sharma",
    ecoPoints: 1250,
    currentLevel: "Green Champion",
    currentPoints: 1250,
    nextLevelPoints: 2000,
    weeklyStreak: 5
  };

  // Mock lessons data
  const lessons = [
    {
      id: 1,
      title: "Water Conservation Basics",
      duration: 15,
      completed: true,
      isNew: false
    },
    {
      id: 2,
      title: "Waste Segregation Methods",
      duration: 20,
      completed: false,
      isNew: true
    },
    {
      id: 3,
      title: "Energy Efficiency at Home",
      duration: 18,
      completed: false,
      isNew: false
    },
    {
      id: 4,
      title: "Sustainable Transportation",
      duration: 12,
      completed: false,
      isNew: true
    }
  ];

  // Mock challenges data
  const challenges = [
    {
      id: 1,
      title: "Plant a Tree Challenge",
      difficulty: "Easy",
      points: 100,
      deadline: "5 days left"
    },
    {
      id: 2,
      title: "Zero Waste Week",
      difficulty: "Medium",
      points: 250,
      deadline: "2 weeks left"
    },
    {
      id: 3,
      title: "Energy Audit Report",
      difficulty: "Hard",
      points: 500,
      deadline: "1 week left"
    }
  ];

  // Mock submissions data
  const submissions = [
    {
      id: 1,
      challengeName: "Plastic Reduction Challenge",
      status: "Under Review",
      submittedDate: "2 days ago"
    },
    {
      id: 2,
      challengeName: "Community Clean-up",
      status: "Approved",
      submittedDate: "1 week ago"
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Water Warrior",
      description: "Completed 5 water conservation challenges",
      icon: "Droplets",
      type: "badge",
      earnedDate: "2 days ago",
      isNew: true
    },
    {
      id: 2,
      title: "Learning Streak",
      description: "Completed lessons for 7 consecutive days",
      icon: "Flame",
      type: "achievement",
      earnedDate: "1 week ago",
      isNew: false
    },
    {
      id: 3,
      title: "Eco Champion",
      description: "Reached 1000 eco-points milestone",
      icon: "Award",
      type: "badge",
      earnedDate: "2 weeks ago",
      isNew: false
    }
  ];

  // Mock badges data
  const badges = [
    { id: 1, name: "Water Warrior", icon: "Droplets" },
    { id: 2, name: "Waste Reducer", icon: "Trash2" },
    { id: 3, name: "Energy Saver", icon: "Zap" },
    { id: 4, name: "Tree Planter", icon: "TreePine" },
    { id: 5, name: "Eco Educator", icon: "GraduationCap" },
    { id: 6, name: "Green Leader", icon: "Crown" }
  ];

  // Mock leaderboard position data
  const leaderboardPosition = {
    currentRank: 15,
    schoolName: "Delhi Public School",
    totalStudents: 450,
    weeklyChange: 3,
    classRank: 3,
    classSize: 35
  };

  // Mock activity feed data
  const activities = [
    {
      id: 1,
      type: "achievement",
      title: "New Badge Earned!",
      description: "Congratulations! You\'ve earned the \'Water Warrior\' badge for completing water conservation challenges.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actionRequired: false
    },
    {
      id: 2,
      type: "peer",
      title: "Rahul Kumar completed a challenge",
      description: "Your classmate Rahul just completed the \'Plastic Reduction Challenge\' and earned 150 points!",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      actionRequired: false
    },
    {
      id: 3,
      type: "announcement",
      title: "New Challenge Available",
      description: "The \'School Garden Project\' challenge is now live! Participate with your class to earn bonus points.",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      actionRequired: true,
      actionText: "View Challenge"
    },
    {
      id: 4,
      type: "lesson",
      title: "New Lesson: Climate Change Impact",
      description: "Learn about the effects of climate change on Indian agriculture and biodiversity.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      actionRequired: true,
      actionText: "Start Learning"
    },
    {
      id: 5,
      type: "challenge",
      title: "Challenge Deadline Reminder",
      description: "The \'Energy Audit Report\' challenge deadline is approaching in 3 days. Don\'t forget to submit!",
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
      actionRequired: true,
      actionText: "Submit Now"
    },
    {
      id: 6,
      type: "peer",
      title: "Ananya Singh moved up in rankings",
      description: "Your friend Ananya is now ranked #8 in the school leaderboard. Can you catch up?",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      actionRequired: false
    },
    {
      id: 7,
      type: "announcement",
      title: "Teacher Feedback Available",
      description: "Ms. Sharma has provided feedback on your \'Community Clean-up\' submission. Check your profile for details.",
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      actionRequired: true,
      actionText: "View Feedback"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ecolearn-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Student Dashboard - EcoLearn India</title>
        <meta name="description" content="Track your environmental learning progress, complete challenges, and compete with peers on EcoLearn India platform." />
        <meta name="keywords" content="environmental education, student dashboard, eco challenges, sustainability learning, India" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Progress Summary */}
            <div className="mb-8">
              <ProgressSummaryCard userProgress={userProgress} />
            </div>

            {/* Quick Access Grid */}
            <div className="mb-8">
              <QuickAccessGrid 
                lessons={lessons}
                challenges={challenges}
                submissions={submissions}
              />
            </div>

            {/* Achievement Panel */}
            <div className="mb-8">
              <AchievementPanel 
                achievements={achievements}
                badges={badges}
                leaderboardPosition={leaderboardPosition}
              />
            </div>

            {/* Activity Feed */}
            <div className="mb-8">
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;