import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ProductQuestionsProps {
  productId: string;
}

const ProductQuestions: React.FC<ProductQuestionsProps> = ({ productId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [question, setQuestion] = useState('');

  const { data: questions, isLoading } = useQuery({
    queryKey: ['product-questions', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_questions')
        .select('id, question, answer, created_at, answered_at')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addQuestion = useMutation({
    mutationFn: async (text: string) => {
      const { error } = await supabase.from('product_questions').insert({
        product_id: productId,
        user_id: user!.id,
        question: text.trim(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setQuestion('');
      toast({ title: 'Question submitted', description: 'Your question is submitted for review.' });
      queryClient.invalidateQueries({ queryKey: ['product-questions', productId] });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to submit', description: error.message, variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to ask a question.' });
      return;
    }
    if (question.trim().length < 10) {
      toast({ title: 'Question too short', description: 'Please write at least 10 characters.', variant: 'destructive' });
      return;
    }
    addQuestion.mutate(question);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-display font-bold mb-6 text-center">Product Q&A</h3>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-4 mb-6">
        <label className="text-sm font-medium text-foreground block mb-2">Ask a question about this product</label>
        <div className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value.slice(0, 300))}
            placeholder="Example: Is this suitable for daily wear?"
            maxLength={300}
          />
          <Button type="submit" disabled={addQuestion.isPending}>
            <Send className="w-4 h-4 mr-1" /> Ask
          </Button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading questions...</p>
      ) : !questions?.length ? (
        <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-lg">
          <MessageCircle className="w-8 h-8 mx-auto mb-2" />
          No questions yet. Be the first to ask.
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-card border border-border rounded-lg p-4">
              <p className="font-medium text-foreground">Q: {q.question}</p>
              {q.answer ? (
                <p className="mt-2 text-muted-foreground">A: {q.answer}</p>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Awaiting answer from our team.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductQuestions;
