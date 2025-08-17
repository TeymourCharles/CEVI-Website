<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => [
            'required',
            'email',
            'exists:users,email',
            function ($attribute, $value, $fail) {
                $user = \App\Models\User::where('email', $value)->first();

                if ($user && $user->status === 'pending') {
                    $fail("Your signup request is sent to Admin, please wait for Admin's approval");
                } else if ($user && $user->status === 'archive') {
                    $fail("Your signup request has been rejected.");
                }
            }
        ],
            'password' => 'required'
        ];
    }
}
