import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentAttribution = ({ sources, language }) => {
  const content = {
    en: {
      contentSources: 'Content Sources',
      viewOriginal: 'View Original',
      poweredBy: 'Powered by',
      educationalPartners: 'Educational Partners'
    },
    hi: {
      contentSources: 'सामग्री स्रोत',
      viewOriginal: 'मूल देखें',
      poweredBy: 'द्वारा संचालित',
      educationalPartners: 'शैक्षिक भागीदार'
    }
  };

  const t = content?.[language] || content?.en;

  const sourceLogos = {
    'DIKSHA': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=50&fit=crop',
    'NCERT': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=50&fit=crop',
    'SBM': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=50&fit=crop',
    'BEE': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=50&fit=crop',
    'WASH': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=50&fit=crop',
    'WWF': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=50&fit=crop'
  };

  return (
    <div className="bg-card border-t border-border p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="BookOpen" size={20} />
          {t?.contentSources}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {sources?.map((source, index) => (
            <div key={index} className="bg-muted rounded-lg p-4 hover-scale transition-smooth">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-8 bg-background rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src={sourceLogos?.[source?.organization]} 
                    alt={source?.organization}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-primary/10 items-center justify-center text-xs font-medium text-primary hidden">
                    {source?.organization}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{source?.organization}</h4>
                  <p className="text-xs text-muted-foreground">{source?.type}</p>
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-3 line-clamp-2">
                {source?.title}
              </p>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(source?.url, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
                className="w-full text-xs"
              >
                {t?.viewOriginal}
              </Button>
            </div>
          ))}
        </div>

        {/* Educational Partners Section */}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground text-center mb-3">
            {t?.poweredBy} {t?.educationalPartners}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            {Object.entries(sourceLogos)?.map(([org, logo]) => (
              <div key={org} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-smooth">
                <img 
                  src={logo} 
                  alt={org}
                  className="w-8 h-6 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-xs font-medium text-muted-foreground hidden">{org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentAttribution;