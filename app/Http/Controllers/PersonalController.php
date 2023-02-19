<?php

namespace App\Http\Controllers;

use App\Helpers\SessionHelper;
use App\Models\Checklist;
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

    // Browse personal task
    public function browse()
    {
        SessionHelper::avoidCSRF();

        request()->validate([
            'todoId' => 'required|integer|exists:todos,id'
        ]);

        $TODO_ID = request()->todoId;

        $TODO = Todo::query()
            ->where([
                ['user_id', '=', auth()->id()],
                ['id', '=', $TODO_ID],
            ])
            ->with('checklists')
            ->get()
            ->first();

        return response()->json($TODO);
    }

    // Update personal task
    public function update()
    {
        SessionHelper::avoidCSRF();

        request()->validate([
            'todoId' => 'required|integer|exists:todos,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'checklist' => 'required|array',
        ]);

        $TODO_ID = request()->todoId;
        $TITLE = request()->title;
        $DESCRIPTION = request()->description;
        $NEW_CHECKLIST = request()->checklist;

        $TODO = Todo::query()
            ->where([
                ['user_id', '=', auth()->id()],
                ['id', '=', $TODO_ID],
            ])->update([
                'title' => $TITLE,
                'description' => $DESCRIPTION
            ]);

        $CHECKLISTS = Checklist::query()->where('todo_id', $TODO_ID)->get()->all();

        foreach($CHECKLISTS as $ch){
            Checklist::query()->where('id', $ch->id)->get()->first()->delete();
        }

        foreach($NEW_CHECKLIST as $nc){
            Checklist::query()->create([
                'todo_id' => $TODO_ID,
                'name'=>$nc
            ]);
        }


        return response()->json($TODO);
    }

    // Delete personal task
    public function delete()
    {
        SessionHelper::avoidCSRF();

        request()->validate([
            'todoId' => 'required|integer|exists:todos,id'
        ]);

        $TODO_ID = request()->todoId;

        $RESULT = Todo::query()->where('id', $TODO_ID)->delete();
        
        return response()->json($RESULT);
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
