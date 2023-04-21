import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosClient } from './AxiosClient'

export const getInventoryAsync = createAsyncThunk(
  'dashboard/inventoryanalysis',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('GET', '/v1/summary-dashboard/inventory-analysis-summary', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getImportAsync = createAsyncThunk(
  'dashboard/importanalysis',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('GET', '/v1/summary-dashboard/import-analysis-summary', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)
// Get Competitor Analysis Map Data
export const getSuppliersByCountries = createAsyncThunk(
  'competitoranalysis/worldmap',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/competitor-analysis-dashboard/competitors-weight-distribution`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

// Get Competitor Analysis Map Data
export const getSuppliersByCountriesForDonut = createAsyncThunk(
  'competitoranalysis/donut',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/competitor-analysis-dashboard/competitors-weight-distribution`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

export const getChartDataLeftChart = createAsyncThunk(
  'competitoranalysis/barchartleft',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/competitor-analysis-dashboard/competitors-weight-distribution`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)
export const getChartDataRightChart = createAsyncThunk(
  'competitoranalysis/barchartright',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/competitor-analysis-dashboard/competitors-weight-distribution`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

// Get Competitor Analysis Filters
export const getCompetitorAnalysisFilters = createAsyncThunk(
  'competitoranalysis/filters',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/competitor-analysis-dashboard/get-filters`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const alternativeSuppliersByProduct = createAsyncThunk(
  'scorecard/alernatesupplersbyproduct',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/supplier-scorecard/alternative-suppliers-by-supplier`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

export const getProductBySupplier = createAsyncThunk(
  'scorecard/productbysuppliers',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/supplier-scorecard/product-by-this-supplier`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getSuppilerDetailsandExposures = createAsyncThunk(
  'scorecard/supplierdetailsandexposures',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/supplier-scorecard/supplier-details-and-exposures`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)
export const getProductCategory = createAsyncThunk(
  'summarydashboard/productCategory',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'GET',
      `/v1/summary-dashboard/product-category-wise-avg-risks`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

export const getTopSelectionSupplier = createAsyncThunk(
  'alix/topselection',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('GET', `v1/top-selection/suppliers/get-suppliers-information`, [], {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getRiskSelectionData = createAsyncThunk(
  'config/riskselection',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'GET',
      `/v1/risk-selection/risk/get-risk-config-information`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)
export const getupdateRiskData = createAsyncThunk(
  'config/updaterisk',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('PATCH', `/v1/risk-selection/risk/update-risk-config`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getCountryList = createAsyncThunk(
  'alix/allcountrylist',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('GET', `/v1/top-selection/suppliers/get-country-list`, [], {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const uploadProductsDataFromExcel = createAsyncThunk(
  'datamanagement/uploadexcel',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/data-mgmt/upload/add-supplier`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getDrillDownData = createAsyncThunk(
  'scorecard/drilldowntable',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/supplier-scorecard/alternative-suppliers-drill-down-by-risk-type`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

////////////////////////////////////////////////////////////////////////////////// ICE
export const commodityPriceForcastAsync = createAsyncThunk(
  'ice/commodityPriceForcast',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v3/commodity_price_intelligence_forcast`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)
export const commodityPriceIntelligenceAsync = createAsyncThunk(
  'ice/commodityPriceIntelligence',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v3/commodity_price_intelligence`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)
