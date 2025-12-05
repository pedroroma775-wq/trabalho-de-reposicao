/*
# Create Storage Bucket for School Images

## 1. Storage Bucket
- Create bucket: `813evjiby1oh_school_images`
- Public access for reading
- Max file size: 1MB
- Allowed file types: images only

## 2. Security
- Anyone can read files
- Only authenticated users can upload
- Users can update/delete their own uploads
*/

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  '813evjiby1oh_school_images',
  '813evjiby1oh_school_images',
  true,
  1048576,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = '813evjiby1oh_school_images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = '813evjiby1oh_school_images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = '813evjiby1oh_school_images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = '813evjiby1oh_school_images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
