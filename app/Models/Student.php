<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function faculty(): BelongsTo
    {
        return $this->BelongsTo(Faculty::class);
    }

    public function degree(): BelongsTo
    {
        return $this->belongsTo(Degree::class);
    }

    public function hall(): BelongsTo
    {
        return $this->belongsTo(Hall::class);
    }

    public function cgpa(): HasOne
    {
        return $this->hasOne(Cgpa::class);
    }

    public function guardian(): HasOne
    {
        return $this->hasOne(Guardian::class);
    }

    public function hallSeatApplication(): HasOne
    {
        return $this->hasOne(HallSeatApplication::class);
    }

    public function seatAllocation(): HasOne
    {
        return $this->hasOne(SeatAllocation::class);
    }

    public function hallClearanceApplication(): HasOne
    {
        return $this->hasOne(HallClearanceApplication::class);
    }

}
