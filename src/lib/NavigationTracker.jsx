import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationTracker() {
    const location = useLocation();

    useEffect(() => {
        // Simple page view tracking via console (can be replaced with analytics)
        // console.log('Page view:', location.pathname);
    }, [location]);

    return null;
}
