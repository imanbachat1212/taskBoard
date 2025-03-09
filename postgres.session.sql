CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    column VARCHAR(50), -- 'Backlog', 'To Do', 'Done'
    tag_id INTEGER REFERENCES tags(id),
    position INTEGER
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    color VARCHAR(20)
);

CREATE TABLE history_logs (
    id SERIAL PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
