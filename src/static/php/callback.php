<?php

//echo file_get_contents('php://input');
$data = file_get_contents('php://input');
$json = json_decode($data, true);

//$to = 'timotheus@list.ru'; // test mode
$to = 'timotheus@list.ru, vini.l@mail.ru'; // prod mode

// Subject
$subject = 'Перезвонить с лендинга';

// Message
$message = '<html>
				<head>
				<title>Форма колбэк</title>
				</head>
				<body>
				<div class="wraplogo">
				  <span>
				  <span>Transfer</span> 
					<span style="color: gold">✻</span>
				  <span>Pro</span>

				  </span>
			    </div>
				<br>
				<p>Срочно перезвонить: <a href="tel:'.$json['phone'].'">'.$json['phone'].'</a></p>	
				
				</body>
			</html>';

// To send HTML mail, the Content-type header must be set
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
// Additional headers
$headers[] = 'From: callback <robot@onlineheadway.com>';



// Mail it
if( mail($to, $subject, $message, implode("\r\n", $headers) ) )
{
	echo 'success';
}
else 
{
	echo 'error';
}
