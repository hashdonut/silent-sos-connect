
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  DollarSign,
  MapPin,
  AlertCircle,
  TrendingUp,
  Users,
  Heart
} from "lucide-react";

const DonationManagement = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newDonation, setNewDonation] = useState({
    title: "",
    description: "",
    type: "Material",
    state: "",
    crisisType: "",
    items: "",
    monetaryGoal: "",
    urgency: "Medium",
    deadline: "",
  });

  const [donations, setDonations] = useState([
    {
      id: 1,
      title: "Emergency Baby Supplies",
      description: "Urgent need for baby formula, diapers, and baby clothes for new shelter residents",
      type: "Material",
      state: "Kuala Lumpur",
      crisisType: "Domestic Violence",
      items: ["Baby formula", "Diapers", "Baby clothes", "Baby bottles"],
      monetaryGoal: null,
      currentAmount: 0,
      urgency: "Critical",
      deadline: "2024-01-25",
      dateCreated: "2024-01-15",
      donations: 12,
      fulfilled: false,
      ngo: "Women's Aid Organisation"
    },
    {
      id: 2,
      title: "Mental Health Training Fund",
      description: "Funding needed for crisis intervention training program for our volunteers",
      type: "Monetary",
      state: "Kuala Lumpur",
      crisisType: "Mental Health",
      items: null,
      monetaryGoal: 15000,
      currentAmount: 8750,
      urgency: "High",
      deadline: "2024-01-30",
      dateCreated: "2024-01-10",
      donations: 23,
      fulfilled: false,
      ngo: "Befrienders KL"
    },
    {
      id: 3,
      title: "Back-to-School Support",
      description: "School supplies and uniforms needed for children in our care",
      type: "Material",
      state: "Selangor",
      crisisType: "Child Protection",
      items: ["School uniforms", "Books", "Stationery", "School bags"],
      monetaryGoal: null,
      currentAmount: 0,
      urgency: "Medium",
      deadline: "2024-02-15",
      dateCreated: "2024-01-12",
      donations: 8,
      fulfilled: false,
      ngo: "Shelter Home for Children"
    },
    {
      id: 4,
      title: "Women's Empowerment Workshop",
      description: "Complete package for domestic violence survivors including items and funding",
      type: "Both",
      state: "Penang",
      crisisType: "Domestic Violence",
      items: ["Women's clothing", "Personal care items", "Professional attire"],
      monetaryGoal: 8000,
      currentAmount: 5200,
      urgency: "High",
      deadline: "2024-01-28",
      dateCreated: "2024-01-08",
      donations: 15,
      fulfilled: false,
      ngo: "Persatuan Kebajikan Wanita Penang"
    }
  ]);

  const malaysianStates = [
    "Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Kedah",
    "Kelantan", "Terengganu", "Pahang", "Negeri Sembilan", "Melaka", "Sabah", "Sarawak"
  ];

  const crisisTypes = [
    "Domestic Violence", "Mental Health", "Child Protection", 
    "Homelessness", "Women's Rights", "Crisis Support", "Emergency Relief"
  ];

  const handleCreateDonation = () => {
    const id = Math.max(...donations.map(d => d.id)) + 1;
    const createdDonation = {
      id,
      ...newDonation,
      items: newDonation.items ? newDonation.items.split(',').map(item => item.trim()) : null,
      monetaryGoal: newDonation.monetaryGoal ? parseInt(newDonation.monetaryGoal) : null,
      currentAmount: 0,
      dateCreated: new Date().toISOString().split('T')[0],
      donations: 0,
      fulfilled: false,
      ngo: "Current NGO" // This would come from auth context
    };
    setDonations([...donations, createdDonation]);
    setNewDonation({
      title: "",
      description: "",
      type: "Material",
      state: "",
      crisisType: "",
      items: "",
      monetaryGoal: "",
      urgency: "Medium",
      deadline: "",
    });
    setIsCreating(false);
  };

  const handleDelete = (id: number) => {
    setDonations(donations.filter(donation => donation.id !== id));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalDonations = donations.length;
  const activeDonations = donations.filter(d => !d.fulfilled).length;
  const totalFundsRaised = donations.reduce((sum, d) => sum + (d.currentAmount || 0), 0);
  const totalDonors = donations.reduce((sum, d) => sum + d.donations, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donation Management</h1>
          <p className="text-gray-600">Manage your organization's donation requests and campaigns</p>
        </div>
        
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Donation Request
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{totalDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Active Requests</p>
                <p className="text-2xl font-bold">{activeDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Funds Raised</p>
                <p className="text-2xl font-bold">RM {totalFundsRaised.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Donors</p>
                <p className="text-2xl font-bold">{totalDonors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Donation Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Donation Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newDonation.title}
                  onChange={(e) => setNewDonation({ ...newDonation, title: e.target.value })}
                  placeholder="Brief title for your donation request"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newDonation.type}
                  onChange={(e) => setNewDonation({ ...newDonation, type: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Material">Material Items</option>
                  <option value="Monetary">Monetary</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="state">State</Label>
                <select
                  id="state"
                  value={newDonation.state}
                  onChange={(e) => setNewDonation({ ...newDonation, state: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select state</option>
                  {malaysianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="crisisType">Crisis Type</Label>
                <select
                  id="crisisType"
                  value={newDonation.crisisType}
                  onChange={(e) => setNewDonation({ ...newDonation, crisisType: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select crisis type</option>
                  {crisisTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <select
                  id="urgency"
                  value={newDonation.urgency}
                  onChange={(e) => setNewDonation({ ...newDonation, urgency: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newDonation.deadline}
                  onChange={(e) => setNewDonation({ ...newDonation, deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newDonation.description}
                onChange={(e) => setNewDonation({ ...newDonation, description: e.target.value })}
                placeholder="Detailed description of what you need and why"
                rows={3}
              />
            </div>
            
            {(newDonation.type === "Material" || newDonation.type === "Both") && (
              <div>
                <Label htmlFor="items">Items Needed (comma-separated)</Label>
                <Input
                  id="items"
                  value={newDonation.items}
                  onChange={(e) => setNewDonation({ ...newDonation, items: e.target.value })}
                  placeholder="e.g., Baby formula, Diapers, Baby clothes"
                />
              </div>
            )}
            
            {(newDonation.type === "Monetary" || newDonation.type === "Both") && (
              <div>
                <Label htmlFor="monetaryGoal">Monetary Goal (RM)</Label>
                <Input
                  id="monetaryGoal"
                  type="number"
                  value={newDonation.monetaryGoal}
                  onChange={(e) => setNewDonation({ ...newDonation, monetaryGoal: e.target.value })}
                  placeholder="e.g., 5000"
                />
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={handleCreateDonation}>
                Create Request
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Donations List */}
      <div className="space-y-4">
        {donations.map((donation) => (
          <Card key={donation.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{donation.title}</h3>
                    <Badge className={getUrgencyColor(donation.urgency)}>
                      {donation.urgency}
                    </Badge>
                    <Badge variant="outline">
                      {donation.type}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{donation.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">NGO:</span> {donation.ngo}
                    </div>
                    <div>
                      <span className="font-medium">State:</span> {donation.state}
                    </div>
                    <div>
                      <span className="font-medium">Crisis Type:</span> {donation.crisisType}
                    </div>
                    <div>
                      <span className="font-medium">Deadline:</span> {donation.deadline}
                    </div>
                  </div>
                  
                  {donation.items && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Items Needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {donation.items.map((item: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {donation.monetaryGoal && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Funding Progress</span>
                        <span className="text-sm text-gray-600">
                          RM {donation.currentAmount.toLocaleString()} / RM {donation.monetaryGoal.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min((donation.currentAmount / donation.monetaryGoal) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((donation.currentAmount / donation.monetaryGoal) * 100)}% funded
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {donation.donations} donations
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {donation.state}
                    </div>
                    <div>Created: {donation.dateCreated}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(donation.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(donation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {donations.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No donation requests yet.</p>
          <p className="text-gray-400">Create your first donation request to get started.</p>
        </div>
      )}
    </div>
  );
};

export default DonationManagement;
