import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { registerNGO } from "@/api/ngo";

const NgoRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ngo_name: "",
    ngo_contact: "",
    ngo_email: "",
    personal_name: "",
    personal_contact: "",
    personal_email: "",
    website: "",
    verification_document: "",
    address: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerNGO(form);
      alert("NGO registration submitted. We will contact you soon.");
      navigate("/login");
    } catch (error: any) {
      console.error("NGO registration error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to SilentSOS+
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Registration</h1>
          <p className="text-gray-600">Apply to join SilentSOS+ as an organization</p>
        </div>

        {/* Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Register Your NGO</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="ngo_name"
                  type="text"
                  value={form.ngo_name}
                  onChange={(e) => setForm({ ...form, ngo_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="ngo_contact"
                  type="text"
                  value={form.ngo_contact}
                  onChange={(e) => setForm({ ...form, ngo_contact: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="ngo_email"
                  type="email"
                  value={form.ngo_email}
                  onChange={(e) => setForm({ ...form, ngo_email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="personal_name">Personal Name</Label>
                <Input
                  id="personal_name"
                  type="text"
                  value={form.personal_name}
                  onChange={(e) => setForm({ ...form, personal_name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="personal_contact">Personal Contact Number</Label>
                <Input
                  id="personal_contact"
                  type="text"
                  value={form.personal_contact}
                  onChange={(e) => setForm({ ...form, personal_contact: e.target.value })}
                  placeholder="Your Contact Number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="personal_email">Personal Email Address</Label>
                <Input
                  id="personal_email"
                  type="email"
                  value={form.personal_email}
                  onChange={(e) => setForm({ ...form, personal_email: e.target.value })}
                  placeholder="Your Email Address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://example.org"
                />
              </div>

              <div>
                <Label htmlFor="verification_document">Verification Document URL</Label>
                <Input
                  id="verification_document"
                  type="url"
                  value={form.verification_document}
                  onChange={(e) =>
                    setForm({ ...form, verification_document: e.target.value })
                  }
                  placeholder="Link to document (e.g. Google Drive)"
                />
              </div>

              <div>
                <Label htmlFor="address">Organization Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter your organization address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                  placeholder="Tell us more about your organization"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a secure password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Submit Registration
              </Button>

              <p className="text-center text-sm text-gray-600 mt-2">
                Already registered? <Link to="/login" className="text-blue-600">Login</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NgoRegister;
