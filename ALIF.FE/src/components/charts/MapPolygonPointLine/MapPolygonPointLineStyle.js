// MAP POLYGON LINE SERIES STYLE OPTIONS
export const MapPolygonPointLineStyle = {
    chartProps: {
      rotate: {
        rotateX: true,
        rotateY: true,
      },
      projection: "ORTHO",
    },
    polygonProps: {
      remove_country: ["AQ"],
      fill_colour: "#2a77d5",
      hover_fill_colour: "#A3FFED",
      stock_colour: "#FFFFFF",
      tooltipText: "name",
    },
    bulletCircle: {
      radius: 6,
      fill_color: "#FDFF5C",
      stroke_color: "#ffffff",
      strokeWidth: 2,
      tooltipText: {
        type: "type",
        plant: "plant",
        Port_Name: "portname",
        Day_delay: "daydelay",
        Category_delay: "categorydelay",
        component_qty: "component_qty",
      },
    },
    lineProps: {
      line_stroke: "#000d07",
      strokeWidth: 1,
      strokeOpacity: 1,
      tooltipText: { component_qntity: "component_qty" },
    },
  };
  