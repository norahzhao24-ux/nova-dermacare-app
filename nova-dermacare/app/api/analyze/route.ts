// app/api/analyze/route.ts

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // Read the incoming form-data
    const form = await req.formData();
    const file = form.get("file") as File | null;

    // Validate file
    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // Validate file type (JPG + PNG)
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: "Only JPG and PNG files are allowed" }),
        { status: 400 }
      );
    }

    // Your FastAPI backend URL (REQUIRED)
    const FASTAPI_URL =
      process.env.FASTAPI_URL ||
      "https://YOUR-BACKEND-URL/predict"; // <-- replace this

    // Prepare form-data for FastAPI
    const backendForm = new FormData();
    backendForm.append("file", file);

    // Send to FastAPI
    const response = await fetch(FASTAPI_URL, {
      method: "POST",
      body: backendForm,
    });

    // Handle backend errors
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Backend error. Try again later." }),
        { status: 500 }
      );
    }

    // Return FastAPI response
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err) {
    console.error("Error forwarding to FastAPI:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
