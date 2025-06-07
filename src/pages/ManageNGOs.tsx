
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
  Check, 
  X, 
  Shield,
  Users,
  AlertCircle
} from "lucide-react";

const ManageNGOs = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newNGO, setNewNGO] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    region: "",
    type: "",
    description: "",
    website: "",
  });

  const [ngos, setNGOs] = useState([
    {
      id: 1,
      name: "Women's Aid Organisation (WAO)",
      email: "info@wao.org.my",
      phone: "+603-7956-3488",
      address: "P.O. Box 493, Jalan Sultan, 46760 Petaling Jaya, Selangor",
      region: "Kuala Lumpur",
      type: "Women's Shelter",
      description: "Supporting women and children affected by violence",
      website: "https://wao.org.my",
      verified: true,
      status: "Active",
      dateAdded: "2023-01-15",
    },
    {
      id: 2,
      name: "Befrienders KL",
      email: "info@befrienders.org.my",
      phone: "+603-7627-2929",
      address: "95 Jalan Templer, 46000 Petaling Jaya, Selangor",
      region: "Kuala Lumpur",
      type: "Mental Health",
      description: "24/7 emotional support and suicide prevention",
      website: "https://befrienders.org.my",
      verified: true,
      status: "Active",
      dateAdded: "2023-02-20",
    },
    {
      id: 3,
      name: "New Hope Center",
      email: "contact@newhope.my",
      phone: "+603-5566-7788",
      address: "123 Jalan Harapan, 40000 Shah Alam, Selangor",
      region: "Selangor",
      type: "Community Support",
      description: "Community support and rehabilitation programs",
      website: "https://newhope.my",
      verified: false,
      status: "Pending",
      dateAdded: "2024-01-10",
    },
  ]);

  const handleCreateNGO = () => {
    const id = Math.max(...ngos.map(n => n.id)) + 1;
    const createdNGO = {
      id,
      ...newNGO,
      verified: false,
      status: "Pending",
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setNGOs([...ngos, createdNGO]);
    setNewNGO({
      name: "",
      email: "",
      phone: "",
      address: "",
      region: "",
      type: "",
      description: "",
      website: "",
    });
    setIsCreating(false);
  };

  const handleApprove = (id: number) => {
    setNGOs(ngos.map(ngo => 
      ngo.id === id 
        ? { ...ngo, verified: true, status: "Active" }
        : ngo
    ));
  };

  const handleReject = (id: number) => {
    setNGOs(ngos.map(ngo => 
      ngo.id === id 
        ? { ...ngo, status: "Rejected" }
        : ngo
    ));
  };

  const handleDelete = (id: number) => {
    setNGOs(ngos.filter(ngo => ngo.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pendingCount = ngos.filter(ngo => ngo.status === "Pending").length;
  const activeCount = ngos.filter(ngo => ngo.status === "Active").length;
  const verifiedCount = ngos.filter(ngo => ngo.verified).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage NGOs</h1>
          <p className="text-gray-600">Add, edit, and verify NGO organizations</p>
        </div>
        
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New NGO
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total NGOs</p>
                <p className="text-2xl font-bold">{ngos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold">{verifiedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Check className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New NGO Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Add New NGO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Organization Name</Label>
                <Input
                  id="name"
                  value={newNGO.name}
                  onChange={(e) => setNewNGO({ ...newNGO, name: e.target.value })}
                  placeholder="Enter NGO name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newNGO.email}
                  onChange={(e) => setNewNGO({ ...newNGO, email: e.target.value })}
                  placeholder="contact@ngo.org"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newNGO.phone}
                  onChange={(e) => setNewNGO({ ...newNGO, phone: e.target.value })}
                  placeholder="+603-1234-5678"
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={newNGO.website}
                  onChange={(e) => setNewNGO({ ...newNGO, website: e.target.value })}
                  placeholder="https://ngo.org"
                />
              </div>
              
              <div>
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={newNGO.region}
                  onChange={(e) => setNewNGO({ ...newNGO, region: e.target.value })}
                  placeholder="Kuala Lumpur"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={newNGO.type}
                  onChange={(e) => setNewNGO({ ...newNGO, type: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select type</option>
                  <option value="Women's Shelter">Women's Shelter</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Child Protection">Child Protection</option>
                  <option value="Community Support">Community Support</option>
                  <option value="Women's Rights">Women's Rights</option>
                </select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newNGO.address}
                onChange={(e) => setNewNGO({ ...newNGO, address: e.target.value })}
                placeholder="Full address"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newNGO.description}
                onChange={(e) => setNewNGO({ ...newNGO, description: e.target.value })}
                placeholder="Brief description of the organization"
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateNGO}>
                Create NGO
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* NGO List */}
      <div className="space-y-4">
        {ngos.map((ngo) => (
          <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{ngo.name}</h3>
                    <Badge className={getStatusColor(ngo.status)}>
                      {ngo.status}
                    </Badge>
                    {ngo.verified && (
                      <Badge className="bg-green-100 text-green-800 flex items-center">
                        <Shield className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p><span className="font-medium">Type:</span> {ngo.type}</p>
                      <p><span className="font-medium">Region:</span> {ngo.region}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Email:</span> {ngo.email}</p>
                      <p><span className="font-medium">Phone:</span> {ngo.phone}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Added:</span> {ngo.dateAdded}</p>
                      <p><span className="font-medium">Website:</span> {ngo.website}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mt-2">{ngo.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{ngo.address}</p>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {ngo.status === "Pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(ngo.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(ngo.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(ngo.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(ngo.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ngos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No NGOs found. Add your first NGO to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ManageNGOs;
