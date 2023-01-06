import {useState, useEffect} from "react"
import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(()=> import('react-apexcharts'), {
    ssr:false,
})

export default function GaugeChart({name, series, height}) {
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
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '60%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
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
      fill: {
        // type: 'gradient',
        // gradient: {
        //   shade: 'dark',
        //   type: 'horizontal',
        //   shadeIntensity: 0.5,
        //   gradientToColors: ['#ABE5A1'],
        //   inverseColors: true,
        //   opacityFrom: 1,
        //   opacityTo: 1,
        //   stops: [0, 100]
        // }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [name],
    }
  }

  return <ReactApexChart options={options.options} series={options.series} type="radialBar" height={height}/>
}