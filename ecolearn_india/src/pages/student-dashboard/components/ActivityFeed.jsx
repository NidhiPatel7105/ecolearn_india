import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedActivities = showAll ? activities : activities?.slice(0, 5);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'achievement': return 'Trophy';
      case 'challenge': return 'Target';
      case 'lesson': return 'BookOpen';
      case 'announcement': return 'Megaphone';
      case 'peer': return 'Users';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'achievement': return 'text-accent';
      case 'challenge': return 'text-secondary';
      case 'lesson': return 'text-primary';
      case 'announcement': return 'text-warning';
      case 'peer': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Activity Feed
        </h3>
        <Icon name="Activity" size={24} className="text-primary" />
      </div>
      <div className="space-y-4">
        {displayedActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 hover:bg-muted rounded-lg transition-smooth">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={18} 
                className={getActivityColor(activity?.type)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity?.title}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {activity?.description}
              </p>
              
              {activity?.actionRequired && (
                <div className="mt-2">
                  <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                    {activity?.actionText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {activities?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            fullWidth 
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `View All ${activities?.length} Activities`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;