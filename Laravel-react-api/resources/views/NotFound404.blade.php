<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Page</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }
        .error-container {
            text-align: center;
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        .error-container:hover {
            transform: scale(1.05);
        }
        .error-title {
            font-size: 24px;
            color: #881337;
            margin-bottom: 20px;
        }
        .error-message {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .home-link {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: black;
            background-color: #FFD870;
            text-decoration: none;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .home-link:hover {
            background-color: #c5a754;
        }
    </style>
</head>
<body>

<?php
$error_message = isset($_GET['error']) ? htmlspecialchars($_GET['error']) : 'An unknown error occurred.';
?>

<div class="error-container">
    <div class="error-title">Error</div>
    <div class="error-message"><?php echo $error_message; ?></div>
    <a href="http://localhost:5173/" class="home-link">Go to Homepage</a>
</div>

</body>
</html>

