import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

let limiter: Ratelimit | null = null;

function getLimiter() {
  if (limiter) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const redis = new Redis({
    url,
    token,
  });

  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "portfolio-contact",
    analytics: true,
  });

  return limiter;
}

export async function checkContactRateLimit(identifier: string) {
  const rateLimiter = getLimiter();

  if (!rateLimiter) {
    // Local development can run without Redis.
    // Production must have Redis configured.
    if (process.env.NODE_ENV === "production") {
      return {
        success: false,
        configurationError: true,
      };
    }

    return {
      success: true,
      configurationError: false,
    };
  }

  const result = await rateLimiter.limit(identifier);

  return {
    success: result.success,
    configurationError: false,
    remaining: result.remaining,
    reset: result.reset,
  };
}
