<?php 
function print_header() { ?>

<header>
	    <img id="wordmark" src="/~16saaq/a5/img/queens-wordmark.png" alt="Queen's University"/>
        <div id="hero-container">
            <div class="overlay"></div>
            <img id="logo" src="/~16saaq/a5/img/queens-logo.png" alt="Queen's University Coat of Arms"/>
            <div id="site-title">
                <a href="/~16saaq/a5/">Department of Agriculture</a>
            </div>
            <nav>
                <ul>
                    <li><a href="/~16saaq/a5/about.php">About</a></li>
                    <li><a href="/~16saaq/a5/programs.php">Programs</a></li>
                    <li><a><form id="search-box" method="POST" action="/~16saaq/a5/search-results.php">

                            <input type="search" name="search-term" id="search-term" placeholder="Search" maxlength="100">
                            <label for="search-term"> Search term (required) </label>
                            <input type="submit" value="Submit">

                        </form> 
                    </a></li>
                 </ul>
            </nav>
            <ul class="social">
                <li>
                    <a href="https://www.facebook.com/QueensComputing">
                        <i class="icon-facebook-square" aria-hidden="true" title="Facebook"></i>
                        <span class="sr-only">Facebook</span>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/queenscomputing">
                        <i class="icon-twitter-square" aria-hidden="true" title="Twitter"></i>
                        <span class="sr-only">Twitter</span>
                    </a>
                </li>
            </ul>
        </div>
	</header>
<?php
}