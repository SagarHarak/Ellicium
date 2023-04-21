/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import PropTypes from 'prop-types'

export default function BarChart({ chartID, modalData }) {



  const barchartPayload = {
    "Current Month On-hand Inventory (MTs)": modalData["Current Month On-hand Inventory (MTs)"],
    "Demand Forecasted Qty for this 3 Months (MTs)": modalData["Demand Forecasted Qty for this 3 Months (MTs)"],
    "Open Order (MTs) Received within Next 2 Months": modalData["Open Order (MTs) Received within Next 2 Months"],
    "Safety stock": modalData["Safety stock"],
  }

  useEffect(() => {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new(chartID);


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "country",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));
    let xAxisrender = xAxis.get('renderer')
    xAxisrender.labels.template.setAll({
      fill: am5.color('#fff'),
      fontSize: '15px',
      fontWeight: 600,
      paddingTop: 15,
    })

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    let yAxisrender = yAxis.get('renderer')
    yAxisrender.labels.template.setAll({
      fill: am5.color('#fff'),
      fontSize: '15px',
      paddingRight: 10,
    })



    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "country",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });


    // Set data
    var data = [{
      country: "Demand  (MTs)",
      value: barchartPayload["Current Month On-hand Inventory (MTs)"]
    }, {
      country: "current month",
      value: barchartPayload["Demand Forecasted Qty for this 3 Months (MTs)"]
    }, {
      country: "saftey stocks",
      value: barchartPayload["Open Order (MTs) Received within Next 2 Months"]
    }, {
      country: "Open Order ",
      value: barchartPayload["Safety stock"]
    }];

    xAxis.data.setAll(data);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);

  },[chartID]);
    return <div id={chartID} style={{ width: '100%', height: '350px', zIndex: '5' }} />
  }

BarChart.propTypes = {
      chartID: PropTypes.string,
    }
