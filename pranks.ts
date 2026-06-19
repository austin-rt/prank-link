export type Prank = {
  /** Innocent preview title shown in the chat link preview. */
  title: string;
  /** Innocent preview description shown under the title. */
  description: string;
  /** Innocent thumbnail image URL (used for both og:image and twitter:image). */
  image: string;
  /** The real destination the human gets bounced to on click. */
  destination: string;
};

/**
 * Add a prank by adding an entry here. The KEY becomes the URL path:
 *   key "q3-report"  ->  https://yourdomain.com/q3-report
 *
 * The destination never appears in the link, so the joke isn't spoiled in the
 * pasted message. Push to deploy.
 */
export const pranks: Record<string, Prank> = {
  "q3-report": {
    title: "Q3 Financial Report — Final",
    description: "Reviewed numbers, ready for sign-off. Opens in your browser.",
    image: "https://placehold.co/1200x630/2563eb/ffffff/png?text=Q3+Report",
    destination: "https://i.imgur.com/REPLACE_ME.jpeg",
  },
};
