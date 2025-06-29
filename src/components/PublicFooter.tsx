
import { Heart, Shield, Phone } from "lucide-react";

const PublicFooter = () => {
  return (
    <footer className="bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">SilentSOS+</h3>
                <p className="text-sm text-gray-600">Emergency Support Network</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting those in need with verified NGOs and emergency responders across Malaysia. 
              Your safety and privacy are our top priorities.
            </p>
            <div className="flex items-center space-x-2 text-red-600">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">Emergency Hotline: 999</span>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/ngos" className="hover:text-blue-600">Find NGOs</a></li>
              <li><a href="/donate" className="hover:text-blue-600">Donate</a></li>
              <li><a href="/announcements" className="hover:text-blue-600">Latest News</a></li>
            </ul>
          </div> */}

          {/* Support */}
          {/* <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Safety Resources</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="/admin/login" className="hover:text-blue-600">NGO Partners</a></li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 SilentSOS+. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-500" /> for safety.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-500">
              Verified NGO Network • Safe • Confidential • Available 24/7
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
