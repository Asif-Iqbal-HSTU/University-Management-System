<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class FacultyController extends Controller
{
    public function gotoAddFaculty():Response
    {
        $faculties = Faculty::all();
        return Inertia::render('AdminActivities/AddFaculty', [
            'faculties' => $faculties,
        ]);
    }

    public function addFaculty(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:255',
        ]);

        try {
            Faculty::create([
                'name' => $request->name,
                'short_name' => $request->short_name,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }

}
