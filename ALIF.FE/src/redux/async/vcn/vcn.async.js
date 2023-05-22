import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosClient } from '../../AxiosClient'

export const getFiltersAsync = createAsyncThunk(
  'vcn/getFilters',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', '/v1/vcn-and-exp/get-filters', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getProductsAsync = createAsyncThunk(
  'vcn/getProducts',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('GET', '/v1/vcn-and-exp/get-all-products', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getProductNetworkAsync = createAsyncThunk(
  'vcn/productnetwork',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', '/v1/vcn-and-exp/get-product-component-network', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)
// Get Supplier network data
export const getSupplierNetworkAsync = createAsyncThunk(
  'vcn/suppliernetwork',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/vcn-and-exp/get-supplier-network`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

// Get overall exposure data
export const getOverallExposureAsync = createAsyncThunk(
  'vcn/overallexposure',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient(
      'POST',
      `/v1/vcn-and-exp/get-supplier-overall-risk-exposure`,
      payload,
      {
        dispatch,
        rejectWithValue,
        fulfillWithValue,
      },
    )
  },
)

// Get overall exposure data
export const getSupplierConcentrationAsync = createAsyncThunk(
  'vcn/supplierconcentration',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/vcn-and-exp/supplier-count-by-region`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

// Get overall exposure data
export const getSupplierDetailsAsync = createAsyncThunk(
  'vcn/supplierdetails',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/vcn-and-exp/supplier-count-by-country`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

// VCN KPIs
export const getVcnKPIsInfo = createAsyncThunk(
  'vcn/KPIs',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/vcn-and-exp/get-kpis`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

// GETVCNKPIINFO GRAPH
export const getVcnKPIsInfoGraph = createAsyncThunk(
  'vcn/KPIsgraph',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', `/v1/vcn-and-exp/get-kpi-trend-data`, payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)
