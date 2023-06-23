
import { Logger } from '../utils/logger';
enum PerformanceMetricsName {
  /** Time To Interactive */
  TTI = 'TTI',
  /** First Contentful Paint */
  FCP = 'FCP',
  /** Largest Contentful Paint */
  LCP = 'LCP',
  /** Time to First Byte */
  TTFB = 'TTFB',
  /** First Meaningful Paint */
  FMP = 'FMP',
  /** Speed Index */
  SI = 'SI',
}

interface PerformanceMetrics {
  [PerformanceMetricsName.TTI]?: number;
  [PerformanceMetricsName.FCP]?: number;
  [PerformanceMetricsName.LCP]?: number;
  [PerformanceMetricsName.TTFB]?: number;
  [PerformanceMetricsName.FMP]?: number;
  [PerformanceMetricsName.SI]?: number;
}

export class TenonPerformanceMeasure {
  static instance: TenonPerformanceMeasure;
  static getInstance() {
    if (!TenonPerformanceMeasure.instance) {
      TenonPerformanceMeasure.instance = new TenonPerformanceMeasure();
    }
    return TenonPerformanceMeasure.instance;
  }

  private metrics: PerformanceMetrics = {};

  public getMetrics() {
    return this.metrics;
  }

  public measureMetrics() {
    this.measureTTI();
    this.measureFCP();
    this.measureLCP();
    this.measureTTFB();
    this.measureFMP();
    this.measureSI();
  }

  public logMetrics() {
    Logger.table(this.metrics);
  }

  /**
   * Time To Interactive
   */
  private measureTTI() {
    const tti = performance.timing.domInteractive - performance.timing.navigationStart;
    this.metrics[PerformanceMetricsName.TTI] = tti;
  }

  /**
   * First Contentful Paint
   */
  private measureFCP() {
    // measure first contentful paint not by entries
    const fcp = performance.getEntriesByType('paint')
      .find((entry) => entry.name === 'first-contentful-paint')?.startTime;
    this.metrics[PerformanceMetricsName.FCP] = fcp;
  }

  /**
   * Largest Contentful Paint
   */
  private measureLCP() {
    const lcp = performance.getEntriesByType('largest-contentful-paint')
      .find((entry) => entry.startTime > 0)?.startTime;
    this.metrics[PerformanceMetricsName.LCP] = lcp;
  }

  /**
   * Time to First Byte
   */
  private measureTTFB() {
    const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
    this.metrics[PerformanceMetricsName.TTFB] = ttfb;
  }

  /**
   * First Meaningful Paint
   */
  private measureFMP() {
    const fmp = performance.getEntriesByType('paint')
      .find((entry) => entry.name === 'first-meaningful-paint')?.startTime;
    this.metrics[PerformanceMetricsName.FMP] = fmp;
  }

  /**
   * Speed Index
   */
  private measureSI() {
    const si = performance.getEntriesByType('paint')
      .find((entry) => entry.name === 'speed-index')?.startTime;
    this.metrics[PerformanceMetricsName.SI] = si;
  }
}
