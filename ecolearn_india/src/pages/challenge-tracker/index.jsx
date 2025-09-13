import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ChallengeCard from './components/ChallengeCard';
import ActiveChallengePanel from './components/ActiveChallengePanel';
import ProofSubmissionModal from './components/ProofSubmissionModal';
import ChallengeFilters from './components/ChallengeFilters';
import ChallengeDetailsModal from './components/ChallengeDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ChallengeTracker = () => {
  const [challenges, setChallenges] = useState([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    status: 'all',
    sortBy: 'newest'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for challenges
  const mockChallenges = [
    {
      id: 1,
      title: "Plant a Tree Challenge",
      description: "Plant and nurture a tree in your locality. Document the entire process from selecting the location to planting and initial care. This challenge helps combat deforestation and promotes green cover in urban areas.",
      category: "biodiversity",
      difficulty: "Easy",
      ecoPoints: 150,
      participants: 1247,
      deadline: "Dec 15, 2024",
      duration: "1 week",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
      isNew: true,
      instructions: [
        "Choose an appropriate location with adequate sunlight and space",
        "Select a native tree species suitable for your region",
        "Dig a hole twice the width of the root ball",
        "Plant the tree and water thoroughly",
        "Take photos at each step and document the location",
        "Create a care schedule for the first month"
      ],
      materials: ["Tree sapling", "Shovel", "Water", "Mulch", "Stakes (if needed)"],
      safetyGuidelines: "Ensure you have permission to plant in the chosen location. Wear gloves and appropriate clothing. Be careful when using tools.",
      leaderboard: [
        { id: 1, name: "Arjun Patel", school: "Green Valley School", points: 150, completedAt: "2 days ago" },
        { id: 2, name: "Priya Sharma", school: "Eco International", points: 145, completedAt: "3 days ago" },
        { id: 3, name: "Rahul Kumar", school: "Nature Academy", points: 140, completedAt: "5 days ago" }
      ]
    },
    {
      id: 2,
      title: "Waste Segregation Drive",
      description: "Organize a waste segregation awareness campaign in your neighborhood. Create educational materials and demonstrate proper waste separation techniques to promote sustainable waste management practices.",
      category: "waste-management",
      difficulty: "Medium",
      ecoPoints: 200,
      participants: 892,
      deadline: "Dec 20, 2024",
      duration: "3 days",
      image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg",
      isNew: false,
      instructions: [
        "Research local waste management guidelines",
        "Create educational posters about waste segregation",
        "Set up demonstration stations with different waste categories",
        "Engage with community members and explain the process",
        "Document participation and feedback",
        "Submit photos and a summary report"
      ],
      materials: ["Colored bins/containers", "Poster materials", "Markers", "Sample waste items", "Information pamphlets"],
      safetyGuidelines: "Handle waste materials with gloves. Ensure proper hygiene throughout the activity. Avoid handling hazardous waste.",
      leaderboard: [
        { id: 1, name: "Sneha Reddy", school: "Clean Earth School", points: 200, completedAt: "1 day ago" },
        { id: 2, name: "Vikram Singh", school: "Eco Warriors Academy", points: 195, completedAt: "4 days ago" }
      ]
    },
    {
      id: 3,
      title: "Energy Audit at Home",
      description: "Conduct a comprehensive energy audit of your home to identify areas for improvement. Calculate potential energy savings and implement at least three energy-efficient practices.",
      category: "energy-efficiency",
      difficulty: "Hard",
      ecoPoints: 300,
      participants: 456,
      deadline: "Dec 25, 2024",
      duration: "1 week",
      image: "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg",
      isNew: false,
      instructions: [
        "Create a checklist of all electrical appliances and lighting",
        "Record current energy consumption from electricity bills",
        "Identify energy wastage areas (lights left on, old appliances, etc.)",
        "Research energy-efficient alternatives",
        "Implement at least 3 energy-saving measures",
        "Calculate and document potential savings",
        "Create a presentation of your findings"
      ],
      materials: ["Notebook", "Calculator", "Camera", "Electricity bills", "Measuring tape"],
      safetyGuidelines: "Do not attempt to repair or modify electrical installations. Adult supervision required when checking electrical panels.",
      leaderboard: [
        { id: 1, name: "Aditya Gupta", school: "Tech Green School", points: 300, completedAt: "6 days ago" }
      ]
    },
    {
      id: 4,
      title: "Water Conservation Project",
      description: "Implement water-saving techniques at home and school. Monitor water usage, install water-saving devices, and educate others about water conservation importance.",
      category: "water-conservation",
      difficulty: "Medium",
      ecoPoints: 250,
      participants: 678,
      deadline: "Dec 18, 2024",
      duration: "5 days",
      image: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
      isNew: true,
      instructions: [
        "Audit current water usage in your home",
        "Install water-saving devices (aerators, low-flow showerheads)",
        "Fix any leaks or dripping taps",
        "Set up rainwater harvesting system (if possible)",
        "Create awareness materials about water conservation",
        "Track water savings over the project period"
      ],
      materials: ["Water meter readings", "Basic plumbing tools", "Water-saving devices", "Containers for rainwater"],
      safetyGuidelines: "Adult supervision required for plumbing work. Ensure water quality when collecting rainwater.",
      leaderboard: []
    },
    {
      id: 5,
      title: "Plastic-Free Week Challenge",
      description: "Live completely plastic-free for one week. Document alternatives used, challenges faced, and create a guide for others to follow a plastic-free lifestyle.",
      category: "green-living",
      difficulty: "Hard",
      ecoPoints: 350,
      participants: 234,
      deadline: "Dec 22, 2024",
      duration: "1 week",
      image: "https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg",
      isNew: false,
      instructions: [
        "Identify all plastic items currently used daily",
        "Research and procure plastic-free alternatives",
        "Document daily challenges and solutions",
        "Track plastic waste avoided",
        "Create a daily journal with photos",
        "Develop a guide for others to follow"
      ],
      materials: ["Reusable bags", "Glass containers", "Metal straws", "Bamboo products", "Journal"],
      safetyGuidelines: "Ensure food safety when using alternative storage methods. Maintain hygiene standards.",
      leaderboard: []
    },
    {
      id: 6,
      title: "Air Quality Monitoring",
      description: "Monitor and document air quality in different areas of your city. Create awareness about air pollution sources and suggest improvement measures.",
      category: "air-quality",
      difficulty: "Medium",
      ecoPoints: 220,
      participants: 345,
      deadline: "Dec 30, 2024",
      duration: "4 days",
      image: "https://images.pexels.com/photos/459728/pexels-photo-459728.jpeg",
      isNew: true,
      instructions: [
        "Use air quality monitoring apps or devices",
        "Visit different locations (residential, commercial, industrial)",
        "Record air quality index (AQI) readings",
        "Identify pollution sources in each area",
        "Document with photos and notes",
        "Create a report with improvement suggestions"
      ],
      materials: ["Smartphone with AQI app", "Notebook", "Camera", "Map of monitoring locations"],
      safetyGuidelines: "Avoid heavily polluted areas during peak hours. Wear masks in high pollution zones.",
      leaderboard: []
    }
  ];

  // Mock user progress data
  const mockUserProgress = {
    1: { status: 'in-progress', progress: 75, submittedAt: null },
    2: { status: 'completed', progress: 100, submittedAt: '2024-12-01', feedback: 'Excellent work on community engagement!' },
    3: { status: 'pending-verification', progress: 100, submittedAt: '2024-12-03' }
  };

  // Mock active challenges
  const mockActiveChallenges = [
    {
      id: 1,
      title: "Plant a Tree Challenge",
      category: "Biodiversity",
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg",
      status: 'in-progress',
      progress: 75,
      deadline: '2024-12-15'
    },
    {
      id: 3,
      title: "Energy Audit at Home",
      category: "Energy Efficiency",
      image: "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg",
      status: 'pending-verification',
      progress: 100,
      deadline: '2024-12-25'
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('ecolearn-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Simulate loading
    setTimeout(() => {
      setChallenges(mockChallenges);
      setUserProgress(mockUserProgress);
      setActiveChallenges(mockActiveChallenges);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      status: 'all',
      sortBy: 'newest'
    });
    setSearchQuery('');
  };

  const handleAcceptChallenge = (challengeId) => {
    setUserProgress(prev => ({
      ...prev,
      [challengeId]: { status: 'in-progress', progress: 0 }
    }));

    const challenge = challenges?.find(c => c?.id === challengeId);
    if (challenge) {
      setActiveChallenges(prev => [...prev, {
        id: challenge?.id,
        title: challenge?.title,
        category: challenge?.category,
        image: challenge?.image,
        status: 'in-progress',
        progress: 0,
        deadline: challenge?.deadline
      }]);
    }
  };

  const handleSubmitProof = (challengeId) => {
    const challenge = challenges?.find(c => c?.id === challengeId);
    setSelectedChallenge(challenge);
    setIsSubmissionModalOpen(true);
  };

  const handleViewDetails = (challengeId) => {
    const challenge = challenges?.find(c => c?.id === challengeId);
    setSelectedChallenge(challenge);
    setIsDetailsModalOpen(true);
  };

  const handleProofSubmission = (submissionData) => {
    const { challengeId } = submissionData;
    
    setUserProgress(prev => ({
      ...prev,
      [challengeId]: {
        ...prev?.[challengeId],
        status: 'pending-verification',
        progress: 100,
        submittedAt: new Date()?.toISOString(),
        submissions: [submissionData]
      }
    }));

    setActiveChallenges(prev => 
      prev?.map(challenge => 
        challenge?.id === challengeId 
          ? { ...challenge, status: 'pending-verification', progress: 100 }
          : challenge
      )
    );
  };

  // Filter and sort challenges
  const filteredChallenges = challenges?.filter(challenge => {
    const matchesSearch = challenge?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         challenge?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         challenge?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesCategory = filters?.category === 'all' || challenge?.category === filters?.category;
    const matchesDifficulty = filters?.difficulty === 'all' || challenge?.difficulty === filters?.difficulty;
    
    let matchesStatus = true;
    if (filters?.status !== 'all') {
      const progress = userProgress?.[challenge?.id];
      if (filters?.status === 'available') {
        matchesStatus = !progress || progress?.status === 'not-started';
      } else if (filters?.status === 'in-progress') {
        matchesStatus = progress?.status === 'in-progress';
      } else if (filters?.status === 'completed') {
        matchesStatus = progress?.status === 'completed';
      } else if (filters?.status === 'pending-verification') {
        matchesStatus = progress?.status === 'pending-verification';
      }
    }

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  })?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'oldest':
        return a?.id - b?.id;
      case 'points-high':
        return b?.ecoPoints - a?.ecoPoints;
      case 'points-low':
        return a?.ecoPoints - b?.ecoPoints;
      case 'deadline':
        return new Date(a.deadline) - new Date(b.deadline);
      case 'popularity':
        return b?.participants - a?.participants;
      default: // newest
        return b?.id - a?.id;
    }
  });

  const challengeStats = {
    total: challenges?.length,
    available: challenges?.filter(c => !userProgress?.[c?.id] || userProgress?.[c?.id]?.status === 'not-started')?.length,
    active: activeChallenges?.length,
    completed: Object.values(userProgress)?.filter(p => p?.status === 'completed')?.length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Target" size={32} className="text-primary" />
            </div>
            <p className="text-muted-foreground">Loading challenges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Challenge Tracker - EcoLearn India</title>
        <meta name="description" content="Participate in real-world environmental challenges, submit proof, and track your progress towards a sustainable future." />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Environmental Challenges
                </h1>
                <p className="text-muted-foreground">
                  Take action for the environment and earn eco-points by completing real-world challenges
                </p>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-primary">
                    {challengeStats?.active}
                  </div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-success">
                    {challengeStats?.completed}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-accent">
                    {Object.values(userProgress)?.reduce((sum, p) => sum + (p?.status === 'completed' ? 150 : 0), 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Points Earned</div>
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="md:hidden grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-card border border-border rounded-lg">
                <div className="text-xl font-mono font-bold text-primary">{challengeStats?.active}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
              <div className="text-center p-3 bg-card border border-border rounded-lg">
                <div className="text-xl font-mono font-bold text-success">{challengeStats?.completed}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 bg-card border border-border rounded-lg">
                <div className="text-xl font-mono font-bold text-accent">
                  {Object.values(userProgress)?.reduce((sum, p) => sum + (p?.status === 'completed' ? 150 : 0), 0)}
                </div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <ChallengeFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                searchQuery={searchQuery}
                onClearFilters={handleClearFilters}
                challengeStats={challengeStats}
              />

              {/* Challenge Grid */}
              {filteredChallenges?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredChallenges?.map((challenge) => (
                    <ChallengeCard
                      key={challenge?.id}
                      challenge={challenge}
                      userProgress={userProgress?.[challenge?.id]}
                      onAccept={handleAcceptChallenge}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={48} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                    No challenges found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <ActiveChallengePanel
                  activeChallenges={activeChallenges}
                  onSubmitProof={handleSubmitProof}
                  onViewDetails={handleViewDetails}
                />

                {/* Quick Actions */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => handleFilterChange('status', 'available')}
                    >
                      Browse Available
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Trophy"
                      iconPosition="left"
                      onClick={() => window.location.href = '/school-leaderboard'}
                    >
                      View Leaderboard
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="User"
                      iconPosition="left"
                      onClick={() => window.location.href = '/student-profile'}
                    >
                      My Profile
                    </Button>
                  </div>
                </div>

                {/* Environmental Tip */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Lightbulb" size={16} color="white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">
                        Daily Eco Tip
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Small actions make big differences! Even completing one challenge per week can significantly impact your environmental footprint.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <ProofSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        challenge={selectedChallenge}
        onSubmit={handleProofSubmission}
      />
      <ChallengeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        challenge={selectedChallenge}
        userProgress={selectedChallenge ? userProgress?.[selectedChallenge?.id] : null}
        onSubmitProof={handleSubmitProof}
        onAccept={handleAcceptChallenge}
      />
    </div>
  );
};

export default ChallengeTracker;