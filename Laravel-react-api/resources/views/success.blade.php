<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success</title>
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
        .message-container {
            text-align: center;
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        .message-container:hover {
            transform: scale(1.05);
        }
        .message-title {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 20px;
            color:green;


            padding: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .message-body {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .reset-link {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: black;
            background-color: #FFD870;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .reset-link:hover {
            background-color: #c5a754;
        }
        .thank-you {
            font-size: 16px;
            color: #333;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="message-container">
        <div class="message-title">Password Reset Successfully</div>
        <div class="message-body">
            <div class="alert alert-success" role="alert">
                Your Password has been reset! Please click the link below to login.
            </div>
            <br>
            <a href="{{ url('http://localhost:5173/login') }}" class="reset-link">Go back to login Page</a>
        </div>
    </div>
</body>
</html>
