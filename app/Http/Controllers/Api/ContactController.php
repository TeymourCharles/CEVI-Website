<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:252',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        // Sending the email
        Mail::send([], [], function ($message) use ($request) {
            $message->to('villanuevateymour27@gmail.com')
                    ->subject('Contact Form Submission from ' . $request->name)
                    ->from($request->email, $request->name)
                    ->replyTo($request->email)
                    ->html('<h1>Contact Form Message</h1><p>' . nl2br(htmlspecialchars($request->message)) . '</p>');
        });

        return response()->json(['message' => 'Contact message sent successfully!'], 201);
    }
}
