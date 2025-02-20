<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DesignationController extends Controller
{
    public function gotoAddDesignation():Response
    {
        $designations = Designation::all();
        return Inertia::render('AdminActivities/AddDesignation', [
            'designations' => $designations,
        ]);
    }

    public function addDesignation(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);


        try {
            Designation::create([
                'name' => $request->name,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
