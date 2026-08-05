import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/data/portfolioData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Determine Web3Forms Access Key
    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      (PERSONAL_INFO as any).web3formsKey;

    // Send to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY"
          ? accessKey
          : "YOUR_WEB3FORMS_ACCESS_KEY",
        name,
        email,
        subject: subject || `Portfolio Contact from ${name}`,
        message,
        from_name: `${name} (via Portfolio Website)`,
        to_email: PERSONAL_INFO.email,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    } else {
      // Return response with feedback
      return NextResponse.json({
        success: data.success || false,
        message: data.message || "Sent successfully",
      });
    }
  } catch (error: any) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
