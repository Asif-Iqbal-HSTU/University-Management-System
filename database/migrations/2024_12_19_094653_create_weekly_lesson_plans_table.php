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
        Schema::create('weekly_lesson_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('weekNo');
            $table->text('topics');
            $table->text('specificOutcomes');
            $table->string('teachingStrategy');
            $table->string('teachingAid');
            $table->string('assessmentStrategy');
            $table->string('CLO_mapping');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_lesson_plans');
    }
};
