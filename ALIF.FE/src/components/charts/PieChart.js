import React, { startTransition, useEffect, useState } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react-pro';
import PropTypes from 'prop-types'
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function Pie({ piedata, top, left }) {
    const [data, setData] = useState(piedata.suppliers?.slice(0,5))
    useEffect(() => {
        let root = am5.Root.new("piechart");
        if (data) {
            start(root, data)
        }
        return () => { root.dispose() };
    }, [data]);

    const start = (root, data) => {
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "none",
            wheelY: "none",
        }));

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 30,

        });

        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "Supplier",
            renderer: yRenderer,
            tooltip: am5.Tooltip.new(root, {
                themeTags: ["axis"],
            })
        }));

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            extraMax: 0.1,
            renderer: am5xy.AxisRendererX.new(root, {})
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "Supplier_Weight",
            categoryYField: "Supplier",
        }));
        // Rounded corners for columns
        series.columns.template.setAll({
            cornerRadiusTR: 5,
            cornerRadiusBR: 5,

        });
        series.columns.template.setAll({
            tooltipText: "{name}, {categoryX}:{valueY}",
            width: am5.percent(90),
            tooltipX: am5.percent(100),
            tooltipText: "{valueX}%",
            showTooltipOn: "always"
        });

        series.columns.template.setup = function (target) {
            target.set("tooltip", am5.Tooltip.new(root, {}));
        }
        // Make each column to be of a different color
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });


        // Set data
        yAxis.get("renderer").labels.template.setAll({
            fontSize: 10,
            fill:"#6C6C6C"

        });
        xAxis.get("renderer").labels.template.setAll({
            fontSize: 10,
            fill:"#6C6C6C"

        });
        yAxis.data.setAll(data);
        series.data.setAll(data);
        sortCategoryAxis();

        // Get series item by category
        function getSeriesItem(category) {
            for (var i = 0; i < series.dataItems.length; i++) {
                let dataItem = series.dataItems[i];
                if (dataItem.get("categoryY") == category) {
                    return dataItem;
                }
            }
        }

        chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none",
            xAxis: xAxis,
            yAxis: yAxis
        }));


        // Axis sorting
        function sortCategoryAxis() {

            // Sort by value
            series.dataItems.sort(function (x, y) {
                return x.get("valueX") - y.get("valueX"); // descending
                //return y.get("valueY") - x.get("valueX"); // ascending
            })

            // Go through each axis item
            am5.array.each(yAxis.dataItems, function (dataItem) {
                // get corresponding series item
                let seriesDataItem = getSeriesItem(dataItem.get("category"));

                if (seriesDataItem) {
                    // get index of series data item
                    let index = series.dataItems.indexOf(seriesDataItem);
                    // calculate delta position
                    let deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
                    // set index to be the same as series data item index
                    dataItem.set("index", index);
                    // set deltaPosition instanlty
                    dataItem.set("deltaPosition", -deltaPosition);
                    // animate delta position to 0
                    dataItem.animate({
                        key: "deltaPosition",
                        to: 0,
                        duration: 1000,
                        easing: am5.ease.out(am5.ease.cubic)
                    })
                }
            });

            // Sort axis items by index.
            // This changes the order instantly, but as deltaPosition is set,
            // they keep in the same places and then animate to true positions.
            yAxis.dataItems.sort(function (x, y) {
                return x.get("index") - y.get("index");
            });
        }

        //   sortCategoryAxis()
        // update data with random values each 1.5 sec



        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);

    }
   
    return (
        <>
            {data.length > 0 ?
                <CCard className='fs-6 m-0 p-2 map-hover-bar' style={{
                    width: "50%", height: "40%", position: "fixed",
                    top: { top }, left: { left }, zIndex: 100000,color:"white", borderRadius: 0
                }}>
                    <CCardTitle className='fs-6 m-0 p-0 fw-normal'><span className='fs-6 m-0 p-0 fw-semibold'>Country:</span>{piedata.name}</CCardTitle>
                    <CCardText className='p-0 m-0'>
                        <span style={{ fontWeight: "600" }}>% Metric Tons:</span>{piedata.val}%
                    </CCardText>
                    <CCardBody className='fs-6 pt-0'>
                        <div id='piechart' style={{ width: "100%", height: "100%" }} >

                        </div>
                    </CCardBody>
                </CCard>
                : <></>}
        </>
    )
}
Pie.propTypes = {
    piedata: PropTypes.object,
    position: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string
}
export default Pie