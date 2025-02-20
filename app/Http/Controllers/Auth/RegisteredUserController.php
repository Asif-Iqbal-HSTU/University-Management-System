<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $username = $this->generateUniqueUsername($request->name, $request->phone);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'username' => $username,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        $user = Auth::user();

        if ($user->role === "teacher") {
            return redirect()->intended(route('teacherDashboard', absolute: false));
        }
        if ($user->role === "student") {
            return redirect()->intended(route('studentDashboard', absolute: false));
        }
        if ($user->role === "admin") {
            return redirect()->intended(route('adminDashboard', absolute: false));
        }

        return redirect()->back();
    }

    private function generateUniqueUsername(string $name, string $phone): string
    {
        // Format the name to replace spaces with underscores and remove special characters
        $baseUsername = Str::of($name)->trim()->replace(' ', '_')->replaceMatches('/[^A-Za-z0-9_]/', '');

        // Extract the last 4 digits of the phone number
        $lastFourDigits = substr($phone, -4);

        // Generate the initial username
        $username = "{$baseUsername}_{$lastFourDigits}";

        // Check if the username already exists in the database
        while (User::where('username', $username)->exists()) {
            // Generate a random 4-digit number and append to the username
            $randomDigits = rand(1000, 9999);
            $username = "{$baseUsername}_{$randomDigits}";
        }

        return $username;
    }


}
