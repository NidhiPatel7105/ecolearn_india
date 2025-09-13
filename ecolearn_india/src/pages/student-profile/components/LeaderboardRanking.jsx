import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeaderboardRanking = ({ userRanking, schoolRanking, regionalRanking }) => {
  const [selectedBoard, setSelectedBoard] = useState('school');

  const leaderboards = {
    school: {
      title: 'School Leaderboard',
      icon: 'School',
      data: schoolRanking,
      userRank: userRanking?.schoolRank
    },
    regional: {
      title: 'Regional Leaderboard',
      icon: 'MapPin',
      data: regionalRanking,
      userRank: userRanking?.regionalRank
    }
  };

  const currentBoard = leaderboards?.[selectedBoard];

  const getRankIcon = (rank) => {
    if (rank === 1) return { icon: 'Crown', color: 'text-yellow-500' };
    if (rank === 2) return { icon: 'Medal', color: 'text-gray-400' };
    if (rank === 3) return { icon: 'Award', color: 'text-amber-600' };
    return { icon: 'User', color: 'text-muted-foreground' };
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      const colors = ['bg-yellow-100 text-yellow-800', 'bg-gray-100 text-gray-800', 'bg-amber-100 text-amber-800'];
      return colors?.[rank - 1];
    }
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Rankings</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedBoard === 'school' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedBoard('school')}
            iconName="School"
            iconPosition="left"
          >
            School
          </Button>
          <Button
            variant={selectedBoard === 'regional' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedBoard('regional')}
            iconName="MapPin"
            iconPosition="left"
          >
            Regional
          </Button>
        </div>
      </div>
      {/* User's Current Rank */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadge(currentBoard?.userRank)}`}>
              <Icon name={getRankIcon(currentBoard?.userRank)?.icon} size={20} className={getRankIcon(currentBoard?.userRank)?.color} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Your Rank</p>
              <p className="text-xs text-muted-foreground">{currentBoard?.title}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-heading font-bold text-primary">#{currentBoard?.userRank}</p>
            <p className="text-xs text-muted-foreground">of {currentBoard?.data?.length + 50} students</p>
          </div>
        </div>
      </div>
      {/* Top Rankings */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground mb-3">Top Performers</h3>
        
        {currentBoard?.data?.slice(0, 10)?.map((student, index) => {
          const rank = index + 1;
          const rankInfo = getRankIcon(rank);
          const isCurrentUser = student?.id === userRanking?.userId;
          
          return (
            <div
              key={student?.id}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isCurrentUser 
                  ? 'bg-primary/10 border border-primary/30' :'hover:bg-muted/50'
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadge(rank)}`}>
                {rank <= 3 ? (
                  <Icon name={rankInfo?.icon} size={16} className={rankInfo?.color} />
                ) : (
                  rank
                )}
              </div>
              {/* Student Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={student?.avatar}
                  alt={`${student?.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Student Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium truncate ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                    {student?.name}
                    {isCurrentUser && <span className="text-xs ml-1">(You)</span>}
                  </p>
                  {student?.badges && student?.badges?.length > 0 && (
                    <div className="flex items-center gap-1">
                      {student?.badges?.slice(0, 2)?.map((badge, badgeIndex) => (
                        <div key={badgeIndex} className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                          <Icon name="Award" size={10} color="white" />
                        </div>
                      ))}
                      {student?.badges?.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{student?.badges?.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{student?.school || student?.location}</p>
              </div>
              {/* Points and Level */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1 text-success">
                  <Icon name="Zap" size={14} />
                  <span className="text-sm font-mono font-medium">{student?.points}</span>
                </div>
                <p className="text-xs text-muted-foreground">{student?.level}</p>
              </div>
              {/* Streak */}
              {student?.streak && student?.streak > 0 && (
                <div className="flex items-center gap-1 text-accent">
                  <Icon name="Flame" size={14} />
                  <span className="text-xs font-mono">{student?.streak}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* View Full Leaderboard */}
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/school-leaderboard'}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View Full {currentBoard?.title}
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardRanking;