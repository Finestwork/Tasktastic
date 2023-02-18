<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Models\Checklist;
use App\Models\Todo;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function save()
    {
        SessionHelper::avoidCSRF();

        request()->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'todos' => 'required|array',
        ]);

        $TITLE = request()->title;
        $DESCRIPTION = request()->title;
        $PROGRESS_ID = 1;

        $TODO = Todo::query()->create([
            'user_id' => auth()->id(),
            'title' => $TITLE,
            'description' => $DESCRIPTION,
            'progress_id' => $PROGRESS_ID
        ]);

        foreach(request()->todos as $todo){
            Checklist::query()->create([
                'todo_id'=>$TODO->id,
                'name' => $todo['text']
            ]);
        }

        $FORMATTED = Todo::query()
            ->where('id', $TODO->id)
            ->with('checklists', 'progress')
            ->get()
            ->first();

        return response()->json($FORMATTED);
    }
}
