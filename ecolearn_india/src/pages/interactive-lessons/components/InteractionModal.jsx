import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const InteractionModal = ({ 
  isOpen, 
  onClose, 
  interaction, 
  language 
}) => {
  const content = {
    en: {
      close: 'Close',
      learnMore: 'Learn More',
      watchVideo: 'Watch Video',
      playVideo: 'Play Video',
      pauseVideo: 'Pause Video'
    },
    hi: {
      close: 'बंद करें',
      learnMore: 'और जानें',
      watchVideo: 'वीडियो देखें',
      playVideo: 'वीडियो चलाएं',
      pauseVideo: 'वीडियो रोकें'
    }
  };

  const t = content?.[language] || content?.en;

  if (!isOpen || !interaction) return null;

  const renderContent = () => {
    switch (interaction?.type) {
      case 'diagram':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-foreground">
                {interaction?.data?.label}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="mb-4">
              <Image
                src={interaction?.data?.detailImage || interaction?.data?.image}
                alt={interaction?.data?.label}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {interaction?.data?.description}
              </p>
              
              {interaction?.data?.facts && (
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                    <Icon name="Lightbulb" size={16} />
                    Did You Know?
                  </h4>
                  <ul className="space-y-2">
                    {interaction?.data?.facts?.map((fact, index) => (
                      <li key={index} className="text-sm text-foreground flex items-start gap-2">
                        <Icon name="CheckCircle2" size={14} className="text-accent mt-1 flex-shrink-0" />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-foreground">
                {interaction?.data?.title}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="aspect-video bg-background rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Play" size={24} color="white" />
                </div>
                <p className="text-muted-foreground mb-4">{interaction?.data?.description}</p>
                <Button variant="default" iconName="Play" iconPosition="left">
                  {t?.playVideo}
                </Button>
              </div>
            </div>
            {interaction?.data?.transcript && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Video Transcript</h4>
                <p className="text-sm text-muted-foreground">
                  {interaction?.data?.transcript}
                </p>
              </div>
            )}
          </div>
        );

      case 'expand':
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-foreground">
                {interaction?.data?.title}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="space-y-4">
              {interaction?.data?.fullContent && (
                <div className="prose prose-sm max-w-none">
                  {interaction?.data?.fullContent?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="text-foreground mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              
              {interaction?.data?.relatedImages && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {interaction?.data?.relatedImages?.map((img, index) => (
                    <div key={index}>
                      <Image
                        src={img?.src}
                        alt={img?.alt}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <p className="text-sm text-muted-foreground mt-2">{img?.caption}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {interaction?.data?.actionItems && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-3 flex items-center gap-2">
                    <Icon name="Target" size={16} />
                    Action Items
                  </h4>
                  <ul className="space-y-2">
                    {interaction?.data?.actionItems?.map((item, index) => (
                      <li key={index} className="text-sm text-foreground flex items-start gap-2">
                        <Icon name="ArrowRight" size={14} className="text-primary mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-foreground">
                Interactive Content
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <p className="text-muted-foreground">Content not available</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default InteractionModal;