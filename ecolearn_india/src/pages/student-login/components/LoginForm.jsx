import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ language, onLanguageToggle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    student: { email: 'priya.sharma@student.edu', password: 'EcoLearn@123' },
    teacher: { email: 'rajesh.kumar@teacher.edu', password: 'Teach@456' },
    coordinator: { email: 'meera.singh@coordinator.edu', password: 'Coord@789' }
  };

  const content = {
    en: {
      title: 'Welcome Back to EcoLearn India',
      subtitle: 'Continue your environmental learning journey',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your school email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me for 30 days',
      signIn: 'Sign In to Dashboard',
      forgotPassword: 'Forgot your password?',
      noAccount: "Don\'t have an account?",
      createAccount: 'Create New Account',
      quickLogin: 'Quick Login Options',
      studentLogin: 'Student Demo',
      teacherLogin: 'Teacher Demo',
      coordinatorLogin: 'Coordinator Demo',
      invalidCredentials: 'Invalid email or password. Please try again.',
      emailRequired: 'Email address is required',
      passwordRequired: 'Password is required',
      invalidEmail: 'Please enter a valid email address'
    },
    hi: {
      title: 'इको-लर्न इंडिया में वापस स्वागत है',
      subtitle: 'अपनी पर्यावरणीय शिक्षा की यात्रा जारी रखें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'अपना स्कूल ईमेल दर्ज करें',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      rememberMe: 'मुझे 30 दिनों के लिए याद रखें',
      signIn: 'डैशबोर्ड में साइन इन करें',
      forgotPassword: 'अपना पासवर्ड भूल गए?',
      noAccount: 'कोई खाता नहीं है?',
      createAccount: 'नया खाता बनाएं',
      quickLogin: 'त्वरित लॉगिन विकल्प',
      studentLogin: 'छात्र डेमो',
      teacherLogin: 'शिक्षक डेमो',
      coordinatorLogin: 'समन्वयक डेमो',
      invalidCredentials: 'अमान्य ईमेल या पासवर्ड। कृपया पुनः प्रयास करें।',
      emailRequired: 'ईमेल पता आवश्यक है',
      passwordRequired: 'पासवर्ड आवश्यक है',
      invalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें'
    }
  };

  const t = content?.[language];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email?.trim()) {
      newErrors.email = t?.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = t?.invalidEmail;
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = t?.passwordRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );
      
      if (isValidCredentials) {
        localStorage.setItem('ecolearn-user', JSON.stringify({
          email: formData?.email,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));
        navigate('/student-dashboard');
      } else {
        setErrors({ general: t?.invalidCredentials });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickLogin = (userType) => {
    const credentials = mockCredentials?.[userType];
    setFormData({
      email: credentials?.email,
      password: credentials?.password,
      rememberMe: false
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-xl shadow-card border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
            {t?.title}
          </h1>
          <p className="text-muted-foreground font-caption">
            {t?.subtitle}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onLanguageToggle}
            iconName="Globe"
            iconPosition="left"
            className="text-sm"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </Button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center">
              <Icon name="AlertCircle" size={16} className="text-error mr-2" />
              <span className="text-sm text-error">{errors?.general}</span>
            </div>
          )}

          <Input
            label={t?.emailLabel}
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder={t?.emailPlaceholder}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label={t?.passwordLabel}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder={t?.passwordPlaceholder}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label={t?.rememberMe}
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
              disabled={isLoading}
            >
              {t?.forgotPassword}
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
          >
            {t?.signIn}
          </Button>
        </form>

        {/* Quick Login Options */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-4 text-center">
            {t?.quickLogin}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin('student')}
              disabled={isLoading}
              iconName="User"
              iconPosition="left"
            >
              {t?.studentLogin}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('teacher')}
                disabled={isLoading}
                iconName="GraduationCap"
                iconPosition="left"
              >
                {t?.teacherLogin}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin('coordinator')}
                disabled={isLoading}
                iconName="Users"
                iconPosition="left"
              >
                {t?.coordinatorLogin}
              </Button>
            </div>
          </div>
        </div>

        {/* Registration Link */}
        <div className="mt-6 text-center">
          <span className="text-sm text-muted-foreground">{t?.noAccount} </span>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
            disabled={isLoading}
          >
            {t?.createAccount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;