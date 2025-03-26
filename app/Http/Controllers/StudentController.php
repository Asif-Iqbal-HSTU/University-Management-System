<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use App\Models\Hall;
use App\Models\Faculty;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function gotoAddStudent():Response
    {
        $faculties = Faculty::all();
        $degrees = Degree::all();
        $halls = Hall::all();
        return Inertia::render('StudentActivities/AddStudent', [
            'faculties' => $faculties,
            'degrees' => $degrees,
            'halls' => $halls,
        ]);
    }
//    public function addStudent(Request $request): RedirectResponse
//    {
//        //dd($request);
//        $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
//            'phone' => 'required|string|max:255',
//            'designation_id' => 'required|integer',
//            'faculty_id' => 'required|integer',
//            'department_id' => 'required|integer',
//            'password' => 'required',
//        ]);
//
//        $username = $this->generateUniqueUsername($request->name, $request->phone);
//
//        try {
//            $user = User::create([
//                'name' => $request->name,
//                'email' => $request->email,
//                'phone' => $request->phone,
//                'username' => $username,
//                'role' => 'teacher',
//                'password' => Hash::make($request->password),
//            ]);
//            Teacher::create([
//                'user_id' => $user->id,
//                'faculty_id' => $request->faculty_id,
//                'department_id' => $request->department_id,
//                'designation_id' => $request->designation_id,
//            ]);
//            return redirect()->back();
//        } catch (\Exception $e) {
//            return redirect()->back();
//        }
//    }

    public function addStudent(Request $request): \Illuminate\Http\JsonResponse
    {
//        dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone' => 'required|string|max:255',
            'faculty_id' => 'required|integer',
            'degree_id' => 'required|integer',
            'hall_id' => 'required|integer',
            'password' => 'required',
            'SID' => 'required|integer',
            'level' => 'required|string',
            'semester' => 'required|string',
            'session_year' => 'required|integer',
            'residential_status' => 'required|string',
            'image' => 'required|file',
        ]);

        $username = $this->generateUniqueUsername($request->name, $request->phone);


        // Check if the hall already has a hall super
        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response()->json([
                'status' => 'error',
                'message' => 'A User already exists for the email.',
            ], 409);
        }

        if ($request->hasFile('image')) {
            // Generate a unique file name
            $fileName = time() . '_' . $request->file('image')->getClientOriginalName();
            //dd($fileName);

            // Store the uploaded file in the specified directory ('public/reference_books')
            $filePath = $request->file('image')->storeAs('public/student_images', $fileName, 'public');

            // Remove 'public/' from the file path to store in the database
            $filePath = str_replace('public/', '', $filePath);
        } else {
            // File not present in request
//            return redirect()->back()->withErrors(['File' => 'Please upload a PDF file.']);
            return response()->json([
                'status' => 'error',
                'message' => 'Image not Addded. Please try again.',
            ], 500);
        }


//        $user = User::create([
//            'name' => $request->name,
//            'email' => $request->email,
//            'phone' => $request->phone,
//            'username' => $username,
//            'role' => 'student',
//            'password' => Hash::make($request->password),
//        ]);
//        Student::create([
//            'user_id' => $user->id,
//            'SID' => $request->SID,
//            'level' => $request->level,
//            'semester' => $request->semester,
//            'session' => $request->session_year,
//            'residential_status' => $request->residential_status,
//            'faculty_id' => $request->faculty_id,
//            'degree_id' => $request->degree_id,
//            'hall_id' => $request->hall_id,
//        ]);
//
//        return back();

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'username' => $username,
                'role' => 'student',
                'password' => Hash::make($request->password),
            ]);
            Student::create([
                'user_id' => $user->id,
                'SID' => $request->SID,
                'level' => $request->level,
                'semester' => $request->semester,
                'session_year' => $request->session_year,
                'residential_status' => $request->residential_status,
                'faculty_id' => $request->faculty_id,
                'degree_id' => $request->degree_id,
                'hall_id' => $request->hall_id,
                'image' => $filePath,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Registered successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to register. Please try again.',
            ], 500);
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
