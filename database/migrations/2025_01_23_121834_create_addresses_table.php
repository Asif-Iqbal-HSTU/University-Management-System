<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('present_division');
            $table->string('present_district');
            $table->string('present_upazilla');
            $table->string('present_area');
            $table->string('permanent_division');
            $table->string('permanent_district');
            $table->string('permanent_upazilla');
            $table->string('permanent_area');
            $table->float('permanent_district_distance')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
