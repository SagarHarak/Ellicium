import React, { useEffect } from 'react';
import {
  CRow
} from '@coreui/react-pro'
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoading from 'src/components/SkeltonLoading'
import { useNavigate } from 'react-router-dom';
import { setShipperID } from 'src/redux/slices/vcn/shipperid.slice';
import Empty from 'src/components/EmptyData/EmptyData';

const ProductNetwork = () => {
  const { productNetworkData, productNetworkLoader } = useSelector((state) => state.productNetwork);
  const { shipperidstate } = useSelector(
    (state) => state.shipperid,
  )
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    let colors = ['#85CAA1', '#E7BA46', '#FF686B'];
    let data = productNetworkData;
    const groups = data.reduce((acc, obj, i) => {
      let temp = {};
      let arr = [];
      let arr2 = [];
      let arr3 = [];
      let temp2 = {};
      let temp3 = {};
      let name = obj.product_name;

      if (name != null) {
        if (acc[name]) {
          const found = acc[name]["children"].some(
            (item) => item.name === obj.component_name
          );
          if (found) {
            temp3["name"] = obj.shipper_company_name;
            temp3["revenue"] = obj.revenue;
            temp3["score"] = obj.score;
            temp3["risk_type"] = obj.risk_type;
            temp3["risk_level"] = obj.risk_level;
            temp3['shipper_id'] = obj.shipper_id;
            temp3["txt"] = "No Data Available";
            if (obj.shipper_company_name != undefined && obj.shipper_company_name != "") {
              temp3["txt"] = " Supplier Name : " + obj.shipper_company_name;
            }
            if (obj.revenue != undefined && obj.revenue != "") {
              temp3["txt"] = temp3["txt"] + '\n Revenue : ' + obj.revenue;
            }
            if (obj.risk_level != undefined && obj.risk_level != "") {
              temp3["txt"] = temp3["txt"] + '\n Risk Level : ' + obj.risk_level;
            }
            if (obj.risk_type != undefined && obj.risk_type != "") {
              temp3["txt"] = temp3["txt"] + '\n Risk Type : ' + obj.risk_type;
            }
            if (obj.score != undefined && obj.score != "") {
              temp3["txt"] = temp3["txt"] + '\n Score : ' + obj.score;
            }
            const index = acc[name]["children"].findIndex((object) => {
              return object.name === obj.component_name;
            });
            acc[name]["children"][index]["children"].push(temp3);
          } else {
            temp2["name"] = obj.component_name;
            temp2["children"] = arr3;
            temp2["value"] = 100;
            temp3["name"] = obj.shipper_company_name;
            temp3["revenue"] = obj.revenue;
            temp3["risk_type"] = obj.risk_type;
            temp3["risk_level"] = obj.risk_level;
            temp3["score"] = obj.score;
            temp3['shipper_id'] = obj.shipper_id;

            temp2["txt"] = "No Data Available";
            if (obj.component_name != undefined && obj.component_name != "") {
              temp2["txt"] = " Component Name : " + obj.component_name;
            }
            temp3["txt"] = "No Data Available";
            if (obj.shipper_company_name != undefined && obj.shipper_company_name != "") {
              temp3["txt"] = " Supplier Name : " + obj.shipper_company_name;
            }
            if (obj.revenue != undefined && obj.revenue != "") {
              temp3["txt"] = temp3["txt"] + '\n Revenue : ' + obj.revenue;
            }
            if (obj.risk_level != undefined && obj.risk_level != "") {
              temp3["txt"] = temp3["txt"] + '\n Risk Level : ' + obj.risk_level;
            }
            if (obj.risk_type != undefined && obj.risk_type != "") {
              temp3["txt"] = temp3["txt"] + '\n Risk Type : ' + obj.risk_type;
            }
            if (obj.score != undefined && obj.score != "") {
              temp3["txt"] = temp3["txt"] + '\n Score : ' + obj.score;
            }
            arr3.push(temp3);
            acc[name]["children"].push(temp2);
          }
        } else {
          temp["name"] = name;
          //temp["value"] = 100;
          temp2["name"] = obj.component_name;
          temp2["value"] = 100;
          temp3["name"] = obj.shipper_company_name;
          temp3["revenue"] = obj.revenue;
          temp3["risk_type"] = obj.risk_type;
          temp3["risk_level"] = obj.risk_level;
          temp3["score"] = obj.score;
          temp3['shipper_id'] = obj.shipper_id;

          temp["txt"] = "No Data Available";
          if (name != undefined && name != "") {
            temp["txt"] = " Name : " + name;
          }
          temp2["txt"] = "No Data Available";
          if (obj.component_name != undefined && obj.component_name != "") {
            temp2["txt"] = " Component Name : " + obj.component_name;
          }
          temp3["txt"] = "No Data Available";
          if (obj.shipper_company_name != undefined && obj.shipper_company_name != "") {
            temp3["txt"] = " Supplier Name : " + obj.shipper_company_name;
          }
          if (obj.revenue != undefined && obj.revenue != "") {
            temp3["txt"] = temp3["txt"] + '\n Revenue : ' + obj.revenue;
          }
          if (obj.risk_level != undefined && obj.risk_level != "") {
            temp3["txt"] = temp3["txt"] + '\n Risk Level : ' + obj.risk_level;
          }
          if (obj.risk_type != undefined && obj.risk_type != "") {
            temp3["txt"] = temp3["txt"] + '\n Risk Type : ' + obj.risk_type;
          }
          if (obj.score != undefined && obj.score != "") {
            temp3["txt"] = temp3["txt"] + '\n Score : ' + obj.score;
          }
          arr2.push(temp3);
          arr.push(temp2);
          temp2["children"] = arr2;
          temp["children"] = arr;
          acc[name] = temp;
        }
      }
      return acc;
    }, {});

    let groupData = {
      name: "Root",
      children: Object.values(groups),
    };

    let root = am5.Root.new("materialNetwork");
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    root._logo.dispose()

    let container = root.container.children.push(am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      // /layout: root.verticalLayout
    }));

    let series = container.children.push(am5hierarchy.ForceDirected.new(root, {
      singleBranchOnly: false,
      downDepth: 2,
      topDepth: 1,
      initialDepth: 1,
      valueField: "value",
      categoryField: "name",
      childDataField: "children",
      idField: "name",
      linkWithField: "linkWith",
      manyBodyStrength: -10,
      centerStrength: 0.7,
      maxRadius: 30,
      minRadius: 15,
      //minRadius: 10,
      //maxRadius: 70
    }));

    series.circles.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem.dataContext.risk_level == undefined) {
        return fill;
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Low') {
        return colors[0];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Medium') {
        return colors[1];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'High') {
        return colors[2];
      }
      else {
        return fill;
      }
    });

    series.outerCircles.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem.dataContext.risk_level == undefined) {
        return fill;
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Low') {
        return colors[0];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Medium') {
        return colors[1];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'High') {
        return colors[2];
      }
      else {
        return fill;
      }
    });

    series.circles.template.adapters.add("stroke", function (stroke, target) {
      if (target.dataItem.dataContext.risk_level == undefined) {
        return stroke;
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Low') {
        return colors[0];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Medium') {
        return colors[1];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'High') {
        return colors[2];
      }
      else {
        return stroke;
      }
    });


    series.outerCircles.template.adapters.add("stroke", function (stroke, target) {
      if (target.dataItem.dataContext.risk_level == undefined) {
        return stroke;
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Low') {
        return colors[0];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Medium') {
        return colors[1];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'High') {
        return colors[2];
      }
      else {
        return stroke;
      }
    });

    series.links.template.adapters.add("stroke", function (stroke, target) {
      if (target.dataItem.dataContext.risk_level == undefined) {
        return stroke;
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Low') {
        return colors[0];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'Medium') {
        return colors[1];
      }
      else if (target.dataItem.dataContext.risk_level != undefined && target.dataItem.dataContext.risk_level == 'High') {
        return colors[2];
      }
      else {
        return stroke;
      }
    });
    series.circles.template.events.once("dblclick", function (ev) {
     
      if (ev.target._dataItem.dataContext.shipper_id) {

        dispatch(setShipperID(ev.target._dataItem.dataContext.shipper_id))
        navigate('/scorecard');

      }
    });
    series.links.template.set("strength", 0.5);

    series.data.setAll([groupData]);
    let tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false,
      autoTextColor: false,
      getStrokeFromSprite: false,
      labelText: "{txt}",
      pointerOrientation: "horizontal"

    });

    tooltip.get("background").setAll({
      fill: am5.color('#1E1E1E'),
      fillOpacity: 1
    });
    tooltip.get("background").setAll({
      stroke: am5.color(0x000000),
      strokeOpacity: 0,
      radius: 0
    });
    tooltip.label.setAll({
      fill: am5.color('#A8A8A8')
    });

    //  series.set("tooltip", tooltip);
    series.nodes.template.set("tooltip", tooltip);
    series.set("selectedDataItem", series.dataItems[0]);

    let legend1 = container.children.push(am5.Legend.new(root, {
      nameField: "name",
      fillField: "color",
      strokeField: "color",
      centerX: am5.percent(50),
      x: am5.percent(95),
      y: am5.percent(70),
      layout: root.verticalLayout
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


    series.appear(1000, 100);

    if (productNetworkData.length > 0) {
      return () => {
        root.dispose();
      };
    }
    else {
      root.dispose()
      series.hide(0)
    }

  }, [productNetworkData]);

  return (
    <>
      {productNetworkLoader ?
        <SkeletonLoading width="100%" height="300px" radius="0px" />
        : <CRow className="m-0 p-1">
          <div
            id="materialNetwork"
            style={{ width: "98%", height: "300px" }}
          >{productNetworkData.length > 0 ? <></> :
            <Empty />}
          </div>
        </CRow>
      }
    </>
  );
};

export default ProductNetwork;
