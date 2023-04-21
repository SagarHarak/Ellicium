import React, { useEffect } from 'react'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import PropTypes from 'prop-types'

export default function ProjectionForcast({ chartID, style, data = [] }) {
  useEffect(() => {
    var root = am5.Root.new(chartID)
    root._logo.dispose()
    root.setThemes([am5themes_Animated.new(root)])

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    )

    chart.children.unshift(
      am5.Label.new(root, {
        text: 'Price Probability Curve',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0,
        fill: am5.color('#fff'),
      }),
    )
    chart.children.unshift(
      am5.Label.new(root, {
        text: '$ / t',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        rotation: -90,
        y: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: -20,
        //   paddingBottom: 0,
        fill: am5.color('#fff'),
      }),
    )

    var cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
        fill: am5.color('#fff'),
      }),
    )
    cursor.lineY.set('visible', false)

    const infodata = []

    for (let info of data) {
      if (info.upper_price || info.lower_price) {
        infodata.push({
          date: new Date(info.predict_date).getTime(),
          current_price: info.current_price,
          upper_price: info.upper_price,
          lower_price: info.lower_price,
          columnSettings: {
            fill: am5.color(0xd6e681),
          },
        })
      } else {
        infodata.push({
          date: new Date(info.date).getTime(),
          current_price: info.current_price,
        })
      }
    }

    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        baseInterval: { timeUnit: 'month', count: 1 },
        markUnitChange: false,
        tooltipDateFormat: 'MMMM yyyy',
        renderer: am5xy.AxisRendererX.new(root, {
          pan: 'zoom',
          strokeOpacity: 1,
          strokeWidth: 1,
          stroke: am5.color('#fff'),
          fill: am5.color(0xff0000),
          fontSize: '1.5em',
        }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    )

    xAxis.get('dateFormats')['month'] = 'MMM YYYY'

    let xAxisrender = xAxis.get('renderer')
    xAxisrender.labels.template.setAll({
      fill: am5.color('#fff'),
      fontSize: '15px',
      fontWeight: 600,
      paddingTop: 15,
    })

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' }),
      }),
    )

    let yAxisrender = yAxis.get('renderer')
    yAxisrender.labels.template.setAll({
      fill: am5.color('#fff'),
      fontSize: '15px',
      paddingRight: 10,
    })

    var current = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Material',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'current_price',
        valueXField: 'date',
        stroke: am5.color('#fff'),
        fill: am5.color('#fff'),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
          pointerOrientation: 'horizontal',
        }),
      }),
    )

    var upper = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Material',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'upper_price',
        openValueYField: 'current_price',
        valueXField: 'date',
        stroke: am5.color('#f39100'),
        fill: am5.color('#f39100'),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
          pointerOrientation: 'horizontal',
        }),
      }),
    )

    var lower = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: 'Material',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'lower_price',
        openValueYField: 'current_price',
        valueXField: 'date',
        stroke: am5.color('#f39100'),
        fill: am5.color('#f39100'),
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
          pointerOrientation: 'horizontal',
        }),
      }),
    )

    upper.fills.template.setAll({
      fill: am5.color('#c66006'),
      fillOpacity: 0.3,
      visible: true,
    })
    upper.fills.template.setAll({
      fill: am5.color('#c66006'),
      fillOpacity: 0.3,
      visible: true,
    })
    lower.fills.template.setAll({
      fill: am5.color('#c66006'),
      fillOpacity: 0.3,
      visible: true,
    })

    current.strokes.template.set('strokeWidth', 2)
    upper.strokes.template.set('strokeWidth', 2)
    lower.strokes.template.set('strokeWidth', 2)

    current.data.setAll(infodata)
    upper.data.setAll(infodata)
    lower.data.setAll(infodata)

    current.appear(1000)
    upper.appear(1000)
    lower.appear(1000)
    chart.appear(1000, 100)
    return () => {
      root.dispose()
    }
  }, [chartID, style])

  return <div id={chartID} style={{ width: '100%', height: '350px', zIndex: '5' }}></div>
}

ProjectionForcast.propTypes = {
  style: PropTypes.object,
  chartID: PropTypes.string,
  data: PropTypes.array,
}
