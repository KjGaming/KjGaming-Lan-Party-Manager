var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var User = require('../models/user');
var Clan = require('../models/clan');


/** Register route **/
router.post('/', function (req, res, next) {

    var user = new User({
        nickName: req.body.nickName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        birth: req.body.birth,
        email: req.body.email,
        role: req.body.role,
        lock: false,
        agb: req.body.agb,
        clan: []

    });

    user.address.street = req.body.street;
    user.address.nr = req.body.nr;
    user.address.postalCode = req.body.postalCode;
    user.address.city = req.body.city;
    user.lan.packet.id = req.body.packetId;
    user.lan.food = req.body.lanFood;
    user.lan.vegi = req.body.lanVegi;
    user.lan.packet.paid = req.body.packetPaid;
    user.lan.packet.price = req.body.packetPrice;

    var userEmail = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>KjGaming[5]</title><style type="text/css">/* Client-specific Styles */#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */body{width:100% !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */ body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */ /* Reset Styles */ body{margin:0; padding:0;} img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;} table td{border-collapse:collapse;} #backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;} /* Template Styles */ /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Page * @section background color * @tip Set the background color for your email. You may want to choose one that matches your companys branding. * @theme page */ body, #backgroundTable{ /*@editable*/ background-color:#FAFAFA; } /** * @tab Page * @section email border * @tip Set the border for your email. */ #templateContainer{ /*@editable*/ border: 1px solid #DDDDDD; } /** * @tab Page * @section heading 1 * @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings. * @style heading 1 */ h1, .h1{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/ font-size:34px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0; margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /** * @tab Page * @section heading 2 * @tip Set the styling for all second-level headings in your emails. * @style heading 2 */ h2, .h2{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/ font-size:30px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0; margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /** * @tab Page * @section heading 3 * @tip Set the styling for all third-level headings in your emails. * @style heading 3 */ h3, .h3{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/ font-size:26px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0; margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /** * @tab Page * @section heading 4 * @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings. * @style heading 4 */ h4, .h4{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/ font-size:22px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0; margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: PREHEADER /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Header * @section preheader style * @tip Set the background color for your emails preheader area. * @theme page */ #templatePreheader{ /*@editable*/ background-color:#FAFAFA; } /** * @tab Header * @section preheader text * @tip Set the styling for your emails preheader text. Choose a size and color that is easy to read. */ .preheaderContent div{ /*@editable*/ color:#505050; /*@editable*/ font-family:Arial; /*@editable*/ font-size:10px; /*@editable*/ line-height:100%; /*@editable*/ text-align:left; } /** * @tab Header * @section preheader link * @tip Set the styling for your emails preheader links. Choose a color that helps them stand out from your text. */ .preheaderContent div a:link, .preheaderContent div a:visited, /* Yahoo! Mail Override */ .preheaderContent div a .yshortcuts /* Yahoo! Mail Override */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/ text-decoration:underline; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Header * @section header style * @tip Set the background color and border for your emails header area. * @theme header */ #templateHeader{ /*@editable*/ background-color:#FFFFFF; /*@editable*/ border-bottom:0; } /** * @tab Header * @section header text * @tip Set the styling for your emails header text. Choose a size and color that is easy to read. */ .headerContent{ /*@editable*/ color:#202020; /*@editable*/ font-family:Arial; /*@editable*/ font-size:34px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; /*@editable*/ padding:0; /*@editable*/ text-align:center; /*@editable*/ vertical-align:middle; } /** * @tab Header * @section header link * @tip Set the styling for your emails header links. Choose a color that helps them stand out from your text. */ .headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/ text-decoration:underline; } #headerImage{ height:auto; max-width:600px !important; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Body * @section body style * @tip Set the background color for your emails body area. */ #templateContainer, .bodyContent{ /*@editable*/ background-color:#FFFFFF; } /** * @tab Body * @section body text * @tip Set the styling for your emails main content text. Choose a size and color that is easy to read. * @theme main */ .bodyContent div{ /*@editable*/ color:#505050; /*@editable*/ font-family:Arial; /*@editable*/ font-size:14px; /*@editable*/ line-height:150%; /*@editable*/ text-align:left; } /** * @tab Body * @section body link * @tip Set the styling for your emails main content links. Choose a color that helps them stand out from your text. */ .bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent div a .yshortcuts /* Yahoo! Mail Override */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/ text-decoration:underline; } .bodyContent img{ display:inline; height:auto; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Footer * @section footer style * @tip Set the background color and top border for your emails footer area. * @theme footer */ #templateFooter{ /*@editable*/ background-color:#FFFFFF; /*@editable*/ border-top:0; } /** * @tab Footer * @section footer text * @tip Set the styling for your emails footer text. Choose a size and color that is easy to read. * @theme footer */ .footerContent div{ /*@editable*/ color:#707070; /*@editable*/ font-family:Arial; /*@editable*/ font-size:12px; /*@editable*/ line-height:125%; /*@editable*/ text-align:left; } /** * @tab Footer * @section footer link * @tip Set the styling for your emails footer links. Choose a color that helps them stand out from your text. */ .footerContent div a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /* Yahoo! Mail Override */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/ text-decoration:underline; } .footerContent img{ display:inline; } /** * @tab Footer * @section social bar style * @tip Set the background color and border for your emails footer social bar. * @theme footer */ #social{ /*@editable*/ background-color:#FAFAFA; /*@editable*/ border:0; } /** * @tab Footer * @section social bar style * @tip Set the background color and border for your emails footer social bar. */ #social div{ /*@editable*/ text-align:center; } /** * @tab Footer * @section utility bar style * @tip Set the background color and border for your emails footer utility bar. * @theme footer */ #utility{ /*@editable*/ background-color:#FFFFFF; /*@editable*/ border:0; } /** * @tab Footer * @section utility bar style * @tip Set the background color and border for your emails footer utility bar. */ #utility div{ /*@editable*/ text-align:center; } #monkeyRewards img{ max-width:190px; } </style> </head> <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="backgroundTable"> <tr> <td align="center" valign="top"> <!-- // Begin Template Preheader \\ --> <table border="0" cellpadding="10" cellspacing="0" width="600" id="templatePreheader"> <tr> <td valign="top" class="preheaderContent"> <!-- // Begin Module: Standard Preheader \ --> <table border="0" cellpadding="10" cellspacing="0" width="100%"> <tr> <td valign="top"> <div mc:edit="std_preheader_content"> KjGaming - Anmeldung </div> </td> <!-- *|IFNOT:ARCHIVE_PAGE|* --> <td valign="top" width="190"> <div mc:edit="std_preheader_links"> Wird diese E-mail nicht richtig angezeigt?<br /><a href="*|ARCHIVE|*" target="_blank">Schau sie im Browser an</a>. </div> </td> <!-- *|END:IF|* --> </tr> </table> <!-- // End Module: Standard Preheader \ --> </td> </tr> </table> <!-- // End Template Preheader \\ --> <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateContainer"> <tr> <td align="center" valign="top"> <!-- // Begin Template Header \\ --> <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader"> <tr> <td class="headerContent"> <!-- // Begin Module: Standard Header Image \\ --> <img src="https://www.kjgaming.de/assets/img/Logo2.jpg" style="max-width:600px;" id="headerImage campaign-icon" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext /> <!-- // End Module: Standard Header Image \\ --> </td> </tr> </table> <!-- // End Template Header \\ --> </td> </tr> <tr> <td align="center" valign="top"> <!-- // Begin Template Body \\ --> <table border="0" cellpadding="0" cellspacing="0" width="600" id="templateBody"> <tr> <td valign="top" class="bodyContent"> <!-- // Begin Module: Standard Content \\ --> <table border="0" cellpadding="20" cellspacing="0" width="100%"> <tr> <td valign="top"> <div mc:edit="std_content00"> <h2 class="h2">Anmeldung</h2> Deine Anmeldung ist bei uns eingegangen und wird noch durch einen Mitarbeiter geprüft. Sobald deine Anmeldung geprüft wurde (ca. eine Woche) bekommst du eine weitere E-mail. <br> <br> Eure KjGaming </div> </td> </tr> </table> <!-- // End Module: Standard Content \\ --> </td> </tr> </table> <!-- // End Template Body \\ --> </td> </tr> <tr> <td align="center" valign="top"> <!-- // Begin Template Footer \\ --> <table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter"> <tr> <td valign="top" class="footerContent"> <!-- // Begin Module: Standard Footer \\ --> <table border="0" cellpadding="10" cellspacing="0" width="100%"> <tr> <td colspan="2" valign="middle" id="social"> <div mc:edit="std_social"> &nbsp;<a href="https://www.instagram.com/kjgamingg/">Instagram</a> | <a href="https://www.facebook.com/KjGaming.LANParty.Filderstadt/">Facebook</a> | <a href="http://steamcommunity.com/groups/kjgaming">Steam</a> | presse[a]kjgaming.de | <a href="https://www.kjgaming.de/">Homepage</a>&nbsp; </div> </td> </tr> <tr> <td valign="top" width="350"> <div mc:edit="std_footer"> <em>Copyright &copy; 2017 KjGaming, All rights reserved.</em> <br /> <br /> <strong>E-Mail ist:</strong> <br /> presse[a]kjgaming.de </div> </td> </tr> </table> <!-- // End Module: Standard Footer \\ --> </td> </tr> </table> <!-- // End Template Footer \\ --> </td> </tr> </table> <br /> </td> </tr> </table> </center> </body> </html>';
    var adminEmail = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"' +
        ' "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html><head><meta http-equiv="Content-Type"' +
        ' content="text/html; charset=UTF-8" /><title>KjGaming[5]</title><style type="text/css">/* Client-specific' +
        ' Styles */#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */body{width:100%' +
        ' !important;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at' +
        ' full width */ body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text' +
        ' sizes. */ /* Reset Styles */ body{margin:0; padding:0;} img{border:0; height:auto; line-height:100%;' +
        ' outline:none; text-decoration:none;} table td{border-collapse:collapse;} #backgroundTable{height:100%' +
        ' !important; margin:0; padding:0; width:100% !important;} /* Template Styles */ /* /\/\/\/\/\/\/\/\/\/\ ' +
        'STANDARD STYLING: COMMON PAGE ELEMENTS /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Page * @section background color' +
        ' * @tip Set the background color for your email. You may want to choose one that matches your companys' +
        ' branding. * @theme page */ body, #backgroundTable{ /*@editable*/ background-color:#FAFAFA; } /** * @tab' +
        ' Page * @section email border * @tip Set the border for your email. */ #templateContainer{ /*@editable*/' +
        ' border: 1px solid #DDDDDD; } /** * @tab Page * @section heading 1 * @tip Set the styling for all' +
        ' first-level headings in your emails. These should be the largest of your headings. * @style heading 1 */' +
        ' h1, .h1{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/' +
        ' font-size:34px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0;' +
        ' margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /** * @tab Page *' +
        ' @section heading 2 * @tip Set the styling for all second-level headings in your emails. * @style heading 2' +
        ' */ h2, .h2{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/' +
        ' font-size:30px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0;' +
        ' margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /** * @tab Page *' +
        ' @section heading 3 * @tip Set the styling for all third-level headings in your emails. * @style heading 3' +
        ' */ h3, .h3{ /*@editable*/ color:#202020; display:block; /*@editable*/ font-family:Arial; /*@editable*/' +
        ' font-size:26px; /*@editable*/ font-weight:bold; /*@editable*/ line-height:100%; margin-top:0;' +
        ' margin-right:0; margin-bottom:10px; margin-left:0; /*@editable*/ text-align:left; } /** * @tab Page *' +
        ' @section heading 4 * @tip Set the styling for all fourth-level headings in your emails. These should be' +
        ' the smallest of your headings. * @style heading 4 */ h4, .h4{ /*@editable*/ color:#202020; display:block;' +
        ' /*@editable*/ font-family:Arial; /*@editable*/ font-size:22px; /*@editable*/ font-weight:bold;' +
        ' /*@editable*/ line-height:100%; margin-top:0; margin-right:0; margin-bottom:10px; margin-left:0;' +
        ' /*@editable*/ text-align:left; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: PREHEADER /\/\/\/\/\/\/\/\/\/\ ' +
        '*/ /** * @tab Header * @section preheader style * @tip Set the background color for your emails preheader' +
        ' area. * @theme page */ #templatePreheader{ /*@editable*/ background-color:#FAFAFA; } /** * @tab Header *' +
        ' @section preheader text * @tip Set the styling for your emails preheader text. Choose a size and color' +
        ' that is easy to read. */ .preheaderContent div{ /*@editable*/ color:#505050; /*@editable*/' +
        ' font-family:Arial; /*@editable*/ font-size:10px; /*@editable*/ line-height:100%; /*@editable*/' +
        ' text-align:left; } /** * @tab Header * @section preheader link * @tip Set the styling for your emails' +
        ' preheader links. Choose a color that helps them stand out from your text. */ .preheaderContent div a:link,' +
        ' .preheaderContent div a:visited, /* Yahoo! Mail Override */ .preheaderContent div a .yshortcuts /* Yahoo!' +
        ' Mail Override */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/' +
        ' text-decoration:underline; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: HEADER /\/\/\/\/\/\/\/\/\/\ */ /**' +
        ' * @tab Header * @section header style * @tip Set the background color and border for your emails header' +
        ' area. * @theme header */ #templateHeader{ /*@editable*/ background-color:#FFFFFF; /*@editable*/' +
        ' border-bottom:0; } /** * @tab Header * @section header text * @tip Set the styling for your emails header' +
        ' text. Choose a size and color that is easy to read. */ .headerContent{ /*@editable*/ color:#202020;' +
        ' /*@editable*/ font-family:Arial; /*@editable*/ font-size:34px; /*@editable*/ font-weight:bold;' +
        ' /*@editable*/ line-height:100%; /*@editable*/ padding:0; /*@editable*/ text-align:center; /*@editable*/' +
        ' vertical-align:middle; } /** * @tab Header * @section header link * @tip Set the styling for your emails' +
        ' header links. Choose a color that helps them stand out from your text. */ .headerContent a:link,' +
        ' .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override' +
        ' */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/' +
        ' text-decoration:underline; } #headerImage{ height:auto; max-width:600px !important; } /*' +
        ' /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: MAIN BODY /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Body * @section body' +
        ' style * @tip Set the background color for your emails body area. */ #templateContainer, .bodyContent{' +
        ' /*@editable*/ background-color:#FFFFFF; } /** * @tab Body * @section body text * @tip Set the styling for' +
        ' your emails main content text. Choose a size and color that is easy to read. * @theme main */ .bodyContent' +
        ' div{ /*@editable*/ color:#505050; /*@editable*/ font-family:Arial; /*@editable*/ font-size:14px;' +
        ' /*@editable*/ line-height:150%; /*@editable*/ text-align:left; } /** * @tab Body * @section body link *' +
        ' @tip Set the styling for your emails main content links. Choose a color that helps them stand out from' +
        ' your text. */ .bodyContent div a:link, .bodyContent div a:visited, /* Yahoo! Mail Override */ .bodyContent' +
        ' div a .yshortcuts /* Yahoo! Mail Override */{ /*@editable*/ color:#336699; /*@editable*/' +
        ' font-weight:normal; /*@editable*/ text-decoration:underline; } .bodyContent img{ display:inline;' +
        ' height:auto; } /* /\/\/\/\/\/\/\/\/\/\ STANDARD STYLING: FOOTER /\/\/\/\/\/\/\/\/\/\ */ /** * @tab Footer' +
        ' * @section footer style * @tip Set the background color and top border for your emails footer area. *' +
        ' @theme footer */ #templateFooter{ /*@editable*/ background-color:#FFFFFF; /*@editable*/ border-top:0; }' +
        ' /** * @tab Footer * @section footer text * @tip Set the styling for your emails footer text. Choose a size' +
        ' and color that is easy to read. * @theme footer */ .footerContent div{ /*@editable*/ color:#707070;' +
        ' /*@editable*/ font-family:Arial; /*@editable*/ font-size:12px; /*@editable*/ line-height:125%;' +
        ' /*@editable*/ text-align:left; } /** * @tab Footer * @section footer link * @tip Set the styling for your' +
        ' emails footer links. Choose a color that helps them stand out from your text. */ .footerContent div' +
        ' a:link, .footerContent div a:visited, /* Yahoo! Mail Override */ .footerContent div a .yshortcuts /*' +
        ' Yahoo! Mail Override */{ /*@editable*/ color:#336699; /*@editable*/ font-weight:normal; /*@editable*/' +
        ' text-decoration:underline; } .footerContent img{ display:inline; } /** * @tab Footer * @section social bar' +
        ' style * @tip Set the background color and border for your emails footer social bar. * @theme footer */' +
        ' #social{ /*@editable*/ background-color:#FAFAFA; /*@editable*/ border:0; } /** * @tab Footer * @section' +
        ' social bar style * @tip Set the background color and border for your emails footer social bar. */ #social' +
        ' div{ /*@editable*/ text-align:center; } /** * @tab Footer * @section utility bar style * @tip Set the' +
        ' background color and border for your emails footer utility bar. * @theme footer */ #utility{ /*@editable*/' +
        ' background-color:#FFFFFF; /*@editable*/ border:0; } /** * @tab Footer * @section utility bar style * @tip' +
        ' Set the background color and border for your emails footer utility bar. */ #utility div{ /*@editable*/' +
        ' text-align:center; } #monkeyRewards img{ max-width:190px; } </style> </head> <body leftmargin="0"' +
        ' marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center> <table border="0" cellpadding="0"' +
        ' cellspacing="0" height="100%" width="100%" id="backgroundTable"> <tr> <td align="center" valign="top">' +
        ' <!-- // Begin Template Preheader \\ --> <table border="0" cellpadding="10" cellspacing="0" width="600"' +
        ' id="templatePreheader"> <tr> <td valign="top" class="preheaderContent"> <!-- // Begin Module: Standard' +
        ' Preheader \ --> <table border="0" cellpadding="10" cellspacing="0" width="100%"> <tr> <td valign="top">' +
        ' <div mc:edit="std_preheader_content"> KjGaming - Anmeldung </div> </td> <!-- *|IFNOT:ARCHIVE_PAGE|* -->' +
        ' <td valign="top" width="190"> <div mc:edit="std_preheader_links"> Wird diese E-mail nicht richtig' +
        ' angezeigt?<br /><a href="*|ARCHIVE|*" target="_blank">Schau sie im Browser an</a>. </div> </td> <!--' +
        ' *|END:IF|* --> </tr> </table> <!-- // End Module: Standard Preheader \ --> </td> </tr> </table> <!-- //' +
        ' End Template Preheader \\ --> <table border="0" cellpadding="0" cellspacing="0" width="600"' +
        ' id="templateContainer"> <tr> <td align="center" valign="top"> <!-- // Begin Template Header \\ --> <table' +
        ' border="0" cellpadding="0" cellspacing="0" width="600" id="templateHeader"> <tr> <td' +
        ' class="headerContent"> <!-- // Begin Module: Standard Header Image \\ --> <img' +
        ' src="https://www.kjgaming.de/assets/img/Logo2.jpg" style="max-width:600px;" id="headerImage campaign-icon"' +
        ' mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext /> <!-- // End Module:' +
        ' Standard Header Image \\ --> </td> </tr> </table> <!-- // End Template Header \\ --> </td> </tr> <tr> <td' +
        ' align="center" valign="top"> <!-- // Begin Template Body \\ --> <table border="0" cellpadding="0"' +
        ' cellspacing="0" width="600" id="templateBody"> <tr> <td valign="top" class="bodyContent"> <!-- // Begin' +
        ' Module: Standard Content \\ --> <table border="0" cellpadding="20" cellspacing="0" width="100%"> <tr> <td' +
        ' valign="top"> <div mc:edit="std_content00"> <h2 class="h2">Anmeldung</h2> Nickname: ' + user.nickName + '<br> Geburtstag: ' + user.birth +'<br> Email: ' + user.email + '<br> <br> Eure KjGaming </div> </td> </tr> </table> <!-- // End Module: Standard Content \\ --> </td> </tr> </table> <!-- // End Template Body \\ --> </td> </tr> <tr> <td align="center" valign="top"> <!-- // Begin Template Footer \\ --> <table border="0" cellpadding="10" cellspacing="0" width="600" id="templateFooter"> <tr> <td valign="top" class="footerContent"> <!-- // Begin Module: Standard Footer \\ --> <table border="0" cellpadding="10" cellspacing="0" width="100%"> <tr> <td colspan="2" valign="middle" id="social"> <div mc:edit="std_social"> &nbsp;<a href="https://www.instagram.com/kjgamingg/">Instagram</a> | <a href="https://www.facebook.com/KjGaming.LANParty.Filderstadt/">Facebook</a> | <a href="http://steamcommunity.com/groups/kjgaming">Steam</a> | presse[a]kjgaming.de | <a href="https://www.kjgaming.de/">Homepage</a>&nbsp; </div> </td> </tr> <tr> <td valign="top" width="350"> <div mc:edit="std_footer"> <em>Copyright &copy; 2017 KjGaming, All rights reserved.</em> <br /> <br /> <strong>E-Mail ist:</strong> <br /> presse[a]kjgaming.de </div> </td> </tr> </table> <!-- // End Module: Standard Footer \\ --> </td> </tr> </table> <!-- // End Template Footer \\ --> </td> </tr> </table> <br /> </td> </tr> </table> </center> </body> </html>';

    user.save(function (err, result) {
        if (err) {
            if (typeof err.errors.nickName != 'undefined' && typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'Nickname und E-Mail',
                    error: {message: 'Der Nickname und die E-Mail sind schon vergeben'}
                });
            }
            if (typeof err.errors.nickName != 'undefined') {
                return res.status(500).json({
                    title: 'Nickname',
                    error: {message: 'Dieser Nickname ist schon vergeben'}
                });
            }
            if (typeof err.errors.email != 'undefined') {
                return res.status(500).json({
                    title: 'E-Mail',
                    error: {message: 'Diese E-Mail ist schon vergeben'}
                });
            }

            return res.status(500).json({
                title: 'Anmeldung fehlgeschlagen !!!!!',
                error: {message: 'Passwort oder E-Mail ist Falsch'}
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result
        });


        //Send Mail

        var kjgSmtpConfig = {
            service: '1und1',
            auth: {
                user: 'presse@kjgaming.de',
                pass: '7WHdVb3uP1Vu'
            }
        };
        var transporter = nodemailer.createTransport(kjgSmtpConfig);

        var kjgMailOptions = {
            from: 'KjGaming <presse@kjgaming.de>', // sender address
            to: 'presse@kjgaming.de', // list of receivers
            subject: 'Anmeldung ' + user.nickName, // Subject line
            html: adminEmail, // plaintext body
        };

        var userMailOptions = {
            from: 'KjGaming <presse@kjgaming.de>', // sender address
            to: user.email, // list of receivers
            subject: 'Anmeldung ' + user.nickName, // Subject line
            html: userEmail, // plaintext body
        };

        // send mail with defined transport object
        transporter.sendMail(kjgMailOptions, function (err, info) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log('Message sent: ' + info.response);
            transporter.sendMail(userMailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                console.log('Message sent: ' + info.response);
            });
        });
    });
});

/** Login route **/
router.post('/signin', function (req, res, next) {
    User.findOne({email: req.body.email})
        .populate('clan', '_id name')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'Login fehlgeschlagen',
                    error: {message: 'Passwort oder E-Mail ist Falsch'}
                });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'Login fehlgeschlagen',
                    error: {message: 'Passwort oder E-Mail ist Falsch'}
                });
            }
            if (user.lock != true) {
                return res.status(401).json({
                    title: 'Login fehlgeschlagen',
                    error: {message: 'Noch nicht freigeschalten!'}
                });
            }
            var token;
            var adminToken;
            if (user.role == 2) {
                token = jwt.sign({user: user}, '20Kj!G!aming?Rock.Admin.17', {expiresIn: 7200});
                adminToken = 481;
            } else if (user.role == 1) {
                token = jwt.sign({user: user}, '20Kj!G!aming?Rock.Creator.17', {expiresIn: 7200});
                adminToken = 153;
            } else {
                token = jwt.sign({user: user}, '20Kj!G!aming?Rock.17', {expiresIn: 7200});
                adminToken = 0;
            }

            res.status(200).json({
                message: 'Successfully logged in',
                id_token: token,
                blackWidow: adminToken,
                userId: user._id,
                nickName: user.nickName,
                clan: user.clan

            });
        });
});

/** Authorization Route **/
router.use('/', function (req, res, next) {
    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.17', function (err, decoded) {
        if (err) {
            jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Creator.17', function (err2, decoded2) {
                if (err2) {
                    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
                        if (err3) {
                            res.status(401).json({
                                title: 'Not Authenticated'
                            });
                        } else {
                            next();
                        }

                    });

                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });
});

/** Get alle Users with minmal Information **/
router.get('/', function (req, res, next) {
    var userArray = [];
    User.find()
        .populate('clan', 'shortName name')
        .exec(function (err, user) {
            console.log(user);
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            for (var i = 0; user.length > i; i++) {
                userArray[i] = {
                    firstName: user[i].firstName,
                    nickName: user[i].nickName,
                    seat: user[i].seat,
                    role: user[i].role,
                    clan: user[i].clan
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: userArray
            });
        });
});

/** Get alle Users with all Information **/
router.get('/all', function (req, res, next) {
    var userArray = [];
    User.find()
        .populate('clan', 'shortName name')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: user
            });
        });
});

/** change user data **/
router.post('/changeUser', function (req, res, next) {
    var decoded = jwt.decode(req.get('Authorization'));
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if(req.body.address){
            if(req.body.address.street){
                user.address.street = req.body.address.street;
            }
            if(req.body.address.nr){
                user.address.nr = req.body.address.nr;
            }
            if(req.body.address.postalCode){
                user.address.postalCode = req.body.address.postalCode;
            }
            if(req.body.address.city){
                user.address.city = req.body.address.city;
            }
        }

        if(req.body.birth){
            user.birth = req.body.birth;
        }
        if(req.body.password){
            user.birth = req.body.password;
        }
        if(req.body.vegi){
            user.birth = req.body.vegi;
        }

        user.save(function (err, updatedUser) {
            if (err){
                return res.status(500).json({
                    title: 'Ein Fehler ist aufgetreten',
                    error: err
                });
            }
            res.status(201).json({
                message: 'User bearbeitet',
                obj: updatedUser
            });
        });

    });

});

/** admin only **/
/** change user data admin function **/
router.put('/changeAdmin', function (req, res, next) {
    jwt.verify(req.get('Authorization'), '20Kj!G!aming?Rock.Admin.17', function (err3, decoded3) {
        if (err3) {
            res.status(401).json({
                title: 'Not Authenticated'
            });
        }
        User.findById(req.body._id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log(req.body);

            if(req.body.packetPaid != null){
                user.lan.packet.paid = req.body.packetPaid;
            }
            if(req.body.food != null){
                user.lan.food = req.body.food;
            }
            if(req.body.paid != null){
                user.lan.paid = req.body.paid;
            }
            if(req.body.role != null) {
                user.role = req.body.role;
            }
            if(req.body.lock != null){
                user.lock = req.body.lock;
            }

            user.save(function (err, updatedUser) {
                if (err){
                    return res.status(500).json({
                        title: 'Ein Fehler ist aufgetreten',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'User bearbeitet',
                    obj: updatedUser
                });
            });

        });

    });

});

/** admin only **/
/** delete a user **/
router.post('/del', function (req, res, next) {

    User.findById(req.body.userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if(user == null){
            return res.status(500).json({
                title: 'Spieler existiert nicht mehr',
                error: err
            });
        }


        if (user.clan != 0) {
            for (var i = 0; user.clan.length > i; i++) {
                Clan.findById(user.clan[i], function (err, clan) {

                    if (clan.user.length != 1) {

                        console.log(clan.user.length + ' != 1');

                        if (clan.admin == req.body.userId) {
                            console.log('admin');
                            /** change admin to next user **/
                            Clan.findByIdAndUpdate(clan._id, {
                                    $pull: {user: req.body.userId},
                                    $set: {admin: clan.user[0]}
                                },
                                function (err, clan) {

                                    if (err) {
                                        return res.status(500).json({
                                            title: 'User finde error',
                                            error: err
                                        });
                                    }
                                });
                        } else {
                            /** drop user from clan **/
                            console.log('no admin');
                            Clan.findByIdAndUpdate(clan._id, {$pull: {user: req.body.userId}},
                                function (err, clan) {

                                    if (err) {
                                        return res.status(500).json({
                                            title: 'User finde error',
                                            error: err
                                        });
                                    }
                                });
                        }

                    } else {
                        /** delete clan **/
                        console.log(clan.user.length + ' == 1');
                        clan.remove(function (err, clan) {
                            if (err) {
                                return res.status(500).json({
                                    title: 'User finde error',
                                    error: err
                                });
                            }
                        });
                    }
                });
            }
        }

        user.remove(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'Remove Fehler',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Erfolgreich gelöscht',
                obj: user
            });
        });


    });


});


/** User Seat Information **/
/** user get seat information **/
router.get('/seat', function (req, res, next) {
    var userArray = [];
    User.find()
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            for (var i = 0; user.length > i; i++) {
                userArray[i] = {
                    id: user[i]._id,
                    nickName: user[i].nickName,
                    seat: user[i].seat
                }
            }

            res.status(200).json({
                message: 'Success',
                obj: userArray
            });
        });
});

/** save seat for the user **/
router.post('/seat', function (req, res, next) {
    User.findOne({'seat': req.body.seat}, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Die Platzreservierung hat nicht funktioniert',
                error: err
            });
        }
        if (!user || req.body.seat === null) {
            User.findOneAndUpdate({_id: req.body.id}, {'$set': {'seat': req.body.seat}}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        title: 'Die Platzreservierung hat nicht funktioniert',
                        error: err
                    });
                }
                if (req.body.seat == null) {
                    res.status(200).json({
                        message: 'Platz wurde freigegeben'
                    });
                } else {
                    res.status(200).json({
                        message: 'Platz ' + req.body.seat + ' wurde für dich reserviert'
                    });
                }

            });

        } else {
            return res.status(500).json({
                title: 'Fehler',
                error: {message: 'Dieser Platz ist schon vergeben'}
            });
        }
    });

});

module.exports = router;
