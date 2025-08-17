<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class SystemController extends Controller
{
    public function showPendingUserRequest()
    {
        $user = User::where('status', 'pending')
                    ->orWhere('status', 'approved')
                    ->orderBy('last_name', 'asc')->get();
        if ($user) {
            return response()->json([
                'status' => 200,
                'pendingUser' => $user
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No records found."
            ], 404);
        }
    }

    public function approveUserReq(Request $request, int $id)
    {

        $user = User::find($id);

        if ($user) {

            $user->update([
                'status' => "approved"
            ]);

            return response()->json([
                'status' => 200,
                'message' => "User is successfully registered."
            ], 200);
        }
    }

    public function rejectUserReq(Request $request, int $id)
    {

        $user = User::find($id);

        if ($user) {

            $user->update([
                'status' => "archive"
            ]);

            return response()->json([
                'status' => 200,
                'message' => "User is sent to Archive."
            ], 200);
        }
    }
}
