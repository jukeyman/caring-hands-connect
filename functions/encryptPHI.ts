import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { data, operation } = await req.json();

        if (!data || !operation) {
            return Response.json({ 
                error: 'data and operation (encrypt/decrypt) are required' 
            }, { status: 400 });
        }

        const encryptionKey = Deno.env.get('PHI_ENCRYPTION_KEY');
        
        if (!encryptionKey) {
            return Response.json({ 
                error: 'PHI_ENCRYPTION_KEY not configured' 
            }, { status: 500 });
        }

        // Convert key to proper format
        const keyData = new TextEncoder().encode(encryptionKey.padEnd(32, '0').substring(0, 32));
        const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );

        if (operation === 'encrypt') {
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encodedData = new TextEncoder().encode(JSON.stringify(data));

            const encryptedData = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encodedData
            );

            // Combine IV and encrypted data
            const combined = new Uint8Array(iv.length + encryptedData.byteLength);
            combined.set(iv, 0);
            combined.set(new Uint8Array(encryptedData), iv.length);

            // Convert to base64
            const base64 = btoa(String.fromCharCode(...combined));

            return Response.json({ 
                success: true, 
                encrypted_data: base64
            });
        } else if (operation === 'decrypt') {
            // Decode base64
            const combined = Uint8Array.from(atob(data), c => c.charCodeAt(0));
            
            // Extract IV and encrypted data
            const iv = combined.slice(0, 12);
            const encryptedData = combined.slice(12);

            const decryptedData = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                key,
                encryptedData
            );

            const decoded = new TextDecoder().decode(decryptedData);
            const parsedData = JSON.parse(decoded);

            return Response.json({ 
                success: true, 
                decrypted_data: parsedData
            });
        } else {
            return Response.json({ 
                error: 'Invalid operation. Use "encrypt" or "decrypt"' 
            }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});