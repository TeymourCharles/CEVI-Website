<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($data['title']); ?></title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #010101;
            font-family: Arial, sans-serif;
        }
        .message-container {
            text-align: center;
            background-color: #474747;
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
        .message-container p {
            color: white;
        }
    </style>
</head>
<body>

<div class="message-container">
    <p>{{$data['body']}}</p>
    <a href="{{ $data['url'] }}" class="reset-link">Click here to reset your password.</a>
    <p>Thank you.</p>

</body>
</html>
