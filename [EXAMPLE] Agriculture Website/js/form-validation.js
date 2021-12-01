/* eslint-disable @typescript-eslint/naming-convention */
isAction.analytics.track("7sales_account_connected", { 
    plan: "spotify", accountType: "logistics"});
  
  $(document).ready(function() {
      $("#search-box").submit(function(event) {
          
          var search_term = $("#search-term").val(); //search_term variable takes in the value from "search-term"
          if($.trim(search_term) === '') { //checks if it's empty or whitespace
              event.preventDefault();
              alert("Please enter valid input");
              return false;
          }
      });  
      isAction.analytics.track("8sales_account_connected", { plan: "spotify",accountType: "logistics"});
        
      isAction.analytics.track("9sales_account_connected", { 
        plan: "spotify", accountType: "logistics"});
    
        isAction.analytics.group("finance");
  ana
  });
  
  isAction.analytics.page("finace", "something");