<?php

namespace App\Http\Controllers;

use App\Models\Faculty;
use App\Models\Degree;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DegreeController extends Controller
{
    public function gotoAddDegree():Response
    {
        $faculties = Faculty::all();
        $degrees = Degree::with('faculty')->get();
        return Inertia::render('AdminActivities/AddDegree', [
            'faculties' => $faculties,
            'degrees' => $degrees,
        ]);
    }

    public function addDegree(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'faculty_id' => 'required|integer|max:255',
            'credit_hours' => 'required|numeric|min:0|max:500',
        ]);

        try {
            Degree::create([
                'name' => $request->name,
                'faculty_id' => $request->faculty_id,
                'credit_hours' => $request->credit_hours,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
