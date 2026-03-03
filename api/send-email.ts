import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (!process.env.RESEND_API_KEY) {
        return new Response(JSON.stringify({ error: 'API Key missing' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { firstName, lastName, service, details } = await req.json();

        const { data, error } = await resend.emails.send({
            from: 'Steady Eddy Excavation <notifications@steadyeddyexcavation.com>',
            to: ['Steadyeddyexcavation@gmail.com'],
            subject: `New Contact Form Submission: ${service}`,
            html: `
        <h2>New Inquiry from Steady Eddy Excavation</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Project Details:</strong></p>
        <p>${details}</p>
      `,
        });

        if (error) {
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
