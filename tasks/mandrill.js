var mandrill = require('node-mandrill'),
    _        = require('lodash');



module.exports = function(grunt){
  grunt.registerMultiTask('mandrill','Send email using mandrill', function(){
    var done = this.async();
    var options = _.pick(this.data.options,['sender', 'recipient', 'subject', 'body']);
    // Setup node-mandrill with the api
    mandrill = mandrill(this.data.options.key);
    var to = [];
    if(typeof options.recipient === "string"){
      to = [options.recipient];
    }else{
      _.map(options.recipient, function(email){ to.push(email); });
    }

    // If file is present
    if(this.filesSrc.length > 0){
      _.each(this.filesSrc,function(path){
        _.each(to, function(recp){
          if(!options.body){ 
            options.body = grunt.file.read(path);
          }
          mandrill(
            '/messages/send',{
              message:{
                to: [{email: recp}],
                from_email: options.sender,
                subject: options.subject,
                html: options.body
              }
            }, 
            function(err, response){
              if(err) grunt.log.writeln("Could not send email to " + recp);
              grunt.log.writeln('Sent email msg to ' + options.recipient);
            });
        });
      });
    }else{
        _.each(to, function(recp){
          if(!options.body){ 
            options.body = grunt.file.read(path);
          }
          mandrill(
            '/messages/send',{
            message: {
                to: [{email: recp}],
                from_email: options.sender,
                subject: options.subject,
                html: options.body
              }
            }, 
            function(err,response){
              if(err) grunt.log.writeln("Could not send email to " + recp);
              grunt.log.writeln('Sent email msg to ' + options.recipient);
            });
        });
    }
  });
}
