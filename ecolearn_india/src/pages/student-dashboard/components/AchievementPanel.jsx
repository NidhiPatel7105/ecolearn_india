import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementPanel = ({ achievements, badges, leaderboardPosition }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Achievements & Badges */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Recent Achievements
          </h3>
          <Icon name="Trophy" size={24} className="text-accent" />
        </div>

        <div className="space-y-4 mb-4">
          {achievements?.slice(0, 3)?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-4 p-3 bg-muted rounded-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement?.type === 'badge' ? 'bg-accent/20' : 'bg-success/20'
              }`}>
                <Icon 
                  name={achievement?.icon} 
                  size={24} 
                  className={achievement?.type === 'badge' ? 'text-accent' : 'text-success'} 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{achievement?.title}</p>
                <p className="text-xs text-muted-foreground">{achievement?.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Earned {achievement?.earnedDate}
                </p>
              </div>
              {achievement?.isNew && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Latest Badges</h4>
          <div className="flex space-x-2">
            {badges?.slice(0, 4)?.map((badge) => (
              <div 
                key={badge?.id} 
                className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center shadow-card hover-scale cursor-pointer"
                title={badge?.name}
              >
                <Icon name={badge?.icon} size={20} color="white" />
              </div>
            ))}
            {badges?.length > 4 && (
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs font-medium">
                +{badges?.length - 4}
              </div>
            )}
          </div>
        </div>

        <Button 
          variant="ghost" 
          fullWidth 
          iconName="Award" 
          iconPosition="left"
          onClick={() => navigate('/student-profile')}
        >
          View All Achievements
        </Button>
      </div>
      {/* Leaderboard Position */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            School Ranking
          </h3>
          <Icon name="Users" size={24} className="text-secondary" />
        </div>

        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-heading font-bold text-white">
              #{leaderboardPosition?.currentRank}
            </span>
          </div>
          <p className="text-lg font-heading font-semibold text-foreground">
            {leaderboardPosition?.schoolName}
          </p>
          <p className="text-sm text-muted-foreground">
            Out of {leaderboardPosition?.totalStudents} students
          </p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">This Week</span>
            <div className="flex items-center space-x-2">
              <Icon 
                name={leaderboardPosition?.weeklyChange > 0 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                className={leaderboardPosition?.weeklyChange > 0 ? "text-success" : "text-error"} 
              />
              <span className={`text-sm font-medium ${
                leaderboardPosition?.weeklyChange > 0 ? "text-success" : "text-error"
              }`}>
                {leaderboardPosition?.weeklyChange > 0 ? '+' : ''}{leaderboardPosition?.weeklyChange}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Class Rank</span>
            <span className="text-sm font-medium text-foreground">
              #{leaderboardPosition?.classRank} of {leaderboardPosition?.classSize}
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          iconName="BarChart3" 
          iconPosition="right"
          onClick={() => navigate('/school-leaderboard')}
        >
          View Full Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default AchievementPanel;