export interface RoiMetric {
  value: string;
  label: string;
  detail?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  caseStudy: string;
  clientName?: string;
  industry?: string;
  headlineMetric?: string;
  headlineMetricLabel?: string;
  roiMetrics?: RoiMetric[];
  beforeState?: string;
  afterState?: string;
  servicesProvided?: string[];
  color: string;
  image: string;
  gallery: string[];
  liveUrl: string;
}
