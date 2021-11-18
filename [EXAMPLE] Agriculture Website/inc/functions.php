<?php
/***************************************************************************/
/* get_string_value(...) */
/***************************************************************************/
function get_string_value($value) {
	if ($value === NULL) {
		return 'NULL';
	}
	elseif ($value === true) {
		return 'true';
	}
	elseif ($value === false) {
		return 'false';
	}

	return strval($value);
}


/***************************************************************************/
/* print_head(...) */
/***************************************************************************/
function print_head($page_title, $gallery_js = false) { ?>
<head>
	<title><?= $page_title ?> </title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
	<link rel="stylesheet" href="/~16saaq/a5/css/icons.css"> 	
	<link rel="stylesheet" href="/~16saaq/a5/css/style.css"> 	
	<link rel="stylesheet" href="/~16saaq/a5/css/responsive.css">
	<script src="/~16saaq/a5/js/jquery-3.4.1.min.js"></script>
    <script src="/~16saaq/a5/js/header-slideshow.js"></script>
	<script src="/~16saaq/a5/js/form-validation.js"></script>
	
	<?php if ($gallery_js) : ?>
	<script src="/~16saaq/a5/js/jquery.magnific-popup.min.js"></script>
	<script src="/~16saaq/a5/js/thumbnail-gallery.js"></script>
	<?php endif; ?>

</head>	
<?php
}