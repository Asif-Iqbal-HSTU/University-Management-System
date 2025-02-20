<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseObjective extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
