import React, { useEffect } from 'react';
import {
  CRow,
} from '@coreui/react-pro'
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoading from 'src/components/SkeltonLoading'
import { setShipperID } from 'src/redux/slices/vcn/shipperid.slice';
import { useNavigate } from 'react-router-dom';
import Empty from 'src/components/EmptyData/EmptyData';

const OverallExposure = () => {
  const { overallExposureData, overallExposureLoader } = useSelector((state) => state.overallExposure);
  const { shipperidstate } = useSelector(
    (state) => state.shipperid,
  )
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    let data = [];
    let length = 4;
    if (overallExposureData.length < 3) {
      length = overallExposureData.length;
    }
    for (let i = 0; i < length; i++) {
      data.push({
        name: overallExposureData[i]?.shipper_company_name,
        score: parseInt(overallExposureData[i]?.Avg_score),
        shipper_id: overallExposureData[i]?.shipper_id
      })
    }
    let colors = ['#85CAA1', '#E7BA46', '#FF686B'];
    let root = am5.Root.new("overallExposure");
    root._logo.dispose()
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));

    let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "name",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.6
      })
    }));

    yAxis.data.setAll(data);

    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      min: 0,
    }));

    xAxis.get("renderer").labels.template.setAll({
      fill: '#979797',
      fontSize: '13px'
    });
    yAxis.get("renderer").labels.template.setAll({
      fill: '#979797',
      fontSize: '13px'
    });

    function createSeries(field, name) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "name",
        sequencedInterpolation: true,
        // tooltip: am5.Tooltip.new(root, {
        //   pointerOrientation: "horizontal",
        //   labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
        // })
      }));

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
            fill: '#fff',
            fontSize: '13px'
          })
        });
      });

      series.columns.template.adapters.add("fillGradient", function (fill, target) {

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

      series.columns.template.adapters.add("stroke", function (stroke, target) {
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

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 1,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p100,
            // text: "{score}%",
            centerY: am5.p50,
            fill: am5.color(0xffffff),
            populateText: true
          })
        });
      });
      series.columns.template.events.on("dblclick", function (ev) {

        if (ev.target._dataItem.dataContext.shipper_id) {

          dispatch(setShipperID(ev.target._dataItem.dataContext.shipper_id))
          navigate('/scorecard');

        }
      });
      chart.zoomOutButton.set("forceHidden", true);

      series.data.setAll(data);
      series.appear();

      if (overallExposureData.length > 0) {
        return series;
      }
    }

    createSeries("score", "Score");

    let legend1 = chart.children.push(am5.Legend.new(root, {
      nameField: "name",
      fillField: "color",
      strokeField: "color",
      centerX: am5.percent(50),
      x: am5.percent(60),
      y: am5.percent(90)
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

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);



    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    if (overallExposureData.length > 0) {
      return () => {
        root.dispose();
      };
    }
    else {
      root.dispose();
      legend1.hide(0)
      cursor.hide(0)
    }
  }, [overallExposureData]);

  return (
    <>
      {overallExposureLoader ?
        <SkeletonLoading width="100%" height="100%" radius="0px" />
        : <CRow className="m-0 p-3 h-100">
          <div
            id="overallExposure"
            style={{ width: "98%", height: "100%" }}
          >
            {overallExposureData.length > 0 ? <></> :
              <Empty />}
          </div>
        </CRow>
      }
    </>
  );
};

export default OverallExposure;
