import { lazy, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Lazy load heavy components
const AdvancedCalculatorSuite = lazy(() => import('@/components/AdvancedCalculatorSuite'));
const StatsDashboard = lazy(() => import('@/components/StatsDashboard'));

// Loading skeleton component
const LoadingSkeleton = () => (
  <Card className="animate-pulse">
    <CardContent className="p-6">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </CardContent>
  </Card>
);

// Performance-optimized component wrapper
export const LazyAdvancedCalculator = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <AdvancedCalculatorSuite />
  </Suspense>
);

export const LazyStatsDashboard = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <StatsDashboard />
  </Suspense>
);

// Image optimization component
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = ({ src, alt, className, width, height }: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    />
  );
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload hero image
  const heroImageLink = document.createElement('link');
  heroImageLink.rel = 'preload';
  heroImageLink.href = '/assets/herobanner.png';
  heroImageLink.as = 'image';
  document.head.appendChild(heroImageLink);
};