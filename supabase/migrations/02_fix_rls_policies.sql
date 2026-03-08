-- MIGRATION 02: FIX RLS RECURSION AND RECORD INSERTION

-- 1. Add created_by to tracks to solve the insert-then-select chicken-and-egg problem
ALTER TABLE tracks ADD COLUMN created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 2. Allow users to insert tracks
CREATE POLICY "Users can create tracks"
ON tracks FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Update Tracks SELECT policy so the creator can see it immediately before the collaborator row is added
DROP POLICY IF EXISTS "Users can view tracks they collaborate on" ON tracks;

CREATE POLICY "Users can view tracks they created or collaborate on"
ON tracks FOR SELECT
USING (
    created_by = auth.uid() OR
    EXISTS (
        SELECT 1 FROM collaborators
        WHERE collaborators.track_id = tracks.id
        AND collaborators.user_id = auth.uid()
    )
);

-- 4. Fix infinite recursion in collaborators SELECT
DROP POLICY IF EXISTS "Users can view collaborators on their tracks" ON collaborators;

CREATE POLICY "Users can view their own collaborator records"
ON collaborators FOR SELECT
USING (user_id = auth.uid());

-- 5. Fix collaborators INSERT (allows inviter link logic: users insert themselves)
DROP POLICY IF EXISTS "Owners can add new collaborators" ON collaborators;

CREATE POLICY "Users can add themselves as collaborators"
ON collaborators FOR INSERT
WITH CHECK (user_id = auth.uid());
