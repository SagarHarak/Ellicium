import React, { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import PropTypes from 'prop-types'

export default function StackedHorizontalBar({ chartID, width, height, data }) {
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
        // panX: false,
        // panY: false,
        // wheelX: 'panY',
        // wheelY: 'zoomY',
        layout: root.verticalLayout,
      }),
    )

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'year',
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    )

    yAxis.data.setAll(data)

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        calculateTotals: true,
        numberFormat: "#'%'",
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
          categoryYField: 'year',
          fill: color,
        }),
      )

      series.columns.template.setAll({
        tooltipText: '{name}, {categoryY}: {valueX}',
        tooltipY: am5.percent(90),
      })
      series.data.setAll(data)

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear()

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: '{valueX}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        })
      })

      legend.data.push(series)
    }

    makeSeries('Overall', 'overall', '#6EC5D6')
    makeSeries('Risk', 'risk', '#FF686B')
    makeSeries('Mitigation', 'mitigation', '#85CAA1')

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [chartID])

  return <div id={chartID} style={{ width: width, height: height, zIndex: '5' }}></div>
}

StackedHorizontalBar.propTypes = {
  chartID: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  data: PropTypes.array,
}
