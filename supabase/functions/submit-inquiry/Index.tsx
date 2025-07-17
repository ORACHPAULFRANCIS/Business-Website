import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

// CORS headers for frontend compatibility
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define the expected inquiry structure
interface InquiryRequest {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
  phone?: string;
}

// HTTP handler
const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: InquiryRequest = await req.json();
    const { name, email, company, service, message, phone } = body;

    // Log the incoming request
    console.log("New inquiry received:", { name, email, service });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into Supabase
    const { data: inquiry, error: dbError } = await supabase
      .from("inquiries")
      .insert({
        name,
        email,
        company: company || null,
        service,
        message,
        phone: phone || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insertion error:", dbError);
      throw new Error("Failed to save inquiry to the database.");
    }

    console.log("Inquiry saved to database with ID:", inquiry.id);

    // Initialize Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) throw new Error("Missing Resend API key.");

    const resend = new Resend(resendApiKey);

    // Compose email to admin
    const adminHtml = `
      <h2 style="color: #2563eb;">New Inquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong><br>${message}</p>
      <p style="font-size: 12px; color: #6b7280;">Submitted at ${new Date().toLocaleString()}</p>
    `;

    await resend.emails.send({
      from: "Borderless Maps <hello@borderlessmaps.com>",
      to: ["orachpf@gmail.com"],
      subject: `New Inquiry: ${service} - ${name}`,
      html: adminHtml,
    });

    // Compose confirmation to client
    const clientHtml = `
      <h2 style="color: #2563eb;">Thank you for reaching out!</h2>
      <p>Hi ${name},</p>
      <p>Thanks for your interest in <strong>${service}</strong>. Your message has been received.</p>
      <p><strong>Your Message:</strong><br>${message}</p>
      <p>We’ll get back to you within 24 hours.</p>
      <br>
      <p>Best regards,<br><strong>Borderless Maps Team</strong><br>Spatial data storytellers</p>
    `;

    await resend.emails.send({
      from: "Borderless Maps <hello@borderlessmaps.com>",
      to: [email],
      subject: "Thank you for your inquiry - Borderless Maps",
      html: clientHtml,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Inquiry submitted successfully.",
        inquiryId: inquiry.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Submission error:", error.message || error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unexpected error occurred.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
         },
      }
    );
  }
};

serve(handler);