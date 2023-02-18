<?php

namespace Database\Seeders;

use App\Models\Progress;
use Illuminate\Database\Seeder;

class ProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $PROGRESS_NAMES = ['started', 'in-progress', 'completed'];

        foreach($PROGRESS_NAMES as $PG){
            Progress::query()->create(['name' => $PG]);
        }
    }
}
