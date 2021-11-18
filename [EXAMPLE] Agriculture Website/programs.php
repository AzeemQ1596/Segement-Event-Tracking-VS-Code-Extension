<?php 
include_once "/home/16saaq/public_html/a5/inc/functions.php"; 
include_once "/home/16saaq/public_html/a5/inc/search.php"; 
include_once "/home/16saaq/public_html/a5/inc/header.php";
include_once "/home/16saaq/public_html/a5/inc/footer.php";
?>
<!DOCTYPE html>
<html lang="en">

<?php print_head('Programs'); ?>

<body>

    <?php print_header(); ?>
    
	<article>
        <h1>Programs</h1>
        
        <div class="column-container">
            <section class="column">
                <h2>Crop Science</h2>
                
                <p>Students in Crop Science study not only crop production and management, but the plants themselves.</p>
            </section>
            
            <section class="column">
                <h2>Food Science</h2>
                
                <p>Students in Food Science study the development, safety and supply of food.</p>
            </section>
        </div>
        
        <section>
            <h2>Common First Year</h2>
            
            <p>If you enrol in Agriculture, there is no need to declare a plan/major immediately. Both Crop Science and Food Science have a common first year; you can make your choice <em>after</em> you've been introduced to both topics.</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Course Code</th>
                        <th>Name</th>
                        <th>Units</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mathematics</td>
                        <td>MATH 121</td>
                        <td>Differential and Integral Calculus</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Chemistry</td>
                        <td>CHEM 112</td>
                        <td>General Chemistry</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td rowspan="2">Biology</td>
                        <td>BIOL 102</td>
                        <td>Introductory Biology of Cells</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>BIOL 103</td>
                        <td>Introductory Biology of Organisms</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td rowspan="2">Agriculture</td>
                        <td>AGRI 105</td>
                        <td>Fundamentals of Crop Science</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>AGRI 106</td>
                        <td>Fundamentals of Food Science</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td colspan="3">Elective(s)</td>
                        <td>6</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Total Units</th>
                        <th>30</th>
                    </tr>
                </tfoot>
            </table>
    
            <p>The Faculty of Arts and Science requires students to <a href="https://www.queensu.ca/artsci/undergrad-students/plan-selection">declare a plan/major</a> once they have completed 24 units (or more). This typically occurs at the end of their first year.</p>         
        </section>
    </article>

    <?php print_footer(); ?>
	
</body>
</html>