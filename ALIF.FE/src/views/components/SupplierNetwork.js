import React, { useEffect } from 'react'
import { CRow } from '@coreui/react-pro'
import * as am5 from '@amcharts/amcharts5'
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { useDispatch, useSelector } from 'react-redux'
import { uniqueValueArray } from 'src/utils/Functions/uniqueValueArray'
import SkeletonLoading from 'src/components/SkeltonLoading'
import { setShipperID } from 'src/redux/slices/vcn/shipperid.slice'
import { useNavigate } from 'react-router-dom'
import Empty from 'src/components/EmptyData/EmptyData'

const ProductNetwork = () => {
  const { supplierNetworkLoader, supplierNetworkData } = useSelector(
    (state) => state.supplierNetwork,
  )
  const { shipperidstate } = useSelector(
    (state) => state.shipperid,
  )
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    let colors = ['#85CAA1', '#E7BA46', '#FF686B']
    let root = am5.Root.new('supplierNetwork')
    root._logo.dispose()
    root.setThemes([am5themes_Animated.new(root)])
    let chart = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,
      }),
    )
    let series = chart.children.push(
      am5hierarchy.Tree.new(root, {
        singleBranchOnly: false,
        downDepth: 1,
        initialDepth: 10,
        valueField: 'value',
        categoryField: 'companyshortname',
        childDataField: 'children',
      }),
    )

    const newdata = {
      name: '',
      txt: '',
      companyshortname: '',
      children: [],
    }
    for (let values of supplierNetworkData) {
      newdata.name = values.consignee_company_name
      newdata.companyshortname = values.consignee_company_name
      newdata.txt =
        'Id: ' + values.consignee_id + ' \nCompany Name: ' + values.consignee_company_name
      newdata.children.push({
        SupplierId: values.shipper_id,
        SupplierCompanyName: values.shipper_company_name,
        SupplierTier: values.shipper_tier,
        // value: values.shipper_id,
        risklevel: values.risk_level,
        companyshortname: values.shipper_company_name.split(' ')[0],
        txt:
          'Id: ' +
          values.shipper_id +
          ' \nCompany Name: ' +
          values.shipper_company_name +
          ' \nRisk Type: ' +
          values.risk_type +
          ' \nScore: ' +
          values.score +
          ' \nCountry: ' +
          values.country,
      })
    }
    const uniquevale = {
      name: newdata.name,
      txt: newdata.txt,
      companyshortname: newdata.companyshortname,
      children: uniqueValueArray(newdata.children, 'SupplierId'),
    }

    series.circles.template.adapters.add('fill', function (fill, target) {
      if (target.dataItem.dataContext.risklevel == undefined) {
        return colors[0]
      } else if (target.dataItem.dataContext.risklevel === 'Low') {
        return colors[0]
      } else if (target.dataItem.dataContext.risklevel === 'Medium') {
        return colors[1]
      } else if (target.dataItem.dataContext.risklevel === 'High') {
        return colors[2]
      } else {
        return fill
      }
    })

    series.links.template.adapters.add('stroke', function (stroke, target) {
      if (target.dataItem.dataContext.risklevel == undefined) {
        return colors[0]
      } else if (target.dataItem.dataContext.risklevel === 'Low') {
        return colors[0]
      } else if (target.dataItem.dataContext.risklevel === 'Medium') {
        return colors[1]
      } else if (target.dataItem.dataContext.risklevel === 'High') {
        return colors[2]
      } else {
        return stroke
      }
    })
    let tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      autoTextColor: false,
      getStrokeFromSprite: false,
      labelText: "{txt}",
      showTooltipOn: 'click',
      pointerOrientation: "horizontal"
    });

    tooltip.get("background").setAll({
      fill: am5.color('#1E1E1E'),
      fillOpacity: 1
    });
    tooltip.get("background").setAll({
      stroke: am5.color(0x000000),
      strokeOpacity: 0,
      radius: 0
    });
    tooltip.label.setAll({
      fill: am5.color('#A8A8A8')
    });

    series.nodes.template.set('tooltip', tooltip)
    series.nodes.template.events.once("dblclick", function (ev) {

      if (ev.target._dataItem.dataContext.SupplierId) {

        dispatch(setShipperID(ev.target._dataItem.dataContext.SupplierId))
        navigate('/scorecard');

      }
    });
    let legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'name',
        fillField: 'color',
        strokeField: 'color',
        centerX: am5.percent(50),
        x: am5.percent(95),
        y: am5.percent(70),
        layout: root.verticalLayout,
      }),
    )

    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: '400',
      fill: '#A8A8A8',
    })

    legend.data.setAll([
      {
        name: 'Low',
        color: colors[0],
      },
      {
        name: 'Medium',
        color: colors[1],
      },
      {
        name: 'High',
        color: colors[2],
      },
    ])

    series.data.setAll([uniquevale])
    series.set('selectedDataItem', series.dataItems[0])

    series.appear(1000, 100)
    if (supplierNetworkData.length > 0) {
      return () => {
        root.dispose()
      }
    }
    else {
      root.dispose()
      series.hide(0)
    }

  }, [supplierNetworkData])

  return (
    <>
      {supplierNetworkLoader ? (
        <SkeletonLoading width="100%" height="300px" radius="0px" />
      ) :
        <CRow className="m-0 p-1">
          <div id="supplierNetwork" style={{ width: '98%', height: '300px' }}>
            {supplierNetworkData.length > 0 ? <></> :
              <Empty />}
          </div>
        </CRow >
      }
    </>
  )
}

export default ProductNetwork
