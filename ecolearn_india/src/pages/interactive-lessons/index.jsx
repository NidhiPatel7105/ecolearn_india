import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LessonHeader from './components/LessonHeader';
import LessonNavigation from './components/LessonNavigation';
import LessonContent from './components/LessonContent';
import QuizModal from './components/QuizModal';
import ContentAttribution from './components/ContentAttribution';
import InteractionModal from './components/InteractionModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InteractiveLessons = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = useState('en');
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [bookmarkedLessons, setBookmarkedLessons] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [currentInteraction, setCurrentInteraction] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [lessonProgress, setLessonProgress] = useState({});

  // Mock lessons data
  const lessons = [
    {
      id: 1,
      title: "Water Conservation Fundamentals",
      description: "Learn the basics of water conservation and its importance for sustainable living in India.",
      category: "Water Management",
      icon: "Droplets",
      estimatedTime: 15,
      difficulty: "Beginner",
      ecoPoints: 50,
      sections: [
        {
          id: 1,
          title: "Understanding Water Scarcity in India",
          sectionNumber: 1,
          totalSections: 4,
          content: [
            {
              type: "text",
              content: `India faces severe water challenges with over 600 million people experiencing high to extreme water stress. The country has 18% of the world's population but only 4% of its water resources.\n\nWater scarcity affects both urban and rural areas, with cities like Chennai, Bengaluru, and Delhi experiencing acute shortages during summer months.`
            },
            {
              type: "image",
              src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop",
              alt: "Water scarcity in Indian village",
              caption: "Rural communities often face the greatest water challenges"
            },
            {
              type: "callout",
              calloutType: "did-you-know",
              content: "India uses 230 billion cubic meters of groundwater annually - more than the USA and China combined!"
            },
            {
              type: "interactive",
              interactionType: "clickable-diagram",
              image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
              alt: "Water cycle diagram",
              hotspots: [
                {
                  label: "Evaporation",
                  description: "Water from oceans, rivers, and lakes evaporates into the atmosphere",
                  facts: [
                    "About 86% of global evaporation occurs from ocean surfaces",
                    "Plants contribute through transpiration process",
                    "Higher temperatures increase evaporation rates"
                  ]
                },
                {
                  label: "Condensation",
                  description: "Water vapor cools and forms clouds in the atmosphere",
                  facts: [
                    "Occurs when air temperature drops below dew point",
                    "Tiny particles act as condensation nuclei",
                    "Forms different types of clouds at various altitudes"
                  ]
                },
                {
                  label: "Precipitation",
                  description: "Water falls back to earth as rain, snow, or hail",
                  facts: [
                    "India receives 75% of rainfall during monsoon season",
                    "Uneven distribution causes regional water stress",
                    "Climate change affects precipitation patterns"
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: "Simple Water Saving Techniques",
          sectionNumber: 2,
          totalSections: 4,
          content: [
            {
              type: "text",
              content: `Small changes in daily habits can lead to significant water savings. Every drop counts when millions of people practice conservation together.\n\nHousehold water conservation is the most accessible way for individuals to make a positive impact on water resources.`
            },
            {
              type: "list",
              title: "Easy Water Saving Tips for Home",
              items: [
                "Fix leaky taps immediately - a single drip can waste 15 liters per day",
                "Take shorter showers - reduce by 2 minutes to save 40 liters",
                "Use a bucket instead of running tap while brushing teeth",
                "Install low-flow showerheads and faucet aerators",
                "Collect rainwater for gardening and cleaning purposes",
                "Reuse water from washing vegetables for watering plants"
              ]
            },
            {
              type: "interactive",
              interactionType: "expandable-content",
              title: "Rainwater Harvesting at Home",
              preview: "Learn how to set up a simple rainwater collection system for your home...",
              fullContent: `Rainwater harvesting is an excellent way to reduce dependence on municipal water supply and groundwater.\n\nBasic Setup:\n1. Install gutters along roof edges to collect rainwater\n2. Connect downspouts to direct water flow\n3. Place collection barrels or tanks at downspout outlets\n4. Add mesh screens to filter debris\n5. Include overflow pipes for excess water\n\nBenefits:\n- Reduces water bills significantly\n- Provides backup water source during shortages\n- Reduces strain on municipal water systems\n- Helps prevent urban flooding by reducing runoff`,
              relatedImages: [
                {
                  src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                  alt: "Rainwater harvesting system",
                  caption: "Simple rooftop rainwater collection system"
                },
                {
                  src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
                  alt: "Water storage tanks",
                  caption: "Storage tanks for collected rainwater"
                }
              ],
              actionItems: [
                "Calculate your roof\'s water collection potential",
                "Research local regulations for rainwater harvesting",
                "Start with a simple barrel system before upgrading",
                "Regular maintenance to keep system clean and functional"
              ]
            },
            {
              type: "callout",
              calloutType: "quick-tip",
              content: "A 1000 sq ft roof can collect about 600 liters of water from just 1mm of rainfall!"
            }
          ]
        },
        {
          id: 3,
          title: "Water Quality and Treatment",
          sectionNumber: 3,
          totalSections: 4,
          content: [
            {
              type: "text",
              content: `Clean water is essential for health, but many water sources in India are contaminated with pollutants, bacteria, and chemicals.\n\nUnderstanding water quality and simple treatment methods can protect your family's health while conserving this precious resource.`
            },
            {
              type: "interactive",
              interactionType: "video",
              title: "Water Purification Methods",
              description: "Learn about different water treatment techniques suitable for Indian households",
              transcript: "This video demonstrates various water purification methods including boiling, filtration, UV treatment, and chemical disinfection. Each method has its advantages and is suitable for different situations and water quality conditions."
            },
            {
              type: "callout",
              calloutType: "key-takeaway",
              content: "Boiling water for 1 minute kills most harmful bacteria and viruses, making it safe for drinking."
            }
          ]
        },
        {
          id: 4,
          title: "Community Water Conservation",
          sectionNumber: 4,
          totalSections: 4,
          content: [
            {
              type: "text",
              content: `Individual efforts multiply when communities work together for water conservation. Schools, neighborhoods, and local organizations can implement larger-scale conservation projects.\n\nCommunity involvement creates lasting change and builds awareness about water issues.`
            },
            {
              type: "image",
              src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
              alt: "Community water conservation project",
              caption: "Students participating in a community water conservation initiative"
            },
            {
              type: "list",
              title: "Community Conservation Projects",
              items: [
                "Organize neighborhood water audit programs",
                "Create community gardens with water-efficient irrigation",
                "Establish local rainwater harvesting cooperatives",
                "Conduct awareness campaigns in schools and colleges",
                "Partner with local government for infrastructure improvements",
                "Start water conservation clubs in educational institutions"
              ]
            }
          ]
        }
      ],
      quiz: {
        questions: [
          {
            question: "What percentage of the world's water resources does India have?",
            options: ["2%", "4%", "6%", "8%"],
            correctAnswer: 1,
            explanation: "India has only 4% of the world's water resources despite having 18% of the global population, highlighting the severity of water scarcity."
          },
          {
            question: "How much water can a single dripping tap waste per day?",
            options: ["5 liters", "10 liters", "15 liters", "20 liters"],
            correctAnswer: 2,
            explanation: "A single dripping tap can waste up to 15 liters of water per day, which adds up to over 5,000 liters annually."
          },
          {
            question: "What is the most effective way to kill bacteria in water?",
            options: ["Filtering", "Boiling for 1 minute", "Adding salt", "Letting it settle"],
            correctAnswer: 1,
            explanation: "Boiling water for at least 1 minute kills most harmful bacteria, viruses, and parasites, making it safe for drinking."
          },
          {
            question: "How much water can a 1000 sq ft roof collect from 1mm of rainfall?",
            options: ["400 liters", "600 liters", "800 liters", "1000 liters"],
            correctAnswer: 1,
            explanation: "A 1000 sq ft roof can collect approximately 600 liters of water from just 1mm of rainfall, demonstrating the potential of rainwater harvesting."
          },
          {
            question: "Which season provides 75% of India\'s annual rainfall?",
            options: ["Summer", "Winter", "Monsoon", "Post-monsoon"],
            correctAnswer: 2,
            explanation: "The monsoon season provides about 75% of India's annual rainfall, making it crucial for water resource management."
          }
        ]
      },
      sources: [
        {
          organization: "NCERT",
          type: "Educational Content",
          title: "Environmental Studies - Water Resources",
          url: "https://ncert.nic.in"
        },
        {
          organization: "BEE",
          type: "Conservation Guidelines",
          title: "Water Conservation Best Practices",
          url: "https://beeindia.gov.in"
        },
        {
          organization: "WASH",
          type: "Health Guidelines",
          title: "Water, Sanitation and Hygiene",
          url: "https://wash.gov.in"
        }
      ]
    },
    {
      id: 2,
      title: "Waste Management Basics",
      description: "Understanding waste segregation, recycling, and sustainable disposal methods.",
      category: "Waste Management",
      icon: "Recycle",
      estimatedTime: 20,
      difficulty: "Beginner",
      ecoPoints: 60,
      sections: [
        {
          id: 1,
          title: "Types of Waste",
          sectionNumber: 1,
          totalSections: 3,
          content: [
            {
              type: "text",
              content: `Proper waste management starts with understanding different types of waste and their environmental impact.\n\nIndia generates over 62 million tonnes of waste annually, with only 75-80% being collected and even less being processed scientifically.`
            }
          ]
        }
      ],
      quiz: {
        questions: [
          {
            question: "What are the three main categories of waste?",
            options: ["Wet, Dry, Hazardous", "Big, Small, Medium", "Clean, Dirty, Mixed", "New, Old, Broken"],
            correctAnswer: 0,
            explanation: "Waste is primarily categorized into Wet (biodegradable), Dry (recyclable), and Hazardous (toxic) waste for proper management."
          }
        ]
      },
      sources: [
        {
          organization: "SBM",
          type: "Government Initiative",
          title: "Swachh Bharat Mission Guidelines",
          url: "https://swachhbharatmission.gov.in"
        }
      ]
    }
  ];

  // Content sources for attribution
  const contentSources = [
    {
      organization: "DIKSHA",
      type: "Digital Platform",
      title: "National Digital Infrastructure for Teachers",
      url: "https://diksha.gov.in"
    },
    {
      organization: "NCERT",
      type: "Educational Content",
      title: "National Council of Educational Research and Training",
      url: "https://ncert.nic.in"
    },
    {
      organization: "SBM",
      type: "Government Initiative",
      title: "Swachh Bharat Mission",
      url: "https://swachhbharatmission.gov.in"
    },
    {
      organization: "BEE",
      type: "Energy Efficiency",
      title: "Bureau of Energy Efficiency",
      url: "https://beeindia.gov.in"
    },
    {
      organization: "WASH",
      type: "Health Initiative",
      title: "Water, Sanitation and Hygiene",
      url: "https://wash.gov.in"
    },
    {
      organization: "WWF",
      type: "Conservation NGO",
      title: "World Wildlife Fund India",
      url: "https://www.wwfindia.org"
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ecolearn-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Get lesson ID from URL params
    const lessonId = searchParams?.get('lesson');
    if (lessonId) {
      setCurrentLessonId(parseInt(lessonId));
    }

    // Load saved progress
    const savedProgress = localStorage.getItem('lesson-progress');
    if (savedProgress) {
      setLessonProgress(JSON.parse(savedProgress));
    }

    const savedCompleted = localStorage.getItem('completed-lessons');
    if (savedCompleted) {
      setCompletedLessons(JSON.parse(savedCompleted));
    }

    const savedBookmarks = localStorage.getItem('bookmarked-lessons');
    if (savedBookmarks) {
      setBookmarkedLessons(JSON.parse(savedBookmarks));
    }
  }, [searchParams]);

  const currentLesson = lessons?.find(lesson => lesson?.id === currentLessonId);
  const currentSection = currentLesson?.sections?.[currentSectionIndex];
  const progress = Math.round(((currentSectionIndex + 1) / currentLesson?.sections?.length) * 100);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const handleLessonSelect = (lessonId) => {
    setCurrentLessonId(lessonId);
    setCurrentSectionIndex(0);
    setShowMobileNav(false);
    navigate(`/interactive-lessons?lesson=${lessonId}`);
  };

  const handleNextSection = () => {
    if (currentSectionIndex < currentLesson?.sections?.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleToggleBookmark = () => {
    const isBookmarked = bookmarkedLessons?.includes(currentLessonId);
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = bookmarkedLessons?.filter(id => id !== currentLessonId);
    } else {
      newBookmarks = [...bookmarkedLessons, currentLessonId];
    }
    
    setBookmarkedLessons(newBookmarks);
    localStorage.setItem('bookmarked-lessons', JSON.stringify(newBookmarks));
  };

  const handleInteraction = (type, data) => {
    setCurrentInteraction({ type, data });
    setShowInteractionModal(true);
  };

  const handleQuizComplete = (results) => {
    setShowQuiz(false);
    
    // Mark lesson as completed
    if (!completedLessons?.includes(currentLessonId)) {
      const newCompleted = [...completedLessons, currentLessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem('completed-lessons', JSON.stringify(newCompleted));
    }

    // Save progress
    const newProgress = {
      ...lessonProgress,
      [currentLessonId]: {
        completed: true,
        score: results?.score,
        completedAt: new Date()?.toISOString()
      }
    };
    setLessonProgress(newProgress);
    localStorage.setItem('lesson-progress', JSON.stringify(newProgress));

    // Navigate to next lesson or dashboard
    const nextLesson = lessons?.find(lesson => lesson?.id === currentLessonId + 1);
    if (nextLesson) {
      handleLessonSelect(nextLesson?.id);
    } else {
      navigate('/student-dashboard');
    }
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
              Lesson Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The requested lesson could not be found.
            </p>
            <Button onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 flex h-screen">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block w-80 border-r border-border bg-card">
          <LessonNavigation
            lessons={lessons}
            currentLessonId={currentLessonId}
            onLessonSelect={handleLessonSelect}
            completedLessons={completedLessons}
            language={language}
          />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden fixed bottom-4 left-4 z-40">
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowMobileNav(true)}
            className="shadow-modal"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>

        {/* Mobile Navigation Overlay */}
        {showMobileNav && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
            <div className="w-80 h-full bg-card">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-heading font-semibold text-foreground">Lessons</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMobileNav(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <LessonNavigation
                lessons={lessons}
                currentLessonId={currentLessonId}
                onLessonSelect={handleLessonSelect}
                completedLessons={completedLessons}
                language={language}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Lesson Header */}
          <LessonHeader
            currentLesson={currentLesson}
            progress={progress}
            onBackToDashboard={handleBackToDashboard}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={bookmarkedLessons?.includes(currentLessonId)}
            language={language}
          />

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto">
            <LessonContent
              currentSection={currentSection}
              onNextSection={handleNextSection}
              onPrevSection={handlePrevSection}
              canGoNext={true}
              canGoPrev={currentSectionIndex > 0}
              onInteraction={handleInteraction}
              language={language}
            />

            {/* Content Attribution */}
            <ContentAttribution
              sources={currentLesson?.sources}
              language={language}
            />
          </div>
        </div>
      </div>
      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
        quiz={currentLesson?.quiz}
        onComplete={handleQuizComplete}
        language={language}
      />
      {/* Interaction Modal */}
      <InteractionModal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        interaction={currentInteraction}
        language={language}
      />
    </div>
  );
};

export default InteractiveLessons;