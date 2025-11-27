import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Award, CheckCircle, Clock } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: '5000+',
    label: 'Happy Customers',
    color: 'text-blue-600'
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    value: '₹500+ Cr',
    label: 'Loans Disbursed',
    color: 'text-green-600'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    value: '95%',
    label: 'Approval Rate',
    color: 'text-yellow-600'
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: '24 Hours',
    label: 'Quick Processing',
    color: 'text-purple-600'
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: '25+ Years',
    label: 'Management Experience',
    color: 'text-indigo-600'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    value: '100%',
    label: 'Transparency',
    color: 'text-red-600'
  }
];

export default function StatsDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-dashboard');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateValue = (start: number, end: number, duration: number, key: string) => {
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (end - start) * easeOutCubic);
          
          setAnimatedValues(prev => ({ ...prev, [key]: current }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      };

      // Animate different stats with different targets
      animateValue(0, 5000, 2000, 'customers');
      animateValue(0, 500, 2500, 'disbursed');
      animateValue(0, 95, 1800, 'approval');
      animateValue(0, 24, 1500, 'processing');
      animateValue(0, 25, 2200, 'experience');
      animateValue(0, 100, 1600, 'transparency');
    }
  }, [isVisible]);

  const getAnimatedValue = (originalValue: string): string => {
    if (!isVisible) return '0';
    
    if (originalValue.includes('5000+')) {
      return `${animatedValues.customers || 0}+`;
    } else if (originalValue.includes('₹500+')) {
      return `₹${animatedValues.disbursed || 0}+ Cr`;
    } else if (originalValue.includes('95%')) {
      return `${animatedValues.approval || 0}%`;
    } else if (originalValue.includes('24')) {
      return `${animatedValues.processing || 0} Hours`;
    } else if (originalValue.includes('25+')) {
      return `${animatedValues.experience || 0}+ Years`;
    } else if (originalValue.includes('100%')) {
      return `${animatedValues.transparency || 0}%`;
    }
    
    return originalValue;
  };

  return (
    <section id="stats-dashboard" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Track Record</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by thousands of customers with our experienced management team's proven expertise
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-0">
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-2">
                  {getAnimatedValue(stat.value)}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}