import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TopAchieversSpotlight = ({ topAchievers, onViewProfile }) => {
  const getAchievementIcon = (type) => {
    const icons = {
      'challenge': 'Target',
      'lesson': 'BookOpen',
      'community': 'Users',
      'environmental': 'Leaf'
    };
    return icons?.[type] || 'Star';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">Top Achievers</h3>
            <p className="text-sm text-muted-foreground mt-1">Outstanding environmental champions</p>
          </div>
          <Icon name="Trophy" size={24} color="var(--color-accent)" />
        </div>
      </div>
      <div className="p-6 space-y-6">
        {topAchievers?.map((achiever, index) => (
          <div key={achiever?.id} className="relative">
            {/* Rank Badge */}
            <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
              <span className="text-sm font-bold text-primary-foreground">#{index + 1}</span>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 hover-scale transition-smooth">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <Image
                    src={achiever?.avatar}
                    alt={achiever?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={14} color="white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">{achiever?.name}</h4>
                      <p className="text-sm text-muted-foreground">{achiever?.class} • {achiever?.school}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={16} color="var(--color-success)" />
                        <span className="font-mono font-bold text-foreground">
                          {achiever?.ecoPoints?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Flame" size={14} color="var(--color-accent)" />
                        <span className="text-sm text-muted-foreground">{achiever?.streak} days</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className="space-y-2 mb-3">
                    {achiever?.recentAchievements?.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-center space-x-2 text-sm">
                        <Icon 
                          name={getAchievementIcon(achievement?.type)} 
                          size={14} 
                          color="var(--color-primary)" 
                        />
                        <span className="text-foreground">{achievement?.title}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{achievement?.date}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contribution Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {achiever?.contributions?.map((contribution, contIndex) => (
                      <div key={contIndex} className="text-center bg-card rounded-md p-2">
                        <div className="text-lg font-bold text-primary">{contribution?.value}</div>
                        <div className="text-xs text-muted-foreground">{contribution?.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewProfile(achiever?.id)}
                      iconName="User"
                      iconPosition="left"
                      className="flex-1"
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Share"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" fullWidth>
          View All Top Performers
        </Button>
      </div>
    </div>
  );
};

export default TopAchieversSpotlight;