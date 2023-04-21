import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosClient } from '../AxiosClient'

export const getInternalRoutingKpiAsync = createAsyncThunk(
  'vcn/getInternalRoutingKpi',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', '/v1/digital-twin/internal-routing/get-kpis', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getExternalRoutingKpiAsync = createAsyncThunk(
  'vcn/getExternalRoutingKpi',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', '/v1/digital-twin/external-routing/get-kpis', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getInternalRoutingMapAsync = createAsyncThunk(
  'vcn/getInternalRoutingMap',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', '/v1/digital-twin/internal-routing/get-map-details', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)

export const getExternalRoutingMapAsync = createAsyncThunk(
  'vcn/getExternalRoutingMap',
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    return await AxiosClient('POST', '/v1/digital-twin/external-routing/get-map-details', payload, {
      dispatch,
      rejectWithValue,
      fulfillWithValue,
    })
  },
)
