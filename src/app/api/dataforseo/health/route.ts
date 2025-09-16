import { NextResponse } from 'next/server';
import { DataForSEOMetrics, DataForSEOAlerts } from '@/lib/dataforseo-security';

export async function GET() {
  try {
    const metrics = DataForSEOMetrics.getInstance();
    const alerts = DataForSEOAlerts.getInstance();
    
    const healthStatus = metrics.getHealthStatus();
    const currentAlerts = alerts.getAlerts();
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      health: healthStatus,
      metrics: metrics.getMetrics(),
      alerts: currentAlerts,
      uptime: process.uptime()
    });
    
  } catch (error) {
    console.error('Error getting DataForSEO health:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to get health status',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    const alerts = DataForSEOAlerts.getInstance();
    alerts.clearAlerts();
    
    return NextResponse.json({
      status: 'success',
      message: 'Alerts cleared',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error clearing alerts:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to clear alerts',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
