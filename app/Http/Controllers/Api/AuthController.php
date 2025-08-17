<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Models\PasswordResetTokens;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Mail;

class AuthController extends Controller
{


    public function Signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */

        $image = $request->file('proof_id');
        $extension = $image->getClientOriginalExtension();
        $new_name = time(). '.'. $extension;
        $path = 'uploads/user-id-img/';
        $image->move(public_path('uploads/user-id-img/'), $new_name);


        $userCount = User::count();
        $adminCount = User::where('user_type', 'Admin' )->count();

        if ($adminCount == 0 || $userCount < 1) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'proof_id' => $path.$new_name,
                'password' => $data['password'],
                'user_type' => "admin",
                'status' => "approved_admin"


            ]);

            /*return response()->json([
                'success' => $user,
                'msg' => 'Admin Registered Successfully.'
            ]);*/

            $token = $user->createToken('main')->plainTextToken;

            return response(compact('user', 'token'));

        } else {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'proof_id' => $path.$new_name,
                'password' => $data['password'],
                'user_type' => "user",
                'status' => "pending"
            ]);

            /*return response()->json([
                'success' => $user,
                'msg' => 'User Registered Successfully.'
            ]);*/
            $token = $user->createToken('main')->plainTextToken;

            return response(compact('user', 'token'));
        }


        //$token = $user->createToken('main')->plainTextToken;

        //return response(compact('user', 'token'));

    }

    public function Login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Your email or password is incorrect.'
            ], 422);
        }
        /** @var User $user */
        $user =  Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));

    }

    public function Logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }


    //forget password API method
    public function forgotPassword(Request $request)
    {
        try {
            /** @var User $user */
            $user = User::where('email', $request->email)->first();

            if ($user) {

                $token = Str::random(40);
                $domain = URL::to('/');
                $url = $domain.'/resetPasswordUser?token='.$token;

                $data['url'] = $url;
                $data['email'] = $request->email;
                $data['title'] = "Password Reset";
                $data['body'] = "Please click the below link to reset your password.";

                Mail::send('forgotPasswordMail', ['data'=>$data],
                    function($message) use ($data){
                        $message->to($data['email'])->subject($data['title']);
                    }
                );

                $datetime = Carbon::now()->format('Y-m-d H:i:s');
                    PasswordResetTokens::updateOrCreate(
                        ['email' => $request->email],
                        [
                            'email' => $request->email,
                            'token' => $token,
                            'created_at' => $datetime
                        ]
                    );

                return response()->json([
                    'success' => true,
                    'msg' => 'Please check your email to Reset your Password.'
                ]);
            }
            return response()->json([
                'success'=>false,
                'msg'=>'User not found'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success'=>false,
                'msg'=>$e->getMessage()
            ]);
        }
    }

    // reset password view load
    public function resetPasswordLoad(Request $request)
    {
        $resetData = PasswordResetTokens::where('token', $request->token)->first();
        if (isset($request->token) && $resetData) {
            $email = $resetData->email;
            $user = User::where('email', $email)->get();
            return view('resetPassword', compact('user'));

        } else {
            return view('NotFound404');
        }

        //dd($resetData);

    }

    //password reset functionality
    public function resetPassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string|min:8|regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9])/|confirmed'

        ]);

        $user = User::find($request->id);
        $user->password = $request->password;
        $user->save();

        PasswordResetTokens::where('email', $user->email)->delete();

        return view('success');
    }

}
