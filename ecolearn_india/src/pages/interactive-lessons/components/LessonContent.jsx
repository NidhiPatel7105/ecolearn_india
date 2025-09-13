import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LessonContent = ({ 
  currentSection, 
  onNextSection, 
  onPrevSection, 
  canGoNext, 
  canGoPrev,
  onInteraction,
  language 
}) => {
  const content = {
    en: {
      previous: 'Previous',
      next: 'Next',
      clickToExplore: 'Click to explore',
      watchVideo: 'Watch Video',
      readMore: 'Read More',
      keyTakeaway: 'Key Takeaway',
      didYouKnow: 'Did You Know?',
      quickTip: 'Quick Tip'
    },
    hi: {
      previous: 'पिछला',
      next: 'अगला',
      clickToExplore: 'अन्वेषण के लिए क्लिक करें',
      watchVideo: 'वीडियो देखें',
      readMore: 'और पढ़ें',
      keyTakeaway: 'मुख्य बात',
      didYouKnow: 'क्या आप जानते हैं?',
      quickTip: 'त्वरित सुझाव'
    }
  };

  const t = content?.[language] || content?.en;

  const renderInteractiveElement = (element) => {
    switch (element?.type) {
      case 'clickable-diagram':
        return (
          <div className="relative bg-muted rounded-lg p-4 mb-6">
            <Image
              src={element?.image}
              alt={element?.alt}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {element?.hotspots?.map((spot, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => onInteraction('diagram', spot)}
                  className="text-xs"
                >
                  {spot?.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t?.clickToExplore}
            </p>
          </div>
        );

      case 'video':
        return (
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="aspect-video bg-background rounded-lg flex items-center justify-center mb-4">
              <Button
                variant="default"
                onClick={() => onInteraction('video', element)}
                iconName="Play"
                iconPosition="left"
              >
                {t?.watchVideo}
              </Button>
            </div>
            <h4 className="font-medium text-foreground mb-2">{element?.title}</h4>
            <p className="text-sm text-muted-foreground">{element?.description}</p>
          </div>
        );

      case 'expandable-content':
        return (
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} className="text-accent" />
              <h4 className="font-medium text-foreground">{element?.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{element?.preview}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onInteraction('expand', element)}
              iconName="ChevronRight"
              iconPosition="right"
            >
              {t?.readMore}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderCalloutBox = (callout) => {
    const icons = {
      'key-takeaway': 'Key',
      'did-you-know': 'Lightbulb',
      'quick-tip': 'Zap'
    };

    const colors = {
      'key-takeaway': 'border-primary bg-primary/5 text-primary',
      'did-you-know': 'border-accent bg-accent/5 text-accent',
      'quick-tip': 'border-success bg-success/5 text-success'
    };

    const titles = {
      'key-takeaway': t?.keyTakeaway,
      'did-you-know': t?.didYouKnow,
      'quick-tip': t?.quickTip
    };

    return (
      <div className={`border rounded-lg p-4 mb-6 ${colors?.[callout?.type]}`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon name={icons?.[callout?.type]} size={16} />
          <h4 className="font-medium">{titles?.[callout?.type]}</h4>
        </div>
        <p className="text-sm">{callout?.content}</p>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-background">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Section Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            {currentSection?.title}
          </h2>

          {/* Main Content */}
          <div className="space-y-6">
            {currentSection?.content?.map((block, index) => {
              switch (block?.type) {
                case 'text':
                  return (
                    <div key={index} className="text-foreground leading-relaxed">
                      {block?.content?.split('\n')?.map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  );

                case 'image':
                  return (
                    <div key={index} className="my-8">
                      <Image
                        src={block?.src}
                        alt={block?.alt}
                        className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-card"
                      />
                      {block?.caption && (
                        <p className="text-sm text-muted-foreground text-center mt-2 italic">
                          {block?.caption}
                        </p>
                      )}
                    </div>
                  );

                case 'interactive':
                  return (
                    <div key={index}>
                      {renderInteractiveElement(block)}
                    </div>
                  );

                case 'callout':
                  return (
                    <div key={index}>
                      {renderCalloutBox(block)}
                    </div>
                  );

                case 'list':
                  return (
                    <div key={index} className="mb-6">
                      <h4 className="font-medium text-foreground mb-3">{block?.title}</h4>
                      <ul className="space-y-2">
                        {block?.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-success mt-1 flex-shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrevSection}
            disabled={!canGoPrev}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            {t?.previous}
          </Button>

          <div className="flex items-center gap-2">
            {currentSection?.sectionNumber && (
              <span className="text-sm text-muted-foreground">
                Section {currentSection?.sectionNumber} of {currentSection?.totalSections}
              </span>
            )}
          </div>

          <Button
            variant="default"
            onClick={onNextSection}
            disabled={!canGoNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            {t?.next}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;