import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onAccept, onViewDetails, userProgress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending-verification': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const isParticipating = userProgress?.status && userProgress?.status !== 'not-started';
  const isCompleted = userProgress?.status === 'completed';
  const isPendingVerification = userProgress?.status === 'pending-verification';

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover-scale transition-smooth overflow-hidden">
      {/* Challenge Image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={challenge?.image} 
          alt={challenge?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
            {challenge?.difficulty}
          </span>
          {challenge?.isNew && (
            <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
              New
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center text-primary">
            <Icon name="Zap" size={14} />
            <span className="text-sm font-mono font-medium ml-1">{challenge?.ecoPoints}</span>
          </div>
        </div>
        {isParticipating && (
          <div className="absolute bottom-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userProgress?.status)}`}>
              {userProgress?.status === 'in-progress' ? 'In Progress' : 
               userProgress?.status === 'pending-verification' ? 'Pending Review' : 
               userProgress?.status === 'completed' ? 'Completed' : userProgress?.status}
            </span>
          </div>
        )}
      </div>
      {/* Challenge Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              {challenge?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {challenge?.category} • {challenge?.duration}
            </p>
          </div>
        </div>

        <p className="text-sm text-foreground mb-4 line-clamp-2">
          {challenge?.description}
        </p>

        {/* Challenge Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icon name="Users" size={16} className="mr-1" />
            <span>{challenge?.participants} participants</span>
          </div>
          <div className="flex items-center">
            <Icon name="Calendar" size={16} className="mr-1" />
            <span>Due {challenge?.deadline}</span>
          </div>
        </div>

        {/* Progress Bar for Active Challenges */}
        {isParticipating && userProgress?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-mono text-foreground">{userProgress?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${userProgress?.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Expandable Details */}
        {isExpanded && (
          <div className="border-t border-border pt-4 mt-4 space-y-3">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Instructions:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {challenge?.instructions?.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Required Materials:</h4>
              <div className="flex flex-wrap gap-2">
                {challenge?.materials?.map((material, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {challenge?.safetyGuidelines && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Icon name="Shield" size={16} className="mr-1 text-warning" />
                  Safety Guidelines:
                </h4>
                <p className="text-sm text-muted-foreground">{challenge?.safetyGuidelines}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mt-4">
          {!isParticipating ? (
            <>
              <Button 
                variant="default" 
                onClick={() => onAccept(challenge?.id)}
                className="flex-1"
                iconName="Play"
                iconPosition="left"
              >
                Accept Challenge
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Show less" : "Show more"}
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant={isCompleted ? "success" : "default"}
                onClick={() => onViewDetails(challenge?.id)}
                className="flex-1"
                iconName={isCompleted ? "CheckCircle" : isPendingVerification ? "Clock" : "Eye"}
                iconPosition="left"
              >
                {isCompleted ? "View Results" : isPendingVerification ? "Pending Review" : "View Progress"}
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Show less" : "Show more"}
              >
                <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={18} />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;