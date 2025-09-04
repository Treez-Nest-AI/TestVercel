import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "@/components/Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCampaignOutcome, setLeadFormData } from "@/store/campaignSlice"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function PlatformSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campaignDetails = useSelector((state: any) => state.campaign.campaignDetails);

console.log("Redux Campaign State:", campaignDetails);

  const [selectedPlatform, setSelectedPlatform] = useState<string>("meta");
  const [showLeadFormModal, setShowLeadFormModal] = useState(false);
  const [leadFormName, setLeadFormName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmittingLeadForm, setIsSubmittingLeadForm] = useState(false);

  
  const handleMetaOptionSelect = (option: string) => {
    if (option === "lead-form") {
      dispatch(setCampaignOutcome("OUTCOME_LEADS"));
      console.log("Selected Outcome:", "OUTCOME_LEADS");
      setShowLeadFormModal(true);
    } else if (option === "website-visit") {
      dispatch(setCampaignOutcome("OUTCOME_TRAFFIC"));
      console.log("Selected Outcome:", "OUTCOME_TRAFFIC");
      navigate("/campaign-setup");
    } else if (option === "website-purchase") {
      dispatch(setCampaignOutcome("OUTCOME_SALES"));
      console.log("Selected Outcome:", "OUTCOME_SALES");
      navigate("/campaign-setup");
    } else if (option === "brand-awareness") {
      dispatch(setCampaignOutcome("OUTCOME_PURCHASE"));
      console.log("Selected Outcome:", "OUTCOME_PURCHASE");
      navigate("/campaign-setup");
    }
  };


  const handleMetaSelect = () => {
    setSelectedPlatform("meta");
    navigate("/campaign-setup");
  };

  const handleBack = () => {
    navigate("/pricing");
  };
  const handleConnectMeta = () => {
    // Here you would normally do OAuth login with Meta.
    // For now, just simulate connection success:
    setIsConnected(true);
  };

 

  const handleLeadFormSubmit = async () => {
    setIsSubmittingLeadForm(true);
    
    try {
      const res = await axios.post(
        "https://dot123456.app.n8n.cloud/webhook/lead-form-generator",
        {
          product_name: leadFormName,
          page_id: "148571201675742",
        }
      );

      // Example response: [{"lead_form_id":"1300727318074695"}]
      if (res.data) {
        dispatch(setLeadFormData(res.data));
        console.log("Lead Form Data Stored:", res.data); 
      }

      setShowLeadFormModal(false);
      navigate("/campaign-setup");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingLeadForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Choose Your Platform</h1>
            <p className="text-xl text-muted-foreground">
              Select the advertising platform to create your campaign
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* META Platform */}
            <div className="bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-glow hover:-translate-y-1 border-primary shadow-glow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 
                    5.373-12 12c0 5.99 4.388 10.954 10.125 
                    11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 
                    1.792-4.669 4.533-4.669 1.312 0 
                    2.686.235 2.686.235v2.953H15.83c-1.491 
                    0-1.956.925-1.956 1.874v2.25h3.328l-.532 
                    3.47h-2.796v8.385C19.612 23.027 
                    24 18.062 24 12.073z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">META</h3>
                <p className="text-muted-foreground">
                  Facebook & Instagram Advertising
                </p>
              </div>

              {!isConnected ? (
                <div className="text-center">
                  <Button onClick={handleConnectMeta} className="w-full">
                    Connect to Meta
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
                    onClick={() => handleMetaOptionSelect("brand-awareness")}
                  >
                    <div className="font-semibold mb-1">Brand Awareness</div>
                  </div>
                  <div
                    className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
                    onClick={() => handleMetaOptionSelect("lead-form")}
                  >
                    <div className="font-semibold mb-1">Lead Form</div>
                  </div>
                  <div
                    className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
                    onClick={() => handleMetaOptionSelect("website-visit")}
                  >
                    <div className="font-semibold mb-1">Website Visit</div>
                  </div>
                  <div
                    className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
                    onClick={() => handleMetaOptionSelect("website-purchase")}
                  >
                    <div className="font-semibold mb-1">Website Purchase</div>
                  </div>
                </div>
              )}
            </div>

            {/* Lead Form Modal */}
            <Dialog
              open={showLeadFormModal}
              onOpenChange={setShowLeadFormModal}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Lead Form</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <label
                    className="block text-sm font-medium"
                    htmlFor="lead-form-name-input"
                  >
                    Lead Form Name
                  </label>
                  <input
                    id="lead-form-name-input"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    placeholder="Enter form name"
                    value={leadFormName}
                    onChange={(e) => setLeadFormName(e.target.value)}
                  />
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowLeadFormModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLeadFormSubmit}
                    disabled={!leadFormName.trim() || isSubmittingLeadForm}
                  >
                    {isSubmittingLeadForm ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Next"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Google Platform - Coming Soon */}
            <div className="bg-card rounded-2xl p-8 border opacity-60 cursor-not-allowed">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
                    1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
                    3.28-4.74 3.28-8.09z"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 
                    7.28-2.66l-3.57-2.77c-.98.66-2.23 
                    1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
                    20.53 7.7 23 12 23z"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                    8.55 1 10.22 1 12s.43 3.45 1.18 
                    4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      d="M12 5.38c1.62 0 
                    3.06.56 4.21 1.64l3.15-3.15C17.45 
                    2.09 14.97 1 12 1 7.7 1 3.99 3.47 
                    2.18 7.07l3.66 2.84c.87-2.6 
                    3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">GOOGLE</h3>
                <p className="text-muted-foreground">
                  Google Ads & YouTube Advertising
                </p>
                <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                  Coming Soon
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 opacity-50">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Search Ads</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Display Ads</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">YouTube Ads</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Shopping Ads</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={handleBack}
              className="text-muted-foreground"
            >
              Back to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
