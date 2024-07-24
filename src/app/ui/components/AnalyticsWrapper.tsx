'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { setupAnalytics } from '@/app/utils/analytics';
import { record } from 'aws-amplify/analytics';

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
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

    return <>{children}</>;
}