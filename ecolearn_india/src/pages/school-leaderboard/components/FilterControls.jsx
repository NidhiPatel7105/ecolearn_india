import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  searchQuery, 
  onJoinCompetition,
  activeCompetitions 
}) => {
  const timePeriodOptions = [
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'semester', label: 'This Semester' },
    { value: 'yearly', label: 'This Year' }
  ];

  const gradeOptions = [
    { value: 'all', label: 'All Grades' },
    { value: '6', label: 'Grade 6' },
    { value: '7', label: 'Grade 7' },
    { value: '8', label: 'Grade 8' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' }
  ];

  const activityOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'waste-management', label: 'Waste Management' },
    { value: 'water-conservation', label: 'Water Conservation' },
    { value: 'energy-efficiency', label: 'Energy Efficiency' },
    { value: 'tree-planting', label: 'Tree Planting' },
    { value: 'recycling', label: 'Recycling' },
    { value: 'awareness', label: 'Awareness Campaigns' }
  ];

  const viewOptions = [
    { value: 'individual', label: 'Individual Rankings' },
    { value: 'class', label: 'Class Rankings' },
    { value: 'school', label: 'School Wide' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">Filters & Controls</h3>
            <p className="text-sm text-muted-foreground mt-1">Customize your leaderboard view</p>
          </div>
          <Icon name="Filter" size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search students, classes, or achievements..."
            value={searchQuery}
            onChange={(e) => onSearch(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Time Period"
            options={timePeriodOptions}
            value={filters?.timePeriod}
            onChange={(value) => onFilterChange('timePeriod', value)}
          />

          <Select
            label="Grade Level"
            options={gradeOptions}
            value={filters?.grade}
            onChange={(value) => onFilterChange('grade', value)}
          />

          <Select
            label="Activity Type"
            options={activityOptions}
            value={filters?.activity}
            onChange={(value) => onFilterChange('activity', value)}
          />

          <Select
            label="View Type"
            options={viewOptions}
            value={filters?.view}
            onChange={(value) => onFilterChange('view', value)}
          />
        </div>

        {/* Active Competitions */}
        {activeCompetitions?.length > 0 && (
          <div>
            <h4 className="font-heading font-medium text-foreground mb-3">Active Competitions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCompetitions?.map((competition) => (
                <div key={competition?.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Trophy" size={16} color="var(--color-accent)" />
                      <h5 className="font-medium text-foreground">{competition?.name}</h5>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      competition?.status === 'active' ? 'bg-success text-success-foreground' :
                      competition?.status === 'ending-soon' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {competition?.status === 'active' ? 'Active' :
                       competition?.status === 'ending-soon' ? 'Ending Soon' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{competition?.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Participants:</span>
                    <span className="font-medium text-foreground">{competition?.participants}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Ends:</span>
                    <span className="font-medium text-foreground">{competition?.endDate}</span>
                  </div>

                  <Button
                    variant={competition?.joined ? "outline" : "default"}
                    size="sm"
                    fullWidth
                    onClick={() => onJoinCompetition(competition?.id)}
                    iconName={competition?.joined ? "Check" : "Plus"}
                    iconPosition="left"
                    disabled={competition?.joined}
                  >
                    {competition?.joined ? 'Joined' : 'Join Competition'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => onFilterChange('reset')}
          >
            Reset Filters
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export Rankings
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            iconPosition="left"
          >
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;