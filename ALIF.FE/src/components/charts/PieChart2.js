import React, { startTransition, useEffect, useState } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react-pro';
import PropTypes from 'prop-types'

function Pie({ piedata, position, top, left }) {
    const [data, setData] = useState(piedata.country_of_origin)
    useEffect(() => {
        let root = am5.Root.new("piechart");
        if (data) {
            start(root, data)
        }

        return () => { root.dispose() };

    }, [data]);

    const start = (root, data) => {
        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                // innerRadius: am5.percent(65),
                // radius: am5.percent(90),
                layout: root.verticalHorizontal,
            })
        );
        // Create series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "sales",
                categoryField: "country"
            })
        );
        series.data.setAll(data);
        series.labels.template.setAll({
            fontSize: 14,
        });
        series.slices.template.setAll({
            stroke: am5.color(0xffffff),
            strokeWidth: 0.8
            // strokeWidth: 1,
            
          })
          series.ticks.template.setAll({
            stroke: am5.color(0xFFFFFF),
            strokeWidth: 3,
            opacity:1
        
          });
          
        series.labels.template.setAll({fill:"white"});

    }

    return (
        <CCard className='fs-6 m-0 p-0 map-hover-bar' style={{ width: "50%", height: "50%", position: position, zIndex: 100000, top: top, left: left, color: "white", borderRadius: 0 }}>
            <CCardBody className='fs-6'>
                <CCardTitle className='fs-6 m-0 p-0 fw-normal'><span className='fs-6 m-0 p-0 fw-semibold'>Provider:</span>{piedata.Provider}</CCardTitle>
                <CCardText>
                    <span style={{ fontWeight: "600" }}>{piedata.chart === "LineSeries" ? '% Total Supplies:' : '% Metric Tons:'}</span>{piedata.chart === "LineSeries" ? piedata.count_percentage + '%' : piedata.weight_percentage + '%'}
                </CCardText>
                <div id='piechart' style={{ marginTop: "20px", width: "100%", height: "70%" }} >

                </div>
            </CCardBody>
        </CCard>

    )
}
Pie.propTypes = {
    piedata: PropTypes.object,
    position: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string
}
export default Pie