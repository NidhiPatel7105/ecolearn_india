import React from 'react';
import Icon from '../../../components/AppIcon';

const EcoImpactTracker = ({ impactData }) => {
  const impactMetrics = [
    {
      icon: 'Droplets',
      label: 'Water Saved',
      value: impactData?.waterSaved,
      unit: 'Liters',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Through conservation practices'
    },
    {
      icon: 'Zap',
      label: 'Energy Saved',
      value: impactData?.energySaved,
      unit: 'kWh',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Electricity conservation'
    },
    {
      icon: 'Recycle',
      label: 'Waste Reduced',
      value: impactData?.wasteReduced,
      unit: 'kg',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Proper segregation & recycling'
    },
    {
      icon: 'TreePine',
      label: 'Trees Planted',
      value: impactData?.treesPlanted,
      unit: 'Trees',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Environmental restoration'
    },
    {
      icon: 'Wind',
      label: 'CO₂ Reduced',
      value: impactData?.carbonReduced,
      unit: 'kg CO₂',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Carbon footprint reduction'
    },
    {
      icon: 'Users',
      label: 'People Influenced',
      value: impactData?.peopleInfluenced,
      unit: 'People',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Community impact reach'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Environmental Impact</h2>
        <div className="flex items-center gap-2 text-sm text-success">
          <Icon name="TrendingUp" size={16} />
          <span>Growing Impact</span>
        </div>
      </div>
      {/* Impact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {impactMetrics?.map((metric, index) => (
          <div key={index} className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-caption">{metric?.label}</p>
                <p className="text-xs text-muted-foreground truncate">{metric?.description}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-heading font-bold text-foreground">
                  {formatNumber(metric?.value)}
                </span>
                <span className="text-sm text-muted-foreground">{metric?.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Monthly Progress */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">This Month's Progress</h3>
          <div className="flex items-center gap-1 text-success">
            <Icon name="TrendingUp" size={14} />
            <span className="text-xs">+{impactData?.monthlyGrowth}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Actions Completed</p>
            <p className="font-mono font-medium text-foreground">{impactData?.monthlyActions}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Impact Score</p>
            <p className="font-mono font-medium text-foreground">{impactData?.impactScore}/100</p>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${impactData?.impactScore}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Environmental Goals */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Target" size={16} className="text-primary" />
          <h3 className="text-sm font-medium text-foreground">Monthly Environmental Goals</h3>
        </div>
        
        <div className="space-y-3">
          {impactData?.goals?.map((goal, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-foreground">{goal?.title}</p>
                <div className="w-full bg-background rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(goal?.current / goal?.target) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-3">
                {goal?.current}/{goal?.target}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcoImpactTracker;