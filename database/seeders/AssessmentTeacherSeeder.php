<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AssessmentTeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public static function run(): void
    {
        $teachers = [
            [
                'lastname' => 'Pescueso',
                'firstname' => 'Brigette Ursula',
                'middlename' => 'L.',
                'email' => 'bpescueso@crc.pshs.edu.ph',
                'gender' => 'Female',
            ],
            [
                'lastname' => 'Almocera',
                'firstname' => 'Divine Faith',
                'middlename' => 'G.',
                'email' => 'dgalmocera@crc.pshs.edu.ph',
                'gender' => 'Female',
            ],
            [
                'lastname' => 'Altar',
                'firstname' => 'Daisyre Mae',
                'middlename' => 'G.',
                'email' => 'dgaltar@crc.pshs.edu.ph',
                'gender' => 'Female',
            ],
            [
                'lastname' => 'Mordeno',
                'firstname' => 'Patricia Therese',
                'middlename' => 'M.',
                'email' => 'pmordeno@crc.pshs.edu.ph',
                'gender' => 'Female',
            ],
            [
                'lastname' => 'Salvan',
                'firstname' => 'Vendy Von',
                'middlename' => 'P.',
                'email' => 'vsalvan@crc.pshs.edu.ph',
                'gender' => 'Male',
            ],
        ];

        foreach ($teachers as $teacher) {
            $user = User::create([
                'name' => $teacher['firstname'] . ' ' . $teacher['lastname'],
                'email' => $teacher['email'],
                'password' => Hash::make(12345),
            ]);
            Teacher::create([
                'user_id' => $user->id,
                'last_name' => $teacher['lastname'],
                'first_name' => $teacher['firstname'],
                'middle_name' => $teacher['middlename'],
                'gender' => strtolower($teacher['gender']),
            ]);
        }
    }
}
