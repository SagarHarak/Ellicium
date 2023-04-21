import React, { useEffect } from 'react'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import PropTypes from 'prop-types'

export default function EarlyLineGraph({ chartID, data }) {
  console.log('data', data)
  useEffect(() => {
    // Create root element
    var root = am5.Root.new(chartID)
    root._logo.dispose()

    // Set themes
    root.setThemes([am5themes_Animated.new(root)])

    root.dateFormatter.setAll({
      dateFormat: 'yyyy',
      dateFields: ['valueX'],
    })

    const ChartData = data?.map((ev) => {
      const splitdata = ev.date.split('-')
      return {
        name: ev.name,
        date: new Date(`${splitdata[2]}-${splitdata[1]}-${splitdata[0]}`).getTime(),
        value: Number(ev.last_price),
      }
    })

    const uniqueValueArray = (arr, key) => {
      return [...new Map(arr.map((item) => [item[key], item])).values()]
    }

    const unique = uniqueValueArray(ChartData, 'name')

    console.log('unique', unique)

    // Create chart
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
        text: 'price / t',
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

    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    )

    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: '400',
      fill: '#ffffff',
      fontFamily: 'Roboto',
      marginLeft: 10,
    })

    // Add cursor
    var cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      }),
    )
    cursor.lineY.set('visible', false)
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: 'month',
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
      }),
    )

    xAxis.get('dateFormats')['month'] = 'MMM YYYY'

    let xAxisrender = xAxis.get('renderer')
    xAxisrender.labels.template.setAll({
      fill: am5.color('#fff'),
      fontSize: '15px',
      paddingTop: 15,
    })

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    )

    let yAxisrender = yAxis.get('renderer')
    yAxisrender.labels.template.setAll({
      fill: am5.color('#fff'),
      fontSize: '15px',
      paddingRight: 20,
    })

    function makeSeries(name, legendText, color) {
      var series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'value',
          valueXField: 'date',
          legendLabelText: legendText,
          fill: am5.color(color),
          stroke: am5.color(color),
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueX} : {value}',
            pointerOrientation: 'horizontal',
          }),
        }),
      )
      series.strokes.template.setAll({
        strokeWidth: 3,
      })
      series.data.setAll(ChartData.filter((ev) => ev.name === name))
      series.appear()
      legend.data.push(series)
    }

    const COLOR_CODE = {
      0: '#aca8f7',
      1: '#73f014',
      2: '#1322f0',
      3: '#9f13f0',
      4: '#66f542',
      5: '#f0131e',
    }

    for (let [index, ev] of unique.entries()) {
      makeSeries(ev.name, ev.name, COLOR_CODE[index])
    }


    chart.appear(1000, 100)
    return () => {
      root.dispose()
    }
  }, [chartID, data])

  return <div id={chartID} style={{ width: '100%', height: '450px', zIndex: '5' }} />
}

EarlyLineGraph.propTypes = {
  chartID: PropTypes.string,
  data: PropTypes.array,
}
