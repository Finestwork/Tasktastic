<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Models\Todo;
use Illuminate\Http\Request;

class PersonalController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth']);
    }

    // Fetch all personal tasks
    public function all()
    {
        SessionHelper::avoidCSRF();

        $STARTED = Todo::query()
            ->where([
                ['user_id', '=', auth()->id()],
                ['progress_id', '=', 1],
            ])
            ->get()
            ->all();
        $IN_PROGRESS = Todo::query()
            ->where([
                ['user_id', '=', auth()->id()],
                ['progress_id', '=', 2],
            ])
            ->get()
            ->all();
        $COMPLETED = Todo::query()
            ->where([
                ['user_id', '=', auth()->id()],
                ['progress_id', '=', 3],
            ])
            ->get()
            ->all();

        return response()->json(['started' => $STARTED, 'in_progress' => $IN_PROGRESS, 'completed' => $COMPLETED]);
    }

    // Update todo task's progress
    public function updateProgress()
    {
        SessionHelper::avoidCSRF();

        request()->validate([
            'todoId' => 'required|integer|exists:todos,id',
            'progressId' => 'required|integer|exists:progress,id'
        ]);

        $TODO_ID = request()->todoId;
        $PROGRESS_ID = request()->progressId;

        $TODO = Todo::query()->where('id', $TODO_ID)->update([
            'progress_id' => $PROGRESS_ID
        ]);

        return response()->json($TODO);
    }
}
