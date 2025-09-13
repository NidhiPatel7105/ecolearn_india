import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonHeader = ({ 
  currentLesson, 
  progress, 
  onBackToDashboard, 
  onToggleBookmark, 
  isBookmarked,
  language 
}) => {
  const content = {
    en: {
      backToDashboard: 'Back to Dashboard',
      bookmark: 'Bookmark Lesson',
      unbookmark: 'Remove Bookmark',
      progress: 'Progress',
      estimatedTime: 'Estimated Time',
      difficulty: 'Difficulty Level',
      minutes: 'minutes'
    },
    hi: {
      backToDashboard: 'डैशबोर्ड पर वापस जाएं',
      bookmark: 'पाठ को बुकमार्क करें',
      unbookmark: 'बुकमार्क हटाएं',
      progress: 'प्रगति',
      estimatedTime: 'अनुमानित समय',
      difficulty: 'कठिनाई स्तर',
      minutes: 'मिनट'
    }
  };

  const t = content?.[language] || content?.en;

  return (
    <div className="bg-card border-b border-border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          onClick={onBackToDashboard}
          iconName="ArrowLeft"
          iconPosition="left"
          className="text-muted-foreground hover:text-foreground"
        >
          {t?.backToDashboard}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleBookmark}
          className={isBookmarked ? 'text-accent' : 'text-muted-foreground'}
        >
          <Icon name={isBookmarked ? "BookmarkCheck" : "Bookmark"} size={20} />
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={currentLesson?.icon} size={18} color="white" />
            </div>
            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {currentLesson?.category}
            </span>
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
            {currentLesson?.title}
          </h1>
          
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl">
            {currentLesson?.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-2 lg:text-right">
          <div className="flex items-center lg:justify-end gap-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {t?.estimatedTime}: {currentLesson?.estimatedTime} {t?.minutes}
            </span>
          </div>
          
          <div className="flex items-center lg:justify-end gap-2">
            <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {t?.difficulty}: {currentLesson?.difficulty}
            </span>
          </div>
          
          <div className="flex items-center lg:justify-end gap-2">
            <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {t?.progress}: {progress}%
            </span>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;