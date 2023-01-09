var Conversation = require("hubot-conversation");

module.exports = function(robot) {
    var kosmoChat = new Conversation(robot, "user");

    robot.respond(/new/, function(msg){
        msg.reply("Are you sure? (yes/no)");

        var chat = kosmoChat.startDialog(msg);
        chat.addChoice(/yes/, function(msg2){msg2.reply("Cool! Proceeding to next step.")});
        chat.addChoice(/no/, function(msg2){msg2.reply("No? OK then. See you around!")});
        
        msg.reply("Enter your maker name EXACTLY as shown on KMG.")
        chat.resetChoices();
        chat.addChoice(/.*/, function(msg3){makerName = msg3.match[1];msg3.reply(`Hi there, ${makerName}`)})
        msg.reply("Hi there, ")
        makerNameStep = function(dialog){
            dialog.resetChoices()
            dialog.addChoice(/.*/)
        }

    
    
    
})};
