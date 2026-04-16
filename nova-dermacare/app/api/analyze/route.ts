// app/api/analyze/route.ts

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // Read form-data from the incoming request
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // Prepare form-data to send to FastAPI
    const backendForm = new FormData();
    backendForm.append("file", file);

    // Send to FastAPI backend
    const response = await fetch("http://127.0.0.1:8002/predict", {
      method: "POST",
      body: backendForm,
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error("Error forwarding to FastAPI:", err);
    return new Response(JSON.stringify({ error: "Backend error" }), {
      status: 500,
    });
  }
}
