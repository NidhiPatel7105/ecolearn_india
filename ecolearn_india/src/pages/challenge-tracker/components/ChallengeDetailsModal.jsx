import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeDetailsModal = ({ isOpen, onClose, challenge, userProgress, onSubmitProof, onAccept }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !challenge) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Hard': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-warning bg-warning/10';
      case 'pending-verification': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const isParticipating = userProgress?.status && userProgress?.status !== 'not-started';
  const isCompleted = userProgress?.status === 'completed';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'instructions', label: 'Instructions', icon: 'List' },
    { id: 'submissions', label: 'Submissions', icon: 'Upload' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'Trophy' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-48 overflow-hidden">
            <Image 
              src={challenge?.image} 
              alt={challenge?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="absolute top-4 right-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="bg-black/20 hover:bg-black/40 text-white">
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
                    {challenge?.difficulty}
                  </span>
                  {challenge?.isNew && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                  {isParticipating && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(userProgress?.status)}`}>
                      {userProgress?.status === 'in-progress' ? 'In Progress' : 
                       userProgress?.status === 'pending-verification' ? 'Pending Review' : 
                       userProgress?.status === 'completed' ? 'Completed' : userProgress?.status}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-heading font-bold text-white mb-1">
                  {challenge?.title}
                </h1>
                <p className="text-white/90 text-sm">
                  {challenge?.category} • {challenge?.duration}
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-white mb-1">
                  <Icon name="Zap" size={20} className="mr-1" />
                  <span className="text-xl font-mono font-bold">{challenge?.ecoPoints}</span>
                </div>
                <p className="text-white/90 text-xs">Eco Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab?.id
                    ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} className="mr-2" />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                  Challenge Description
                </h3>
                <p className="text-foreground leading-relaxed">
                  {challenge?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Challenge Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="text-foreground font-medium">{challenge?.participants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="text-foreground font-medium">{challenge?.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-foreground font-medium">{challenge?.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <span className={`font-medium ${getDifficultyColor(challenge?.difficulty)?.split(' ')?.[0]}`}>
                        {challenge?.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {isParticipating && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Your Progress</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Completion</span>
                          <span className="font-mono text-foreground">{userProgress?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${userProgress?.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {userProgress?.submittedAt && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Submitted:</span>
                          <span className="text-foreground font-medium ml-2">
                            {new Date(userProgress.submittedAt)?.toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {userProgress?.feedback && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <h5 className="text-sm font-medium text-foreground mb-1">Teacher Feedback</h5>
                          <p className="text-sm text-muted-foreground">{userProgress?.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Step-by-Step Instructions
                </h3>
                <div className="space-y-3">
                  {challenge?.instructions?.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-foreground">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Required Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {challenge?.materials?.map((material, index) => (
                    <span key={index} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {challenge?.safetyGuidelines && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                    <Icon name="Shield" size={16} className="mr-2 text-warning" />
                    Safety Guidelines
                  </h4>
                  <p className="text-sm text-foreground">{challenge?.safetyGuidelines}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Submission Requirements
                </h3>
                {isParticipating && userProgress?.status === 'in-progress' && (
                  <Button 
                    variant="default"
                    onClick={() => onSubmitProof(challenge?.id)}
                    iconName="Camera"
                    iconPosition="left"
                  >
                    Submit Proof
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">What to Submit</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <Icon name="Camera" size={16} className="mr-2 mt-0.5 text-primary" />
                      Clear photos showing your environmental activity
                    </li>
                    <li className="flex items-start">
                      <Icon name="Video" size={16} className="mr-2 mt-0.5 text-primary" />
                      Optional: Short video demonstrating the process
                    </li>
                    <li className="flex items-start">
                      <Icon name="MapPin" size={16} className="mr-2 mt-0.5 text-primary" />
                      Location information for verification
                    </li>
                    <li className="flex items-start">
                      <Icon name="FileText" size={16} className="mr-2 mt-0.5 text-primary" />
                      Detailed description of your activity
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Verification Process</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                        1
                      </div>
                      <span className="text-sm text-muted-foreground">Submit your proof</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                        2
                      </div>
                      <span className="text-sm text-muted-foreground">Teacher/coordinator review</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs">
                        3
                      </div>
                      <span className="text-sm text-muted-foreground">Receive feedback and points</span>
                    </div>
                  </div>
                </div>
              </div>

              {userProgress?.submissions && userProgress?.submissions?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Your Submissions</h4>
                  <div className="space-y-3">
                    {userProgress?.submissions?.map((submission, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            Submission #{index + 1}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(submission.timestamp)?.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{submission?.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Challenge Leaderboard
              </h3>
              
              <div className="space-y-3">
                {challenge?.leaderboard?.map((participant, index) => (
                  <div key={participant?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-amber-600 text-white': 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{participant?.name}</p>
                        <p className="text-xs text-muted-foreground">{participant?.school}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-medium text-foreground">{participant?.points} pts</p>
                      <p className="text-xs text-muted-foreground">Completed {participant?.completedAt}</p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8">
                    <Icon name="Trophy" size={48} className="mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No participants yet. Be the first to complete this challenge!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{challenge?.participants} participants</span>
            <span>Due {challenge?.deadline}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {!isParticipating ? (
              <Button 
                variant="default"
                onClick={() => onAccept(challenge?.id)}
                iconName="Play"
                iconPosition="left"
              >
                Accept Challenge
              </Button>
            ) : userProgress?.status === 'in-progress' && (
              <Button 
                variant="default"
                onClick={() => onSubmitProof(challenge?.id)}
                iconName="Camera"
                iconPosition="left"
              >
                Submit Proof
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsModal;