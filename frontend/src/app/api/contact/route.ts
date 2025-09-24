import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const API_KEY = process.env.WEB3FORMS_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ success: false, message: "API key not found" }, { status: 500 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: API_KEY,
        subject: body.subject || "New Contact Form Submission",
        name: body.name,
        email: body.email,
        message: body.message,
        from_name: body.from_name,
        reply_to: body.reply_to,
        source: body.source || "Website Contact Form",
        platform: body.platform || "Web"
      })
    });

    let result;
    try {
      result = await response.json();
    } catch {
      result = { success: false, message: "Invalid JSON response from Web3Forms" };
    }

    return NextResponse.json(result, { status: response.ok ? 200 : response.status });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
