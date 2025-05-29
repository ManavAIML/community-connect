
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle, 
  MessageCircle, 
  Send,
  MapPin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const HelpCenter = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      id: 1,
      question: "How do I register a complaint?",
      answer: "To register a complaint, go to the 'Report Issue' section, select the appropriate category, fill in the required details including location, description (minimum 40 words), and priority level. You'll receive a complaint ID upon successful submission."
    },
    {
      id: 2,
      question: "What is the status of my complaint?",
      answer: "You can track your complaint status in the 'My Complaints' section. The status will be one of: Pending (awaiting assignment), Assigned (given to an employee), In Progress (work has started), or Resolved (issue fixed)."
    },
    {
      id: 3,
      question: "How long does it take to resolve complaints?",
      answer: "We aim to resolve complaints within 10 working days. High priority issues are addressed faster. You'll receive updates via SMS/email as the status changes."
    },
    {
      id: 4,
      question: "Can I upload photos with my complaint?",
      answer: "Yes, you can upload photos to help illustrate the issue. This helps our team better understand and address the problem. Supported formats are PNG and JPG, up to 5MB each."
    },
    {
      id: 5,
      question: "What happens if I submit a false complaint?",
      answer: "False or fraudulent complaints may result in a 15-day suspension of your account and phone number. Please ensure all complaints are genuine and accurate."
    }
  ];

  const emergencyNumbers = [
    { service: "Police Emergency", number: "100" },
    { service: "Fire Emergency", number: "101" },
    { service: "Medical Emergency", number: "108" },
    { service: "Disaster Helpline", number: "1078" },
    { service: "Municipal Helpline", number: "1800-XXX-XXXX" }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    console.log('Chat message:', chatMessage);
    setChatMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Help Center</h2>
        <p className="text-gray-600">Find answers to common questions or get in touch with our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency & Contact Information */}
        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergencyNumbers.map((emergency, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-red-700">{emergency.service}</span>
                    <a 
                      href={`tel:${emergency.number}`}
                      className="font-bold text-red-800 hover:underline"
                    >
                      {emergency.number}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">Support Email</p>
                  <a 
                    href="mailto:testprofilecode@gmail.com"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    testprofilecode@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-sm text-gray-600">24/7 for emergencies</p>
                  <p className="text-sm text-gray-600">9 AM - 6 PM for general queries</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="font-medium">Municipal Office</p>
                  <p className="text-sm text-gray-600">123 Government Complex,</p>
                  <p className="text-sm text-gray-600">City Center, State - 123456</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border rounded-lg">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="p-4 pt-0 border-t bg-gray-50">
                        <p className="text-sm text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Chatbot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                AI Assistant
              </CardTitle>
              <CardDescription>Ask our AI assistant for quick help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 h-64 mb-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hello! I'm here to help you with Community Connect. What would you like to know?</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleChatSubmit} className="flex space-x-2">
                <Input
                  placeholder="Type your question here..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Can't find what you're looking for? Send us a detailed message</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question in detail..."
                    className="min-h-32"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
