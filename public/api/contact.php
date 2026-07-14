<?php
/**
 * Contact Form Handler for joechamdani.com
 * Uses PHPMailer with Google Workspace SMTP
 * Supports multiple recipient profiles via _recipient field
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
$recipient = trim($input['_recipient'] ?? '');

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
// Rate limiting: 4 messages/day per sender email, 10/day per IP
// ============================================
function rateLimit($key, $max, $windowSec) {
    $file = sys_get_temp_dir() . '/contact-rl-' . md5($key);
    $now = time();
    $stamps = @json_decode(@file_get_contents($file), true) ?: [];
    $stamps = array_values(array_filter($stamps, fn($t) => $t > $now - $windowSec));
    if (count($stamps) >= $max) return false;
    $stamps[] = $now;
    @file_put_contents($file, json_encode($stamps), LOCK_EX);
    return true;
}

if (!rateLimit('email-' . strtolower($email), 4, 86400)) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => "You've reached the daily message limit. Email me directly instead: joseph@joechamdani.com"]);
    exit();
}
if (!rateLimit('ip-' . ($_SERVER['REMOTE_ADDR'] ?? '?'), 10, 86400)) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => "Too many messages from this connection today. Email me directly instead: joseph@joechamdani.com"]);
    exit();
}

// ============================================
// SMTP Configurations
// ============================================
$smtpConfigs = [
    // Joseph: Google Workspace SMTP
    'joseph' => [
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'encryption' => 'tls',
        'username' => 'joseph@joechamdani.com',
        'password' => $config['smtp_password'],
        'from_email' => 'noreply@joechamdani.com',
        'from_name' => 'Joseph Chamdani',
        'reply_to' => 'joseph@joechamdani.com',
    ],
    // Jessica: Hostinger SMTP
    'jessica' => [
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl',
        'username' => 'noreply@juwitajessica.com',
        'password' => $config['jessica_smtp_password'] ?? '',
        'from_email' => 'noreply@juwitajessica.com',
        'from_name' => 'Jessica Pangestu',
        'reply_to' => 'jessica.fiona2004@gmail.com',
    ],
];

// ============================================
// Recipient Profiles
// ============================================
$profiles = [
    // Default: Joseph
    'joseph@joechamdani.com' => [
        'name' => 'Joseph Chamdani',
        'first_name' => 'Joseph',
        'email' => 'joseph@joechamdani.com',
        'smtp' => 'joseph',
        'website' => 'https://joechamdani.com',
        'logo' => 'https://joechamdani.com/Logo_Joseph.PNG',
        'accent' => '#4CBB17',          // Court green
        'bg' => '#F9F7F2',             // Paper white
        'text' => '#3D2B1F',           // Espresso
        'border' => '#3D2B1F',
        'shadow' => '4px 4px 0px 0px #3D2B1F',
        'shadow_sm' => '2px 2px 0px 0px #3D2B1F',
        'links' => [
            ['label' => 'joechamdani.com/projects', 'url' => 'https://joechamdani.com/projects'],
            ['label' => 'linkedin.com/in/joseph-chamdani', 'url' => 'https://linkedin.com/in/joseph-chamdani'],
            ['label' => 'github.com/JosephDavisC', 'url' => 'https://github.com/JosephDavisC'],
        ],
        'footer_text' => 'joechamdani.com',
        'dashboard_webhook' => true,
    ],
    // Jessica
    'jessica.fiona2004@gmail.com' => [
        'name' => 'Jessica Pangestu',
        'first_name' => 'Jessica',
        'email' => 'jessica.fiona2004@gmail.com',
        'smtp' => 'jessica',
        'website' => 'https://juwitajessica.com',
        'logo' => 'https://juwitajessica.com/logo/logo.png',
        'accent' => '#BA8B8B',          // Dusty blush rose
        'bg' => '#FBF6F5',             // Warm cream
        'text' => '#4A3535',            // Warm brown
        'border' => '#D4B8B8',          // Soft rose border
        'shadow' => '0 4px 20px -4px rgba(186, 139, 139, 0.2)',
        'shadow_sm' => '0 2px 10px -2px rgba(186, 139, 139, 0.15)',
        'links' => [
            ['label' => 'instagram.com/juwitajessicaa', 'url' => 'https://instagram.com/juwitajessicaa'],
            ['label' => 'linkedin.com/in/juwita-jessica-pangestu', 'url' => 'https://linkedin.com/in/juwita-jessica-pangestu'],
            ['label' => 'github.com/JuwitaJessicaP', 'url' => 'https://github.com/JuwitaJessicaP'],
        ],
        'footer_text' => 'juwitajessica.com',
        'dashboard_webhook' => false,
    ],
];

// Resolve profile: use _recipient if it matches, otherwise default to Joseph
$ownerEmail = 'joseph@joechamdani.com';
if (!empty($recipient) && isset($profiles[$recipient])) {
    $ownerEmail = $recipient;
}
$profile = $profiles[$ownerEmail];

$currentDate = date('F j, Y');

// Sanitize for HTML
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

// Extract first name for greeting
$firstName = explode(' ', $name)[0];
$safeFirstName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');

// Profile vars for templates
$pName = htmlspecialchars($profile['name'], ENT_QUOTES, 'UTF-8');
$pFirstName = htmlspecialchars($profile['first_name'], ENT_QUOTES, 'UTF-8');
$pWebsite = $profile['website'];
$pLogo = $profile['logo'];
$pAccent = $profile['accent'];
$pBg = $profile['bg'];
$pText = $profile['text'];
$pBorder = $profile['border'];
$pShadow = $profile['shadow'];
$pShadowSm = $profile['shadow_sm'];
$pFooter = $profile['footer_text'];

// Build links HTML
$linksHtml = '';
foreach ($profile['links'] as $link) {
    $lLabel = htmlspecialchars($link['label'], ENT_QUOTES, 'UTF-8');
    $lUrl = htmlspecialchars($link['url'], ENT_QUOTES, 'UTF-8');
    $linksHtml .= <<<LINK
        <a href="{$lUrl}" style="display: block; background: {$pBg}; border: 1px solid {$pBorder}; border-radius: 8px; padding: 10px 14px; color: {$pText}; text-decoration: none; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-size: 13px; margin-bottom: 10px; box-shadow: {$pShadowSm};">
          <span style="color: {$pAccent}; font-weight: 600;">&rarr;</span> {$lLabel}
        </a>
LINK;
}

// ============================================
// Email to Owner (Notification)
// ============================================
$emailToOwner = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background: {$pBg}; padding: 40px 20px; margin: 0; color: {$pText};">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid {$pBorder}; border-radius: 16px; box-shadow: {$pShadow}; overflow: hidden;">

    <!-- Header -->
    <div style="background: {$pAccent}; padding: 24px 30px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="64" valign="middle">
            <div style="width: 48px; height: 48px; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: {$pShadowSm};">
              <img src="{$pLogo}" alt="{$pFirstName}" style="width: 48px; height: 48px; object-fit: cover; display: block;">
            </div>
          </td>
          <td valign="middle" style="padding-left: 16px;">
            <h1 style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: #ffffff; margin: 0; font-size: 18px; font-weight: 700;">New Message from Portfolio</h1>
          </td>
        </tr>
      </table>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      <!-- Info Box -->
      <div style="background: {$pBg}; border: 1px solid {$pBorder}; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px;">
          <tr>
            <td width="70" style="color: {$pText}; opacity: 0.6; padding-bottom: 12px; font-weight: 500;">From</td>
            <td style="color: {$pText}; padding-bottom: 12px;">{$safeName}</td>
          </tr>
          <tr>
            <td width="70" style="color: {$pText}; opacity: 0.6; padding-bottom: 12px; font-weight: 500;">Email</td>
            <td style="color: {$pText}; padding-bottom: 12px;">{$safeEmail}</td>
          </tr>
          <tr>
            <td width="70" style="color: {$pText}; opacity: 0.6; font-weight: 500;">Subject</td>
            <td style="color: {$pText};">{$safeSubject}</td>
          </tr>
        </table>
      </div>

      <!-- Message Label -->
      <p style="color: {$pText}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Message</p>

      <!-- Message Box -->
      <div style="background: #ffffff; border: 1px solid {$pBorder}; border-left: 4px solid {$pAccent}; border-radius: 10px; padding: 20px; color: {$pText}; line-height: 1.7; font-size: 15px;">
        {$safeMessage}
      </div>

      <!-- Reply Button -->
      <a href="mailto:{$safeEmail}" style="display: inline-block; background: {$pAccent}; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 600; font-size: 14px; margin-top: 24px;">Reply to {$safeEmail}</a>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 30px; border-top: 1px solid {$pBorder};">
      <p style="color: {$pText}; opacity: 0.4; font-size: 11px; margin: 0;">{$pFooter} &middot; {$currentDate}</p>
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
<body style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background: {$pBg}; padding: 40px 20px; margin: 0; color: {$pText};">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid {$pBorder}; border-radius: 16px; box-shadow: {$pShadow}; overflow: hidden;">

    <!-- Header -->
    <div style="background: {$pAccent}; padding: 30px; text-align: center;">
      <div style="width: 64px; height: 64px; background: #ffffff; border-radius: 14px; overflow: hidden; margin: 0 auto 12px; box-shadow: {$pShadowSm};">
        <img src="{$pLogo}" alt="{$pFirstName}" style="width: 64px; height: 64px; object-fit: cover; display: block;">
      </div>
      <h1 style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; color: #ffffff; margin: 0; font-size: 18px; font-weight: 700;">{$pName}</h1>
    </div>

    <!-- Content -->
    <div style="padding: 30px;">
      <h2 style="font-size: 24px; font-weight: 700; color: {$pText}; margin: 0 0 16px 0;">Hey {$safeFirstName}!</h2>

      <p style="color: {$pText}; line-height: 1.7; margin-bottom: 24px; font-size: 15px;">
        Thanks for reaching out! I've received your message and will get back to you within 24-48 hours.
      </p>

      <!-- Message Label -->
      <p style="color: {$pText}; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">Your Message</p>

      <!-- Message Box -->
      <div style="background: {$pBg}; border: 1px solid {$pBorder}; border-radius: 10px; padding: 20px; margin-bottom: 28px; box-shadow: {$pShadowSm};">
        <div style="color: {$pText}; font-weight: 500; margin-bottom: 12px; font-size: 13px; opacity: 0.6;">RE: {$safeSubject}</div>
        <div style="color: {$pText}; line-height: 1.7; font-size: 14px;">{$safeMessage}</div>
      </div>

      <!-- Links Section -->
      <div style="margin-bottom: 24px;">
        <p style="color: {$pText}; font-size: 14px; margin: 0 0 16px 0;">In the meantime, check out:</p>
        {$linksHtml}
      </div>

      <!-- Signature -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px dashed {$pBorder};">
        <p style="color: {$pText}; margin: 0 0 4px 0; font-size: 15px;">Talk soon!</p>
        <p style="font-weight: 700; color: {$pText}; margin: 0;">{$pFirstName}</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 30px; border-top: 1px solid {$pBorder}; text-align: center;">
      <p style="color: {$pText}; opacity: 0.4; font-size: 10px; margin: 0; line-height: 1.6;">Automated confirmation from {$pFooter}<br>I'll respond to your message directly.</p>
    </div>
  </div>
</body>
</html>
HTML;

// ============================================
// Send Emails using PHPMailer
// ============================================
function sendEmail($smtp, $to, $subject, $body, $replyTo = null) {
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = $smtp['host'];
        $mail->SMTPAuth = true;
        $mail->Username = $smtp['username'];
        $mail->Password = $smtp['password'];
        $mail->SMTPSecure = ($smtp['encryption'] === 'ssl')
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $smtp['port'];

        // Sender
        $mail->setFrom($smtp['from_email'], $smtp['from_name']);

        // Reply-To (for the notification email, replies go to the sender)
        if ($replyTo) {
            $mail->addReplyTo($replyTo);
        } else {
            $mail->addReplyTo($smtp['reply_to'], $smtp['from_name']);
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

// Resolve which SMTP config to use for this profile
$activeSmtp = $smtpConfigs[$profile['smtp']];

// Send notification to owner (reply-to = sender's email)
$sentToOwner = sendEmail(
    $activeSmtp,
    $profile['email'],
    "Portfolio Contact: " . $subject,
    $emailToOwner,
    $email  // Reply-To is the sender
);

// Send confirmation to sender
$sentToSender = sendEmail(
    $activeSmtp,
    $email,
    "Thanks for reaching out! - " . $profile['name'],
    $emailToSender
);

// ============================================
// Dashboard Webhook (best-effort, Joseph only)
// ============================================
if ($sentToOwner && $profile['dashboard_webhook'] && !empty($config['dashboard_webhook_secret'])) {
    $webhookUrl = 'https://dashboard.joechamdani.com/api/contact/webhook?token=' . urlencode($config['dashboard_webhook_secret']);
    $webhookData = json_encode([
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'source' => 'portfolio',
    ]);

    $ch = curl_init($webhookUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $webhookData,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_CONNECTTIMEOUT => 3,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

// Response
if ($sentToOwner) {
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
