import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  getFirestore,
  where,
} from "firebase/firestore";
import { app } from "@/contexts/FirebaseContext";
import {
  Card, CardHeader, CardContent, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Gift, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const db = getFirestore(app);

const Donations = () => {
  const [stats, setStats] = useState({
    totalAmount: 0,
    totalDonations: 0,
    uniqueNGOs: 0,
    uniqueDonors: 0,
  });
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      const donationsSnap = await getDocs(collection(db, "donations"));
      const allDonations = donationsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      const annSnap = await getDocs(query(collection(db, "announcements"), where("type", "==", "Donation")));
      
      const totalAmount = allDonations.reduce((a, c) => a + (c.amount || 0), 0);
      const uniqueNGOs = new Set(allDonations.map(d => d.ngo)).size;
      const uniqueDonors = new Set(allDonations.map(d => d.user)).size;

      setStats({
        totalAmount,
        totalDonations: allDonations.length,
        uniqueNGOs,
        uniqueDonors,
      });

      const campaignsList: any[] = [];
      for (const docSnap of annSnap.docs) {
        const ann = docSnap.data();
        const received = ann.donation?.reduce((a: number, x: any) => a + (x.amount || 0), 0) || 0;
        campaignsList.push({
          id: docSnap.id,
          title: ann.title,
          ngo: ann.ngo,
          address: ann.address,
          target: ann.target?.amount || 0,
          urgency: ann.target?.urgency,
          received,
        });
      }
      setCampaigns(campaignsList);
    };

    loadStats();
  }, []);

  const urgencyColor = (u: string) => {
    return {
      Critical: "bg-red-100 text-red-800",
      High: "bg-orange-100 text-orange-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-green-100 text-green-800",
    }[u] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-8">
      {/* Admin Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Donations", value: `RM ${stats.totalAmount.toLocaleString()}`, icon: Heart },
          { title: "Donation Events", value: stats.totalDonations, icon: Gift },
          { title: "NGOs Receiving", value: stats.uniqueNGOs, icon: TrendingUp },
          { title: "Unique Donors", value: stats.uniqueDonors, icon: Users },
        ].map((item, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <item.icon className="h-8 w-8 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ongoing Donation Campaigns */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Active Donation Campaigns</h2>
        <div className="space-y-4">
          {campaigns.map(c => {
            const percent = c.target > 0 ? Math.min(100, Math.round((c.received / c.target) * 100)) : 0;
            return (
              <Card key={c.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{c.title}</h3>
                    <Badge className={urgencyColor(c.urgency)}>{c.urgency}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{c.address}</p>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    RM {c.received.toLocaleString()} of RM {c.target.toLocaleString()} ({percent}%)
                  </p>
                  <Button variant="outline" disabled>
                    Monitor Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
          {campaigns.length === 0 && (
            <p className="text-center text-gray-500">No active donation campaigns found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donations;
