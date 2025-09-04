import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, Fragment } from "react";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import trash from "../../public/trash.png";
import google from "../../public/google-maps.png";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Heart, MessageCircle, Share, ThumbsUp } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/useRedux.js";
import { updateCampaignField, setCampaignLoading, setGeoLocations, setAdSetsData } from "@/store/campaignSlice";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "300px", // smaller map to fit inside your form
};

const center = { lat: 28.6139, lng: 77.209 }; // Default to Delhi

const radiusOptions = [10, 15, 20, 25, 30, 40, 50]; // in km

export default function CampaignSetup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const businessUrl = useAppSelector(
    (state) => state.campaign?.campaignDetails.businessUrl
  );

  console.log(businessUrl);
  const [isGenerating, setIsGenerating] = useState(false);


  // map use states
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);
  const autocompleteRef = useRef(null);

  // Get campaign data from Redux store
  const { campaignDetails, isLoading } = useAppSelector(
    (state) => state.campaign
  );
  console.log(campaignDetails);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDPq9MIskQ0LPm2j4DNZGHQrxcPA1aQAfM",
    libraries: ["places"],
  });

  const handleInputChange = (field, value) => {
    dispatch(updateCampaignField({ field, value }));
  };

  const handleCreateCampaign = async () => {
    const {
      businessUrl,
      productTitle,
      productPrice,
      productDescription,
      startDate,
      endDate,
      budget,
      geoLocations,
    } = campaignDetails;
  
    // Required field validation
    if (
      !businessUrl.trim() ||
      !productTitle.trim() ||
      !productPrice.trim() ||
      !productDescription.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !budget.trim() ||
      !geoLocations.custom_locations.length
    ) {
      toast.error("All fields are required including at least one location");
      return;
    }
    // ✅ Immediately show loading screen
  navigate("/loading");

  
    dispatch(setCampaignLoading(true));
  
    try {
      const body = {
        url: businessUrl,
        description: productDescription,
        price: productPrice,
        adsets_count: 1,
        call_to_action: "SIGN_UP",
        start_time: new Date(startDate).toISOString(),
        end_time: new Date(endDate).toISOString(),
        geo_locations: geoLocations,
        campaign_objective:campaignDetails.selectedOutcome,
      };
  
      const response = await axios.post(
        // "https://dot123456.app.n8n.cloud/webhook/adsets-creation",
        "https://dot123456.app.n8n.cloud/webhook/adsets-creation-openai-claude",
        body
      );
         // Store the complete ad sets response in Redux
    dispatch(setAdSetsData(response.data));
    console.log("API Response:", response.data);
  
      toast.success("Campaign created successfully!");
      console.log("API Response:", response.data);
  
          // ✅ Navigate to ad sets page (after success)
    navigate("/ad-sets");
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to create campaign. Try again.");
    } finally {
      dispatch(setCampaignLoading(false));
    }
  };
  
  const generateProductDescription = async () => {
    if (!businessUrl) {
      toast.error("Business URL is required to generate description");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post(
        "https://dot123456.app.n8n.cloud/webhook/prod-desc-gen",
        {
          url: businessUrl,
        }
      );

      // Extract description from the nested response structure
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const description = response.data[0]?.message?.content?.description;

        if (description) {
          // Update the product description in Redux
          dispatch(
            updateCampaignField({
              field: "productDescription",
              value: description,
            })
          );

          // Also call the parent handler if you want to maintain consistency
          handleInputChange("productDescription", description);

          toast.success("Product description generated successfully!");
        } else {
          toast.error("No description found in API response.");
        }
      } else {
        toast.error("Failed to generate description. Please try again.");
      }
    } catch (error) {
      console.error("Error generating product description:", error);

      if (error.response) {
        toast.error(`Failed to generate description: ${error.response.status}`);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to generate description. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };



  const handleBack = () => {
    navigate("/");
  };

  const handlePlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;
  
    const newLocation = {
      name: place.formatted_address || place.name,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      radius: 20 * 1000, // default 20 km
    };
  
    const updatedLocations = [...locations, newLocation];
    setLocations(updatedLocations);
    setMapCenter({ lat: newLocation.lat, lng: newLocation.lng });
  
    // Save in Redux format for API
    const customLocations = updatedLocations.map((loc) => ({
      latitude: loc.lat,
      longitude: loc.lng,
      radius: loc.radius / 1000, // in km
      distance_unit: "kilometer",
    }));
  
    dispatch(setGeoLocations(customLocations));
  };
  // Handle radius change
  const handleRadiusChange = (index, newRadius) => {
    const updated = [...locations];
    updated[index].radius = newRadius * 1000;
    setLocations(updated);
  
    // Update Redux
    const customLocations = updated.map((loc) => ({
      latitude: loc.lat,
      longitude: loc.lng,
      radius: loc.radius / 1000,
      distance_unit: "kilometer",
    }));
    dispatch(setGeoLocations(customLocations));
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Campaign Setup</h1>
            <p className="text-muted-foreground">
              Configure your ad campaign parameters for optimal performance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Campaign Form */}
            <div>
              <div className="bg-card rounded-2xl p-8 shadow-glow border">
                <form
                  className="space-y-8"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Product Information */}
                  <div>
                    <h2 className="text-xl font-semibold mb-6">
                      Product Information
                    </h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="productTitle">Product Title *</Label>
                        <Input
                          id="productTitle"
                          placeholder="Enter your product name"
                          value={campaignDetails.productTitle}
                          onChange={(e) =>
                            handleInputChange("productTitle", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Product Price *</Label>
                          <div className="flex">
                            <Select
                              value={campaignDetails.currency}
                              onValueChange={(value) =>
                                handleInputChange("currency", value)
                              }
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                                <SelectItem value="INR">INR</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="99.99"
                              className="ml-2"
                              value={campaignDetails.productPrice}
                              onChange={(e) =>
                                handleInputChange(
                                  "productPrice",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productDescription">
                          Product Description *
                        </Label>
                        <div className="relative">
                          <Textarea
                            id="productDescription"
                            placeholder="Describe your product features and benefits..."
                            className="min-h-[100px]"
                            value={campaignDetails.productDescription}
                            onChange={(e) =>
                              handleInputChange(
                                "productDescription",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>

                        {/* Generate with AI Button */}
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={generateProductDescription}
                            disabled={isGenerating || !businessUrl}
                            className="flex items-center gap-2"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4" />
                                Generate with AI
                              </>
                            )}
                          </Button>
                        </div>

                        {!businessUrl && (
                          <p className="text-xs text-muted-foreground">
                            Business URL required for AI generation
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Settings */}
                  <div>
                    <h2 className="text-xl font-semibold mb-6">
                      Campaign Settings
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={campaignDetails.startDate}
                            onChange={(e) =>
                              handleInputChange("startDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={campaignDetails.endDate}
                            onChange={(e) =>
                              handleInputChange("endDate", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="callToAction">Call to Action</Label>
                        <Select
                          value={campaignDetails.callToAction}
                          onValueChange={(value) =>
                            handleInputChange("callToAction", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select call to action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="shop_now">Shop Now</SelectItem>
                            <SelectItem value="learn_more">
                              Learn More
                            </SelectItem>
                            <SelectItem value="sign_up">Sign Up</SelectItem>
                            <SelectItem value="contact_us">
                              Contact Us
                            </SelectItem>
                            <SelectItem value="download">Download</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Daily Budget *</Label>
                        <div className="flex">
                          <Select
                            value={campaignDetails.currency}
                            onValueChange={(value) =>
                              handleInputChange("currency", value)
                            }
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                              <SelectItem value="INR">INR</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            placeholder="50"
                            className="ml-2"
                            value={campaignDetails.budget}
                            onChange={(e) =>
                              handleInputChange("budget", e.target.value)
                            }
                            required
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Daily budget for your campaign
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetLocation">
                          Target Location *
                        </Label>

                        {isLoaded ? (
                          <>
                            {/* Autocomplete input */}
                            <Autocomplete
                              onLoad={(ref) => (autocompleteRef.current = ref)}
                              onPlaceChanged={handlePlaceSelected}
                            >
                              <input
                                type="text"
                                placeholder="Enter city, state, or country"
                                className="border p-2 w-full rounded"
                              />
                            </Autocomplete>

                            {/* Map */}
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={mapCenter}
                              zoom={9}
                            >
                              {locations.map((loc, index) => (
                                <React.Fragment key={index}>
                                  <Marker
                                    position={{ lat: loc.lat, lng: loc.lng }}
                                  />
                                  <Circle
                                    center={{ lat: loc.lat, lng: loc.lng }}
                                    radius={loc.radius}
                                    options={{
                                      fillColor: "#3b82f6",
                                      fillOpacity: 0.1,
                                      strokeColor: "#2563eb",
                                      strokeOpacity: 0.6,
                                    }}
                                  />
                                </React.Fragment>
                              ))}
                            </GoogleMap>
                          </>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Loading map...
                          </p>
                        )}

                        {/* Preview */}
                        <div className="bg-gray-50 p-2 rounded mt-2 space-y-1">
                          <h3 className="font-semibold text-sm">
                            Selected Locations
                          </h3>
                          {locations.length === 0 && (
                            <p className="text-xs">No locations selected.</p>
                          )}
                          {locations.map((loc, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="flex items-center gap-2 text-green-500">
                                <img
                                  src={google}
                                  alt="google"
                                  className="w-8 h-8"
                                />{" "}
                                {loc.name} → {(loc.radius / 1000).toFixed(0)} km
                              </span>

                              <div className="flex items-center gap-2">
                                {/* Radius selector */}
                                <select
                                  value={loc.radius / 1000}
                                  onChange={(e) =>
                                    handleRadiusChange(index, e.target.value)
                                  }
                                  className="border p-1 rounded text-xs"
                                >
                                  {radiusOptions.map((r) => (
                                    <option key={r} value={r}>
                                      {r} km
                                    </option>
                                  ))}
                                </select>

                                {/* Delete button */}
                                <button
                                  onClick={() =>
                                    setLocations((prev) =>
                                      prev.filter((_, i) => i !== index)
                                    )
                                  }
                                  className="text-red-500 hover:text-red-700 text-xs"
                                >
                                  <img
                                    src={trash}
                                    alt="trash"
                                    className="w-8 h-8"
                                  />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      type="button"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleCreateCampaign}
                      className="px-8"
                      disabled={isLoading}
                    >
                      Create Campaign
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

