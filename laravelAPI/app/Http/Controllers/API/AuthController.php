<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function AllUsers(): JsonResponse
    {
        return response()->json(UserResource::collection(User::get()));
    }
    /**
     * @param LoginRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = (new User())->getUserByEmail($request->all());
        if ($user && Hash::check($request->input('password'),$user->password)){
            $token = $user->createToken($user->email)->plainTextToken;
            return response()->json([
                'data' => $user,
                'token' => $token
            ]);
        }
        throw ValidationException::withMessages([
            'email' => ['The Provided credentials are incorrect']
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json('Register successfully');
    }

    public function profileUpdate(Request $request)
    {
        $user = auth()->user();
        $this->validate($request, [
            'name' => 'required',
            'email' => "required|unique:users,email,$user->id",
            'password' => 'sometimes|nullable|min:8|confirmed'
        ]);
//        User::findOrFail($request, [
//
//        ]);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
//        #Match The Old Password
//        if (!Hash::check($request->old_password, auth()->user()->password)) {
//            return back()->with("error", "Old Password Doesn't match!");
//        }
//
//        #Update the new Password
//        $updated = User::whereId(auth()->user()->id)->update([
//            'password' => Hash::make($request->new_password)
//        ]);
        if ($request->has('password')){
            $user->update([
                'password' => Hash::make($request->password)
            ]);
        }
        return response()->json('Success', 200);

    }

    public function update_password(Request $request){
        $this->validate($request, [
            'old_password' => 'required',
            'new_password' => 'min:6|required_with:password_confirmation|same:password_confirmation',
            'password_confirmation' => 'min:6'
        ]);

        if(Hash::check($request->old_password , auth()->user()->password)) {
            if(!Hash::check($request->new_password  , auth()->user()->password)) {
               $user = User::find(auth()->id());
               $user->update([
                   'password' => bcrypt($request->new_password )
               ]);
               return response()->json('Password Updated successfully');
               // return redirect()->back();
            }
            return response()->json('New password can not be the old password!');
            // return redirect()->back();
        }
        return response()->json('Whops! old password dose not match!!');
        //return redirect()->back();
    }

    /**
     * @return JsonResponse
     */
    final public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();
        return response()->json(['msg'=>'You have successfully logged out!']);
    }
}
