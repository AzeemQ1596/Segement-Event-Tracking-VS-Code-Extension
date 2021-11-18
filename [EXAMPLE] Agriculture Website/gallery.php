<?php 
include_once "/home/16saaq/public_html/a5/inc/functions.php"; 
include_once "/home/16saaq/public_html/a5/inc/search.php"; 
include_once "/home/16saaq/public_html/a5/inc/header.php";
include_once "/home/16saaq/public_html/a5/inc/footer.php";
?>
<!DOCTYPE html>
<html lang="en">

<?php print_head('Gallery', true); ?>

<body>

    <?php print_header(); ?>
	
	<main>
        <h1>Gallery</h1>

        <div class="thumbnail-gallery">
            <figure>
                <a href="/~16saaq/a5/img/grapes.jpg">
                    <img src="/~16saaq/a5/img/grapes.jpg"
                     alt="A farmer holding grapes"/>
                </a>
            </figure>            
            <figure>
                <a href="/~16saaq/a5/img/orange-juice.jpg">
                    <img src="/~16saaq/a5/img/orange-juice.jpg"
                     alt="A glass of orange juice"/>
                </a>
            </figure>            
            <figure>
                <a href="/~16saaq/a5/img/single-leaf.jpg">
                    <img src="/~16saaq/a5/img/single-leaf.jpg"
                     alt="A single leaf"/>
                </a>
            </figure>
            <figure>
                <a href="/~16saaq/5/img/single-cherry.jpg">
                    <img src="/~16saaq/a5/img/single-cherry.jpg"
                     alt="A single cherry"/>
                </a>
            </figure>
            <figure>
                <a href="/~16saaq/a5/img/cardamom-buns.jpg">
                    <img src="/~16saaq/a5/img/cardamom-buns.jpg"
                     alt="Dinner rolls spiced with cardamom"/>
                </a>
            </figure>        
            <figure>
                <a href="/~16saaq/a5/img/dew-on-grass.jpg">
                    <img src="/~16saaq/a5/img/dew-on-grass.jpg"
                     alt="Dew drops on blades of grass"/>
                </a>
            </figure>
        </div>
    </main>

    <?php print_footer(); ?>
	
</body>
</html>