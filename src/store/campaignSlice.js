import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  campaignDetails: {
    businessUrl: '',
    productTitle: '',
    currency: 'USD',
    productPrice: '',
    productDescription: '',
    startDate: '',
    endDate: '', 
    callToAction: '',
    budget: '',
    targetLocation: '',
    selectedOutcome: '',   // <-- NEW
    leadFormData: null,
    imageHash: '' ,
    geoLocations: {      // <-- NEW FIELD
      custom_locations: []
    }
  },
  adSetsData: null,
  finalCampaignData: null,
  isLoading: false,
  error: null
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    updateCampaignField: (state, action) => {
      const { field, value } = action.payload
      state.campaignDetails[field] = value
    },
    updateCampaignDetails: (state, action) => {
      state.campaignDetails = { ...state.campaignDetails, ...action.payload }
    },
    setCampaignLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCampaignOutcome: (state, action) => {
      state.campaignDetails.selectedOutcome = action.payload
    },
    setLeadFormData: (state, action) => {
      state.campaignDetails.leadFormData = action.payload
    },
    setImageHash: (state, action) => {
      state.campaignDetails.imageHash = action.payload
    },
    setGeoLocations: (state, action) => {
      state.campaignDetails.geoLocations.custom_locations = action.payload
    },
     // New reducer to store ad sets response
     setAdSetsData: (state, action) => {
      state.adSetsData = action.payload
    },
     // New reducer to store final campaign run data
     setFinalCampaignData: (state, action) => {
      state.finalCampaignData = action.payload
    },
    
    
    setCampaignError: (state, action) => {
      state.error = action.payload
    },
    resetCampaign: (state) => {
      state.campaignDetails = initialState.campaignDetails
      state.adSetsData = null
      state.finalCampaignData = null
      state.error = null
    }
  }
})

export const {
  updateCampaignField,
  updateCampaignDetails,
  setCampaignLoading,
  setCampaignError,
  resetCampaign,
  setCampaignOutcome,
  setImageHash,
  setLeadFormData,
  setGeoLocations,
  setAdSetsData,
  setFinalCampaignData
} = campaignSlice.actions

export default campaignSlice.reducer