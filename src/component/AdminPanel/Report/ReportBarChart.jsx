import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import useReportFaculty from '../../../services/Queries/Report/useReportFaculty';

const ReportBarChart = () => {
  const chartRef = useRef(null);

  const {data : facultyDataX} = useReportFaculty();

  const facultyData = facultyDataX ? facultyDataX : [{}];


  const facultyNames = facultyData.map(item => item.facultyName);
  const totalArticlesData = facultyData.map(item => item.totalArticles);

  const facultyReportData = {
    labels: facultyNames,
    datasets: [
      {
        label: 'Number of Articles',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: totalArticlesData,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Number of Articles',
          font: {
            size: 14
          }
        }
      },
    },
  };

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }



    const ctx = chartRef.current.getContext("2d");
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: facultyReportData,
      options: options
    });

    // Set the chart instance to the ref
    chartRef.current.chartInstance = newChartInstance;

    // Cleanup function
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [facultyReportData, options]);

  return (
    <div className="mt-4" style={{ height: '400px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ReportBarChart;
