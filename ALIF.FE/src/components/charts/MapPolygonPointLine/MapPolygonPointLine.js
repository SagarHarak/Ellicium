import React, { useEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5map from '@amcharts/amcharts5/map'
import geodata_world from '@amcharts/amcharts5-geodata/worldLow'
import PropTypes from 'prop-types'

export default function MapPolygonPointLine({ chartID, style, data=[] }) {
  
  useEffect(() => {
    let root = am5.Root.new(chartID)
    root.setThemes([am5themes_Animated.new(root)])

    const _PROJECTION_CHART = {
      ORTHO: am5map.geoOrthographic(),
      EQUALEARTH: am5map.geoEqualEarth(),
      SQUARE: am5map.geoEquirectangular(),
      NATURAL: am5map.geoNaturalEarth1(),
    } // PROJECTION

    // CREATE CHART
    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: style.chartProps.rotate?.rotateX ? 'rotateX' : 'none',
        panY: style.chartProps.rotate?.rotateY ? 'rotateY' : 'none',
        projection: _PROJECTION_CHART[style.chartProps.projection] || am5map.geoNaturalEarth1(),
      }),
    )
    
    

    // CREATE POLYGON SERIES
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: geodata_world,
        exclude: style.polygonProps.remove_country,
        fill: am5.color(style.polygonProps.fill_colour),
        stroke: am5.color(style.polygonProps.fill_colour),
        strokeWidth: 0,
        backgroundColor: am5.color(style.polygonProps.fill_colour)
      }),
    )
    // CREATE POINT SERIES
    var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))

    pointSeries.bullets.push(function () {
      let circle = am5.Circle.new(root, {
        radius: style.bulletCircle.radius,
        tooltipY: 0,
        fill: am5.color(style.bulletCircle.fill_color),
        stroke: am5.color(style.bulletCircle.stroke_color),
        strokeWidth: style.bulletCircle.strokeWidth,
        tooltipText: `Plant: {${style.bulletCircle.tooltipText.plant}}`,
      })

      return am5.Bullet.new(root, {
        sprite: circle,
      })
    })

    // CREATE LINE SERIES
    var lineSeries = chart.series.push(
      am5map.MapLineSeries.new(root, {
        lineType: 'curved',
      }),
    )


    for (let line of data) {
      const finaldata = []
      var singleRowData = [];
      if(chartID == "globediv1"){
        singleRowData = [
          {
            latitude: line.latitude_supplier,
            longitude: line.longitude_supplier,
            plant: line.component_source,
            portname: line.supplier_port_display_name,
            daydelay: parseInt(line.supplier_days_delayed),
            categorydelay: line.supplier_delay_category,
            component_qty: line.component_qty,
          },
          {
            latitude: line.latitude_plant,
            longitude: line.longitude_plant,
            plant: line.plant,
            portname: line.plant_port_display_name,
            daydelay: parseInt(line.plant_days_delayed),
            categorydelay: line.supplier_delay_category,
            component_qty: line.component_qty,
          },
        ]
      }
      else{
        singleRowData = [
          {
            latitude: line.T1_latitude,
            longitude: line.T1_longitude,
            plant: line.T1_company_name,
            //portname: line.supplier_port_display_name,
            //daydelay: parseInt(line.supplier_days_delayed),
            //categorydelay: line.supplier_delay_category,
            //component_qty: line.component_qty,
          },
          {
            latitude: line.T0_latitude,
            longitude: line.T0_longitude,
            plant: line.T0_company_name,
            //portname: line.plant_port_display_name,
            //daydelay: parseInt(line.plant_days_delayed),
            //categorydelay: line.supplier_delay_category,
            //component_qty: line.component_qty,
          },
        ]
      }

      for (let value of singleRowData) {
        const series = pointSeries.pushDataItem(value)
        finaldata.push(series)
      }
      lineSeries.pushDataItem({
        pointsToConnect: finaldata,
      })
    }

    lineSeries.mapLines.template.setAll({
      stroke: am5.color(style.lineProps.line_stroke),
      strokeWidth: style.lineProps.strokeWidth,
      strokeOpacity: style.lineProps.strokeOpacity,
    })

    // TOOLTIP
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: `{${style.polygonProps.tooltipText}}`,
      interactive: true,
    })

    // ON HOVER
    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(style.polygonProps.hover_fill_colour),
    })

    // GET LATITUDE AND LOGITUDE
    chart.events.on('click', function (ev) {
    })

    var backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}))

    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color('#d4f1f9'),
    })

    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    })

    return () => {
      root.dispose()
    }
  }, [chartID, style, data])

  return <div id={chartID} style={{ width: '100%', height: '350px', zIndex: '5' }}></div>
}

MapPolygonPointLine.propTypes = {
  style: PropTypes.object,
  chartID: PropTypes.string,
  data: PropTypes.array,
}
