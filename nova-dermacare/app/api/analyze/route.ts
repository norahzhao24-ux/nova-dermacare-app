import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ⭐ Replace this with your ngrok URL
    const FASTAPI_URL = "https://YOUR-NGROK-URL.ngrok.io/predict";

    const backendForm = new FormData();
    backendForm.append("file", file);

    const res = await fetch(FASTAPI_URL, {
      method: "POST",
      body: backendForm,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Backend error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
