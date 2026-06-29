import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024;
const EXPIRATION_SECONDS = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Uploads aren't configured yet." },
      { status: 501 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files can be uploaded." },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be under 4 MB." },
      { status: 413 },
    );
  }

  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const body = new URLSearchParams();
  body.set("image", base64);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?expiration=${EXPIRATION_SECONDS}&key=${key}`,
      { method: "POST", body },
    );
    const json: { data?: { url?: string } } = await res.json();
    if (!res.ok || !json?.data?.url) {
      return NextResponse.json({ error: "Upload failed." }, { status: 502 });
    }
    return NextResponse.json({ url: json.data.url });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the upload service." },
      { status: 502 },
    );
  }
}
