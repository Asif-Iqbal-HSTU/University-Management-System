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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('courseCode');
            $table->text('courseTitle');
            //$table->string('faculty');
            $table->foreignId('department_id')->constrained()->onDelete('cascade');
            $table->foreignId('degree_id')->constrained()->onDelete('cascade');
            $table->float('credit');
            $table->float('contactHourPerWeek');
            $table->string('level');
            $table->string('semester');
            $table->string('academicSession');      //Jan-Jun, Jul-Dec
            $table->string('type');                 //Core, etc.
            $table->string('type_T_S');             //Theory, Sessional
            $table->string('totalMarks')->nullable();
            $table->string('instructor')->nullable();
            $table->text('prerequisites')->nullable();
            $table->text('summary')->nullable();
            //$table->string('AddedBy')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
