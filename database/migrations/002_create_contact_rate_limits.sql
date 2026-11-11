CREATE TABLE IF NOT EXISTS contact_rate_limits (
    id BIGSERIAL PRIMARY KEY,

    ip_hash CHAR(64) NOT NULL,

    window_start TIMESTAMPTZ NOT NULL,

    request_count INTEGER NOT NULL DEFAULT 1,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (ip_hash, window_start)
);

CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_window
ON contact_rate_limits (window_start);
