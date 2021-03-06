CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  event_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  post TEXT NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
