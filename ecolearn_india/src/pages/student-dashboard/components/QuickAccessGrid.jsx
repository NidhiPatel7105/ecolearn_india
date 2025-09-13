import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessGrid = ({ lessons, challenges, submissions }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Available Lessons */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Available Lessons
          </h3>
          <Icon name="BookOpen" size={24} className="text-primary" />
        </div>
        
        <div className="space-y-3 mb-4">
          {lessons?.slice(0, 3)?.map((lesson) => (
            <div key={lesson?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  lesson?.completed ? 'bg-success' : 'bg-warning'
                }`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{lesson?.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson?.duration} min</p>
                </div>
              </div>
              {lesson?.isNew && (
                <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          iconName="ArrowRight" 
          iconPosition="right"
          onClick={() => navigate('/interactive-lessons')}
        >
          Start Learning
        </Button>
      </div>
      {/* New Challenges */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            New Challenges
          </h3>
          <Icon name="Target" size={24} className="text-secondary" />
        </div>
        
        <div className="space-y-3 mb-4">
          {challenges?.slice(0, 3)?.map((challenge) => (
            <div key={challenge?.id} className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">{challenge?.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  challenge?.difficulty === 'Easy' ? 'bg-success/20 text-success' :
                  challenge?.difficulty === 'Medium'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                }`}>
                  {challenge?.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{challenge?.points} points</p>
                <p className="text-xs text-muted-foreground">{challenge?.deadline}</p>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => navigate('/challenge-tracker')}
        >
          Accept Challenge
        </Button>
      </div>
      {/* Pending Submissions */}
      <div className="bg-card rounded-xl shadow-card p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Pending Submissions
          </h3>
          <Icon name="Clock" size={24} className="text-warning" />
        </div>
        
        <div className="space-y-3 mb-4">
          {submissions?.length > 0 ? (
            submissions?.slice(0, 3)?.map((submission) => (
              <div key={submission?.id} className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{submission?.challengeName}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    submission?.status === 'Under Review' ? 'bg-warning/20 text-warning' :
                    submission?.status === 'Approved'? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                  }`}>
                    {submission?.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Submitted {submission?.submittedDate}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <Icon name="CheckCircle" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No pending submissions</p>
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          iconName="Upload" 
          iconPosition="left"
          onClick={() => navigate('/challenge-tracker')}
        >
          View Submissions
        </Button>
      </div>
    </div>
  );
};

export default QuickAccessGrid;