<?php

namespace App\Http\Controllers;

use App\Models\Chairman;
use App\Models\Building;
use App\Models\Hall;
use App\Models\Hallsuper;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HallController extends Controller
{
    public function gotoAddHall():Response
    {
        $halls = Hall::with('building')->get();
//        $teachers = Teacher::with('faculty','department','user','designation')->get();
        $buildings = Building::all();
        return Inertia::render('AdminActivities/AddHall', [
            'halls' => $halls,
            'buildings' => $buildings,
        ]);
    }

    public function addHall(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'building_id' => 'required|integer',
        ]);

        try {
            Hall::create([
                'name' => $request->name,
                'building_id' => $request->building_id,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }

    public function gotoAddHallSuper():Response
    {
        $halls = Hall::all();
        $teachers = Teacher::with('user')->get();
        $hallSupers = Hallsuper::with('teacher.user','hall')->get();
        return Inertia::render('AdminActivities/AddHallSuper', [
            'halls' => $halls,
            'teachers' => $teachers,
            'hallSupers' => $hallSupers,
        ]);
    }

    public function addHallSuper(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'hall_id' => 'required|integer|max:255',
            'teacher_id' => 'required|integer|max:255',
            'hall_super_message' => 'string|nullable',
        ]);

        // Check if the hall already has a hall super
        $existingHallSuper = Hallsuper::where('hall_id', $request->hall_id)->first();

        if ($existingHallSuper) {
            return response()->json([
                'status' => 'error',
                'message' => 'A Hall Super already exists for the selected hall.',
            ], 409);
        }

        try {
            Hallsuper::create([
                'hall_id' => $request->hall_id,
                'teacher_id' => $request->teacher_id,
                'hall_super_message' => $request->hall_super_message,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Hall Super added successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to add Hall Super. Please try again.',
            ], 500);
        }
    }

}
