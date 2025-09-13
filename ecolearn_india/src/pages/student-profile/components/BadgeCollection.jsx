import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const BadgeCollection = ({ badges, onShareBadge }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Badges', icon: 'Award' },
    { id: 'learning', label: 'Learning', icon: 'BookOpen' },
    { id: 'challenges', label: 'Challenges', icon: 'Target' },
    { id: 'community', label: 'Community', icon: 'Users' },
    { id: 'special', label: 'Special', icon: 'Star' }
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges?.filter(badge => badge?.category === selectedCategory);

  const getBadgeIcon = (type) => {
    const iconMap = {
      'eco-warrior': 'Shield',
      'water-saver': 'Droplets',
      'energy-master': 'Zap',
      'waste-reducer': 'Recycle',
      'tree-planter': 'TreePine',
      'knowledge-seeker': 'Brain',
      'challenge-champion': 'Trophy',
      'community-leader': 'Crown',
      'streak-master': 'Flame',
      'green-innovator': 'Lightbulb'
    };
    return iconMap?.[type] || 'Award';
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Badge Collection</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} />
          <span>{badges?.filter(b => b?.earned)?.length}/{badges?.length} Earned</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
          >
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBadges?.map((badge) => (
          <div
            key={badge?.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover-scale cursor-pointer ${
              badge?.earned
                ? 'border-success bg-success/5 hover:border-success/80' :'border-muted bg-muted/30 hover:border-muted-foreground/30'
            }`}
            onClick={() => badge?.earned && onShareBadge(badge)}
          >
            {/* Badge Icon */}
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
              badge?.earned 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={getBadgeIcon(badge?.type)} size={24} />
            </div>

            {/* Badge Info */}
            <div className="text-center">
              <h3 className={`text-sm font-medium mb-1 ${
                badge?.earned ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {badge?.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {badge?.description}
              </p>
              
              {badge?.earned ? (
                <div className="flex items-center justify-center gap-1 text-xs text-success">
                  <Icon name="CheckCircle" size={12} />
                  <span>Earned</span>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">
                  {badge?.requirement}
                </div>
              )}
            </div>

            {/* Earned Date */}
            {badge?.earned && badge?.earnedDate && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            )}

            {/* Progress for Unlockable Badges */}
            {!badge?.earned && badge?.progress && (
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(badge?.progress?.current / badge?.progress?.target) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {badge?.progress?.current}/{badge?.progress?.target}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredBadges?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No badges found in this category</p>
        </div>
      )}
    </div>
  );
};

export default BadgeCollection;