import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeaderboardTable = ({ students, currentUser, onViewProfile }) => {
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
    <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xl font-heading font-semibold text-foreground">School Rankings</h3>
        <p className="text-sm text-muted-foreground mt-1">Top performers in environmental activities</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rank</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Class</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Eco Points</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Badges</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Recent Activity</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, index) => (
              <tr 
                key={student?.id} 
                className={`border-b border-border hover:bg-muted/50 transition-smooth ${
                  student?.id === currentUser?.id ? 'bg-accent/10' : ''
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center">
                    {getRankIcon(index + 1)}
                    {student?.id === currentUser?.id && (
                      <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={student?.avatar}
                      alt={student?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-foreground">{student?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student?.streak} day streak
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-foreground">{student?.class}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Zap" size={16} color="var(--color-success)" />
                    <span className="font-mono font-bold text-lg text-foreground">
                      {student?.ecoPoints?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {student?.badges?.slice(0, 2)?.map((badge, badgeIndex) => (
                      <span
                        key={badgeIndex}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(badge)}`}
                      >
                        {badge}
                      </span>
                    ))}
                    {student?.badges?.length > 2 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        +{student?.badges?.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">
                    <div>{student?.recentActivity}</div>
                    <div className="text-xs mt-1">{student?.lastActive}</div>
                  </div>
                </td>
                <td className="p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(student?.id)}
                    iconName="User"
                    iconPosition="left"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;