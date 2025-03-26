<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Hall extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function hallSuper(): HasOne
    {
        return $this->hasOne(Hallsuper::class);
    }

    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class);
    }

    public function notices(): HasMany
    {
        return $this->hasMany(Notice::class);
    }
}
