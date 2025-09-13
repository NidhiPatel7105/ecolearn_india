import React from 'react';
import Icon from '../../../components/AppIcon';


const LessonNavigation = ({ 
  lessons, 
  currentLessonId, 
  onLessonSelect, 
  completedLessons,
  language 
}) => {
  const content = {
    en: {
      allLessons: 'All Lessons',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      minutes: 'min',
      points: 'points'
    },
    hi: {
      allLessons: 'सभी पाठ',
      completed: 'पूर्ण',
      inProgress: 'प्रगति में',
      notStarted: 'शुरू नहीं हुआ',
      minutes: 'मिनट',
      points: 'अंक'
    }
  };

  const t = content?.[language] || content?.en;

  const getLessonStatus = (lessonId) => {
    if (completedLessons?.includes(lessonId)) return 'completed';
    if (lessonId === currentLessonId) return 'inProgress';
    return 'notStarted';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle2';
      case 'inProgress': return 'PlayCircle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'inProgress': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground flex items-center gap-2">
          <Icon name="BookOpen" size={20} />
          {t?.allLessons}
        </h2>
      </div>
      <div className="p-2">
        {lessons?.map((lesson) => {
          const status = getLessonStatus(lesson?.id);
          const isActive = lesson?.id === currentLessonId;
          
          return (
            <button
              key={lesson?.id}
              onClick={() => onLessonSelect(lesson?.id)}
              className={`w-full p-3 rounded-lg mb-2 text-left transition-smooth hover-scale ${
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${isActive ? 'text-primary-foreground' : getStatusColor(status)}`}>
                  <Icon name={getStatusIcon(status)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm mb-1 line-clamp-2 ${
                    isActive ? 'text-primary-foreground' : 'text-foreground'
                  }`}>
                    {lesson?.title}
                  </h3>
                  
                  <div className={`flex items-center gap-4 text-xs ${
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {lesson?.estimatedTime} {t?.minutes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Zap" size={12} />
                      {lesson?.ecoPoints} {t?.points}
                    </span>
                  </div>
                  
                  <div className={`text-xs mt-1 ${
                    isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {status === 'completed' && t?.completed}
                    {status === 'inProgress' && t?.inProgress}
                    {status === 'notStarted' && t?.notStarted}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonNavigation;