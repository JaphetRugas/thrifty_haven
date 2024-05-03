"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Dashboard() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart<"line"> | null>(null);

    useEffect(() => {
        async function drawChart() {
            if (!canvasRef.current) {
                console.error("Canvas element 'salesChart' not found.");
                return;
            }

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Dummy chart data
            const chartData = {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            };

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) {
                console.error("Canvas context not available.");
                return;
            }

            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        drawChart();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="salesChart"></canvas>
        </div>
    );
}
