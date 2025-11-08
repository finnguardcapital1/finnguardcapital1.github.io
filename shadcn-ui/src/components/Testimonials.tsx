import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Thrissur, Kerala',
    loanType: 'Home Loan',
    amount: '₹25 Lakhs',
    rating: 5,
    review: 'FiNNGUARD Capital made my dream of owning a home come true. The process was smooth, transparent, and the team was incredibly supportive throughout. Got the best interest rates in the market!',
    image: '/assets/testimonial-1.jpg'
  },
  {
    id: 2,
    name: 'Priya Nair',
    location: 'Kochi, Kerala',
    loanType: 'Business Loan',
    amount: '₹15 Lakhs',
    rating: 5,
    review: 'Starting my boutique business was a dream, and FiNNGUARD Capital helped me achieve it. Quick approval, minimal documentation, and excellent customer service. Highly recommended!',
    image: '/assets/testimonial-2.jpg'
  },
  {
    id: 3,
    name: 'Arun Menon',
    location: 'Calicut, Kerala',
    loanType: 'Car Loan',
    amount: '₹8 Lakhs',
    rating: 5,
    review: 'Bought my dream car with FiNNGUARD Capital car loan. The interest rates were competitive and the processing was incredibly fast. Got approval within 24 hours!',
    image: '/assets/testimonial-3.jpg'
  },
  {
    id: 4,
    name: 'Meera Pillai',
    location: 'Trivandrum, Kerala',
    loanType: 'Personal Loan',
    amount: '₹5 Lakhs',
    rating: 5,
    review: 'Needed urgent funds for my daughter\'s education. FiNNGUARD Capital provided instant personal loan with flexible repayment options. Thank you for the excellent service!',
    image: '/assets/testimonial-4.jpg'
  },
  {
    id: 5,
    name: 'Suresh Varma',
    location: 'Palakkad, Kerala',
    loanType: 'Loan Against Property',
    amount: '₹40 Lakhs',
    rating: 5,
    review: 'Expanded my manufacturing business with loan against property from FiNNGUARD Capital. Professional team, transparent process, and great rates. Completely satisfied!',
    image: '/assets/testimonial-5.jpg'
  }
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-slate-600">Real stories from satisfied customers who achieved their financial goals with us</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl bg-white">
            <CardContent className="p-0">
              <div className="relative h-96 md:h-80">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-48 md:h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <Quote className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <Badge className="bg-white/20 text-white border-white/30">
                            {testimonial.loanType}
                          </Badge>
                          <p className="mt-2 font-semibold">{testimonial.amount}</p>
                        </div>
                      </div>
                      <div className="md:w-2/3 p-8 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          {renderStars(testimonial.rating)}
                        </div>
                        <p className="text-slate-700 text-lg mb-6 leading-relaxed italic">
                          "{testimonial.review}"
                        </p>
                        <div className="border-t pt-4">
                          <h4 className="font-bold text-slate-800 text-lg">{testimonial.name}</h4>
                          <p className="text-slate-600">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-yellow-500' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}