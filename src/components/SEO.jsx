import { useEffect } from 'react';

export function useSEO(title, description) {
    useEffect(() => {
        document.title = title ? `${title} | Caring Hands Home Health` : 'Caring Hands Home Health';
        
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description;
    }, [title, description]);
}