import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import {   
    CAvatar,
    CButton,
    CCard,
    CCardBody,
    CCardSubtitle,
    CCardTitle,
    CCol,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CWidgetStatsA,
    CFormSelect,
  } from '@coreui/react-pro'
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const ProductNetwork = (props) => {
  const [data, setdata] = useState(props.data);
  useEffect(() => {
      setdata(props.data)
      let root = am5.Root.new(props.chartID);
      if(data){
        start(data,root)
      }
      
      return () => {
        root.dispose();
      };
    }, [data,props.data,setdata]);
    const start =(data,root)=> {
      root.setThemes([am5themes_Animated.new(root)]);
      let chart = root.container.children.push(am5percent.PieChart.new(root, {
      
      }));
      

      let series = chart.series.push(am5percent.PieSeries.new(root, {
        innerRadius: am5.percent(props.radius),
        radius: am5.percent(100),
        name: "Series",
        valueField: "score",
        categoryField: "risk_type",
        alignLabels: false,
        centerX: am5.percent(0),
        x: am5.percent(8),
        y: am5.percent(1),
      }));
      

      series.data.setAll(data);
      // let legend = chart.children.push(am5.Legend.new(root, {}));
      // legend.data.setAll(chart.series.values);
      let legend = chart.children.push(am5.Legend.new(root, {
        text: "{category}",
        centerX: am5.percent(0),
        x: am5.percent(2),
        y: am5.percent(15),
        nameField: "risk_type",
        layout: root.verticalLayout
      }));
      series.slices.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 0.5
        // strokeWidth: 1
      })

      // legend.valueLabels.template.setAll({
      //   fill: '#8D8D8D'
      // });
      legend.valueLabels.template.set("forceHidden", true);
      legend.data.setAll(series.dataItems);
      // legend.data.setAll(chart.series.data);
      legend.labels.template.setAll({
        fill: '#8D8D8D',
        fontSize: 12,
      });
      series.appear(1000, 100);
      series.labels.template.setAll({
        text: "{valuePercentTotal.formatNumber('0.00')}%",
        fontSize:11,
        centerX:am5.percent(0),
        fill:am5.color(0xffffff),
        inside: true,
        radius: 22
      });
      // series.labels.template.set("text", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
      let tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
        getStrokeFromSprite: false,
        autoTextColor: false,

        labelText: "{category}:{valuePercentTotal.formatNumber('0.00')}%"
      });
      
      tooltip.get("background").setAll({
        fill: am5.color(0x000000),
        fillOpacity: 1
      });
      tooltip.label.setAll({
        fill: am5.color('#8D8D8D')
      });
      tooltip.get("background").setAll({
        stroke: am5.color(0x000000),
        strokeOpacity: 0
      });
      
      root._logo.dispose();
      series.set("tooltip", tooltip);
    }
  
    return (
      <>
        <CRow className="m-0 h-100 w-100 ">
          <div
            id={props.chartID}
            style={{ width: "98%", height: "250px"}}
          ></div>
        </CRow>
      </>
    );
  };
  
  export default ProductNetwork;
  
  ProductNetwork.propTypes = {
    charttype: PropTypes.string,
    data: PropTypes.array,
    chartID: PropTypes.string,
    radius:PropTypes.number
};
