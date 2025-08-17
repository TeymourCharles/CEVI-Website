<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        body {
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .form-container {
            text-align: center;
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            opacity: 100%;
        }
        .form-container:hover {
            transform: scale(1.05);
        }
        .form-title {
            font-size: 24px;
            color: #0A0A0A;
            margin-bottom: 20px;
            padding: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .error-list {
            color: #e74c3c;
            text-align: left;
            margin-bottom: 20px;
        }
        .form-input {
            width: 80%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
        }
        .form-submit {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: black;
            background-color: #FFD870;
            text-decoration: none;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .form-submit:hover {
            background-color: #c5a754;
        }

        .email {
            width: 100%;
        }

        .loading {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            font-size: 20px;
            display: none;

        }
    </style>
</head>
<body>
    <div id="loading" class="loading" style="display: none;">Loading...</div>
    <div id="form-container" class="form-container">
        <div class="form-title">Reset Password</div>

        @if($errors->any())
            <ul class="error-list">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        @endif

        <form method="POST" id="resetPasswordForm">
            @csrf<br>

            <input type="hidden" name="id" value="{{ $user[0]['id'] }}">
            <input type="hidden" class="email" name="email" value="{{ $user[0]['email'] }}">

            <input type="password" name="password" class="form-input" placeholder="New Password">
            <input type="password" name="password_confirmation" class="form-input" placeholder="Confirm Password">
            <br>
            <input type="submit" class="form-submit" value="Reset Password">


        </form>
    </div>

    <script>
        document.getElementById("resetPasswordForm").addEventListener("submit", function() {
            // Show the loading indicator
            document.getElementById("loading").style.display = "block";
            document.getElementById("form-container").style.opacity = "30%";
        });
    </script>
</body>
</html>
