/*
  # Storage policies for media access

  1. Policies
    - Allow public read access to all files in the images bucket
    - Allow authenticated users to upload files
    - Allow bucket owners to manage files

  2. Security
    - Enable RLS on storage.objects
    - Add policies for read/write access
*/

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to files in the images bucket
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Create policy to allow bucket owners to manage their files
CREATE POLICY "Allow owners to manage their files"
ON storage.objects
FOR ALL
TO authenticated
USING (auth.uid() = owner)
WITH CHECK (auth.uid() = owner);