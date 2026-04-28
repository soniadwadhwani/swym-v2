import { useEffect, useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';

interface FeedbackRow {
  timestamp: string;
  rating: number;
  feedback: string;
  name: string;
}

interface CoachFeedbackProps {
  onBack: () => void;
}

export function CoachFeedback({ onBack }: CoachFeedbackProps) {
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [loadingRows, setLoadingRows] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadRows = async () => {
    try {
      setLoadingRows(true);
      const response = await fetch('/api/feedback');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to load feedback');
      }

      setRows(Array.isArray(data.rows) ? data.rows : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load feedback');
    } finally {
      setLoadingRows(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (rating < 1 || rating > 5) {
      setError('Please select a star rating.');
      return;
    }

    if (!feedback.trim()) {
      setError('Please write your feedback.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          feedback,
          name,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to submit feedback');
      }

      setRows(Array.isArray(data.rows) ? data.rows : []);
      setRating(0);
      setFeedback('');
      setName('');
      setSuccess('Thanks! Your feedback was submitted.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'Unknown date';
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0820] via-[#111033] to-[#111033] pb-24">
      <div className="bg-gradient-to-br from-[#1a1a3e] via-[#111033] to-[#0f0f2b] pt-12 pb-7 px-6 border-b border-white/5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </button>
        <h1 className="text-[30px] text-white mb-2 tracking-tight leading-none" style={{ fontFamily: 'Comfortaa, sans-serif' }}>
          Feedback
        </h1>
        <p className="text-white/50 text-sm">Share your experience and view recent feedback.</p>
      </div>

      <div className="px-6 pt-6 space-y-6">
        <form onSubmit={handleSubmit} className="bg-[#2A324E]/85 border border-white/10 rounded-3xl p-5 space-y-4 shadow-2xl">
          <div>
            <div className="text-white/80 text-sm mb-2">Star rating</div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    size={26}
                    className={star <= rating ? 'text-[#F6AA38] fill-[#F6AA38]' : 'text-white/30'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback"
              rows={4}
              className="w-full rounded-2xl bg-[#111033]/70 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-[#98C0C8]/70"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl bg-[#111033]/70 border border-white/10 px-4 py-3 text-white text-sm placeholder:text-white/35 focus:outline-none focus:border-[#98C0C8]/70"
            />
          </div>

          {error && <div className="text-red-300 text-sm">{error}</div>}
          {success && <div className="text-green-300 text-sm">{success}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#98C0C8] hover:bg-[#8cb3bb] disabled:opacity-70 text-[#111033] py-3 rounded-2xl text-sm font-semibold transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        <div className="space-y-3 pb-8">
          <div className="text-white/60 text-xs uppercase tracking-wide px-1">Recent feedback</div>
          {loadingRows && <div className="text-white/50 text-sm px-1">Loading feedback...</div>}
          {!loadingRows && rows.length === 0 && (
            <div className="text-white/50 text-sm px-1">No feedback yet.</div>
          )}
          {!loadingRows && rows.map((row, idx) => (
            <div key={`${row.timestamp}-${idx}`} className="bg-[#2A324E]/70 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="text-white text-sm font-medium">{row.name || 'Anonymous'}</div>
                <div className="text-white/45 text-xs">{formatTimestamp(row.timestamp)}</div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= row.rating ? 'text-[#F6AA38] fill-[#F6AA38]' : 'text-white/20'}
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{row.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
