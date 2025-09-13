import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalSetting = ({ goals, onUpdateGoal, onAddGoal }) => {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    category: 'learning',
    deadline: ''
  });

  const goalCategories = [
    { id: 'learning', label: 'Learning', icon: 'BookOpen', color: 'text-primary' },
    { id: 'challenges', label: 'Challenges', icon: 'Target', color: 'text-secondary' },
    { id: 'impact', label: 'Environmental Impact', icon: 'Leaf', color: 'text-success' },
    { id: 'community', label: 'Community', icon: 'Users', color: 'text-accent' }
  ];

  const handleAddGoal = () => {
    if (newGoal?.title && newGoal?.target) {
      onAddGoal({
        ...newGoal,
        id: Date.now(),
        current: 0,
        target: parseInt(newGoal?.target),
        createdDate: new Date()?.toISOString()
      });
      setNewGoal({ title: '', target: '', category: 'learning', deadline: '' });
      setIsAddingGoal(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getCategoryInfo = (categoryId) => {
    return goalCategories?.find(cat => cat?.id === categoryId) || goalCategories?.[0];
  };

  const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">Personal Goals</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingGoal(!isAddingGoal)}
          iconName={isAddingGoal ? "X" : "Plus"}
          iconPosition="left"
        >
          {isAddingGoal ? 'Cancel' : 'Add Goal'}
        </Button>
      </div>
      {/* Add New Goal Form */}
      {isAddingGoal && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-foreground mb-4">Create New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Goal Title"
              type="text"
              placeholder="e.g., Complete 10 lessons this month"
              value={newGoal?.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e?.target?.value })}
              required
            />
            <Input
              label="Target Number"
              type="number"
              placeholder="e.g., 10"
              value={newGoal?.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e?.target?.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {goalCategories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setNewGoal({ ...newGoal, category: category?.id })}
                    className={`flex items-center gap-2 p-2 rounded-md text-sm transition-colors ${
                      newGoal?.category === category?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-muted text-foreground'
                    }`}
                  >
                    <Icon name={category?.icon} size={16} />
                    {category?.label}
                  </button>
                ))}
              </div>
            </div>
            <Input
              label="Deadline (Optional)"
              type="date"
              value={newGoal?.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e?.target?.value })}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="default" onClick={handleAddGoal}>
              Create Goal
            </Button>
            <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Goals List */}
      <div className="space-y-4">
        {goals?.map((goal) => {
          const categoryInfo = getCategoryInfo(goal?.category);
          const progressPercentage = getProgressPercentage(goal?.current, goal?.target);
          const timeRemaining = getTimeRemaining(goal?.deadline);
          const isCompleted = goal?.current >= goal?.target;
          
          return (
            <div
              key={goal?.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted 
                  ? 'border-success bg-success/5' :'border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${categoryInfo?.color}`}>
                    <Icon name={categoryInfo?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium mb-1 ${isCompleted ? 'text-success' : 'text-foreground'}`}>
                      {goal?.title}
                      {isCompleted && (
                        <Icon name="CheckCircle" size={16} className="inline ml-2 text-success" />
                      )}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{categoryInfo?.label}</span>
                      {timeRemaining && (
                        <span className={timeRemaining === 'Overdue' ? 'text-error' : ''}>
                          {timeRemaining}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-mono font-medium text-foreground">
                    {goal?.current}/{goal?.target}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(progressPercentage)}% complete
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isCompleted ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              {/* Goal Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!isCompleted && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateGoal(goal?.id, { current: Math.min(goal?.current + 1, goal?.target) })}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Update Progress
                    </Button>
                  )}
                  {isCompleted && (
                    <div className="flex items-center gap-1 text-success text-sm">
                      <Icon name="Trophy" size={16} />
                      <span>Goal Achieved!</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateGoal(goal?.id, null)} // Delete goal
                  iconName="Trash2"
                  className="text-error hover:text-error"
                >
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {goals?.length === 0 && !isAddingGoal && (
        <div className="text-center py-8">
          <Icon name="Target" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">No goals set yet</p>
          <Button
            variant="outline"
            onClick={() => setIsAddingGoal(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Create Your First Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalSetting;