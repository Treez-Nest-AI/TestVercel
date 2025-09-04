// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Header } from "@/components/Header";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setCampaignOutcome, setLeadFormData } from "@/store/campaignSlice"; 
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Loader2 } from "lucide-react";
// import axios from "axios";

// export default function PlatformSelection() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const campaignDetails = useSelector((state: any) => state.campaign.campaignDetails);

// console.log("Redux Campaign State:", campaignDetails);

//   const [selectedPlatform, setSelectedPlatform] = useState<string>("meta");
//   const [showLeadFormModal, setShowLeadFormModal] = useState(false);
//   const [leadFormName, setLeadFormName] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
//   const [isSubmittingLeadForm, setIsSubmittingLeadForm] = useState(false);

  
//   const handleMetaOptionSelect = (option: string) => {
//     if (option === "lead-form") {
//       dispatch(setCampaignOutcome("OUTCOME_LEADS"));
//       console.log("Selected Outcome:", "OUTCOME_LEADS");
//       setShowLeadFormModal(true);
//     } else if (option === "website-visit") {
//       dispatch(setCampaignOutcome("OUTCOME_TRAFFIC"));
//       console.log("Selected Outcome:", "OUTCOME_TRAFFIC");
//       navigate("/campaign-setup");
//     } else if (option === "website-purchase") {
//       dispatch(setCampaignOutcome("OUTCOME_SALES"));
//       console.log("Selected Outcome:", "OUTCOME_SALES");
//       navigate("/campaign-setup");
//     } else if (option === "brand-awareness") {
//       dispatch(setCampaignOutcome("OUTCOME_PURCHASE"));
//       console.log("Selected Outcome:", "OUTCOME_PURCHASE");
//       navigate("/campaign-setup");
//     }
//   };


//   const handleMetaSelect = () => {
//     setSelectedPlatform("meta");
//     navigate("/campaign-setup");
//   };

//   const handleBack = () => {
//     navigate("/pricing");
//   };
//   const handleConnectMeta = () => {
//     // Here you would normally do OAuth login with Meta.
//     // For now, just simulate connection success:
//     setIsConnected(true);
//   };

 

//   const handleLeadFormSubmit = async () => {
//     setIsSubmittingLeadForm(true);
    
//     try {
//       const res = await axios.post(
//         "https://dot123456.app.n8n.cloud/webhook/lead-form-generator",
//         {
//           product_name: leadFormName,
//           page_id: "148571201675742",
//         }
//       );

//       // Example response: [{"lead_form_id":"1300727318074695"}]
//       if (res.data) {
//         dispatch(setLeadFormData(res.data));
//         console.log("Lead Form Data Stored:", res.data); 
//       }

//       setShowLeadFormModal(false);
//       navigate("/campaign-setup");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsSubmittingLeadForm(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-white font-bold text-xl">T</span>
//             </div>
//             <h1 className="text-4xl font-bold mb-4">Choose Your Platform</h1>
//             <p className="text-xl text-muted-foreground">
//               Select the advertising platform to create your campaign
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//             {/* META Platform */}
//             <div className="bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-glow hover:-translate-y-1 border-primary shadow-glow">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M24 12.073c0-6.627-5.373-12-12-12s-12 
//                     5.373-12 12c0 5.99 4.388 10.954 10.125 
//                     11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 
//                     1.792-4.669 4.533-4.669 1.312 0 
//                     2.686.235 2.686.235v2.953H15.83c-1.491 
//                     0-1.956.925-1.956 1.874v2.25h3.328l-.532 
//                     3.47h-2.796v8.385C19.612 23.027 
//                     24 18.062 24 12.073z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">META</h3>
//                 <p className="text-muted-foreground">
//                   Facebook & Instagram Advertising
//                 </p>
//               </div>

//               {!isConnected ? (
//                 <div className="text-center">
//                   <Button onClick={handleConnectMeta} className="w-full">
//                     Connect to Meta
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 gap-4">
//                   <div
//                     className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
//                     onClick={() => handleMetaOptionSelect("brand-awareness")}
//                   >
//                     <div className="font-semibold mb-1">Brand Awareness</div>
//                   </div>
//                   <div
//                     className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
//                     onClick={() => handleMetaOptionSelect("lead-form")}
//                   >
//                     <div className="font-semibold mb-1">Lead Form</div>
//                   </div>
//                   <div
//                     className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
//                     onClick={() => handleMetaOptionSelect("website-visit")}
//                   >
//                     <div className="font-semibold mb-1">Website Visit</div>
//                   </div>
//                   <div
//                     className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80"
//                     onClick={() => handleMetaOptionSelect("website-purchase")}
//                   >
//                     <div className="font-semibold mb-1">Website Purchase</div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Lead Form Modal */}
//             <Dialog
//               open={showLeadFormModal}
//               onOpenChange={setShowLeadFormModal}
//             >
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Create Lead Form</DialogTitle>
//                 </DialogHeader>

//                 <div className="space-y-4">
//                   <label
//                     className="block text-sm font-medium"
//                     htmlFor="lead-form-name-input"
//                   >
//                     Lead Form Name
//                   </label>
//                   <input
//                     id="lead-form-name-input"
//                     className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
//                     type="text"
//                     placeholder="Enter form name"
//                     value={leadFormName}
//                     onChange={(e) => setLeadFormName(e.target.value)}
//                   />
//                 </div>

//                 <DialogFooter className="mt-6">
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowLeadFormModal(false)}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleLeadFormSubmit}
//                     disabled={!leadFormName.trim() || isSubmittingLeadForm}
//                   >
//                     {isSubmittingLeadForm ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       "Next"
//                     )}
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>

//             {/* Google Platform - Coming Soon */}
//             <div className="bg-card rounded-2xl p-8 border opacity-60 cursor-not-allowed">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
//                     1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
//                     3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       d="M12 23c2.97 0 5.46-.98 
//                     7.28-2.66l-3.57-2.77c-.98.66-2.23 
//                     1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
//                     20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
//                     8.55 1 10.22 1 12s.43 3.45 1.18 
//                     4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       d="M12 5.38c1.62 0 
//                     3.06.56 4.21 1.64l3.15-3.15C17.45 
//                     2.09 14.97 1 12 1 7.7 1 3.99 3.47 
//                     2.18 7.07l3.66 2.84c.87-2.6 
//                     3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">GOOGLE</h3>
//                 <p className="text-muted-foreground">
//                   Google Ads & YouTube Advertising
//                 </p>
//                 <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
//                   Coming Soon
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4 opacity-50">
//                 <div className="bg-muted rounded-lg p-4 text-center">
//                   <div className="font-semibold mb-1">Search Ads</div>
//                 </div>
//                 <div className="bg-muted rounded-lg p-4 text-center">
//                   <div className="font-semibold mb-1">Display Ads</div>
//                 </div>
//                 <div className="bg-muted rounded-lg p-4 text-center">
//                   <div className="font-semibold mb-1">YouTube Ads</div>
//                 </div>
//                 <div className="bg-muted rounded-lg p-4 text-center">
//                   <div className="font-semibold mb-1">Shopping Ads</div>
//                 </div>
//               </div>
//             </div>
//             {/* LinkedIn Platform - Coming Soon */}
// <div className="bg-card rounded-2xl p-8 border opacity-60 cursor-not-allowed">
//   <div className="text-center mb-6">
//     <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
//       <svg
//         className="w-8 h-8 text-white"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M20.45 20.45h-3.55v-5.36c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83v5.46H9.52V9h3.41v1.56h.05c.47-.9 1.62-1.84 3.34-1.84 3.57 0 4.23 2.35 4.23 5.41v6.32zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.15.92-2.08 2.06-2.08 1.15 0 2.08.93 2.08 2.08 0 1.14-.93 2.07-2.08 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.24.79 24 1.77 24h20.46c.97 0 1.77-.76 1.77-1.73V1.72C24 .77 23.2 0 22.23 0z"/>
//       </svg>
//     </div>
//     <h3 className="text-2xl font-bold mb-2">LINKEDIN</h3>
//     <p className="text-muted-foreground">
//       LinkedIn Ads & B2B Marketing
//     </p>
//     <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
//       Coming Soon
//     </div>
//   </div>
//   <div className="grid grid-cols-2 gap-4 opacity-50">
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Sponsored Content</div>
//     </div>
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Message Ads</div>
//     </div>
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Dynamic Ads</div>
//     </div>
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Text Ads</div>
//     </div>
//   </div>
// </div>


// {/* Amazon Platform - Coming Soon */}
// <div className="bg-card rounded-2xl p-8 border opacity-60 cursor-not-allowed">
//   <div className="text-center mb-6">
//     <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
//       <svg
//         className="w-8 h-8 text-white"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M19.36 18.77c-1.44.99-3.5 1.65-5.44 1.65-4.55 0-8.2-3.44-8.2-8.19 0-4.67 3.65-8.41 8.34-8.41 3.61 0 6.62 2.12 7.62 5.08.19.57-.11 1.2-.68 1.39l-2.86.93c-.53.17-1.1-.1-1.28-.63-.42-1.28-1.59-2.08-2.8-2.08-2.03 0-3.38 1.55-3.38 3.72 0 2.3 1.43 3.79 3.38 3.79 1.2 0 2.34-.44 2.8-1.38.18-.36.58-.58.99-.47l2.94.77c.6.16.9.82.54 1.34-.63.91-1.61 1.72-2.97 2.48z" />
//         <path d="M20.49 20.92c-1.77 1.29-4.31 2.08-6.61 2.08-3.1 0-6.14-1.2-8.39-3.35a.61.61 0 0 1 .79-.91c2.04 1.33 4.53 2.07 7.13 2.07 1.94 0 3.91-.47 5.62-1.43a.61.61 0 0 1 .85.21c.18.27.1.64-.15.83zM21.79 19.74c-.24.32-.68.38-.99.14-1.07-.82-3.17-1.76-4.78-1.76-.39 0-.7-.31-.7-.7s.31-.7.7-.7c2.1 0 4.53 1.07 5.89 2.1.3.22.36.65.13.92l-.25.28z" />
//       </svg>
//     </div>
//     <h3 className="text-2xl font-bold mb-2">AMAZON</h3>
//     <p className="text-muted-foreground">
//       Amazon Ads & Marketplace Advertising
//     </p>
//     <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
//       Coming Soon
//     </div>
//   </div>
//   <div className="grid grid-cols-2 gap-4 opacity-50">
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Sponsored Products</div>
//     </div>
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Sponsored Brands</div>
//     </div>
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Sponsored Display</div>
//     </div>
//     <div className="bg-muted rounded-lg p-4 text-center">
//       <div className="font-semibold mb-1">Video Ads</div>
//     </div>
//   </div>
// </div>

//           </div>

//           <div className="text-center">
//             <Button
//               variant="link"
//               onClick={handleBack}
//               className="text-muted-foreground"
//             >
//               Back to Payment
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCampaignOutcome, setLeadFormData } from "@/store/campaignSlice"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle, User } from "lucide-react";
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
  const [isConnecting, setIsConnecting] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Check URL parameters for OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    if (error) {
      console.error('OAuth error:', error);
      setIsConnecting(false);
      // Handle error - show message to user
      return;
    }
    
    if (code) {
      // Handle successful OAuth callback
      handleOAuthCallback(code);
    }
    
    // Check if user is already connected (from localStorage or your state management)
    const savedUserInfo = localStorage.getItem('metaUserInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsConnected(true);
    }
  }, []);

  const handleOAuthCallback = async (code: string) => {
    setIsConnecting(true);
    try {
      // Exchange code for access token - you'll need to implement this endpoint
      const response = await axios.post('/api/oauth/meta/callback', {
        code: code,
        redirect_uri: 'https://teadifyz.ai/oauth2/callback'
      });
      
      if (response.data.success) {
        setUserInfo(response.data.user);
        setIsConnected(true);
        localStorage.setItem('metaUserInfo', JSON.stringify(response.data.user));
        localStorage.setItem('metaAccessToken', response.data.access_token);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectMeta = () => {
    setIsConnecting(true);
    
    // Meta OAuth URL
    const clientId = "620998346680108";
    const redirectUri = "https://test-vercel-beta-sepia.vercel.app/oauth2/callback";
    const scope = "public_profile,email,ads_management,pages_show_list,business_management,pages_manage_ads,pages_read_engagement";
    
    const oauthUrl = `https://www.facebook.com/v23.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&state=${Math.random().toString(36)}`;
    
    // Open OAuth URL in the same window
    window.location.href = oauthUrl;
  };

  const handleDisconnectMeta = () => {
    setIsConnected(false);
    setUserInfo(null);
    localStorage.removeItem('metaUserInfo');
    localStorage.removeItem('metaAccessToken');
  };
  
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

              {isConnecting ? (
                <div className="text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Connecting to Meta...</p>
                </div>
              ) : !isConnected ? (
                <div className="text-center">
                  <Button onClick={handleConnectMeta} className="w-full">
                    Connect to Meta
                  </Button>
                </div>
              ) : (
                <div>
                  {/* Connected User Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">Connected Successfully</span>
                    </div>
                    {userInfo && (
                      <div className="flex items-center justify-center space-x-2">
                        {userInfo.picture ? (
                          <img
                            src={userInfo.picture}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <User className="w-8 h-8 text-gray-400" />
                        )}
                        <div className="text-sm">
                          <p className="font-medium">{userInfo.name}</p>
                          <p className="text-gray-600">{userInfo.email}</p>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDisconnectMeta}
                      className="w-full mt-2"
                    >
                      Disconnect
                    </Button>
                  </div>

                  {/* Campaign Options */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => handleMetaOptionSelect("brand-awareness")}
                    >
                      <div className="font-semibold mb-1">Brand Awareness</div>
                    </div>
                    <div
                      className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => handleMetaOptionSelect("lead-form")}
                    >
                      <div className="font-semibold mb-1">Lead Form</div>
                    </div>
                    <div
                      className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => handleMetaOptionSelect("website-visit")}
                    >
                      <div className="font-semibold mb-1">Website Visit</div>
                    </div>
                    <div
                      className="bg-muted rounded-lg p-4 text-center cursor-pointer hover:bg-muted/80 transition-colors"
                      onClick={() => handleMetaOptionSelect("website-purchase")}
                    >
                      <div className="font-semibold mb-1">Website Purchase</div>
                    </div>
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

            {/* LinkedIn Platform - Coming Soon */}
            <div className="bg-card rounded-2xl p-8 border opacity-60 cursor-not-allowed">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.45 20.45h-3.55v-5.36c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83v5.46H9.52V9h3.41v1.56h.05c.47-.9 1.62-1.84 3.34-1.84 3.57 0 4.23 2.35 4.23 5.41v6.32zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.15.92-2.08 2.06-2.08 1.15 0 2.08.93 2.08 2.08 0 1.14-.93 2.07-2.08 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.24.79 24 1.77 24h20.46c.97 0 1.77-.76 1.77-1.73V1.72C24 .77 23.2 0 22.23 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">LINKEDIN</h3>
                <p className="text-muted-foreground">
                  LinkedIn Ads & B2B Marketing
                </p>
                <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                  Coming Soon
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 opacity-50">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Sponsored Content</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Message Ads</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Dynamic Ads</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Text Ads</div>
                </div>
              </div>
            </div>

            {/* Amazon Platform - Coming Soon */}
            <div className="bg-card rounded-2xl p-8 border opacity-60 cursor-not-allowed">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.36 18.77c-1.44.99-3.5 1.65-5.44 1.65-4.55 0-8.2-3.44-8.2-8.19 0-4.67 3.65-8.41 8.34-8.41 3.61 0 6.62 2.12 7.62 5.08.19.57-.11 1.2-.68 1.39l-2.86.93c-.53.17-1.1-.1-1.28-.63-.42-1.28-1.59-2.08-2.8-2.08-2.03 0-3.38 1.55-3.38 3.72 0 2.3 1.43 3.79 3.38 3.79 1.2 0 2.34-.44 2.8-1.38.18-.36.58-.58.99-.47l2.94.77c.6.16.9.82.54 1.34-.63.91-1.61 1.72-2.97 2.48z" />
                    <path d="M20.49 20.92c-1.77 1.29-4.31 2.08-6.61 2.08-3.1 0-6.14-1.2-8.39-3.35a.61.61 0 0 1 .79-.91c2.04 1.33 4.53 2.07 7.13 2.07 1.94 0 3.91-.47 5.62-1.43a.61.61 0 0 1 .85.21c.18.27.1.64-.15.83zM21.79 19.74c-.24.32-.68.38-.99.14-1.07-.82-3.17-1.76-4.78-1.76-.39 0-.7-.31-.7-.7s.31-.7.7-.7c2.1 0 4.53 1.07 5.89 2.1.3.22.36.65.13.92l-.25.28z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">AMAZON</h3>
                <p className="text-muted-foreground">
                  Amazon Ads & Marketplace Advertising
                </p>
                <div className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
                  Coming Soon
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 opacity-50">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Sponsored Products</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Sponsored Brands</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Sponsored Display</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <div className="font-semibold mb-1">Video Ads</div>
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