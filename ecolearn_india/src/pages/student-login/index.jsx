import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import MotivationalSection from './components/MotivationalSection';

const StudentLogin = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('ecolearn-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('ecolearn-language', newLanguage);
  };

  const pageTitle = language === 'en' ?'Student Login - EcoLearn India | Environmental Education Platform' :'छात्र लॉगिन - इको-लर्न इंडिया | पर्यावरणीय शिक्षा मंच';

  const pageDescription = language === 'en' ?'Sign in to EcoLearn India - Join thousands of students learning environmental science through interactive lessons, real-world challenges, and community competitions.' :'इको-लर्न इंडिया में साइन इन करें - इंटरैक्टिव पाठों, वास्तविक चुनौतियों और सामुदायिक प्रतियोगिताओं के माध्यम से पर्यावरण विज्ञान सीखने वाले हजारों छात्रों में शामिल हों।';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="environmental education, student login, EcoLearn India, sustainability, NCERT, DIKSHA" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/student-login" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Login Form Section */}
            <div className="flex items-center justify-center min-h-[600px]">
              <LoginForm 
                language={language} 
                onLanguageToggle={handleLanguageToggle}
              />
            </div>

            {/* Motivational Section */}
            <div className="lg:sticky lg:top-8">
              <MotivationalSection language={language} />
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-success rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;