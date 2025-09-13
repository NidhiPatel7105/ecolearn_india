import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityHistory = ({ activities }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filters = [
    { id: 'all', label: 'All Activities', icon: 'Activity' },
    { id: 'lessons', label: 'Lessons', icon: 'BookOpen' },
    { id: 'challenges', label: 'Challenges', icon: 'Target' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === selectedFilter?.slice(0, -1));

  const displayedActivities = showAll ? filteredActivities : filteredActivities?.slice(0, 8);

  const getActivityIcon = (type) => {
    const iconMap = {
      'lesson': 'BookOpen',
      'challenge': 'Target',
      'achievement': 'Award',
      'quiz': 'HelpCircle',
      'badge': 'Medal',
      'streak': 'Flame'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'lesson': 'text-primary bg-primary/10',
      'challenge': 'text-secondary bg-secondary/10',
      'achievement': 'text-accent bg-accent/10',
      'quiz': 'text-success bg-success/10',
      'badge': 'text-warning bg-warning/10',
      'streak': 'text-error bg-error/10'
    };
    return colorMap?.[type] || 'text-muted-foreground bg-muted';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Activity History</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>{activities?.length} Activities</span>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters?.map((filter) => (
          <Button
            key={filter?.id}
            variant={selectedFilter === filter?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(filter?.id)}
            iconName={filter?.icon}
            iconPosition="left"
          >
            {filter?.label}
          </Button>
        ))}
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4">
        {displayedActivities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            {/* Activity Icon */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={20} />
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground mb-1">{activity?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
                  
                  {/* Activity Details */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{formatDate(activity?.date)}</span>
                    {activity?.points && (
                      <div className="flex items-center gap-1">
                        <Icon name="Zap" size={12} />
                        <span>+{activity?.points} points</span>
                      </div>
                    )}
                    {activity?.category && (
                      <span className="px-2 py-1 bg-muted rounded-full">{activity?.category}</span>
                    )}
                  </div>
                </div>

                {/* Activity Status */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {activity?.status === 'completed' && (
                    <div className="flex items-center gap-1 text-success">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-xs">Completed</span>
                    </div>
                  )}
                  {activity?.status === 'in-progress' && (
                    <div className="flex items-center gap-1 text-warning">
                      <Icon name="Clock" size={16} />
                      <span className="text-xs">In Progress</span>
                    </div>
                  )}
                  {activity?.score && (
                    <div className="text-xs font-mono text-foreground">
                      {activity?.score}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {filteredActivities?.length > 8 && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `Show ${filteredActivities?.length - 8} More Activities`}
          </Button>
        </div>
      )}
      {filteredActivities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No activities found</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;