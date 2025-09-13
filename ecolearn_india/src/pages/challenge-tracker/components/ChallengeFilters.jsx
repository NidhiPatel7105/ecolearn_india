import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ChallengeFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  searchQuery, 
  onClearFilters,
  challengeStats 
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'waste-management', label: 'Waste Management' },
    { value: 'water-conservation', label: 'Water Conservation' },
    { value: 'energy-efficiency', label: 'Energy Efficiency' },
    { value: 'biodiversity', label: 'Biodiversity' },
    { value: 'air-quality', label: 'Air Quality' },
    { value: 'sustainable-transport', label: 'Sustainable Transport' },
    { value: 'green-living', label: 'Green Living' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending-verification', label: 'Pending Review' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'points-high', label: 'Highest Points' },
    { value: 'points-low', label: 'Lowest Points' },
    { value: 'deadline', label: 'Deadline Soon' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  const hasActiveFilters = filters?.category !== 'all' || 
                          filters?.difficulty !== 'all' || 
                          filters?.status !== 'all' || 
                          searchQuery?.trim() !== '';

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search challenges by title, description, or category..."
          value={searchQuery}
          onChange={(e) => onSearch(e?.target?.value)}
          className="pl-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          label="Difficulty"
          options={difficultyOptions}
          value={filters?.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />
      </div>
      {/* Stats and Clear Filters */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{challengeStats?.total} total challenges</span>
          <span>{challengeStats?.available} available</span>
          <span>{challengeStats?.active} active</span>
          <span>{challengeStats?.completed} completed</span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Quick Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium text-muted-foreground">Quick Filters:</span>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onFilterChange('status', 'available')}
          className={filters?.status === 'available' ? 'bg-primary/10 text-primary' : ''}
        >
          Available Now
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onFilterChange('difficulty', 'Easy')}
          className={filters?.difficulty === 'Easy' ? 'bg-success/10 text-success' : ''}
        >
          Easy Challenges
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onFilterChange('sortBy', 'points-high')}
          className={filters?.sortBy === 'points-high' ? 'bg-accent/10 text-accent' : ''}
        >
          High Rewards
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onFilterChange('sortBy', 'deadline')}
          className={filters?.sortBy === 'deadline' ? 'bg-warning/10 text-warning' : ''}
        >
          Ending Soon
        </Button>
      </div>
    </div>
  );
};

export default ChallengeFilters;