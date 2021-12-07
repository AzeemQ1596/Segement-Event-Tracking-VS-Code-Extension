
isAction.analytics.track("sales_account_connected", {
    plan: "shopify",
    accountType: "sales"
  });

$(document).ready(function() {
    $('.thumbnail-gallery').magnificPopup({
        delegate: 'figure a',
        type: 'image',
        gallery: { 
            enabled: true 
        },
        image: { 
            titleSrc: function(anchor) {
                // Finds the child img element and returns the alt
                // attribute as the title/caption
                return anchor.el.find('img').attr('alt');
            } 
        }
    });    
});
      isAction.analytics.track("2sales_account_connected", {
    plan: "spotify",
    accountType: "logistics"
  });

  isAction.analytics.track("3sales_account_connected", {
    plan: "spotify",
    accountType: "logistics"
  });

  isAction.analytics.track("4sales_account_connected", {
    plan: "spotify",
    accountType: "logistics"
  });

  /*
isAction.analytics.page("page1", {
    plan: "premium",
    accountType: "pagetype"
  });*/