import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ReportBarChart = () => {
  const chartRef = useRef(null);

  const facultyData = [
    {
      "facultyId": 1,
      "facultyName": "Computer Science",
      "totalUsers": 4,
      "totalArticles": 2
    },
    {
      "facultyId": 2,
      "facultyName": "Physics",
      "totalUsers": 4,
      "totalArticles": 2
    },
    {
      "facultyId": 3,
      "facultyName": "Engineering",
      "totalUsers": 3,
      "totalArticles": 2
    },
    {
      "facultyId": 4,
      "facultyName": "Biology",
      "totalUsers": 0,
      "totalArticles": 0
    },
    {
      "facultyId": 5,
      "facultyName": "Art",
      "totalUsers": 0,
      "totalArticles": 0
    },
    {
      "facultyId": 6,
      "facultyName": "Mathematics",
      "totalUsers": 0,
      "totalArticles": 0
    },
    {
      "facultyId": 7,
      "facultyName": "Physicsd",
      "totalUsers": 0,
      "totalArticles": 0
    },
    {
      "facultyId": 8,
      "facultyName": "social",
      "totalUsers": 0,
      "totalArticles": 0
    }
  ];

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
