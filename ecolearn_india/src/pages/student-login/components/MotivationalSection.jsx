import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const MotivationalSection = ({ language }) => {
  const achievements = [
    {
      id: 1,
      icon: 'TreePine',
      count: '2,847',
      label: { en: 'Trees Planted', hi: 'पेड़ लगाए गए' },
      color: 'text-success'
    },
    {
      id: 2,
      icon: 'Droplets',
      count: '15,234L',
      label: { en: 'Water Saved', hi: 'पानी बचाया गया' },
      color: 'text-primary'
    },
    {
      id: 3,
      icon: 'Recycle',
      count: '8,456kg',
      label: { en: 'Waste Recycled', hi: 'कचरा रीसाइकिल किया' },
      color: 'text-accent'
    },
    {
      id: 4,
      icon: 'Zap',
      count: '12,890kWh',
      label: { en: 'Energy Saved', hi: 'ऊर्जा बचाई गई' },
      color: 'text-warning'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      school: { en: 'Delhi Public School', hi: 'दिल्ली पब्लिक स्कूल' },
      activity: { en: 'Completed Water Conservation Challenge', hi: 'जल संरक्षण चुनौती पूरी की' },
      points: 150,
      time: { en: '2 hours ago', hi: '2 घंटे पहले' }
    },
    {
      id: 2,
      school: { en: 'Kendriya Vidyalaya', hi: 'केंद्रीय विद्यालय' },
      activity: { en: 'Planted 25 saplings in school garden', hi: 'स्कूल के बगीचे में 25 पौधे लगाए' },
      points: 250,
      time: { en: '4 hours ago', hi: '4 घंटे पहले' }
    },
    {
      id: 3,
      school: { en: 'St. Mary\'s School', hi: 'सेंट मैरी स्कूल' },
      activity: { en: 'Organized plastic-free lunch campaign', hi: 'प्लास्टिक मुक्त लंच अभियान आयोजित किया' },
      points: 200,
      time: { en: '6 hours ago', hi: '6 घंटे पहले' }
    }
  ];

  const content = {
    en: {
      title: 'Join India\'s Largest Environmental Learning Community',
      subtitle: 'Students across the country are making a real difference',
      communityStats: 'Community Impact This Month',
      recentTitle: 'Recent Community Achievements',
      pointsLabel: 'Eco Points',
      partnersTitle: 'Trusted by Leading Organizations',
      featuresTitle: 'Why Students Love EcoLearn India',
      features: [
        'Interactive lessons aligned with NCERT curriculum',
        'Real-world challenges with measurable impact',
        'Compete with schools across India',
        'Earn certificates and digital badges'
      ]
    },
    hi: {
      title: 'भारत के सबसे बड़े पर्यावरणीय शिक्षा समुदाय में शामिल हों',
      subtitle: 'देश भर के छात्र वास्तविक बदलाव ला रहे हैं',
      communityStats: 'इस महीने का सामुदायिक प्रभाव',
      recentTitle: 'हाल की सामुदायिक उपलब्धियां',
      pointsLabel: 'इको पॉइंट्स',
      partnersTitle: 'अग्रणी संगठनों द्वारा भरोसेमंद',
      featuresTitle: 'छात्र इको-लर्न इंडिया को क्यों पसंद करते हैं',
      features: [
        'NCERT पाठ्यक्रम के साथ संरेखित इंटरैक्टिव पाठ',
        'मापने योग्य प्रभाव के साथ वास्तविक चुनौतियां',
        'भारत भर के स्कूलों के साथ प्रतिस्पर्धा करें',
        'प्रमाणपत्र और डिजिटल बैज अर्जित करें'
      ]
    }
  };

  const t = content?.[language];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <div className="relative mb-6">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=300&fit=crop"
            alt="Students participating in environmental activities"
            className="w-full h-48 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-xl font-heading font-semibold mb-2">
              {t?.title}
            </h2>
            <p className="text-sm font-caption opacity-90">
              {t?.subtitle}
            </p>
          </div>
        </div>
      </div>
      {/* Community Stats */}
      <div className="bg-muted rounded-xl p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          {t?.communityStats}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <div key={achievement?.id} className="text-center">
              <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center mx-auto mb-2 ${achievement?.color}`}>
                <Icon name={achievement?.icon} size={20} />
              </div>
              <div className="text-lg font-mono font-semibold text-foreground">
                {achievement?.count}
              </div>
              <div className="text-xs font-caption text-muted-foreground">
                {achievement?.label?.[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-primary" />
          {t?.recentTitle}
        </h3>
        <div className="space-y-3">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="CheckCircle" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">
                  {activity?.school?.[language]}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {activity?.activity?.[language]}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-caption text-muted-foreground">
                    {activity?.time?.[language]}
                  </span>
                  <div className="flex items-center text-accent">
                    <Icon name="Zap" size={12} />
                    <span className="text-xs font-mono ml-1">
                      +{activity?.points} {t?.pointsLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Features */}
      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-center">
          {t?.featuresTitle}
        </h3>
        <div className="space-y-3">
          {t?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Check" size={14} color="white" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Partners */}
      <div className="text-center">
        <h3 className="text-sm font-heading font-medium text-muted-foreground mb-4">
          {t?.partnersTitle}
        </h3>
        <div className="flex items-center justify-center space-x-6 opacity-60">
          <div className="text-xs font-caption">DIKSHA</div>
          <div className="text-xs font-caption">NCERT</div>
          <div className="text-xs font-caption">SBM</div>
          <div className="text-xs font-caption">BEE</div>
          <div className="text-xs font-caption">WWF</div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalSection;