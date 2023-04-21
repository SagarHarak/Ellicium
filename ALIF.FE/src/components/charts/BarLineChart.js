import React, { useRef } from 'react';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { useState, useEffect } from 'react';
import { CCard, CCardBody } from '@coreui/react-pro';
import Pie from './PieChart2';
import PropTypes from 'prop-types'
import * as am5percent from "@amcharts/amcharts5/percent";


const ChartComponent = (props) => {
    const [show, setShow] = useState(false)
    const [mousePos, setMousePos] = useState({});
    const [piedata, setPieData] = useState();
    const handleMouseMove = (event) => {
        if (props.charttype === "right_chart") {
            setMousePos({ x: event.originalEvent.screenX - 700, y: event.originalEvent.screenY - 400 });
            
        }
        else {
            setMousePos({ x: event.originalEvent.screenX, y: event.originalEvent.screenY - 400 });
        }
    };
    const [data, setData] = useState([])
    useEffect(() => {
        setData(props.data)
        const root = am5.Root.new(props.charttype);      
        if (data) {
            start(root, data)
        }
        return () => { root.dispose() };
    }, [props.data,data,setData])
    
    function start(root, data) {
        root.setThemes([am5themes_Animated.new(root)]);
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout
            })
            );

        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "Provider",
                renderer: am5xy.AxisRendererX.new(root, { fontSize: "1px" }),
                // tooltip: am5.Tooltip.new(root, {}),
            })
        );
        xAxis.get("renderer").labels.template.setAll({
            fontSize: 10,
            oversizedBehavior: "truncate",
            maxWidth: 150,
            ellipsis: "...",
            fill:"#6C6C6C"

        });
       
        xAxis.data.setAll(data);
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                extraMax: 0.1,
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );
        yAxis.get("renderer").labels.template.setAll({
            fontSize: 10,
            fill:"#6C6C6C"

        });
        let series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "% of Metric Ton",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "weight_percentage",
                categoryXField: "Provider",
                stroke: am5.color("#3059A2"),
            })
        );

        series1.columns.template.setAll({
            tooltipY: am5.percent(10),
            templateField: "columnSettings",

        });
        series1.set("fill", am5.color("#3059A2"))
        series1.data.setAll(data);
        series1.columns.template.events.on("pointerover", function (ev) {
            let obj = { ...ev.target._dataItem.dataContext, chart: "BarChart", }
            setPieData(obj)
            setShow(currentState => !currentState)
        });

        series1.columns.template.events.on("pointerout", function (ev) {
            setPieData()
            setShow(currentState => !currentState)
        });
        series1.columns.template.events.on('pointerover', handleMouseMove)

        series1.columns.template.set("interactive", true);
        // let series2 = chart.series.push(
        //     am5xy.LineSeries.new(root, {
        //         name: "% of Total Supplies",
        //         xAxis: xAxis,
        //         yAxis: yAxis,
        //         valueYField: "count_percentage",
        //         categoryXField: "Provider",
        //         stroke: am5.color("#74C860"),

        //     })
        // );
        // series2.strokes.template.setAll({
        //     strokeWidth: 4,
        //     templateField: "strokeSettings",
        // });



        // series2.data.setAll(data);
        // let bulletTemplate = am5.Template.new(root, {});

        // bulletTemplate.events.on("pointerover", function (ev) {
        //     let obj = { ...ev.target._dataItem.dataContext, chart: "LineSeries" }
        //     setPieData(obj)
        //     setShow(currentState => !currentState)
        // });
        // bulletTemplate.events.on("pointerout", function (ev) {
        //     if(ev.target._dataItem.dataContext){
        //         setPieData()
        //         setShow(currentState => !currentState)

        //     }
        // });
        // bulletTemplate.events.on("pointerover", handleMouseMove)
        // series2.bullets.push(function () {
        //     return am5.Bullet.new(root, {
        //         sprite: am5.Circle.new(root, {
        //             strokeWidth: 3,
        //             stroke: series2.get("stroke"),
        //             radius: 3,
        //             fill: am5.color("#74C860"),
        //         }, bulletTemplate)
        //     });
        // });


        chart.set("cursor", am5xy.XYCursor.new(root, {}));
        let legend = chart.children.push(
            am5.Legend.new(root, {
              centerX: am5.p50,
              x: am5.p50,
              y:am5.percent(90),
              fontSize:1
            })
          );
          legend.labels.template.setAll({
            fontSize: 14,
            fill:"#8D8D8D"
          });
          legend.data.setAll(chart.series.values);
        chart.zoomOutButton.set("forceHidden", true);
        chart.appear(1000, 100);
        series1.appear();
        root._logo.dispose();
    }
    return (
        <>
            <CCard className='w-100 h-100 border-top-0 default-Card'>
                <CCardBody className='h-100 w-100 '>
                    {show && <><Pie piedata={piedata} position="fixed" top={mousePos.y + 10 + "px"} left={mousePos.x + 10 + "px"} /></>}
                    <div id={props.charttype} className="default-Card"  style={{ height: '250px' }}>
                    </div>

                </CCardBody>

            </CCard>
        </>

    )

};


ChartComponent.propTypes = {
    charttype: PropTypes.string,
    data: PropTypes.array
};


export default ChartComponent;