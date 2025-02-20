<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Building extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function hall(): HasOne
    {
        return $this->hasOne(Hall::class);
    }

    public function floors(): HasMany
    {
        return $this->hasMany(Floor::class);
    }
}
