import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotification(orderData: {
  customerName: string;
  customerEmail: string;
  totalAmount: string;
  items: string[];
}) {
  if (!process.env.RESEND_API_KEY) return;

  try {
    await resend.emails.send({
      from: "Hermosa Crochet <orders@hermosacrochet.com>",
      to: ["hermosa@hermosacrochet.com"],
      subject: `New Order from ${orderData.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4A574;">New Order Received!</h2>
          <p><strong>Customer:</strong> ${orderData.customerName}</p>
          <p><strong>Email:</strong> ${orderData.customerEmail}</p>
          <p><strong>Total:</strong> ${orderData.totalAmount}</p>
          <p><strong>Items:</strong></p>
          <ul>${orderData.items.map((item) => `<li>${item}</li>`).join("")}</ul>
          <p style="margin-top: 20px; color: #666;">Login to your admin dashboard to process this order.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}