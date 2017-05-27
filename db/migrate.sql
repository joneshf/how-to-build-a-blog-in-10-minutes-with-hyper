CREATE TABLE IF NOT EXISTS post (
  id serial PRIMARY KEY,
  title text NOT NULL
);

ALTER TABLE post ADD COLUMN IF NOT EXISTS body text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS comment (
  id serial PRIMARY KEY,
  body text NOT NULL,
  post_id integer REFERENCES post (id) ON DELETE CASCADE
);
