import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { getVcnKPIsInfo, getVcnKPIsInfoGraph } from 'src/redux/async/vcn/vcn.async'

const initialState = {
  VCNKPILoader: false,
  VCNKPI: [],
  VCNKPI_trends: [],
  VCNKPIError: '',
}

export const KPIVCNSlice = createSlice({
  name: 'VCN KPI',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getVcnKPIsInfo.pending, getVcnKPIsInfoGraph.pending), (state) => {
      state.VCNKPILoader = true
    })
    builder.addMatcher(isAnyOf(getVcnKPIsInfo.fulfilled), (state, action) => {
      state.VCNKPILoader = false
      state.VCNKPI = {
        total_spend: action.payload?.total_spend[0]?.total_spend || 0,
        revenue_at_risk: action.payload?.revenue_at_risk[0]?.Revenue_at_risk || 0,
        supplier_at_risk: action.payload?.supplier_at_risk[0]?.supplier_at_risk || 0,
        product_at_risk: action.payload?.product_at_risk[0]?.product_at_risk || 0,
        key_event: action.payload?.key_events[0]?.key_event || 0,
        key_locations: action.payload?.key_locations[0]?.Key_Locations || 0,
        components_at_risk: action.payload?.component_at_risk[0]?.component_at_risk || 0,
        total_margin: action.payload?.total_margin[0]?.total_margin || 0,
        total_revenue: action.payload?.total_revenue[0]?.total_revanue || 0,
      }
    })
    builder.addMatcher(isAnyOf(getVcnKPIsInfoGraph.fulfilled), (state, action) => {
      const total_spend_trends_label = action.payload.total_spend_trend_data?.map(
        (trends) => `${trends.quarter} ${trends.Year}`,
      )
      const total_spend_trends_value = action.payload.total_spend_trend_data?.map((trends) =>
        Number(trends.total_spend),
      )

      const revenue_at_risk_label = action.payload.revenue_at_risk_trend_data?.map(
        (trends) => `${trends.quarter} ${trends.Year}`,
      )
      const revenue_at_risk_value = action.payload.revenue_at_risk_trend_data?.map((trends) =>
        Number(trends.Revenue_at_risk),
      )

      const supplier_at_risk_label = action.payload.supplier_at_risk_trend_data?.map(
        (trends) => `${trends.quarter} ${trends.Year}`,
      )
      const supplier_at_risk_value = action.payload.supplier_at_risk_trend_data?.map((trends) =>
        Number(trends.supplier_at_risk),
      )

      // const product_at_risk_label = action.payload.product_at_risk_trend_data?.map(
      //   (trends) => `${trends.quarter} ${trends.Year}`,
      // )
      // const product_at_risk_value = action.payload.product_at_risk_trend_data?.map((trends) =>
      //   Number(trends.product_at_risk),
      // )

      // const key_events_label = action.payload.key_events_trend_data?.map(
      //   (trends) => `${trends.quarter} ${trends.Year}`,
      // )
      // const key_events_value = action.payload.key_events_trend_data?.map((trends) =>
      //   Number(trends.key_event),
      // )

      // const key_location_label = action.payload.key_locations_trend_data?.map(
      //   (trends) => `${trends.quarter} ${trends.Year}`,
      // )
      // const key_location_value = action.payload.key_locations_trend_data?.map((trends) =>
      //   Number(trends.Key_Locations),
      // )

      const total_revenue_label = action.payload.total_revenue_trend_data?.map(
        (trends) => `${trends.quarter} ${trends.Year}`,
      )
      const total_revenue_value = action.payload.total_revenue_trend_data?.map((trends) =>
        Number(trends.total_revenue),
      )

      const total_margin_label = action.payload.total_margin_trend_data?.map(
        (trends) => `${trends.quarter} ${trends.Year}`,
      )
      const total_margin_value = action.payload.total_margin_trend_data?.map((trends) =>
        Number(trends.total_margin),
      )

      const total_component_at_risk_label = action.payload.component_at_risk_trend_data?.map(
        (trends) => `${trends.quarter} ${trends.Year}`,
      )
      const total_component_at_risk_value = action.payload.component_at_risk_trend_data?.map(
        (trends) => Number(trends.component_at_risk),
      )

      state.VCNKPILoader = false
      state.VCNKPI_trends = {
        component_at_risk: {
          label: total_component_at_risk_label,
          value: total_component_at_risk_value,
        },
        total_margin_chart: {
          label: total_margin_label,
          value: total_margin_value,
        },
        total_revenue_chart: {
          label: total_revenue_label,
          value: total_revenue_value,
        },
        total_spend_chart: {
          label: total_spend_trends_label,
          value: total_spend_trends_value,
        },
        revenue_at_risk_chart: {
          label: revenue_at_risk_label,
          value: revenue_at_risk_value,
        },
        supplier_at_risk: {
          label: supplier_at_risk_label,
          value: supplier_at_risk_value,
        },
        // product_at_risk: {
        //   label: product_at_risk_label,
        //   value: product_at_risk_value,
        // },
        // key_events_chart: {
        //   label: key_events_label,
        //   value: key_events_value,
        // },
        // key_location_chart: {
        //   label: key_location_label,
        //   value: key_location_value,
        // },
      }
    })
    builder.addMatcher(isAnyOf(getVcnKPIsInfo.rejected), (state, action) => {
      state.VCNKPILoader = false
      state.VCNKPIError = action.payload.message
    })
  },
})

export default KPIVCNSlice.reducer
