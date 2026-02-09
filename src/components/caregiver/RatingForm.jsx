import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from 'lucide-react';
import { toast } from 'sonner';

export default function RatingForm({ caregiverFirstName, onSubmit }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [appreciate, setAppreciate] = useState('');
    const [suggestions, setSuggestions] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            toast.error('Please select a star rating');
            return;
        }

        setSubmitting(true);
        
        // In production, this would save to a Rating entity
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Thank you for your feedback!');
        setRating(0);
        setAppreciate('');
        setSuggestions('');
        setSubmitting(false);
        
        if (onSubmit) onSubmit({ rating, appreciate, suggestions });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#1e3a5f]">Rate This Caregiver</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star Rating */}
                    <div>
                        <label className="text-sm font-semibold text-[#1e3a5f] mb-3 block">
                            Overall Rating *
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star 
                                        className={`w-10 h-10 ${
                                            star <= (hoverRating || rating)
                                                ? 'text-[#d4af37] fill-[#d4af37]'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Appreciation */}
                    <div>
                        <label className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                            What did you appreciate most?
                        </label>
                        <Textarea
                            placeholder={`Tell us what you appreciated about ${caregiverFirstName}'s care...`}
                            value={appreciate}
                            onChange={(e) => setAppreciate(e.target.value)}
                            rows={3}
                        />
                    </div>

                    {/* Suggestions */}
                    <div>
                        <label className="text-sm font-semibold text-[#1e3a5f] mb-2 block">
                            Any suggestions for improvement?
                        </label>
                        <Textarea
                            placeholder="Optional feedback for improvement..."
                            value={suggestions}
                            onChange={(e) => setSuggestions(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <Button 
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-[#1e3a5f] font-semibold"
                    >
                        {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}