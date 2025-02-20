<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Faculty;
use App\Models\User;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function gotoAddTeacher():Response
    {
        $faculties = Faculty::all();
        $departments = Department::all();
        $teachers = Teacher::with('faculty','department','user','designation')->get();
        $designations = Designation::all();
        return Inertia::render('AdminActivities/AddTeacher', [
            'faculties' => $faculties,
            'departments' => $departments,
            'teachers' => $teachers,
            'designations' => $designations,
        ]);
    }

    public function addTeacher(Request $request): RedirectResponse
    {
        //dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:255',
            'designation_id' => 'required|integer',
            'faculty_id' => 'required|integer',
            'department_id' => 'required|integer',
            'password' => 'required',
        ]);

        $username = $this->generateUniqueUsername($request->name, $request->phone);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'username' => $username,
                'role' => 'teacher',
                'password' => Hash::make($request->password),
            ]);
            Teacher::create([
                'user_id' => $user->id,
                'faculty_id' => $request->faculty_id,
                'department_id' => $request->department_id,
                'designation_id' => $request->designation_id,
            ]);
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back();
        }
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
