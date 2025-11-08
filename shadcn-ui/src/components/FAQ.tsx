import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        question: 'What services does FiNNGUARD Capital provide?',
        answer: 'FiNNGUARD Capital is a loan service provider and facilitator. We help you connect with the right lenders for Home Loans, Car Loans, Personal Loans, Business Loans, and Loans Against Property. We work with multiple lending partners to find you the best loan options with competitive rates and flexible terms.'
      },
      {
        question: 'What are the interest rates for different loan types?',
        answer: 'Through our network of partner lenders, we help you access competitive interest rates starting from 8.5% per annum for Home Loans, 9.0% for Car Loans, 10.5% for Business Loans, 9.5% for Loans Against Property, and 11.5% for Personal Loans. Final rates depend on your credit profile, loan amount, and the specific lender.'
      },
      {
        question: 'How quickly can I get loan approval?',
        answer: 'We facilitate quick loan approvals through our lending partners, typically within 24-48 hours for pre-qualified customers. The entire process from application to disbursal usually takes 7-15 working days, depending on the loan type, documentation, and the chosen lender\'s process.'
      }
    ]
  },
  {
    category: 'Home Loans',
    questions: [
      {
        question: 'What is the minimum income requirement for home loans?',
        answer: 'For home loans through our partner lenders, the minimum monthly income requirement is typically ₹25,000 for salaried individuals and ₹30,000 for self-employed individuals. However, requirements may vary based on the lender and loan amount.'
      },
      {
        question: 'What documents are required for home loan application?',
        answer: 'For home loans, you need identity proof (Aadhaar, PAN), address proof, income proof (salary slips/ITR for 2-3 years), bank statements (6 months), property documents, and employment proof. We help you prepare the complete documentation package.'
      },
      {
        question: 'What is the maximum loan amount available for home loans?',
        answer: 'Through our lending partners, home loans are available from ₹5 lakhs to ₹5 crores, depending on your income, credit profile, and the property value. The loan-to-value ratio typically ranges from 80-90% of the property value.'
      }
    ]
  },
  {
    category: 'Car Loans',
    questions: [
      {
        question: 'What is the minimum income requirement for car loans?',
        answer: 'For car loans, our partner lenders typically require a minimum monthly income of ₹20,000 for salaried individuals and ₹25,000 for self-employed individuals. The exact requirement may vary based on the car model and loan amount.'
      },
      {
        question: 'Can I get a loan for a used car?',
        answer: 'Yes, we work with lenders who provide loans for both new and used cars. For used cars, the vehicle should typically be less than 5-7 years old, and the loan amount depends on the car\'s current market value and condition.'
      },
      {
        question: 'What is the typical loan tenure for car loans?',
        answer: 'Car loan tenures through our lending partners typically range from 1 to 7 years. The tenure depends on factors like the car\'s age, loan amount, and your repayment capacity. Longer tenures result in lower EMIs but higher total interest.'
      }
    ]
  },
  {
    category: 'Personal Loans',
    questions: [
      {
        question: 'What is the minimum income requirement for personal loans?',
        answer: 'For personal loans, our partner lenders typically require a minimum monthly income of ₹15,000 for salaried individuals and ₹20,000 for self-employed individuals. Higher income levels may qualify for better interest rates.'
      },
      {
        question: 'Do personal loans require any collateral?',
        answer: 'No, personal loans are unsecured loans that don\'t require any collateral or security. The approval is based on your credit score, income stability, and repayment capacity. This makes the process faster but may result in slightly higher interest rates.'
      },
      {
        question: 'What can I use a personal loan for?',
        answer: 'Personal loans can be used for various purposes including medical emergencies, education expenses, wedding costs, home renovation, debt consolidation, or any other personal financial needs. There are generally no restrictions on the end use of funds.'
      }
    ]
  },
  {
    category: 'Business Loans',
    questions: [
      {
        question: 'What types of business loans are available?',
        answer: 'We facilitate various types of business loans including working capital loans, term loans, equipment financing, business expansion loans, and loans for small and medium enterprises (SMEs). Each type is designed for specific business needs.'
      },
      {
        question: 'What documents are required for business loans?',
        answer: 'Business loan documentation typically includes business registration certificates, ITR for 2-3 years, bank statements, financial statements, GST returns, business plan, and identity/address proofs of promoters. Requirements may vary based on business type and loan amount.'
      },
      {
        question: 'Can startups apply for business loans?',
        answer: 'Yes, we work with lenders who provide loans to startups, though requirements may be stricter. Startups typically need a solid business plan, promoter contribution, and may require collateral or guarantors. Some lenders offer special startup-friendly schemes.'
      }
    ]
  },
  {
    category: 'Loan Against Property',
    questions: [
      {
        question: 'What types of properties are eligible for loan against property?',
        answer: 'Residential properties, commercial properties, industrial properties, and plots can be used as collateral for loan against property. The property should have clear title, be in good condition, and located in areas approved by the lender.'
      },
      {
        question: 'What is the maximum loan amount available against property?',
        answer: 'Loan against property typically offers 60-70% of the property\'s market value. The loan amount can range from ₹5 lakhs to several crores, depending on the property value, your income, and the lender\'s policies.'
      },
      {
        question: 'Can I use the mortgaged property during the loan tenure?',
        answer: 'Yes, you can continue to use, rent out, or live in the mortgaged property during the loan tenure. The lender holds the property documents as security, but you retain possession and usage rights until the loan is fully repaid.'
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">Find answers to common questions about our loan facilitation services</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {faqData.map((category) => (
                    <button
                      key={category.category}
                      onClick={() => setActiveCategory(category.category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeCategory === category.category
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {category.category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="md:col-span-3">
            {faqData
              .filter(category => category.category === activeCategory)
              .map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                    {category.category} Questions
                  </h3>
                  {category.questions.map((faq, index) => (
                    <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleQuestion(index)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-medium text-slate-800 pr-4">{faq.question}</span>
                          {openQuestions.includes(index) ? (
                            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        {openQuestions.includes(index) && (
                          <div className="px-6 pb-4 border-t border-slate-100">
                            <p className="text-slate-600 leading-relaxed pt-4">{faq.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Still have questions?</h3>
              <p className="text-slate-600 mb-6">Our loan experts are here to help you find the right lending partner for your needs</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('https://web.whatsapp.com/send?phone=919497544143&text=Hi! I have some questions about your loan facilitation services. Please help me.', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Chat on WhatsApp
                </button>
                <button
                  onClick={() => window.open('tel:+919497544143')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Call Us Now
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}