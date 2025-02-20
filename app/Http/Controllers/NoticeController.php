<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Notice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NoticeController extends Controller
{
    public function gotoAddNotice():Response
    {
        return Inertia::render('AdminActivities/AddNotice');
    }

    public function addNotice(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before_or_equal:end_date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'role' => 'required|string',
            'category' => 'required|string',
        ]);
//        Notice::create([
//            'title' => $request->title,
//            'description' => $request->description,
//            'start_date' => $request->start_date,
//            'end_date' => $request->end_date,
//            'role' => $request->role,
//            'category' => $request->category,
//        ]);
//        return redirect()->back();
        try {
            Notice::create([
                'title' => $request->title,
                'description' => $request->description,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'role' => $request->role,
                'category' => $request->category,
            ]);
            return redirect()->back();

        } catch (\Exception $e) {
            return redirect()->back();
        }
    }
}
