<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Users\User;

class AuthController extends Controller
{
    // Login method to authenticate the user and generate a token
    public function login (Request $request)
    {
        // Validate the request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        // Attempt to authenticate the user
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }
        //Search for the user and load their roles and permissions
        $user = User::where('email', $request->email)->firstOrFail();
        $user->load('roles', 'permissions');
        // Create a new token for the user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return the token and user information
        return response()->json([
            'message' => 'Bienvenido ' . $user->name,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }
    // Obtain the authenticated user information
    public function me(Request $request)
    {
        // Load the user's roles and permissions
        $user = $request->user()->load('roles', 'permissions');

        return response()->json([
            'user' => $user
        ]);
    }
    // Logout method to revoke the user's token
    public function logout(Request $request)
    {
        // Revoke the current token
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);

    }
}