import React, { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import PropTypes from 'prop-types'

export default function StackedHorizontal({ chartID, width, height, data, overallvalue }) {
  useEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new(chartID)
    root._logo.dispose()

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)])

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        layout: root.verticalLayout,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
      }),
    )
    chart.paddingRight = 0
    chart.paddingBottom = 0
    chart.paddingTop = 0
    chart.paddingLeft = 0
    chart.paddingRight = 0
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        renderer: am5xy.AxisRendererY.new(root, {}),
        // tooltip: am5.Tooltip.new(root, {}),
      }),
    )

    yAxis.data.setAll(data)

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {}),
      }),
    )

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          valueXField: fieldName,
          fill: color,
          categoryYField: 'year',
        }),
      )

      series.columns.template.setAll({
        tooltipText: '{name} {valueX}',
        // tooltipY: am5.percent(100),
        width: am5.percent(100),
      })
      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear()

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: `{valueX}`,
            fontSize:10,
            fill: root.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
            oversizedBehavior: "fit",
          }),
        })
      })

      legend.data.push(series)
    }

    makeSeries('Overall', 'overall', '#6EC5D6')
    makeSeries('Risk', 'risk', '#FF686B')
    makeSeries('Mitigation', 'mitigation', '#85CAA1')

    var yRenderer = yAxis.get('renderer')
    var xRenderer = xAxis.get('renderer')

    yRenderer.grid.template.setAll({
      visible: false,
    })
    yRenderer.labels.template.setAll({
      visible: false,
    })

    xRenderer.grid.template.setAll({
      visible: false,
    })
    xRenderer.labels.template.setAll({
      forceHidden: true,
    })
    legend.labels.template.setAll({
      fontSize: 14,
      fill:"#8D8D8D"
    });
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [chartID])

  return <div id={chartID} style={{ width: width, height: height, zIndex: '5',marginTop:0 }}></div>
}

StackedHorizontal.propTypes = {
  chartID: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  data: PropTypes.array,
  overallvalue: PropTypes.number,
}
