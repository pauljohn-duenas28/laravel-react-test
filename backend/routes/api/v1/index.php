<?php

Route::namespace('User')
->prefix('user')
->group(__DIR__ . '/User/User.php');

Route::namespace('Role')
->prefix('role')
->group(__DIR__ . '/Role/Role.php');
