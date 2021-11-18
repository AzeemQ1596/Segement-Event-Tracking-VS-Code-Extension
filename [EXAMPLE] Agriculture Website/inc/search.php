<?php
/*****************************************************************************/
/* Constants */
/*****************************************************************************/
define("CONTENT_TITLE", "type");
define("CONTENT_TEXT", "text");
define("CONTENT_LINK", "link");

/*****************************************************************************/
/* Search Data */
/*****************************************************************************/
function get_search_data() {
	$search_data_array = array();
	
	$search_data_array[] = array(
		CONTENT_TITLE => "AGRC 111.3 - Discovery in Plant and Soil Sciences",
		CONTENT_TEXT => "An introduction to agricultural systems with a focus on sustainability in a changing environment.",
		CONTENT_LINK => "https://catalogue.usask.ca/agrc-111");
	$search_data_array[] = array(
		CONTENT_TITLE => "Undergraduate Programs",
		CONTENT_TEXT => "At the College of Agriculture and Bioresources you will be coached and mentored by a dedicated team of world-class teacher-scholars and will attend classes in one of the most modern and extensive teaching and research facilities for agricultural science in the world.",
		CONTENT_LINK => "https://agbio.usask.ca/programs/undergraduate.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "Plant Sciences",
		CONTENT_TEXT => "The Department of Plant Sciences along with the fully integrated Crop Development Centre (CDC), provide a truly unique experience to students by offering teaching and research programs focusing on the physiology, development management and production of field and horticultural crops on the Canadian prairies and the management of non-arable lands.",
		CONTENT_LINK => "https://admissions.usask.ca/soil-science.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "FABS 212.3 - Agrifood and Resources Microbiology",
		CONTENT_TEXT => "An introduction to the general biology of microorganisms with emphasis on those of agrifood, economic and environmental importance.",
		CONTENT_LINK => "https://catalogue.usask.ca/fabs-212");
	$search_data_array[] = array(
		CONTENT_TITLE => "Sina Adl",
		CONTENT_TEXT => "Professor",
		CONTENT_LINK => "https://agbio.usask.ca/faculty-and-staff/people-pages/sina-adl.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "Melissa Arcand",
		CONTENT_TEXT => "Assistant Professor",
		CONTENT_LINK => "https://agbio.usask.ca/faculty-and-staff/people-pages/melissa-arcand.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "SLSC 232.3 - Soil Genesis and Classification",
		CONTENT_TEXT => "Deals with soil systems and their environments from the perspective of soil development and soil classification.",
		CONTENT_LINK => "https://catalogue.usask.ca/slsc-232");
	$search_data_array[] = array(
		CONTENT_TITLE => "Academic Advice",
		CONTENT_TEXT => "Whether you�re entering your first year, have transferred from another post-secondary institution, or are preparing to graduate, an academic advisor offers personalized and confidential guidance to help you succeed.",
		CONTENT_LINK => "https://agbio.usask.ca/students/undergraduate/academic-advice.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "Jackie Bantle",
		CONTENT_TEXT => "Greenhouse and Horticulture Facility Manager",
		CONTENT_LINK => "https://agbio.usask.ca/faculty-and-staff/people-pages/jackie-bantle.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "Hamish Tulloch",
		CONTENT_TEXT => "Development Officer",
		CONTENT_LINK => "https://agbio.usask.ca/faculty-and-staff/people-pages/hamish-tulloch.php");
	$search_data_array[] = array(
		CONTENT_TITLE => "SLSC 312.3 - Soil Fertility and Fertilizers",
		CONTENT_TEXT => "The forms, flows, and transformations of plant nutrients in soils are examined, with emphasis on Western Canadian agricultural systems.",
		CONTENT_LINK => "https://catalogue.usask.ca/slsc-312");
	$search_data_array[] = array(
		CONTENT_TITLE => "Gardening",
		CONTENT_TEXT => "Gardening at the U of S offers free growing information and diagnostics with Gardenline Online, free and low-cost public workshops and events, and ample ways to connect with local gardeners and gardening communities.",
		CONTENT_LINK => "https://gardening.usask.ca/index.php");
	
	return $search_data_array;
}


/*****************************************************************************/
/* Search Function */
/*****************************************************************************/
function search_for_term($search_term) {
	$search_result_array = array();
	$search_data_array = get_search_data();
	
	foreach ($search_data_array as $search_data) {
		if ((strpos($search_data[CONTENT_TITLE], $search_term) !== false) || 
			(strpos($search_data[CONTENT_TEXT], $search_term) !== false)) {
			$search_result_array[] = $search_data;
		}
	}
	
	return $search_result_array;
}