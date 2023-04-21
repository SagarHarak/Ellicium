import React, { useEffect } from 'react'
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import PropTypes from 'prop-types'
import datamanageexcelSlice from 'src/redux/slices/Config/datamanageexcel.slice';

export default function StackChartWithNegetive({ chartID, style, data = [] }) {

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
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout,
                arrangeTooltips: false
            })
        );

        // Use only absolute numbers
        chart.getNumberFormatter().set("numberFormat", "#.#s");

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        var legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        

        // Data
        var data = [
            {
                label: "Comodity 1",
                demand: 320,
            },
            {
                label: "Comodity 2",
                supply: 250,
            },
            {
                label: "Comodity 3",
                gap: -70,
            },
            {
                label: "Comodity 4",
                demand: 320,
            },
            {
                label: "Comodity 5",
                supply: 250,
            },
            {
                label: "Comodity 6",
                gap: -70,
            },
            {
                label: "Comodity 7",
                demand: 320,
            },
            {
                label: "Comodity 8",
                supply: 250,
            },
            {
                label: "Comodity 9",
                gap: -70,
            },
        ];

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "label",
                renderer: am5xy.AxisRendererY.new(root, {
                    inversed: true,
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                })
            })
        );

        yAxis.data.setAll(data);

        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        const color = {
            "demand": am5.color("rgba(222, 125, 7, 0.967)"),
            "supply": am5.color("#3788d8"),
            "gap": am5.color("#808080"),
        }

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function createSeries(field, labelCenterX, pointerOrientation, rangeValue) {
            console.log()
            var series = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueXField: field,
                    categoryYField: "label",
                    sequencedInterpolation: true,
                    clustered: false,
                    fill: color[field],
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: pointerOrientation,
                        labelText: "{categoryY}: {valueX}"
                    })
                })
            );

            series.columns.template.setAll({
                height: am5.p100
            });

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationX: 1,
                    locationY: 0.5,
                    sprite: am5.Label.new(root, {
                        centerY: am5.p50,
                        text: "{valueX}",
                        populateText: true,
                        centerX: labelCenterX
                    })
                });
            });

            series.data.setAll(data);
            series.appear();

            var rangeDataItem = xAxis.makeDataItem({
                value: rangeValue
            });
            xAxis.createAxisRange(rangeDataItem);
            rangeDataItem.get("grid").setAll({
                strokeOpacity: 1,
                stroke: series.get("stroke")
            });

            var label = rangeDataItem.get("label");
            label.setAll({
                text: field.toUpperCase(),
                fontSize: "1.1em",
                fill: series.get("stroke"),
                paddingTop: 10,
                isMeasured: false,
                centerX: labelCenterX
            });
            label.adapters.add("dy", function () {
                return -chart.plotContainer.height();
            });

            return series;
        }

        createSeries("demand", am5.p100, "left", -3);
        createSeries("supply", 0, "right", 4);
        createSeries("gap", 0, "right", 4);

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomY"
        }));
        cursor.lineY.set("forceHidden", true);
        cursor.lineX.set("forceHidden", true);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);



        return () => {
            root.dispose()
        }
    }, [chartID, style, data])

    return <div id={chartID} style={{ width: '100%', height: '350px', zIndex: '5' }}></div>
}

StackChartWithNegetive.propTypes = {
    style: PropTypes.object,
    chartID: PropTypes.string,
    data: PropTypes.array,
}
