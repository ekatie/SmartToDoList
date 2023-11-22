-- Drop and recreate tasks table (Example)

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT FALSE,
  created_date TIMESTAMP,
  completed_date TIMESTAMP,
  priority BOOLEAN,
  due_date DATE
);
