<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;

class DatabaseStructureController extends Controller
{
    public function generateTableStructure()
    {
        $databaseName = env('DB_DATABASE');
        $tables = DB::select("SHOW TABLES");

        if (empty($tables)) {
            return response()->json(['error' => 'No tables found in the database'], 404);
        }

        $content = "Database Structure for: $databaseName\n\n";

        foreach ($tables as $tableRow) {
            $tableName = reset($tableRow); // Extract table name dynamically
            $columns = Schema::getColumnListing($tableName);

            $content .= "Table: $tableName\n";
            $content .= "--------------------------------------\n";

            foreach ($columns as $column) {
                $columnDetails = DB::select("SHOW COLUMNS FROM `$tableName` WHERE Field = ?", [$column])[0];
                $content .= "{$columnDetails->Field} - {$columnDetails->Type}";

                if ($columnDetails->Null === 'NO') {
                    $content .= " (NOT NULL)";
                }

                if (!is_null($columnDetails->Default)) {
                    $content .= " DEFAULT '{$columnDetails->Default}'";
                }

                $content .= "\n";
            }

            $content .= "\n";
        }

        $fileName = "database_structure.txt";
        Storage::disk('local')->put($fileName, $content);

        return response()->download(storage_path("app/$fileName"))->deleteFileAfterSend(true);
    }
}
