import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MobileLeaderboardCard = ({ student, rank, currentUser, onViewProfile }) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Icon name="Crown" size={20} color="#FFD700" />;
      case 2:
        return <Icon name="Medal" size={20} color="#C0C0C0" />;
      case 3:
        return <Icon name="Award" size={20} color="#CD7F32" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'Green Warrior': 'bg-success text-success-foreground',
      'Eco Champion': 'bg-primary text-primary-foreground',
      'Water Saver': 'bg-blue-600 text-white',
      'Energy Expert': 'bg-yellow-600 text-white',
      'Waste Warrior': 'bg-orange-600 text-white',
      'Tree Planter': 'bg-green-600 text-white',
      'Climate Hero': 'bg-purple-600 text-white'
    };
    return colors?.[badge] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-card p-4 hover-scale transition-smooth ${
      student?.id === currentUser?.id ? 'ring-2 ring-accent' : ''
    }`}>
      {/* Header with Rank and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getRankIcon(rank)}
          {student?.id === currentUser?.id && (
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
              You
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(student?.id)}
          iconName="User"
          iconPosition="left"
        >
          View
        </Button>
      </div>
      {/* Student Info */}
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src={student?.avatar}
          alt={student?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-foreground">{student?.name}</h4>
          <p className="text-sm text-muted-foreground">{student?.class}</p>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Zap" size={16} color="var(--color-success)" />
            <span className="font-mono font-bold text-lg text-foreground">
              {student?.ecoPoints?.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">Eco Points</div>
        </div>
        
        <div className="text-center bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name="Flame" size={16} color="var(--color-accent)" />
            <span className="font-mono font-bold text-lg text-foreground">{student?.streak}</span>
          </div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>
      {/* Badges */}
      <div className="mb-4">
        <div className="text-sm font-medium text-foreground mb-2">Achievements</div>
        <div className="flex flex-wrap gap-1">
          {student?.badges?.slice(0, 3)?.map((badge, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(badge)}`}
            >
              {badge}
            </span>
          ))}
          {student?.badges?.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              +{student?.badges?.length - 3} more
            </span>
          )}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="border-t border-border pt-3">
        <div className="text-sm font-medium text-foreground mb-1">Recent Activity</div>
        <div className="text-sm text-muted-foreground">{student?.recentActivity}</div>
        <div className="text-xs text-muted-foreground mt-1">{student?.lastActive}</div>
      </div>
    </div>
  );
};

export default MobileLeaderboardCard;