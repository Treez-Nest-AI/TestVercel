// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { useNavigate } from "react-router-dom"
// import { Header } from "@/components/Header"
// import { 
//   Users, 
//   Target, 
//   DollarSign, 
//   Calendar, 
//   MapPin, 
//   Zap,
//   Eye,
//   Clock,
//   Globe,
//   UserCheck,
//   TrendingUp,
//   MessageSquare
// } from "lucide-react"
// import { useAppSelector, useAppDispatch } from "../store/useRedux.js"
// import { updateCampaignField } from "@/store/campaignSlice"
// import { useState } from "react"
// import { toast } from "sonner"

// export default function AdSets() {
//   const navigate = useNavigate()
//   const dispatch = useAppDispatch()
  
//   // Get ad sets data from Redux
//   const adSetsData = useAppSelector((state) => state.campaign.adSetsData)
//   const campaignDetails = useAppSelector((state) => state.campaign.campaignDetails)

//   // Image upload states
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [hash, setHash] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleNext = () => {
//     navigate('/final-payment')
//   }

//   const handleBack = () => {
//     navigate('/campaign-setup')
//   }

//   // Image upload functions
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setHash(""); // reset hash on new file
//     }
//   };

//   const handleCancel = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     setHash("");
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       const res = await fetch(
//         "https://dot123456.app.n8n.cloud/webhook/imghash-generator",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!res.ok) throw new Error("Upload failed");
//       const data = await res.json();

//       // Extract hash
//       const firstImageKey = Object.keys(data[0].images)[0];
//       const hash = data[0].images[firstImageKey].hash;

//       // Store in Redux
//       dispatch(updateCampaignField({ field: "imageHash", value: hash }));
//       console.log(hash);
//       setHash(data.hash || JSON.stringify(data)); // adjust based on API response
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to upload image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Helper function to format dates
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     })
//   }

//   // Helper function to get status color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'bg-green-100 text-green-800 border-green-200'
//       case 'paused':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200'
//       case 'pending':
//         return 'bg-blue-100 text-blue-800 border-blue-200'
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-200'
//     }
//   }

//   // If no ad sets data, show loading or empty state
//   if (!adSetsData || !adSetsData[0]?.ad_sets) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
//                 <span className="text-white font-bold text-xl">T</span>
//               </div>
//               <h1 className="text-3xl font-bold mb-2">No Ad Sets Found</h1>
//               <p className="text-muted-foreground mb-6">
//                 Please create a campaign first to view ad sets.
//               </p>
//               <Button onClick={handleBack}>
//                 Go to Campaign Setup
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const adSets = adSetsData[0].ad_sets

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-8">
//             <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-white font-bold text-xl">T</span>
//             </div>
//             <h1 className="text-3xl font-bold mb-2">Your Ad Sets</h1>
//             <p className="text-muted-foreground">
//               Review your campaign ad sets and targeting strategies. Your ads are ready to reach the right audience.
//             </p>
//           </div>

//           <div className="space-y-6">
//             {adSets.map((adSet, index) => (
//               <Card key={index} className="border shadow-glow overflow-hidden">
//                 <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
//                   <div className="flex items-start justify-between">
//                     <div className="space-y-3">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//                           <Target className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <CardTitle className="text-xl text-gray-900">{adSet.ad_set_name}</CardTitle>
//                           <p className="text-sm text-gray-600">Ad Set #{index + 1}</p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center space-x-4">
//                         <Badge className={`${getStatusColor(adSet.status)} font-medium`}>
//                           {adSet.status}
//                         </Badge>
//                         <div className="flex items-center space-x-1 text-sm text-gray-600">
//                           <Zap className="w-4 h-4" />
//                           <span>{adSet.campaign_objective?.replace('_', ' ')}</span>
//                         </div>
//                         <div className="flex items-center space-x-1 text-sm text-gray-600">
//                           <TrendingUp className="w-4 h-4" />
//                           <span>{adSet.optimization_goal}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
//                       <Eye className="w-4 h-4 mr-2" />
//                       View Details
//                     </Button>
//                   </div>
//                 </CardHeader>

//                 <CardContent className="p-6">
//                   {/* Campaign Duration & Budget */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                     <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
//                       <Calendar className="w-8 h-8 text-green-600" />
//                       <div>
//                         <p className="text-sm font-medium text-green-800">Campaign Duration</p>
//                         <p className="text-xs text-green-600">
//                           {formatDate(adSet.start_time)} - {formatDate(adSet.end_time)}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                       <DollarSign className="w-8 h-8 text-blue-600" />
//                       <div>
//                         <p className="text-sm font-medium text-blue-800">Budget Strategy</p>
//                         <p className="text-xs text-blue-600">{adSet.bid_strategy?.replace(/_/g, ' ')}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
//                       <MessageSquare className="w-8 h-8 text-purple-600" />
//                       <div>
//                         <p className="text-sm font-medium text-purple-800">Call to Action</p>
//                         <p className="text-xs text-purple-600">{adSet.call_to_action?.replace('_', ' ')}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Audience Targeting */}
//                   <div className="mb-6">
//                     <div className="flex items-center space-x-2 mb-3">
//                       <Users className="w-5 h-5 text-gray-600" />
//                       <h3 className="font-semibold text-gray-900">Audience Targeting</h3>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {/* Geographic Targeting */}
//                       <div className="p-4 border rounded-lg bg-gray-50">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <MapPin className="w-4 h-4 text-gray-600" />
//                           <p className="font-medium text-gray-800">Geographic</p>
//                         </div>
//                         <div className="space-y-1">
//                           {adSet.targeting?.geo_locations?.countries && (
//                             <p className="text-sm text-gray-600">
//                               Countries: {adSet.targeting.geo_locations.countries.join(', ')}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       {/* Demographics */}
//                       <div className="p-4 border rounded-lg bg-gray-50">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <UserCheck className="w-4 h-4 text-gray-600" />
//                           <p className="font-medium text-gray-800">Demographics</p>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-sm text-gray-600">
//                             Age: {adSet.targeting?.age_min}-{adSet.targeting?.age_max} years
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             Gender: {adSet.targeting?.genders?.includes(1) && adSet.targeting?.genders?.includes(2) ? 'All' : 'Targeted'}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Interests */}
//                     {adSet.targeting?.flexible_spec?.[0]?.interests && (
//                       <div className="mt-4 p-4 border rounded-lg bg-blue-50 border-blue-100">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <Target className="w-4 h-4 text-blue-600" />
//                           <p className="font-medium text-blue-800">Interest Targeting</p>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                           {adSet.targeting.flexible_spec[0].interests.map((interest, idx) => (
//                             <Badge key={idx} variant="outline" className="bg-white text-blue-700 border-blue-200">
//                               {interest.name}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Ad Placements */}
//                   <div className="mb-6">
//                     <div className="flex items-center space-x-2 mb-3">
//                       <Globe className="w-5 h-5 text-gray-600" />
//                       <h3 className="font-semibold text-gray-900">Ad Placements</h3>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="p-3 border rounded-lg">
//                         <p className="font-medium text-sm mb-2">Platforms</p>
//                         <div className="flex flex-wrap gap-2">
//                           {adSet.placements?.publisher_platforms?.map((platform, idx) => (
//                             <Badge key={idx} variant="secondary" className="capitalize">
//                               {platform}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div className="p-3 border rounded-lg">
//                         <p className="font-medium text-sm mb-2">Positions</p>
//                         <div className="flex flex-wrap gap-1">
//                           {adSet.placements?.facebook_positions?.map((position, idx) => (
//                             <Badge key={idx} variant="outline" className="text-xs">
//                               FB: {position}
//                             </Badge>
//                           ))}
//                           {adSet.placements?.instagram_positions?.map((position, idx) => (
//                             <Badge key={idx} variant="outline" className="text-xs">
//                               IG: {position}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Creative Content */}
//                   <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
//                     <div className="flex items-center space-x-2 mb-3">
//                       <MessageSquare className="w-5 h-5 text-purple-600" />
//                       <h3 className="font-semibold text-purple-900">Creative Content</h3>
//                     </div>
                    
//                     <div className="space-y-3">
//                       <div>
//                         <p className="font-medium text-sm text-purple-800">Headline</p>
//                         <p className="text-sm text-purple-700">{adSet.headline}</p>
//                       </div>
                      
//                       <div>
//                         <p className="font-medium text-sm text-purple-800">Primary Text</p>
//                         <p className="text-sm text-purple-700">{adSet.primary_text}</p>
//                       </div>

//                       <div>
//                         <p className="font-medium text-sm text-purple-800">Creative Brief</p>
//                         <p className="text-sm text-purple-700">{adSet.creative_brief}</p>
//                       </div>

//                       {/* Ad Copy Variations */}
//                       {adSet.ad_copy_variations && (
//                         <div>
//                           <p className="font-medium text-sm text-purple-800 mb-2">Ad Copy Variations</p>
//                           <div className="space-y-2">
//                             {adSet.ad_copy_variations.short_form && (
//                               <div>
//                                 <p className="text-xs text-purple-600 font-medium">Short Form:</p>
//                                 <ul className="text-xs text-purple-700 ml-2 space-y-1">
//                                   {adSet.ad_copy_variations.short_form.map((copy, idx) => (
//                                     <li key={idx}>• {copy}</li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                             {adSet.ad_copy_variations.long_form && (
//                               <div>
//                                 <p className="text-xs text-purple-600 font-medium">Long Form:</p>
//                                 <ul className="text-xs text-purple-700 ml-2 space-y-1">
//                                   {adSet.ad_copy_variations.long_form.map((copy, idx) => (
//                                     <li key={idx}>• {copy}</li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Campaign Summary */}
//           <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border shadow-glow">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">Campaign Summary</h3>
//                 <div className="space-y-1 text-sm">
//                   <p className="text-gray-600">
//                     Product: <span className="font-medium text-gray-800">{campaignDetails.productTitle || 'N/A'}</span>
//                   </p>
//                   <p className="text-gray-600">
//                     Total Ad Sets: <span className="font-medium text-gray-800">{adSets.length}</span> • 
//                     Active: <span className="font-medium text-green-600">{adSets.filter(ad => ad.status === 'ACTIVE').length}</span> • 
//                     Paused: <span className="font-medium text-yellow-600">{adSets.filter(ad => ad.status === 'PAUSED').length}</span>
//                   </p>
//                   <p className="text-gray-600">
//                     Campaign Duration: <span className="font-medium text-gray-800">
//                       {campaignDetails.startDate && campaignDetails.endDate 
//                         ? `${formatDate(campaignDetails.startDate)} - ${formatDate(campaignDetails.endDate)}`
//                         : 'N/A'}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-bold text-green-600">{campaignDetails.currency} {campaignDetails.budget || '0'}</p>
//                 <p className="text-sm text-gray-600">Daily Budget</p>
//               </div>
//             </div>
//           </div>

//           {/* Image Upload Section */}
//           <div className="mt-8 bg-white rounded-2xl shadow border max-w-xs mx-auto overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between px-4 py-3">
//               <div>
//                 <h3 className="font-semibold text-sm">
//                   {campaignDetails.productTitle || "Your Product Title"}
//                 </h3>
//                 <div className="text-[11px] text-gray-500">Sponsored</div>
//               </div>
//               <span className="text-gray-400 text-lg">⋮</span>
//             </div>

//             {/* Upload / Preview Section */}
//             <div className="relative w-full bg-black">
//               {previewUrl ? (
//                 <div className="relative">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="w-full max-h-80 object-contain bg-black"
//                   />
//                   {/* Cancel button (small) */}
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 text-xs"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ) : (
//                 <label className="flex flex-col items-center justify-center h-56 cursor-pointer text-gray-500 text-xs">
//                   Click to upload images/videos <br /> and preview here
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               )}
//             </div>

//             {/* Upload Button */}
//             {previewUrl && (
//               <div className="flex justify-end px-4 py-2">
//                 <Button
//                   className="bg-blue-600 text-white text-xs h-7 px-3 rounded-md"
//                   onClick={handleUpload}
//                   disabled={uploading}
//                 >
//                   {uploading ? "Uploading..." : "Upload"}
//                 </Button>
//               </div>
//             )}

//             {/* Footer */}
//             <div className="px-4 py-2 text-xs text-gray-600">
//               <p>
//                 {campaignDetails.productDescription ||
//                   "Describe your product features and benefits..."}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex justify-between px-4 py-2 border-t text-xs text-gray-600">
//               <span>Like</span>
//               <span>Comment</span>
//               <span>Share</span>
//             </div>
//           </div>

//           <div className="flex justify-between pt-8">
//             <Button variant="outline" onClick={handleBack}>
//               Back to Campaign Setup
//             </Button>
//             <Button onClick={handleNext} className="px-8">
//               Proceed to Payment
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import axios from "axios"
import { 
  Users, 
  Target, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Zap,
  Eye,
  Clock,
  Globe,
  UserCheck,
  TrendingUp,
  MessageSquare,
  Sparkles
} from "lucide-react"
import { useAppSelector, useAppDispatch } from "../store/useRedux.js"
import { updateCampaignField } from "@/store/campaignSlice"
import { useState } from "react"
import { toast } from "sonner"

export default function AdSets() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // Get ad sets data from Redux
  const adSetsData = useAppSelector((state) => state.campaign.adSetsData)
  const campaignDetails = useAppSelector((state) => state.campaign.campaignDetails)

  // Image upload states
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hash, setHash] = useState("");
  const [uploading, setUploading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  const handleNext = () => {
    navigate('/final-payment')
  }

  const handleBack = () => {
    navigate('/campaign-setup')
  }

  // Image upload functions
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setHash(""); // reset hash on new file
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setHash("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await fetch(
        "https://dot123456.app.n8n.cloud/webhook/imghash-generator",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      // Extract hash
      const firstImageKey = Object.keys(data[0].images)[0];
      const hash = data[0].images[firstImageKey].hash;

      // Store in Redux
      dispatch(updateCampaignField({ field: "imageHash", value: hash }));
      console.log(hash);
      setHash(data.hash || JSON.stringify(data)); // adjust based on API response
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // AI Image Generation function
  const handleAIImageGeneration = async () => {
    if (!campaignDetails.businessUrl || !campaignDetails.productTitle) {
      toast.error("Business URL and Product Title are required for AI image generation");
      return;
    }

    setGeneratingAI(true);
    try {
      const response = await axios.post(
        "https://dot123456.app.n8n.cloud/webhook/ai-img-generator",
        {
          url: campaignDetails.businessUrl,
          product_name: campaignDetails.productTitle,
          description: campaignDetails.productDescription || "",
          price: campaignDetails.productPrice || "",
          phone_no: "8524852554", // You can make this dynamic if needed
          location: campaignDetails.geoLocations?.custom_locations?.[0]?.latitude ? 
            `${campaignDetails.geoLocations.custom_locations[0].latitude},${campaignDetails.geoLocations.custom_locations[0].longitude}` : 
            "bengaluru,karnataka,india"
        }
      );

      console.log("AI Image Generation Response:", response.data);

      // Handle different possible response formats
      let imageUrl = null;
      let imageHash = null;

      if (response.data) {
        // Handle the new array response format with file ID
        if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].id) {
          const fileId = response.data[0].id;
          // Construct the URL using the n8n base URL and the file ID
          const n8nBaseUrl = "https://dot123456.app.n8n.cloud/";
          imageUrl = n8nBaseUrl + fileId.replace('filesystem-v2:', '');
          console.log("Constructed AI Image URL from ID:", imageUrl);
        }
        // Check for different possible response structures
        else if (response.data.image_url) {
          imageUrl = response.data.image_url;
        } else if (response.data.url) {
          imageUrl = response.data.url;
        } else if (response.data.image) {
          imageUrl = response.data.image;
        } else if (response.data.data && response.data.data.image_url) {
          imageUrl = response.data.data.image_url;
        } else if (response.data.data && response.data.data.url) {
          imageUrl = response.data.data.url;
        } else if (typeof response.data === 'string' && response.data.startsWith('http')) {
          imageUrl = response.data;
        }

        // Check for hash in different possible locations
        if (response.data.hash) {
          imageHash = response.data.hash;
        } else if (response.data.data && response.data.data.hash) {
          imageHash = response.data.data.hash;
        }
      }

      if (imageUrl) {
        // Set the generated image as preview
        setPreviewUrl(imageUrl);
        setSelectedFile(null); // Clear any selected file since we're using AI generated image
        
        // If the response includes a hash, store it
        if (imageHash) {
          dispatch(updateCampaignField({ field: "imageHash", value: imageHash }));
        }
        
        toast.success("AI image generated successfully!");
        console.log("Image URL set:", imageUrl);
      } else {
        console.error("No image URL found in response:", response.data);
        toast.error("No image URL found in API response. Please try again.");
      }
    } catch (error) {
      console.error("AI Image Generation Error:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        toast.error(`Failed to generate AI image: ${error.response.status} - ${error.response.data?.message || 'Server error'}`);
      } else {
        toast.error("Failed to generate AI image. Please try again.");
      }
    } finally {
      setGeneratingAI(false);
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // If no ad sets data, show loading or empty state
  if (!adSetsData || !adSetsData[0]?.ad_sets) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">No Ad Sets Found</h1>
              <p className="text-muted-foreground mb-6">
                Please create a campaign first to view ad sets.
              </p>
              <Button onClick={handleBack}>
                Go to Campaign Setup
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const adSets = adSetsData[0].ad_sets

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Ad Sets</h1>
            <p className="text-muted-foreground">
              Review your campaign ad sets and targeting strategies. Your ads are ready to reach the right audience.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Ad Sets & Summary */}
            <div className="lg:col-span-2 space-y-6">
              {adSets.map((adSet, index) => (
                <Card key={index} className="border shadow-glow overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-gray-900">{adSet.ad_set_name}</CardTitle>
                            <p className="text-sm text-gray-600">Ad Set #{index + 1}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge className={`${getStatusColor(adSet.status)} font-medium`}>
                            {adSet.status}
                          </Badge>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Zap className="w-4 h-4" />
                            <span>{adSet.campaign_objective?.replace('_', ' ')}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>{adSet.optimization_goal}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {/* Campaign Duration & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
                        <Calendar className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Campaign Duration</p>
                          <p className="text-xs text-green-600">
                            {formatDate(adSet.start_time)} - {formatDate(adSet.end_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <DollarSign className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Budget Strategy</p>
                          <p className="text-xs text-blue-600">{adSet.bid_strategy?.replace(/_/g, ' ')}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <MessageSquare className="w-8 h-8 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-purple-800">Call to Action</p>
                          <p className="text-xs text-purple-600">{adSet.call_to_action?.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Audience Targeting */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Users className="w-5 h-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Audience Targeting</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Geographic Targeting */}
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            <p className="font-medium text-gray-800">Geographic</p>
                          </div>
                          <div className="space-y-1">
                            {adSet.targeting?.geo_locations?.countries && (
                              <p className="text-sm text-gray-600">
                                Countries: {adSet.targeting.geo_locations.countries.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Demographics */}
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-2 mb-2">
                            <UserCheck className="w-4 h-4 text-gray-600" />
                            <p className="font-medium text-gray-800">Demographics</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              Age: {adSet.targeting?.age_min}-{adSet.targeting?.age_max} years
                            </p>
                            <p className="text-sm text-gray-600">
                              Gender: {adSet.targeting?.genders?.includes(1) && adSet.targeting?.genders?.includes(2) ? 'All' : 'Targeted'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Interests */}
                      {adSet.targeting?.flexible_spec?.[0]?.interests && (
                        <div className="mt-4 p-4 border rounded-lg bg-blue-50 border-blue-100">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-4 h-4 text-blue-600" />
                            <p className="font-medium text-blue-800">Interest Targeting</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {adSet.targeting.flexible_spec[0].interests.map((interest, idx) => (
                              <Badge key={idx} variant="outline" className="bg-white text-blue-700 border-blue-200">
                                {interest.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ad Placements */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Globe className="w-5 h-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">Ad Placements</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg">
                          <p className="font-medium text-sm mb-2">Platforms</p>
                          <div className="flex flex-wrap gap-2">
                            {adSet.placements?.publisher_platforms?.map((platform, idx) => (
                              <Badge key={idx} variant="secondary" className="capitalize">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-lg">
                          <p className="font-medium text-sm mb-2">Positions</p>
                          <div className="flex flex-wrap gap-1">
                            {adSet.placements?.facebook_positions?.map((position, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                FB: {position}
                              </Badge>
                            ))}
                            {adSet.placements?.instagram_positions?.map((position, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                IG: {position}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Creative Content */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold text-purple-900">Creative Content</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-purple-800">Headline</p>
                          <p className="text-sm text-purple-700">{adSet.headline}</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-sm text-purple-800">Primary Text</p>
                          <p className="text-sm text-purple-700">{adSet.primary_text}</p>
                        </div>

                        <div>
                          <p className="font-medium text-sm text-purple-800">Creative Brief</p>
                          <p className="text-sm text-purple-700">{adSet.creative_brief}</p>
                        </div>

                        {/* Ad Copy Variations */}
                        {adSet.ad_copy_variations && (
                          <div>
                            <p className="font-medium text-sm text-purple-800 mb-2">Ad Copy Variations</p>
                            <div className="space-y-2">
                              {adSet.ad_copy_variations.short_form && (
                                <div>
                                  <p className="text-xs text-purple-600 font-medium">Short Form:</p>
                                  <ul className="text-xs text-purple-700 ml-2 space-y-1">
                                    {adSet.ad_copy_variations.short_form.map((copy, idx) => (
                                      <li key={idx}>• {copy}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {adSet.ad_copy_variations.long_form && (
                                <div>
                                  <p className="text-xs text-purple-600 font-medium">Long Form:</p>
                                  <ul className="text-xs text-purple-700 ml-2 space-y-1">
                                    {adSet.ad_copy_variations.long_form.map((copy, idx) => (
                                      <li key={idx}>• {copy}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Campaign Summary */}
              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border shadow-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Campaign Summary</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        Product: <span className="font-medium text-gray-800">{campaignDetails.productTitle || 'N/A'}</span>
                      </p>
                      <p className="text-gray-600">
                        Total Ad Sets: <span className="font-medium text-gray-800">{adSets.length}</span> • 
                        Active: <span className="font-medium text-green-600">{adSets.filter(ad => ad.status === 'ACTIVE').length}</span> • 
                        Paused: <span className="font-medium text-yellow-600">{adSets.filter(ad => ad.status === 'PAUSED').length}</span>
                      </p>
                      <p className="text-gray-600">
                        Campaign Duration: <span className="font-medium text-gray-800">
                          {campaignDetails.startDate && campaignDetails.endDate 
                            ? `${formatDate(campaignDetails.startDate)} - ${formatDate(campaignDetails.endDate)}`
                            : 'N/A'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{campaignDetails.currency} {campaignDetails.budget || '0'}</p>
                    <p className="text-sm text-gray-600">Daily Budget</p>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-between pt-8">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button className="bg-gradient-primary text-white px-6" onClick={handleNext}>
                  Next Step
                </Button>
              </div>
            </div>

            {/* Right: Sticky Image Upload */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Image Upload Section */}
                <div className="bg-white rounded-2xl shadow border w-full overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <h3 className="font-semibold text-sm">
                        {campaignDetails.productTitle || "Your Product Title"}
                      </h3>
                      <div className="text-[11px] text-gray-500">Sponsored</div>
                    </div>
                    <span className="text-gray-400 text-lg">⋮</span>
                  </div>

                  {/* Upload / Preview Section */}
                  <div className="relative w-full bg-black">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full max-h-80 object-contain bg-black"
                        />
                        {/* Cancel button (small) */}
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-56 cursor-pointer text-gray-500 text-xs">
                        Click to upload images/videos <br /> and preview here
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>

                  {/* Upload Button */}
                  {previewUrl && (
                    <div className="flex justify-end px-4 py-2">
                      <Button
                        className="bg-blue-600 text-white text-xs h-7 px-3 rounded-md"
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  )}

                  {/* AI Image Generation Button */}
                  <div className="px-4 py-2">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs h-8 rounded-md"
                      onClick={handleAIImageGeneration}
                      disabled={generatingAI || !campaignDetails.businessUrl || !campaignDetails.productTitle}
                    >
                      {generatingAI ? (
                        <>
                          <Sparkles className="w-3 h-3 mr-2 animate-spin" />
                          Generating AI Image...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                    {(!campaignDetails.businessUrl || !campaignDetails.productTitle) && (
                      <p className="text-xs text-gray-500 mt-1 text-center">
                        Business URL and Product Title required
                      </p>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 text-xs text-gray-600">
                    <p>
                      {campaignDetails.productDescription ||
                        "Describe your product features and benefits..."}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between px-4 py-2 border-t text-xs text-gray-600">
                    <span>Like</span>
                    <span>Comment</span>
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
