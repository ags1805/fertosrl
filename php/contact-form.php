<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/PHPMailer/src/Exception.php';
require '../vendor/PHPMailer/src/PHPMailer.php';
require '../vendor/PHPMailer/src/SMTP.php';


// Evitar spam  

if (!empty($_POST['website'])) {

    exit();

}


// Email

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = htmlspecialchars($_POST['name']);
    $company = htmlspecialchars($_POST['company']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);


    $mail = new PHPMailer(true);

    try {

        // SMTP

        $mail->isSMTP();

        $mail->Host = 'smtp.hostinger.com';

        $mail->SMTPAuth = true;

        $mail->Username = 'info@fertosrl.com.ar';

        $mail->Password = 'mtp6-f4fh-bvud-vzut';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        $mail->Port = 587;


        // REMITENTE

        $mail->setFrom(
            'info@fertosrl.com.ar',
            'Ferto SRL Web'
        );


        // DESTINO

        $mail->addAddress(
            'info@fertosrl.com.ar'
        );


        // CONTENIDO

        $mail->isHTML(true);

        $mail->Subject = 'Nueva consulta desde la web';


        $mail->Body = "

            <h2>Nueva consulta</h2>

            <p><strong>Nombre:</strong> {$name}</p>

            <p><strong>Empresa:</strong> {$company}</p>

            <p><strong>Telefono:</strong> {$phone}</p>

            <p><strong>Email:</strong> {$email}</p>

            <p><strong>Servicio:</strong> {$service}</p>

            <p><strong>Mensaje:</strong><br>{$message}</p>

        ";


        $mail->send();


        header('Location: ../gracias.html');

        exit();

    } catch (Exception $e) {

        echo "Error al enviar: {$mail->ErrorInfo}";

    }

}
?>