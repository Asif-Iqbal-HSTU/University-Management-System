<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function seatAllocations(): HasMany
    {
        return $this->hasMany(SeatAllocation::class);
    }

}
