/* eslint-disable @typescript-eslint/naming-convention */
isAction.analytics.track("sales_account_connected", { 
    plan: "shopify", accountType: "logistics"});
  
  $(document).ready(function() {
      $("#search-box").submit(function(event) {
          
          var search_term = $("#search-term").val(); //search_term variable takes in the value from "search-term"
          if($.trim(search_term) === '') { //checks if it's empty or whitespace
              event.preventDefault();
              alert("Please enter valid input");
              return false;
          }
      });  

        isAction.analytics.group("finance");
      
  });