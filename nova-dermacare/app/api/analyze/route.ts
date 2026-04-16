// app/api/analyze/route.ts

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // IMPORTANT: Replace this with your REAL FastAPI URL
    const FASTAPI_URL = process.env.FASTAPI_URL || "https://YOUR-BACKEND-URL/predict";

    const backendForm = new FormData();
    backendForm.append("file", file);

    const response = await fetch(FASTAPI_URL, {
      method: "POST",
      body: backendForm,
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Backend error" }), {
        status: 500,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err) {
    console.error("Error forwarding to FastAPI:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
