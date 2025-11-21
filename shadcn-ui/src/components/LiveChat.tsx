import { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp, openTel } from '@/lib/contact';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickMessages = [
    'I want to apply for a home loan',
    'What are your interest rates?',
    'I need help with loan eligibility',
    'I want to check my application status',
    'I need help with documentation'
  ];

  const handleQuickMessage = (message: string) => {
    const whatsappMessage = `Hi FiNNGUARD Capital! ${message}. Please help me with more information.`;
    openWhatsApp(whatsappMessage);
    setIsOpen(false);
  };

  const handleWhatsAppChat = () => {
    const message = "Hi FiNNGUARD Capital! I'm interested in your loan services. Please help me.";
    openWhatsApp(message);
    setIsOpen(false);
  };

  const handleCustomMessage = () => {
    if (!customMessage.trim()) return;
    
    const whatsappMessage = `Hi FiNNGUARD Capital! ${customMessage}`;
    openWhatsApp(whatsappMessage);
    setCustomMessage('');
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomMessage();
    }
  };

  const handleCall = () => {
    openTel();
  };

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <Card className="w-80 mb-4 shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Chat with Us</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-green-800 p-1"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-green-100">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-sm">We're online now!</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  👋 Hi! How can we help you today? Choose a quick option below or type your message.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Quick Options:</p>
                {quickMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(message)}
                    className="w-full text-left p-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {message}
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={handleCustomMessage}
                    size="icon"
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!customMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleWhatsAppChat}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="flex-1 text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Available: Mon-Sat, 9 AM - 7 PM
                </p>
                <p className="text-xs text-slate-500">
                  Response time: Usually within 5 minutes
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl animate-bounce"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Floating Contact Info */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40">
          <div className="bg-white rounded-lg shadow-lg p-3 border animate-in slide-in-from-right-2 duration-500 delay-1000">
            <p className="text-sm font-medium text-slate-800">Need help?</p>
            <p className="text-xs text-slate-600">Chat with our loan experts</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-green-600">Online now</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}