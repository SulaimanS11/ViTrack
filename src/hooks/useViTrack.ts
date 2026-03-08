import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ViTrackData } from '@/types';

// Helper hook for encapsulating Supabase queries and mutations
export function useViTrack() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all tracks the current user has access to.
   * RLS automatically filters this based on the collaborators table.
   */
  const getTracks = useCallback(async (): Promise<ViTrackData[]> => {
    setLoading(true);
    setError(null);
    try {
      // Due to RLS, the user can only read tracks they are a collaborator on.
      const { data, error: sbError } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;
      
      // Parse the JSONB content to match our frontend interface
      return (data || []).map(row => ({
        track_id: row.id,
        title: row.title,
        description: row.description,
        category: row.category,
        created_at: row.created_at,
        overall_progress_percentage: row.overall_progress_percentage,
        milestones: row.content?.milestones || [],
        daily_logs: [] // Will fetch separately if needed
      }));
    } catch (err: any) {
      console.error('Error fetching tracks:', err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update the active status/completion data of a track
   */
  const updateTrackProgress = useCallback(async (trackId: string, updatedContent: any, newProgress: number) => {
    setLoading(true);
    setError(null);
    try {
      const { error: sbError } = await supabase
        .from('tracks')
        .update({
          content: updatedContent,
          overall_progress_percentage: newProgress
        })
        .eq('id', trackId);

      if (sbError) throw sbError;
      return true;
    } catch (err: any) {
      console.error('Error updating track:', err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add a new parsed track to the database
   */
  const createTrack = useCallback(async (parsedTrack: ViTrackData) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Insert the Track
      const { data: trackData, error: trackError } = await supabase
        .from('tracks')
        .insert({
          title: parsedTrack.title,
          description: parsedTrack.description,
          category: parsedTrack.category,
          overall_progress_percentage: parsedTrack.overall_progress_percentage,
          content: { milestones: parsedTrack.milestones, resources: [] }
          // In a real app, resources would be derived from the JSON payload
        })
        .select('id')
        .single();

      if (trackError) throw trackError;

      const newTrackId = trackData.id;

      // 2. Insert the current user as the Owner in Collaborators
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        const { error: collabError } = await supabase
          .from('collaborators')
          .insert({
            track_id: newTrackId,
            user_id: userData.user.id,
            role: 'owner'
          });
        
        if (collabError) console.warn("Failed to set collaborator ownership:", collabError);
      }

      return newTrackId;
    } catch (err: any) {
      console.error('Error creating track:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getTracks,
    updateTrackProgress,
    createTrack
  };
}
