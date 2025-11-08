import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Circle, FileText, Download, MessageCircle } from 'lucide-react';

const documentChecklists = {
  home: {
    title: 'Home Loan Documents',
    salaried: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'Salary Slips (Last 3 months)',
      'Form 16 / ITR (Last 2 years)',
      'Bank Statements (Last 6 months)',
      'Employment Certificate',
      'Property Documents',
      'Sale Agreement',
      'Approved Building Plan',
      'NOC from Builder',
      'Property Insurance'
    ],
    selfEmployed: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'ITR (Last 3 years)',
      'Profit & Loss Statement',
      'Balance Sheet (Last 2 years)',
      'Bank Statements (Last 12 months)',
      'Business Registration Certificate',
      'GST Registration',
      'Property Documents',
      'Sale Agreement',
      'Approved Building Plan',
      'NOC from Builder',
      'Property Insurance'
    ]
  },
  car: {
    title: 'Car Loan Documents',
    salaried: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'Salary Slips (Last 3 months)',
      'Form 16 / ITR (Last 2 years)',
      'Bank Statements (Last 6 months)',
      'Employment Certificate',
      'Car Quotation/Proforma Invoice',
      'Car Insurance Quote',
      'Driving License'
    ],
    selfEmployed: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'ITR (Last 3 years)',
      'Profit & Loss Statement',
      'Balance Sheet (Last 2 years)',
      'Bank Statements (Last 12 months)',
      'Business Registration Certificate',
      'GST Registration',
      'Car Quotation/Proforma Invoice',
      'Car Insurance Quote',
      'Driving License'
    ]
  },
  personal: {
    title: 'Personal Loan Documents',
    salaried: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'Salary Slips (Last 3 months)',
      'Form 16 / ITR (Last 2 years)',
      'Bank Statements (Last 6 months)',
      'Employment Certificate',
      'Salary Certificate'
    ],
    selfEmployed: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'ITR (Last 3 years)',
      'Profit & Loss Statement',
      'Balance Sheet (Last 2 years)',
      'Bank Statements (Last 12 months)',
      'Business Registration Certificate',
      'GST Registration'
    ]
  },
  business: {
    title: 'Business Loan Documents',
    salaried: [], // Not applicable
    selfEmployed: [
      'PAN Card (Personal & Business)',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'ITR (Last 3 years)',
      'Profit & Loss Statement',
      'Balance Sheet (Last 3 years)',
      'Bank Statements (Last 12 months)',
      'Business Registration Certificate',
      'GST Registration',
      'Trade License',
      'MOA & AOA (for companies)',
      'Partnership Deed (for partnerships)',
      'Project Report/Business Plan',
      'Collateral Documents (if applicable)'
    ]
  },
  lap: {
    title: 'Loan Against Property Documents',
    salaried: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'Salary Slips (Last 3 months)',
      'Form 16 / ITR (Last 2 years)',
      'Bank Statements (Last 6 months)',
      'Employment Certificate',
      'Property Title Deeds',
      'Property Tax Receipts',
      'Property Valuation Report',
      'Encumbrance Certificate',
      'Property Insurance',
      'NOC from Society/Builder'
    ],
    selfEmployed: [
      'PAN Card',
      'Aadhaar Card',
      'Passport Size Photos (2)',
      'ITR (Last 3 years)',
      'Profit & Loss Statement',
      'Balance Sheet (Last 2 years)',
      'Bank Statements (Last 12 months)',
      'Business Registration Certificate',
      'GST Registration',
      'Property Title Deeds',
      'Property Tax Receipts',
      'Property Valuation Report',
      'Encumbrance Certificate',
      'Property Insurance',
      'NOC from Society/Builder'
    ]
  }
};

export default function DocumentChecklist() {
  const [selectedLoan, setSelectedLoan] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const getCurrentDocuments = () => {
    if (!selectedLoan || !employmentType) return [];
    const loanData = documentChecklists[selectedLoan as keyof typeof documentChecklists];
    return loanData[employmentType as keyof typeof loanData] as string[] || [];
  };

  const documents = getCurrentDocuments();
  const completionPercentage = documents.length > 0 ? Math.round((checkedItems.length / documents.length) * 100) : 0;

  const handleWhatsAppShare = () => {
    const loanTitle = selectedLoan ? documentChecklists[selectedLoan as keyof typeof documentChecklists].title : '';
    const checkedDocs = documents.filter(doc => checkedItems.includes(doc));
    const uncheckedDocs = documents.filter(doc => !checkedItems.includes(doc));
    
    const message = `Hi FiNNGUARD Capital! I'm preparing documents for ${loanTitle}.

✅ Documents I have ready:
${checkedDocs.map(doc => `• ${doc}`).join('\n')}

📋 Documents I still need:
${uncheckedDocs.map(doc => `• ${doc}`).join('\n')}

Completion: ${completionPercentage}%

Please guide me on the next steps.`;

    // Fixed WhatsApp Web URL format for pre-filled messages
    window.open(`https://web.whatsapp.com/send?phone=919497544143&text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Document Checklist</h2>
          <p className="text-xl text-slate-600">Prepare your documents for a smooth loan application process</p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Select Your Loan Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Loan Type</label>
                <Select value={selectedLoan} onValueChange={setSelectedLoan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Loan</SelectItem>
                    <SelectItem value="car">Car Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                    <SelectItem value="lap">Loan Against Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Employment Type</label>
                <Select value={employmentType} onValueChange={(value) => {
                  setEmploymentType(value);
                  setCheckedItems([]); // Reset checked items when employment type changes
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="selfEmployed">Self Employed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {documents.length > 0 && (
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {documentChecklists[selectedLoan as keyof typeof documentChecklists].title} - {employmentType === 'salaried' ? 'Salaried' : 'Self Employed'}
                </CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
                  <div className="text-sm text-slate-500">Complete</div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {documents.map((document, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      checkedItems.includes(document)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                    onClick={() => toggleCheck(document)}
                  >
                    {checkedItems.includes(document) ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                    <span className={`flex-1 ${
                      checkedItems.includes(document) 
                        ? 'text-green-800 font-medium' 
                        : 'text-slate-700'
                    }`}>
                      {document}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleWhatsAppShare}
                  className="bg-green-600 hover:bg-green-700 flex-1"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Share Progress on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.print()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Print Checklist
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Important Notes:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• All documents should be self-attested copies</li>
                  <li>• Original documents required for verification</li>
                  <li>• Documents should be recent and valid</li>
                  <li>• Additional documents may be required based on your profile</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedLoan || !employmentType ? (
          <Card className="shadow-xl">
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">Select Loan Type & Employment</h3>
              <p className="text-slate-500">Choose your loan type and employment status to see the required documents</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </section>
  );
}