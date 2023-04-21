import React, { useEffect, useState } from 'react';
import {
    CRow,
  } from '@coreui/react-pro'
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import PropTypes from 'prop-types'

const Exposure = ({data,chartID}) => {
    
  // const [data, setdata] = useState(props.data);
      
    useEffect(() => 
    {
      // setdata(props.data)
            let colors = ['#85CAA1', '#E7BA46', '#FF686B'];
      let root = am5.Root.new(chartID);
      root.setThemes([am5themes_Animated.new(root)]);
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      }));

      let yRenderer = am5xy.AxisRendererY.new(root, {
        // minGridDistance: 30,
        // cellStartLocation: 0.1,
        // cellEndLocation: 0.4,
        // location: -1
      });
      
      
      let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "risk_type",
        renderer: yRenderer,
        textAlign: "center",
        // tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
      }));

      let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        // min: 0,
        // extraMax:0.1,
        renderer: am5xy.AxisRendererX.new(root, {}),
        // tooltip: am5.Tooltip.new(root,{})

      }));
      xAxis.get("renderer").labels.template.setAll({
        fill: '#979797',
        fontSize: '13px'
      });
      yAxis.get("renderer").labels.template.setAll({
        fill: '#979797',
        fontSize: '13px'
      });

      
      // xAxis.labelsContainer.set("tooltip", am5.Tooltip.new(root, {
      //   pointerOrientation: "up"
      // }));
      
      // let xRenderer = xAxis.get("renderer");
      
      // xRenderer.labels.template.setAll({
      //   tooltipText: "{category}",
      //   oversizedBehavior: "truncate",
      //   maxWidth: 100
      // });
      
      // xRenderer.labels.template.setup = function(target) {
      //   target.set("background", am5.Rectangle.new(root, {
      //     fill: am5.color(0x000000),
      //     fillOpacity: 0
      //   }));
      // };
      
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "score",
        categoryYField: "risk_type",

      }));
      // series.columns.template.setup = function(target) {
      //   target.set("tooltip", am5.Tooltip.new(root, {
      //   showTooltipOn:'always',

      //   }));
      // }

      series.columns.template.adapters.add("fillGradient", function(fill, target) {

        if (target.dataItem.dataContext.score <= 30) {
          return am5.LinearGradient.new(root, {
            stops: [{
              color: am5.color('#85CAA1')
            }, {
              color: am5.color('#3F6C51')
            }],
            rotation: 90
          });
        }
        else if (target.dataItem.dataContext.score <= 70) {
          return am5.LinearGradient.new(root, {
            stops: [{
              color: am5.color('#E7BA46')
            }, {
              color: am5.color('#9B7920')
            }],
            rotation: 90
          });
        }
        else if (target.dataItem.dataContext.score <= 100) {
          return am5.LinearGradient.new(root, {
            stops: [{
              color: am5.color('#D44646')
            }, {
              color: am5.color('#8A2C2C')
            }],
            rotation: 90
          });;
        }
        else {
          return fill;
        }
      });

      series.columns.template.adapters.add("stroke", function(stroke, target) {
        if (target.dataItem.dataContext.score <= 30) {
          return colors[0];
        }
        else if (target.dataItem.dataContext.score <= 70) {
          return colors[1];
        }
        else if (target.dataItem.dataContext.score <= 100) {
          return colors[2];
        }
        else {
          return stroke;
        }
      });
      // series.columns.template.set("fillGradient", );
      
      let tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
        autoTextColor: false,
        getStrokeFromSprite:false,
          centerX:0,
          centerY:0,
          x: am5.percent(100),
          y: am5.percent(0),
        labelText: "{score}%",
        showTooltipOn:'click'
      });
      
      tooltip.get("background").setAll({
        fill: am5.color('#1E1E1E'),
        fillOpacity: 0
      });
      tooltip.get("background").setAll({
        stroke: am5.color(0x000000),
        strokeOpacity: 0,
        radius:0
      });
      tooltip.label.setAll({
        fill: am5.color('#A8A8A8')
      });
      
       series.set("tooltip", tooltip);
      //  series.set({showTooltipOn:'click'});
      

      // series.columns.template.setAll({
      //   // tooltip:am5.Tooltip.new(root, {
      //   //   getFillFromSprite: false,
      //   //   autoTextColor: false,
      //   //   getStrokeFromSprite:false,
      //   //   centerX:0,
      //   //   centerY:0,
      //   //   x: am5.percent(100),
      //   //   y: am5.percent(0),
      //   //   labelText: "{score}%",
      //   // }),
      //   // // tooltipText: "{name}, {categoryX}:{valueY}",
      //   // // width: am5.percent(90),
      //   // // tooltipX: am5.percent(100),
      //   // // tooltipText: "{valueX}%",
      //   showTooltipOn: "always",
      // });
      series.columns.template.setup = function (target) {
        target.set("tooltip", am5.Tooltip.new(root, {}));
    }
      let legend1 = chart.children.push(am5.Legend.new(root, {
        nameField: "name",
        fillField: "color",
        strokeField: "color",
        centerX: am5.percent(50),
        x: am5.percent(60),
        y: am5.percent(95)
      }));
      
      legend1.labels.template.setAll({
        fontSize: 12,
        fontWeight: '400',
        fill: "#A8A8A8",
        fontFamily: "Roboto",
        marginLeft: 10
      })
      
      legend1.data.setAll(
        [
          {
            name: "Low",
            color: colors[0]
          }, 
          {
            name: "Medium",
            color: colors[1]
          },
          {
            name: "High",
            color: colors[2]
          }
        ]
      );
      
      // Make each column to be of a different color
      /*series.columns.template.adapters.add("fill", function(fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });
      
      series.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });*/
      // series.columns.getIndex(1)?.showTooltip();
    

      yAxis.data.setAll(data);
      
      series.data.setAll(data);
      
      //sortCategoryAxis();
      


chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none",
  xAxis: xAxis,
  yAxis: yAxis,
}));
series.columns.template.setAll({
  height: 20
});
chart.zoomOutButton.set("forceHidden", true);




series.appear(1000);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
      

      return () => {
        root.dispose();
      };
    }, [data]);
  
    return (
      <>
        <CRow className="m-0 p-1 w-100 h-100">
          <div
            id={chartID}
            style={{ width: "100%", height: "100%" }}
          ></div>
        </CRow>
      </>
    );
  };
  
  export default Exposure;
  Exposure.propTypes = {
    charttype: PropTypes.string,
    data: PropTypes.array,
    chartID:PropTypes.string,
};
