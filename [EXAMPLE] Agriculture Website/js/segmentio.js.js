Meteor.startup(function() {
    var segmentIoConfig =
      Meteor.settings &&
      Meteor.settings.public &&
      Meteor.settings.public.segmentio;
  
    if(segmentIoConfig) {
      analytics.load(segmentIoConfig.writeKey);
      if(Meteor.isClient) {
        configureSegmentIoOnClient();
      } else {
        configureSegmentIoOnServer();
      }
    }
  });
  
  function configureSegmentIoOnClient() {
    Deps.autorun(function() {
      var user = Meteor.user();
      if(user) {
        prevUser = user._id;
  
    
        analytics.track("user-cameback");
      } else if(FlowRouter.current().route.name === "debug") {
        analytics.track("kadira-debug");
      }
    });
  
    UserEvents.on("event", function(category, type, data) {
      if(category === "user") {
        // track user presence
        var eventName = category + "-" + type;
      
      }
    });
  }
  
  function configureSegmentIoOnServer() {
    UserEvents.on("event", function(category, type, data) {
      if(category === "user") {
        var eventName = category + "-" + type;
        analytics.track("sales_account_connected",{
          userId: data.userId,
          event: eventName,
          properties: {
            email: data.email
          }
        });
      }
    });
  }