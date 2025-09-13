import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      icon: 'BookOpen',
      label: 'Lessons Completed',
      value: stats?.lessonsCompleted,
      total: stats?.totalLessons,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Target',
      label: 'Challenges Done',
      value: stats?.challengesCompleted,
      total: stats?.totalChallenges,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      icon: 'Award',
      label: 'Badges Earned',
      value: stats?.badgesEarned,
      total: stats?.totalBadges,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'Users',
      label: 'Community Rank',
      value: `#${stats?.communityRank}`,
      total: stats?.totalStudents,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card rounded-lg shadow-card p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-caption truncate">{item?.label}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-heading font-bold text-foreground">{item?.value}</span>
              {typeof item?.total === 'number' && (
                <span className="text-sm text-muted-foreground">/{item?.total}</span>
              )}
            </div>
            
            {typeof item?.total === 'number' && (
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${item?.color?.replace('text-', 'bg-')}`}
                  style={{ width: `${Math.min((item?.value / item?.total) * 100, 100)}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;