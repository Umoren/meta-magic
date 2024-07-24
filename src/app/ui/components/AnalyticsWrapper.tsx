'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { setupAnalytics } from '@/app/utils/analytics';
import { record } from 'aws-amplify/analytics';

function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setupAnalytics();
    }, []);

    useEffect(() => {
        if (pathname) {
            record({
                name: 'pageView',
                attributes: {
                    path: pathname,
                },
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <AnalyticsTracker />
            </Suspense>
            {children}
        </>
    );
}