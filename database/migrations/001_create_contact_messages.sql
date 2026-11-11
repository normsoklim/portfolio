CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(80) NOT NULL,
    email VARCHAR(254) NOT NULL,
    subject VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,

    ip_address INET,
    user_agent TEXT,

    notification_status VARCHAR(20)
        NOT NULL DEFAULT 'PENDING'
        CHECK (
            notification_status IN (
                'PENDING',
                'SENT',
                'FAILED'
            )
        ),

    confirmation_status VARCHAR(20)
        NOT NULL DEFAULT 'PENDING'
        CHECK (
            confirmation_status IN (
                'PENDING',
                'SENT',
                'FAILED'
            )
        ),

    notification_error TEXT,
    confirmation_error TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
ON contact_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_email
ON contact_messages (email);

CREATE INDEX IF NOT EXISTS idx_contact_messages_notification
ON contact_messages (notification_status);
