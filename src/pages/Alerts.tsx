import { useState } from "react";
import { 
  Calendar, 
  AlertTriangle, 
  Bell, 
  Settings,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const expiringItems = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    batch: "B001",
    expiryDate: "2024-02-15",
    daysLeft: 3,
    stock: 50,
    urgency: "critical"
  },
  {
    id: 2,
    name: "Vitamin C Tablets",
    batch: "B002", 
    expiryDate: "2024-02-18",
    daysLeft: 6,
    stock: 25,
    urgency: "warning"
  },
  {
    id: 3,
    name: "Cough Syrup",
    batch: "B003",
    expiryDate: "2024-02-25",
    daysLeft: 13,
    stock: 12,
    urgency: "info"
  }
];

const lowStockItems = [
  {
    id: 1,
    name: "Bandages",
    currentStock: 5,
    minStock: 20,
    category: "Medical Supplies",
    lastOrdered: "2024-01-10"
  },
  {
    id: 2,
    name: "Hand Sanitizer",
    currentStock: 8,
    minStock: 25,
    category: "Hygiene",
    lastOrdered: "2024-01-15"
  }
];

const Alerts = () => {
  const [alertSettings, setAlertSettings] = useState({
    expiryDays: 7,
    stockAlerts: true,
    expiryAlerts: true,
    emailNotifications: false
  });
  const { toast } = useToast();

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "info":
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleMarkAsRead = (itemId: number, type: string) => {
    toast({
      title: "Alert Dismissed",
      description: `${type} alert has been marked as read.`,
    });
  };

  const handleUpdateSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Alert preferences have been saved successfully!",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expiry & Alerts</h1>
          <p className="text-muted-foreground">Monitor expiring products and stock alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <Badge variant="destructive">
            {expiringItems.length + lowStockItems.length} alerts
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="expiry" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expiry">Expiry Alerts</TabsTrigger>
          <TabsTrigger value="stock">Stock Alerts</TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="expiry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-warning" />
                Products Expiring Soon
              </CardTitle>
              <CardDescription>
                Items expiring within the next {alertSettings.expiryDays} days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiringItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-warning" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Batch: {item.batch} • Stock: {item.stock} units
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {item.daysLeft} days left
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {item.expiryDate}
                        </p>
                      </div>
                      
                      {getUrgencyBadge(item.urgency)}
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(item.id, "expiry")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Low Stock Alerts
              </CardTitle>
              <CardDescription>
                Items that need to be restocked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.category} • Last ordered: {item.lastOrdered}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {item.currentStock}/{item.minStock}
                        </p>
                        <p className="text-xs text-destructive">
                          Reorder needed
                        </p>
                      </div>
                      
                      <Badge variant="destructive">Low Stock</Badge>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMarkAsRead(item.id, "stock")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Alert Preferences
              </CardTitle>
              <CardDescription>
                Configure your notification settings and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Stock Level Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when products are running low
                    </p>
                  </div>
                  <Switch
                    checked={alertSettings.stockAlerts}
                    onCheckedChange={(checked) =>
                      setAlertSettings({ ...alertSettings, stockAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Expiry Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about products nearing expiry
                    </p>
                  </div>
                  <Switch
                    checked={alertSettings.expiryAlerts}
                    onCheckedChange={(checked) =>
                      setAlertSettings({ ...alertSettings, expiryAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email (requires backend)
                    </p>
                  </div>
                  <Switch
                    checked={alertSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setAlertSettings({ ...alertSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDays">Expiry Alert Days</Label>
                  <Input
                    id="expiryDays"
                    type="number"
                    value={alertSettings.expiryDays}
                    onChange={(e) =>
                      setAlertSettings({ ...alertSettings, expiryDays: parseInt(e.target.value) || 7 })
                    }
                    className="w-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Show alerts for products expiring within this many days
                  </p>
                </div>
              </div>

              <Button onClick={handleUpdateSettings} className="w-full">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;