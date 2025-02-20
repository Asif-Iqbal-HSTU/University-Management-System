<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Hall;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BuildingController extends Controller
{

    public function gotoAddBuilding():Response
    {
        $buildings = Building::all();
        return Inertia::render('AdminActivities/AddBuilding', [
            'buildings' => $buildings,
        ]);
    }

    public function addBuilding(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'purpose' => 'required|string|max:255',
        ]);

        try {
            Building::create([
                'name' => $request->name,
                'purpose' => $request->purpose,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
