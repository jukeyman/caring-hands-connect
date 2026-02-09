import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';

export default function PhotoUpload({ photos, onPhotosChange }) {
    const maxPhotos = 5;

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        
        if (photos.length + files.length > maxPhotos) {
            toast.error(`Maximum ${maxPhotos} photos allowed`);
            return;
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                onPhotosChange([...photos, { 
                    url: event.target.result, 
                    caption: '',
                    file 
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index) => {
        onPhotosChange(photos.filter((_, i) => i !== index));
    };

    const updateCaption = (index, caption) => {
        const updated = [...photos];
        updated[index].caption = caption;
        onPhotosChange(updated);
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Photos (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                    Document meals, activities, or the client's day (max {maxPhotos} photos)
                </p>

                {/* Upload Button */}
                {photos.length < maxPhotos && (
                    <div>
                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <Label htmlFor="photo-upload">
                            <div className="border-2 border-dashed border-[#4a90e2] rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition-all">
                                <Camera className="w-12 h-12 text-[#4a90e2] mx-auto mb-2" />
                                <p className="text-[#4a90e2] font-semibold">
                                    Add Photos
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {photos.length}/{maxPhotos} uploaded
                                </p>
                            </div>
                        </Label>
                    </div>
                )}

                {/* Photo Previews */}
                {photos.length > 0 && (
                    <div className="space-y-4">
                        {photos.map((photo, index) => (
                            <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                                <div className="flex gap-4">
                                    <img 
                                        src={photo.url} 
                                        alt={`Upload ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <Label className="text-sm mb-1 block">
                                            Describe this photo
                                        </Label>
                                        <Input
                                            placeholder="e.g., Homemade chicken soup for lunch"
                                            value={photo.caption}
                                            onChange={(e) => updateCaption(index, e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removePhoto(index)}
                                        className="text-red-600 hover:bg-red-50"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}