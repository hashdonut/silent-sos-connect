
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Heart, 
  Phone, 
  Lock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  MessageSquare
} from "lucide-react";

const HelpForm = () => {
  const [formData, setFormData] = useState({
    helpType: "",
    urgency: "",
    state: "",
    message: "",
    contactMethod: "",
    anonymous: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const helpTypes = [
    "Domestic Violence Support",
    "Mental Health Crisis", 
    "Child Protection",
    "Sexual Assault Support",
    "Emergency Shelter",
    "Legal Assistance",
    "Counseling Services",
    "Financial Support",
    "General Information",
    "Other"
  ];

  const urgencyLevels = [
    { value: "emergency", label: "Emergency - Need Help Now", color: "bg-red-100 text-red-800" },
    { value: "urgent", label: "Urgent - Within 24 Hours", color: "bg-orange-100 text-orange-800" },
    { value: "soon", label: "Soon - Within a Few Days", color: "bg-yellow-100 text-yellow-800" },
    { value: "general", label: "General Inquiry", color: "bg-blue-100 text-blue-800" }
  ];

  const malaysianStates = [
    "Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend securely
    console.log("Help request submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-900 mb-4">Help Request Received</h2>
            <p className="text-green-800 mb-6 text-lg">
              Your request has been securely received and will be reviewed by our partner NGOs. 
              You will be contacted using your preferred method within the timeframe you specified.
            </p>
            <div className="bg-white p-6 rounded-lg border border-green-200 mb-6">
              <h3 className="font-semibold text-green-900 mb-3">Next Steps:</h3>
              <ul className="text-left text-green-800 space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Our verified NGOs will review your request
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  You'll be contacted by the most appropriate organization
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  All communication will be confidential and secure
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline" 
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Submit Another Request
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-4 w-4" />
                Emergency: 999
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Help Safely</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Reach out to our verified NGO partners anonymously and securely. 
          Your privacy and safety are our top priorities.
        </p>
      </div>

      {/* Emergency Warning */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-900">In Immediate Danger?</h3>
          </div>
          <p className="text-red-800 mb-4">
            If you are in immediate danger or need emergency assistance right now, please call emergency services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-red-600 hover:bg-red-700">
              <Phone className="mr-2 h-4 w-4" />
              Call 999 (Emergency)
            </Button>
            <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
              Talian Kasih: 15999
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">Your Privacy & Security</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              <span>All submissions are encrypted</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>Anonymous option available</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              <span>Verified NGOs only</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Request Form */}
      <Card className="border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Anonymous Help Request
          </CardTitle>
          <p className="text-gray-600">
            Fill out this secure form to get connected with the right support services
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Help Type */}
            <div>
              <Label htmlFor="helpType" className="text-base font-medium">
                What type of help do you need? *
              </Label>
              <select
                id="helpType"
                required
                value={formData.helpType}
                onChange={(e) => setFormData({ ...formData, helpType: e.target.value })}
                className="w-full p-3 border rounded-lg mt-1"
              >
                <option value="">Select type of help needed</option>
                {helpTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Urgency */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                How urgent is your situation? *
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {urgencyLevels.map((level) => (
                  <label
                    key={level.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.urgency === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={level.value}
                      checked={formData.urgency === level.value}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="sr-only"
                      required
                    />
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{level.label}</span>
                      <Badge className={level.color} variant="secondary">
                        {level.value}
                      </Badge>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="state" className="text-base font-medium">
                Which state are you in? *
              </Label>
              <select
                id="state"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-3 border rounded-lg mt-1"
              >
                <option value="">Select your state</option>
                {malaysianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-base font-medium">
                Tell us more about your situation *
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please share as much or as little as you're comfortable with. This helps us connect you with the most appropriate support services."
                rows={5}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Minimum 20 characters. All information is kept strictly confidential.
              </p>
            </div>

            {/* Contact Method */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                How would you prefer to be contacted?
              </Label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="anonymous"
                    checked={formData.contactMethod === "anonymous"}
                    onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Anonymous - No Contact</span>
                    <p className="text-sm text-gray-600">
                      Just provide me with resource information and contact details
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="secure_message"
                    checked={formData.contactMethod === "secure_message"}
                    onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Secure Message</span>
                    <p className="text-sm text-gray-600">
                      Contact me through this secure platform
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === "phone"}
                    onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Phone Call</span>
                    <p className="text-sm text-gray-600">
                      I'll provide a safe number to call (you'll be asked for this on next page)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <Shield className="mr-2 h-5 w-5" />
                Submit Secure Help Request
              </Button>
              <p className="text-sm text-gray-500 text-center mt-3">
                By submitting, you agree that verified NGOs may contact you using your preferred method
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-purple-600" />
            Immediate Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Emergency Hotlines</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Emergency Services:</span>
                  <span className="font-semibold text-red-600">999</span>
                </div>
                <div className="flex justify-between">
                  <span>Talian Kasih (24/7):</span>
                  <span className="font-semibold text-blue-600">15999</span>
                </div>
                <div className="flex justify-between">
                  <span>Befrienders KL:</span>
                  <span className="font-semibold text-green-600">03-7627-2929</span>
                </div>
                <div className="flex justify-between">
                  <span>WAO Crisis Line:</span>
                  <span className="font-semibold text-purple-600">03-7956-3488</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Safety Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Trust your instincts - if something feels wrong, it probably is
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Use safe devices and private browsing when seeking help
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Have a safety plan and tell someone you trust
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Remember: It's not your fault, and help is available
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpForm;
