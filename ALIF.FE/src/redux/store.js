import { configureStore } from '@reduxjs/toolkit'
import changeState from './slices/chagestate'
import ImportSlice from './slices/dashboard/import'
import InventorySlice from './slices/dashboard/inventory'
import loginSlice from './slices/login.slice'
import suppliersbycountriesSlice from './slices/CompetitorAnalysis/suppliersbycountries.slice'
import filterSlice from './slices/vcn/filter.slice'
import productnetworkSlice from './slices/vcn/productnetwork.slice'
import suppliernetworkSlice from './slices/vcn/suppliernetwork.slice'
import overallexposureSlice from './slices/vcn/overallexposure.slice'
import productSlice from './slices/vcn/product.slice'
import providerLeftChartSlice from './slices/CompetitorAnalysis/providerleftchart.slice'
import providerRightChartSlice from './slices/CompetitorAnalysis/providerrightchart.slice'
import supplierDetailsAndExposuresSlice from './slices/SupplierScoreCard/supplierdetailsandexposures.slice'
import productBySuppliersSlice from './slices/SupplierScoreCard/productbysuppliers.slice'
import alternativeSuppliersByProductSlice from './slices/SupplierScoreCard/alternativesuppliersbyproduct.slice'
import competitorAnalysisFiltersSlice from './slices/CompetitorAnalysis/competitorAnalysisFilters.slice'
import KPIVCNSlice from './slices/vcn/kpis.slice'
import supplierconcentration from './slices/vcn/supplierconcentration.slice'
import ShipperSlice from './slices/vcn/shipperid.slice'
import topcountriesdonutSlice from './slices/CompetitorAnalysis/topcountriesdonut.slice'
import supplierdetailsSlice from './slices/vcn/supplierdetails.slice'
import externalRoutingKpiSlice from './slices/DigitalTwin/externalrouting.slice'
import internalRoutingKpiSlice from './slices/DigitalTwin/internalrouting.slice'
import productByCategorySlice from './slices/dashboard/productcategory.slice'
import internalRoutingMapSlice from './slices/DigitalTwin/internalroutingmap.slice'
import externalRoutingMapSlice from './slices/DigitalTwin/externalroutingmap.slice'
import topselectionsupplierSlice from './slices/topselection'
import countrylistSlice from './slices/countrylist'
import riskselectionSlice from './slices/Config/riskselection.slice'
import excelUploadSlice from './slices/Config/datamanageexcel.slice'
import updateRiskSlice from './slices/Config/updaterisk.slice'
import drillDownTableSlice from './slices/SupplierScoreCard/drilldowntable.slice'

///////////////////////////////////////////////////////////////////////////////////////// ICE
import commodityforcastSlice from './slices/ICE/commodityforcast.slice'
import commodityPriceIntelligenceSlice from './slices/ICE/commodityPriceIntelligence.slice'

const store = configureStore({
  reducer: {
    template: changeState,
    inventoryanalysis: InventorySlice,
    importanalysis: ImportSlice,
    login: loginSlice,
    suppliersbycountries: suppliersbycountriesSlice,
    vcnfilter: filterSlice,
    productNetwork: productnetworkSlice,
    supplierNetwork: suppliernetworkSlice,
    overallExposure: overallexposureSlice,
    products: productSlice,
    providerLeftChart: providerLeftChartSlice,
    providerRightChart: providerRightChartSlice,
    supplierDetailsAndExposures: supplierDetailsAndExposuresSlice,
    productBySuppliers: productBySuppliersSlice,
    alternateProductBySuppliers: alternativeSuppliersByProductSlice,
    competitoranalysisfilters: competitorAnalysisFiltersSlice,
    kpivcn: KPIVCNSlice,
    supplierconcentration: supplierconcentration,
    shipperid: ShipperSlice,
    topcountriesdonut: topcountriesdonutSlice,
    supplierdetails: supplierdetailsSlice,
    internalRoutingKpi: internalRoutingKpiSlice,
    externalRoutingKpi: externalRoutingKpiSlice,
    productByCategory: productByCategorySlice,
    internalRoutingMap: internalRoutingMapSlice,
    externalRoutingMap: externalRoutingMapSlice,
    topselection: topselectionsupplierSlice,
    allcountrylist: countrylistSlice,
    riskselection: riskselectionSlice,
    updaterisk: updateRiskSlice,
    excelupload: excelUploadSlice,
    drillDownTable: drillDownTableSlice,
    //////////////////////////////////////////////////////////////// ICE
    commodityforcast: commodityforcastSlice,
    commodityPriceIntelligence: commodityPriceIntelligenceSlice,
  },
})

export default store
