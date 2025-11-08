import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Target, Eye, Heart, Users, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const handleWhatsAppContact = () => {
    const message = "Hi FiNNGUARD Capital! I'd like to know more about your company and services. Please provide me with more information.";
    window.open(`https://wa.me/919497544143?text=${encodeURIComponent(message)}`, '_blank');
  };

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Customer First',
      description: 'We prioritize our customers\' financial well-being above all else'
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Trust',
      description: 'Building lasting relationships through transparency and reliability'
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: 'Efficiency',
      description: 'Quick and efficient loan processing to meet your urgent needs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">About Us</Link>
            <Link to="/emi-calculator" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">EMI Calculator</Link>
            <Link to="/contact" className="text-slate-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
          </nav>
          <Button onClick={handleWhatsAppContact} className="bg-green-500 hover:bg-green-600 text-white">
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 to-slate-900/90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/businessloan.png)' }}
        ></div>
        <div className="relative z-10 container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About FiNNGUARD Capital</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted financial partner committed to making your dreams come true through innovative loan solutions
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Story</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                FiNNGUARD Capital was founded with a simple yet powerful vision: to democratize access to financial services 
                and help individuals and businesses achieve their dreams through tailored loan solutions.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Based in Thrissur, Kerala, we have been serving our community with dedication, transparency, and a 
                customer-first approach. Our team of financial experts works tirelessly to provide competitive rates 
                and flexible terms that suit your unique needs.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're looking to buy your dream home, expand your business, or meet personal financial goals, 
                FiNNGUARD Capital is here to guide you every step of the way.
              </p>
            </div>
            <div className="relative">
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <img 
                    src="/assets/homeloan.png" 
                    alt="FiNNGUARD Capital Office"
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <CardContent>
                <Target className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To provide accessible, transparent, and customer-centric financial solutions that empower individuals 
                  and businesses to achieve their goals while maintaining the highest standards of service and integrity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <CardContent>
                <Eye className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Vision</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  To become the most trusted and preferred financial partner in Kerala, known for our innovative solutions, 
                  exceptional customer service, and commitment to helping our clients build a prosperous future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                <CardContent>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">Why Choose FiNNGUARD Capital?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <CardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Competitive Interest Rates</h3>
                <p className="text-slate-600">
                  We offer some of the most competitive interest rates in the market, starting from as low as 8.5% per annum.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <CardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Processing</h3>
                <p className="text-slate-600">
                  Our streamlined process ensures quick loan approvals and disbursals, getting you the funds when you need them.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <CardContent>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Personalized Service</h3>
                <p className="text-slate-600">
                  Every client receives personalized attention and customized loan solutions tailored to their specific needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Financial Journey?</h2>
          <p className="text-xl mb-8 text-slate-200">Let's discuss how we can help you achieve your financial goals</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat with Us
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src="/assets/logo.png" alt="FiNNGUARD Capital" className="h-12 mb-4" />
              <p className="text-slate-300 mb-4">Your Financial Goals, Our Commitment</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-slate-300 hover:text-yellow-400 transition-colors">Home</Link>
                <Link to="/about" className="block text-slate-300 hover:text-yellow-400 transition-colors">About Us</Link>
                <Link to="/emi-calculator" className="block text-slate-300 hover:text-yellow-400 transition-colors">EMI Calculator</Link>
                <Link to="/contact" className="block text-slate-300 hover:text-yellow-400 transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-slate-300">
                <p>17/557E, 2nd Floor, Jayamohan Building,</p>
                <p>Palappilly Road, Amballur, Thrissur, Kerala - 680302</p>
                <p>Phone: +91 94975 44143, +91 97467 54690</p>
                <p>Email: support@finnguardcapital.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 FiNNGUARD CAPITAL | www.finnguardcapital.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}