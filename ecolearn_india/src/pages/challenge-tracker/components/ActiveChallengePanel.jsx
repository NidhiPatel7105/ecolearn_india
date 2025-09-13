import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveChallengePanel = ({ activeChallenges, onSubmitProof, onViewDetails }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-progress': return 'Clock';
      case 'pending-verification': return 'Eye';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress': return 'text-warning';
      case 'pending-verification': return 'text-secondary';
      case 'completed': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (activeChallenges?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Target" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-medium text-foreground mb-2">
          No Active Challenges
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Start participating in environmental challenges to track your progress here.
        </p>
        <Button variant="outline" size="sm">
          Browse Challenges
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Active Challenges
        </h2>
        <span className="text-sm text-muted-foreground">
          {activeChallenges?.length} active
        </span>
      </div>
      <div className="space-y-3">
        {activeChallenges?.map((challenge) => {
          const daysRemaining = getDaysRemaining(challenge?.deadline);
          const isUrgent = daysRemaining <= 2;
          
          return (
            <div key={challenge?.id} className="bg-card border border-border rounded-lg p-4 hover-scale transition-smooth">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={challenge?.image} 
                    alt={challenge?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {challenge?.title}
                    </h3>
                    <div className={`flex items-center ml-2 ${getStatusColor(challenge?.status)}`}>
                      <Icon name={getStatusIcon(challenge?.status)} size={16} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{challenge?.category}</span>
                    <span className={isUrgent ? 'text-error font-medium' : ''}>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Due today'}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-mono text-foreground">{challenge?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          challenge?.progress === 100 ? 'bg-success' : 'bg-primary'
                        }`}
                        style={{ width: `${challenge?.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {challenge?.status === 'in-progress' && challenge?.progress < 100 && (
                      <Button 
                        variant="outline" 
                        size="xs"
                        onClick={() => onSubmitProof(challenge?.id)}
                        iconName="Camera"
                        iconPosition="left"
                      >
                        Submit Proof
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="xs"
                      onClick={() => onViewDetails(challenge?.id)}
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
              {/* Urgent Deadline Warning */}
              {isUrgent && daysRemaining >= 0 && (
                <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded-md flex items-center">
                  <Icon name="AlertTriangle" size={16} className="text-error mr-2" />
                  <span className="text-xs text-error font-medium">
                    {daysRemaining === 0 ? 'Due today!' : `Only ${daysRemaining} day${daysRemaining === 1 ? '' : 's'} remaining!`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveChallengePanel;