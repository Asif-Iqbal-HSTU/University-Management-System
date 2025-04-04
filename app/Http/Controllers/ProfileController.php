<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Cgpa;
use App\Models\Degree;
use App\Models\Gender;
use App\Models\Guardian;
use App\Models\HallSeatApplication;
use App\Models\SeatAllocation;
use App\Models\User;
use App\Models\Student;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function teacherProfile():Response
    {
        return Inertia::render('Profiles/Teacher');
    }

    public function studentProfile($s_id):Response
    {
        $student = Student::where('SID', $s_id)->with('user', 'user.gender', 'user.address', 'faculty', 'degree', 'hall')->first();

        $filePath = $student->image;

//        $profile_image = public_path('storage/student_images/' . basename($filePath));
        // Ensure you are returning a valid URL for the frontend
        $profile_image = $student->image ? asset('storage/public/' . $student->image) : null;
        //dd($profile_image);

        $seatAllocation = SeatAllocation::where('student_id', $student->id)->with('room')->first();

        $cgpa = Student::find($student->id)->cgpa;

        $guardian = Student::find($student->id)->guardian;

        return Inertia::render('Profiles/Student', [
            'student' => $student,
            'cgpa' => $cgpa,
            'guardian' => $guardian,
            's_id' => $s_id,
            'seatAllocation' => $seatAllocation,
            'profile_image' => $profile_image,
        ]);
    }

    public function gotoStudentProfileEdit():Response
    {
        $user = Auth::user();
        $user_id = $user->id;
        $st = User::find($user_id)->student;
        $student = Student::where('id', $st->id)->with('user', 'faculty', 'degree', 'hall')->first();

        return Inertia::render('StudentActivities/EditStudentProfile', [
            'student' => $student,
        ]);
    }

    public function studentProfileEdit(Request $request):RedirectResponse
    {
        $user = Auth::user();
        $user_id = $user->id;
        $st = User::find($user_id)->student;
        $student = Student::where('id', $st->id)->with('user', 'faculty', 'degree', 'hall')->first();

        $request->validate([
            'gender' => 'required|string|max:255',
        ]);

        try {
            Gender::create([
                'user_id' => $user_id,
                'name' => $request->gender,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


}
