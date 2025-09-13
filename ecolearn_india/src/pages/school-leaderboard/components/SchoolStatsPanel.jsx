import React from 'react';
import Icon from '../../../components/AppIcon';

const SchoolStatsPanel = ({ schoolStats }) => {
  const getStatIcon = (type) => {
    const icons = {
      'trees': 'TreePine',
      'waste': 'Trash2',
      'energy': 'Zap',
      'water': 'Droplets',
      'students': 'Users',
      'challenges': 'Target'
    };
    return icons?.[type] || 'BarChart3';
  };

  const getStatColor = (type) => {
    const colors = {
      'trees': 'text-green-600',
      'waste': 'text-orange-600',
      'energy': 'text-yellow-600',
      'water': 'text-blue-600',
      'students': 'text-purple-600',
      'challenges': 'text-red-600'
    };
    return colors?.[type] || 'text-primary';
  };

  const formatValue = (value, unit) => {
    if (value >= 1000000) {
      return `${(value / 1000000)?.toFixed(1)}M ${unit}`;
    } else if (value >= 1000) {
      return `${(value / 1000)?.toFixed(1)}K ${unit}`;
    }
    return `${value?.toLocaleString('en-IN')} ${unit}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">School Impact</h3>
            <p className="text-sm text-muted-foreground mt-1">Collective environmental achievements</p>
          </div>
          <Icon name="TrendingUp" size={24} color="var(--color-success)" />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schoolStats?.map((stat, index) => (
            <div key={index} className="relative">
              <div className="bg-muted/30 rounded-lg p-4 hover-scale transition-smooth">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-card flex items-center justify-center ${getStatColor(stat?.type)}`}>
                    <Icon name={getStatIcon(stat?.type)} size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      {formatValue(stat?.value, stat?.unit)}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat?.label}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{stat?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        stat?.type === 'trees' ? 'bg-green-600' :
                        stat?.type === 'waste' ? 'bg-orange-600' :
                        stat?.type === 'energy' ? 'bg-yellow-600' :
                        stat?.type === 'water' ? 'bg-blue-600' :
                        stat?.type === 'students'? 'bg-purple-600' : 'bg-primary'
                      }`}
                      style={{ width: `${stat?.progress}%` }}
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">This Month:</span>
                    <span className="text-foreground font-medium">
                      +{stat?.monthlyIncrease?.toLocaleString('en-IN')} {stat?.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target:</span>
                    <span className="text-foreground font-medium">
                      {stat?.target?.toLocaleString('en-IN')} {stat?.unit}
                    </span>
                  </div>
                </div>

                {/* Achievement Badge */}
                {stat?.achievement && (
                  <div className="mt-3 flex items-center space-x-2 p-2 bg-success/10 rounded-md">
                    <Icon name="Award" size={16} color="var(--color-success)" />
                    <span className="text-sm text-success font-medium">{stat?.achievement}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overall School Ranking */}
        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="School" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground">School Ranking</h4>
                <p className="text-sm text-muted-foreground">Among all participating schools</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">#12</div>
              <div className="text-sm text-muted-foreground">out of 156 schools</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStatsPanel;