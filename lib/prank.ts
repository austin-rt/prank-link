export type Prank = {
  title: string;
  description: string;
  image: string;
  destination: string;
};

// URL-safe base64 of the prank payload. Works in browser and Node.
export function encodePrank(p: Prank): string {
  const json = JSON.stringify([p.title, p.description, p.image, p.destination]);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodePrank(code: string): Prank | null {
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const [title, description, image, destination] = JSON.parse(
      new TextDecoder().decode(bytes),
    );
    // Reject anything that isn't a real http(s) URL — blocks javascript: etc.
    if (!/^https?:\/\//i.test(destination)) return null;
    return {
      title: String(title ?? ""),
      description: String(description ?? ""),
      image: String(image ?? ""),
      destination: String(destination),
    };
  } catch {
    return null;
  }
}
