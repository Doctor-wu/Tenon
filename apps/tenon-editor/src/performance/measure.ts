
import { Logger } from '../utils/logger';
export enum PerformanceMetricsName {
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

  EditorInitd = 'editor-initd',
  WorkbenchLaunched = 'workbench-launched',
  DataEngineInitd = 'data-engine-initd',
  AdapterReady = 'adapter-ready',
  EditorReady = 'editor-ready',
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

  public async measureMetrics() {
    this.measureTTI();
    this.measureFCP();
    await this.measureLCP();
    this.measureTTFB();
    this.measureFMP();
    this.measureSI();
    this.measureEditorMetrics();
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
  private async measureLCP() {
    return new Promise((resolve) => {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics[PerformanceMetricsName.LCP] = lastEntry.renderTime || lastEntry.loadTime;
        resolve(null);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
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

  private measureEditorMetrics() {
    const editorInitd = performance.getEntriesByName(PerformanceMetricsName.EditorInitd)[0]?.startTime;
    const workbenchLaunched = performance.getEntriesByName(PerformanceMetricsName.WorkbenchLaunched)[0]?.startTime;
    const dataEngineInitd = performance.getEntriesByName(PerformanceMetricsName.DataEngineInitd)[0]?.startTime;
    const adapterReady = performance.getEntriesByName(PerformanceMetricsName.AdapterReady)[0]?.startTime;
    const editorReady = performance.getEntriesByName(PerformanceMetricsName.EditorReady)[0]?.startTime;
    this.metrics[PerformanceMetricsName.EditorInitd] = editorInitd;
    this.metrics[PerformanceMetricsName.WorkbenchLaunched] = workbenchLaunched;
    this.metrics[PerformanceMetricsName.DataEngineInitd] = dataEngineInitd;
    this.metrics[PerformanceMetricsName.AdapterReady] = adapterReady;
    this.metrics[PerformanceMetricsName.EditorReady] = editorReady;
  }
}
