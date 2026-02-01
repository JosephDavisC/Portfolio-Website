<?php
/**
 * Contact Form Handler for joechamdani.com
 * Uses PHPMailer with Google Workspace SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Load PHPMailer (installed via Composer on Hostinger)
require __DIR__ . '/vendor/autoload.php';

// Load config (contains sensitive credentials)
$config = require __DIR__ . '/config.php';

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// ============================================
// SMTP Configuration - Google Workspace
// ============================================
$smtpConfig = [
    'host' => 'smtp.gmail.com',
    'port' => 587,
    'username' => 'joseph@joechamdani.com',
    'password' => $config['smtp_password'],       // Loaded from config.php
    'from_email' => 'noreply@joechamdani.com',
    'from_name' => 'Joseph Chamdani',
    'reply_to' => 'joseph@joechamdani.com',
];

$josephEmail = 'joseph@joechamdani.com';
$websiteUrl = 'https://joechamdani.com';
$logoUrl = $websiteUrl . '/Logo_Joseph.PNG';
$currentDate = date('F j, Y');

// Sanitize for HTML
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

// Extract first name for greeting
$firstName = explode(' ', $name)[0];
$safeFirstName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');

// ============================================
// Email to Joseph (Notification)
// ============================================
$emailToJoseph = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background: #F9F7F2; padding: 40px 20px; margin: 0; color: #3D2B1F;">
  <div style="max-width: 600px; margin: 0 auto; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 12px; box-shadow: 4px 4px 0px 0px #3D2B1F; overflow: hidden;">

    <!-- Header -->
    <div style="background: #4CBB17; padding: 24px 30px; border-bottom: 2px solid #3D2B1F;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="64" valign="middle">
            <div style="width: 48px; height: 48px; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 10px; box-shadow: 2px 2px 0px 0px #3D2B1F; overflow: hidden;">
              <img src="{$logoUrl}" alt="Joseph" style="width: 48px; height: 48px; object-fit: cover; display: block;">
            </div>
          </td>
          <td valign="middle" style="padding-left: 16px;">
            <h1 style="font-family: 'Manrope', system-ui, sans-serif; color: #F9F7F2; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em;">New Message from Portfolio</h1>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      <!-- Info Box -->
      <div style="background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 8px; box-shadow: 2px 2px 0px 0px #3D2B1F; padding: 20px; margin-bottom: 24px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: 'JetBrains Mono', monospace; font-size: 14px;">
          <tr>
            <td width="70" style="color: #3D2B1F; opacity: 0.6; padding-bottom: 12px; font-weight: 500;">From</td>
            <td style="color: #3D2B1F; padding-bottom: 12px;">{$safeName}</td>
          </tr>
          <tr>
            <td width="70" style="color: #3D2B1F; opacity: 0.6; padding-bottom: 12px; font-weight: 500;">Email</td>
            <td style="color: #3D2B1F; padding-bottom: 12px;">{$safeEmail}</td>
          </tr>
          <tr>
            <td width="70" style="color: #3D2B1F; opacity: 0.6; font-weight: 500;">Subject</td>
            <td style="color: #3D2B1F;">{$safeSubject}</td>
          </tr>
        </table>
      </div>

      <!-- Message Label -->
      <p style="font-family: 'Manrope', system-ui, sans-serif; color: #3D2B1F; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Message</p>

      <!-- Message Box -->
      <div style="background: #ffffff; border: 2px solid #3D2B1F; border-left: 4px solid #4CBB17; border-radius: 8px; padding: 20px; color: #3D2B1F; line-height: 1.7; font-size: 15px;">
        {$safeMessage}
      </div>

      <!-- Reply Button -->
      <a href="mailto:{$safeEmail}" style="display: inline-block; background: #4CBB17; color: #F9F7F2; text-decoration: none; padding: 12px 20px; border: 2px solid #3D2B1F; border-radius: 8px; box-shadow: 2px 2px 0px 0px #3D2B1F; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 600; font-size: 14px; margin-top: 24px;">Reply to {$safeEmail}</a>
    </div>

    <!-- Footer -->
    <div style="background: #F9F7F2; padding: 16px 30px; border-top: 2px solid #3D2B1F;">
      <p style="font-family: 'JetBrains Mono', monospace; color: #3D2B1F; opacity: 0.5; font-size: 11px; margin: 0;">joechamdani.com &middot; {$currentDate}</p>
    </div>
  </div>
</body>
</html>
HTML;

// ============================================
// Email to Sender (Confirmation)
// ============================================
$emailToSender = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background: #F9F7F2; padding: 40px 20px; margin: 0; color: #3D2B1F;">
  <div style="max-width: 600px; margin: 0 auto; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 12px; box-shadow: 4px 4px 0px 0px #3D2B1F; overflow: hidden;">

    <!-- Header -->
    <div style="background: #4CBB17; padding: 30px; border-bottom: 2px solid #3D2B1F; text-align: center;">
      <div style="width: 64px; height: 64px; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 12px; box-shadow: 2px 2px 0px 0px #3D2B1F; overflow: hidden; margin: 0 auto 12px;">
        <img src="{$logoUrl}" alt="Joseph" style="width: 64px; height: 64px; object-fit: cover; display: block;">
      </div>
      <h1 style="font-family: 'Manrope', system-ui, sans-serif; color: #F9F7F2; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em;">Joseph Chamdani</h1>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      <h2 style="font-family: 'Manrope', system-ui, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #3D2B1F; margin: 0 0 16px 0;">Hey {$safeFirstName}!</h2>

      <p style="color: #3D2B1F; line-height: 1.7; margin-bottom: 24px; font-size: 15px;">
        Thanks for reaching out! I've received your message and will get back to you within 24-48 hours.
      </p>

      <!-- Message Label -->
      <p style="font-family: 'Manrope', system-ui, sans-serif; color: #3D2B1F; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Your Message</p>

      <!-- Message Box -->
      <div style="background: #ffffff; border: 2px solid #3D2B1F; border-radius: 8px; box-shadow: 2px 2px 0px 0px #3D2B1F; padding: 20px; margin-bottom: 28px;">
        <div style="font-family: 'JetBrains Mono', monospace; color: #3D2B1F; font-weight: 500; margin-bottom: 12px; font-size: 13px; opacity: 0.7;">RE: {$safeSubject}</div>
        <div style="color: #3D2B1F; line-height: 1.7; font-size: 14px;">{$safeMessage}</div>
      </div>

      <!-- Links Section -->
      <div style="margin-bottom: 24px;">
        <p style="color: #3D2B1F; font-size: 14px; margin: 0 0 16px 0;">In the meantime, check out:</p>

        <a href="{$websiteUrl}/projects" style="display: block; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 6px; padding: 10px 14px; color: #3D2B1F; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-bottom: 10px;">
          <span style="color: #4CBB17; font-weight: 600;">&rarr;</span> joechamdani.com/projects
        </a>

        <a href="https://linkedin.com/in/joseph-chamdani" style="display: block; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 6px; padding: 10px 14px; color: #3D2B1F; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 12px; margin-bottom: 10px;">
          <span style="color: #4CBB17; font-weight: 600;">&rarr;</span> linkedin.com/in/joseph-chamdani
        </a>

        <a href="https://github.com/JosephDavisC" style="display: block; background: #F9F7F2; border: 2px solid #3D2B1F; border-radius: 6px; padding: 10px 14px; color: #3D2B1F; text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
          <span style="color: #4CBB17; font-weight: 600;">&rarr;</span> github.com/JosephDavisC
        </a>
      </div>

      <!-- Signature -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 2px dashed rgba(61, 43, 31, 0.2);">
        <p style="color: #3D2B1F; margin: 0 0 4px 0; font-size: 15px;">Talk soon!</p>
        <p style="font-family: 'Manrope', system-ui, sans-serif; font-weight: 700; color: #3D2B1F; margin: 0;">Joseph</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #F9F7F2; padding: 16px 30px; border-top: 2px solid #3D2B1F; text-align: center;">
      <p style="font-family: 'JetBrains Mono', monospace; color: #3D2B1F; opacity: 0.5; font-size: 10px; margin: 0; line-height: 1.6;">Automated confirmation from joechamdani.com<br>I'll respond to your message directly.</p>
    </div>
  </div>
</body>
</html>
HTML;

// ============================================
// Send Emails using PHPMailer
// ============================================
function sendEmail($smtpConfig, $to, $subject, $body, $replyTo = null) {
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = $smtpConfig['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtpConfig['username'];
        $mail->Password = $smtpConfig['password'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtpConfig['port'];

        // Sender
        $mail->setFrom($smtpConfig['from_email'], $smtpConfig['from_name']);

        // Reply-To (for the notification email, replies go to the sender)
        if ($replyTo) {
            $mail->addReplyTo($replyTo);
        } else {
            $mail->addReplyTo($smtpConfig['reply_to'], $smtpConfig['from_name']);
        }

        // Recipient
        $mail->addAddress($to);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->CharSet = 'UTF-8';

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("PHPMailer Error: " . $mail->ErrorInfo);
        return false;
    }
}

// Send notification to Joseph (reply-to = sender's email)
$sentToJoseph = sendEmail(
    $smtpConfig,
    $josephEmail,
    "Portfolio Contact: " . $subject,
    $emailToJoseph,
    $email  // Reply-To is the sender
);

// Send confirmation to sender
$sentToSender = sendEmail(
    $smtpConfig,
    $email,
    "Thanks for reaching out! - Joseph Chamdani",
    $emailToSender
);

// Response
if ($sentToJoseph) {
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again.'
    ]);
}
