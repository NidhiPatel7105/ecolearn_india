import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSummaryCard = ({ userProgress }) => {
  const progressPercentage = (userProgress?.currentPoints / userProgress?.nextLevelPoints) * 100;
  
  return (
    <div className="bg-card rounded-xl shadow-card p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Welcome back, {userProgress?.name}!
          </h2>
          <p className="text-muted-foreground font-caption">
            Continue your environmental learning journey
          </p>
        </div>
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Leaf" size={32} color="white" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Eco Points */}
        <div className="text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" size={32} className="text-success" />
          </div>
          <div className="text-3xl font-heading font-bold text-foreground">
            {userProgress?.ecoPoints?.toLocaleString('en-IN')}
          </div>
          <p className="text-sm text-muted-foreground">Eco Points</p>
        </div>

        {/* Level Status */}
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Award" size={32} className="text-secondary" />
          </div>
          <div className="text-lg font-heading font-semibold text-foreground">
            {userProgress?.currentLevel}
          </div>
          <p className="text-sm text-muted-foreground">Current Level</p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {userProgress?.nextLevelPoints - userProgress?.currentPoints} points to next level
          </p>
        </div>

        {/* Weekly Streak */}
        <div className="text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Flame" size={32} className="text-accent" />
          </div>
          <div className="text-3xl font-heading font-bold text-foreground">
            {userProgress?.weeklyStreak}
          </div>
          <p className="text-sm text-muted-foreground">Day Streak</p>
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(7)]?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < userProgress?.weeklyStreak ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummaryCard;