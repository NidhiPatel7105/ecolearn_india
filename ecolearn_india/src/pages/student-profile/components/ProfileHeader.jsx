import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ userProfile, onEditProfile, onShareAchievement }) => {
  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Profile Image and Basic Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-muted">
              <Image
                src={userProfile?.avatar}
                alt={`${userProfile?.name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">{userProfile?.name}</h1>
            <p className="text-muted-foreground font-caption">{userProfile?.school}</p>
            <p className="text-sm text-muted-foreground">{userProfile?.class} • {userProfile?.location}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-success">
                <Icon name="Zap" size={16} />
                <span className="text-sm font-mono ml-1">{userProfile?.ecoPoints} Eco Points</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center text-accent">
                <Icon name="Flame" size={16} />
                <span className="text-sm font-mono ml-1">{userProfile?.streak} Day Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="flex-1 w-full lg:w-auto">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{userProfile?.currentLevel}</span>
              <span className="text-xs text-muted-foreground">
                {userProfile?.levelProgress}/{userProfile?.nextLevelTarget} XP
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage(userProfile?.levelProgress, userProfile?.nextLevelTarget)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {userProfile?.nextLevelTarget - userProfile?.levelProgress} XP to {userProfile?.nextLevel}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full lg:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditProfile}
            iconName="Settings"
            iconPosition="left"
            className="flex-1 lg:flex-none"
          >
            Edit Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onShareAchievement}
            iconName="Share2"
            iconPosition="left"
            className="flex-1 lg:flex-none"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;