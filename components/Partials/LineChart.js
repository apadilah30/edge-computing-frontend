import dynamic from "next/dynamic";
const ReactApexChart = dynamic(()=> import('react-apexcharts'), {
    ssr:false,
})

export default function LineChart({series, height, categories, name}) {
    const options = {
        // {
        //     name: 'series1',
        //     data: [31, 40, 28, 51, 42, 109, 100]
        //   }, {
        //     name: 'series2',
        //     data: [11, 32, 45, 32, 34, 52, 41]
        //   }
        series: series,
        options: {
          chart: {
            height: height,
            width: "100%",
            type: 'line',
            toolbar: {
              show: false
            }
          },
          legend: {
            show: false,
            fontSize: '10px'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            curve: 'smooth',
            width: 1
          },        
          xaxis: {
            // type: 'category',
            type: 'datetime',
            categories: categories
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
          title: {
            text: name,
            align: 'center',
            floating: false,
            style: {
              fontSize:  '12px',
              fontWeight:  'bold',
              color:  '#263238'
            },
          }
        }
    }

    return <ReactApexChart options={options.options} series={options.series} type="line" height={height} />
}