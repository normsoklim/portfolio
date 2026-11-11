/**
 * Shared animation presets so every section reveals consistently
 * as it enters the viewport.
 *
 * Note: framer-motion `viewport` is set to `once: true` — elements
 * animate in the first time they scroll into view and stay visible.
 */
export const VIEWPORT = { once: true, margin: "-80px" } as const;

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

/** Pass `custom={index}` on a motion element to stagger siblings. */
export const fadeUpStagger = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});
