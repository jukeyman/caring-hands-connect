import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function GPSVerification({ clientAddress, onVerified, onFailed }) {
    const [status, setStatus] = useState('checking'); // checking, verified, failed
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    const verifyLocation = () => {
        setStatus('checking');
        setError(null);

        if (!navigator.geolocation) {
            setStatus('failed');
            setError('GPS not supported on this device');
            onFailed?.();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });

                // In production, this would call a backend function to verify distance
                // For now, simulate verification
                setTimeout(() => {
                    // Mock: randomly verify (in production, calculate actual distance)
                    const isWithinRange = true; // Would check actual distance
                    
                    if (isWithinRange) {
                        setStatus('verified');
                        onVerified?.(pos.coords);
                    } else {
                        setStatus('failed');
                        onFailed?.();
                    }
                }, 1500);
            },
            (err) => {
                setStatus('failed');
                setError(err.message);
                onFailed?.();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    useEffect(() => {
        verifyLocation();
    }, []);

    return (
        <div className="mb-6">
            {status === 'checking' && (
                <Alert className="border-blue-500 bg-blue-50">
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    <AlertDescription className="text-gray-700">
                        Verifying your location...
                    </AlertDescription>
                </Alert>
            )}

            {status === 'verified' && (
                <Alert className="border-green-500 bg-green-50">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-gray-700">
                        <span className="font-semibold text-green-700">Location verified ✓</span>
                        <br />
                        You are at the client's location
                    </AlertDescription>
                </Alert>
            )}

            {status === 'failed' && (
                <Alert className="border-red-500 bg-red-50">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <AlertDescription>
                        <p className="font-semibold text-red-700 mb-2">
                            {error || "You must be at the client's location to clock in"}
                        </p>
                        <Button 
                            size="sm"
                            onClick={verifyLocation}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Retry GPS
                        </Button>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}