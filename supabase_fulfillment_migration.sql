CREATE TABLE fulfillment_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  "column" TEXT NOT NULL DEFAULT 'Backlog',
  priority TEXT NOT NULL DEFAULT 'Medium',
  due_date DATE,
  assigned_to TEXT,
  comments_count INT DEFAULT 0,
  attachments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Optional: Add Row Level Security (RLS) policies if needed
-- ALTER TABLE fulfillment_tasks ENABLE ROW LEVEL SECURITY;
