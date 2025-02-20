<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\HallSeatApplication;
use App\Models\Room;
use App\Models\SeatAllocation;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeatAllocationController extends Controller
{
    public function getRooms($hall_id): \Inertia\Response
    {
        //dd($hall_id);
        $hall = Hall::find($hall_id);
        $rooms = Room::whereHas('floor.building.hall', function ($query) use ($hall_id) {
            $query->where('id', $hall_id);
        })
            ->with('seatAllocations.student')
            ->get()
            ->map(function ($room) {
                $allocatedCount = $room->seatAllocations->count();
                return [
                    'id' => $room->id,
                    'room_number' => $room->room_number,
                    'students' => $room->seatAllocations->map(fn($s) => $s->student->SID),
                    'available_seats' => max(0, 4 - $allocatedCount),
                ];
            });

        return Inertia::render('HallActivities/Rooms', [
            'rooms' => $rooms,
            'hall' => $hall,
        ]);
    }

    public function getStudents($hall_id): \Inertia\Response
    {
        $students = Student::where('hall_id', $hall_id)->with('user', 'degree',)->get();
        return Inertia::render('HallActivities/Students', [
            'students' => $students,
        ]);
    }

    public function getAvailableRooms($hall_id): \Illuminate\Http\JsonResponse
    {
        //dd($hall_id);
        $rooms = Room::whereHas('floor.building.hall', function ($query) use ($hall_id) {
            $query->where('id', $hall_id);
        })
            ->with('seatAllocations.student')
            ->get()
            ->map(function ($room) {
                $allocatedCount = $room->seatAllocations->count();
                return [
                    'id' => $room->id,
                    'room_number' => $room->room_number,
                    'students' => $room->seatAllocations->map(fn($s) => $s->student->SID),
                    'available_seats' => max(0, 4 - $allocatedCount),
                ];
            });

        return response()->json($rooms);
    }

    public function allocateStudent(Request $request, $applicationID): \Illuminate\Http\JsonResponse
    {
        $application = HallSeatApplication::where('id', $applicationID)->first();
        $student = Student::find($request->student_id);
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $room = Room::findOrFail($request->room_id);

        if ($room->seatAllocations->count() >= 4) {
            return response()->json(['error' => 'Room is full'], 422);
        }

        SeatAllocation::create([
            'room_id' => $request->room_id,
            'student_id' => $request->student_id,
        ]);

        $application->status = "Accepted";
        $application->save();

        $student->residential_status = "Residential";
        $student->save();

        return response()->json(['success' => 'Student allocated successfully']);
    }

    public function rejectStudent($applicationID): \Illuminate\Http\RedirectResponse
    {
        $application = HallSeatApplication::where('id', $applicationID)->first();

        $application->status = "Rejected";
        $application->save();

        return back()->with('success', 'Student rejected successfully');
    }
}
