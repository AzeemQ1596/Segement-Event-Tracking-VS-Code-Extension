<?php 
include_once "/home/16saaq/public_html/a5/inc/functions.php"; 
include_once "/home/16saaq/public_html/a5/inc/search.php"; 
include_once "/home/16saaq/public_html/a5/inc/header.php";
include_once "/home/16saaq/public_html/a5/inc/footer.php";
?>
<!DOCTYPE html>
<html lang="en">

<?php print_head('Search Results'); ?>

<body>

    <?php print_header(); ?>

	    <main>
        
            <h1> Search Results </h1>
               
                <?php if(array_key_exists($_POST['search-term'], $_REQUEST)): ?>  <!-- To test whether the data was received or not -->
                
                    <p> Sorry, search could not be processed. Please try again later. </p>

                <?php  else: 
                    $search_term = trim(filter_var($_POST['search-term'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)); //sanitize the data first and then trim the whitespace. We asssign the sanitzed and trimmed value to $search_term
                    $search_results_array = search_for_term($search_term);
                    if($search_results_array==[]):  ?>
                   
                        <p> Sorry, but there were no matches for &quot<?= $search_term ?>&quot </p>

                    <?php else : ?>
                         <p> Your search for &quot<?= $search_term ?>&quot produced <?php echo count($search_results_array)  ?> result(s). <p>
                            <ul>
                                <?php foreach($search_results_array as $result): ?>
                                    <li><a href="<?php $result[CONTENT_LINK] ?>"> <?php echo $result[CONTENT_TITLE]?> </a>
                                <?php endforeach; ?>
                            </ul>                    
                     <?php endif; 
                endif; ?>        
        </main> 
	<?php print_footer(); ?>
</body>
</html>