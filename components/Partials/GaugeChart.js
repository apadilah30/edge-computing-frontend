import {useState, useEffect} from "react"
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(()=> import('react-apexcharts'), {
    ssr:false,
})

export default function GaugeChart({name, series, height}) {
  let colors = ""
  if(series <= 100 && series >=75){
    colors = "#fe5f76"
  } else if(series < 75 && series >=50) {
    colors = "#fdba3a"
  } else if(series < 50) {
    colors = "#25e6a4"
  }
  const options = {
    series: [series],
    options: {
      chart: {
        height: height,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      colors: [colors],
      plotOptions: {
        radialBar: {
          startAngle: -180,
          endAngle: 180,
          hollow: {
            margin: 0,
            size: '65%',
            background: '#fff',
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
          },
          track: {
            background: 'red',
            strokeWidth: '80%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true
            }
          },
      
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '10px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val)+"%";
              },
              offsetY: -4,
              color: '#111',
              fontSize: '18px',
              show: true,
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [name],
    }
  }

  return <ReactApexChart options={options.options} series={options.series} type="radialBar" height={height}/>
}