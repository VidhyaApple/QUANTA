<?php
$ch = curl_init("https://fcm.googleapis.com/fcm/send");

//editable
//The device topuc.
$topic = "/topics/reminder";

//Title of the Notification.
$title = "QuANTA reminder";

//Body of the Notification.
$body = "Enter today's work details. Ignore if updated!";

//editable-end

//Creating the notification array.
$notification = array('title' =>$title , 'body' => $body);

//This array contains, the token and the notification. The 'to' attribute stores the token.
$arrayToSend = array('to' => $topic, 'notification' => $notification);

//Generating JSON encoded string form the above array.
$json = json_encode($arrayToSend);

//Setup headers:
$headers = array();
$headers[] = 'Content-Type: application/json';
$headers[] = 'Authorization: key= AIzaSyAalBIGPgvOTP4n3sqL5QySIGwsNAK6xpI';

//Setup curl, add headers and post parameters.
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);       

//Send the request
curl_exec($ch);

//Close request
curl_close($ch);

?>