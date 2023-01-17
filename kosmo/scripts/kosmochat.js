var Conversation = require("hubot-conversation");
const { v4: uuidv4 } = require('uuid');
const timeOut = 180000
const kosmoModule = {
    "id": "",
    "makerId": "",
    "function": [
        ""
    ],
    "name": "",
    "description": "",
    "width": 0,
    "type": [
        ""
    ],
    "link": "",
    "imageLink": ""
    };

function nameToId(name){
    // TODO: return false if error occurs
    return "0000-00000-00000-00000-00000000"
}

module.exports = function(robot) {
    var kosmoChat = new Conversation(robot, "user");

    robot.respond(/new/, function(msg){
             
        // confirmation dialog
        function start(msg){
            msg.reply("Are you sure? (yes/no)"); 
            var checkStep = kosmoChat.startDialog(msg, timeOut);
            checkStep.addChoice(/yes/, function(msg2){getName(msg2)});
            checkStep.addChoice(/no/, function(msg2){msg2.reply("No? OK then. See you around!")});
        }
        // get maker's name
        function getName(msg){
            msg.reply("Great! Now I need you to tell me a bit about the module.\n Enter your maker name exactly as shown on kosmodulargrid.com.");

            var makerNameStep = kosmoChat.startDialog(msg, timeOut);
            makerNameStep.addChoice(/.*/, function(msg2){
                let makerName = msg2.envelope.message.text;
                let makerNameId = nameToId(makerName);
                
                if (makerNameId === false){
                    // msg2.reply("Didn't find your maker name
                } else {
                    // msg2.reply("Great, we found your name.")
                    kosmoModule.makerId = makerNameId;
                    msg2.reply("Name is " + makerName + " id: " + makerNameId);
                    msg2.reply(kosmoModule.makerId);
                    moduleNameAndId(msg2)
                }
                
            })};

        function moduleNameAndId(msg){
            msg.reply("Now enter the name of your new module.")
            var moduleNameAndIdStep = kosmoChat.startDialog(msg, timeOut);
            moduleNameAndIdStep.addChoice(/.*/, function(msg2){
                let moduleName = msg2.envelope.message.text;
                let moduleId = uuidv4();
                kosmoModule.id = moduleId;
                kosmoModule.name = moduleName;
                moduleDescription()
            })
        }
        
        function moduleDescription(msg){
            msg.reply("Tell me the description of your module.");
            var descriptionStep = kosmoChat.startDialog(msg, timeOut);
            descriptionStep.addChoice(/.*/, function(msg2){
                const moduleDescription = msg2.envelope.message.text;
                kosmoModule.description = moduleDescription;
                moduleWidth();
            })
        }

        function moduleWidth(msg){
            msg.reply("How wide is your module? (cm)");
            var widthStep = kosmoChat.startDialog(msg, timeOut);
            descriptionStep.addChoice(/.*/, function(msg2){
                const moduleWidth = msg2.envelope.message.text;
                kosmoModule.width = moduleWidth;
                moduleLink()
            })
        }

        function moduleLink(msg){
            msg.reply("What's the link to your module's homepage?");
            var linkStep = kosmoChat.startDialog(msg, timeOut);
            linkStep.addChoice(/.*/, function(msg2){
                const moduleLink = msg2.envelope.message.text;
                kosmoModule.link = moduleLink;
            })
        }

        function moduleImageLink(msg){
            msg.reply("What's the link to your module's image?");
            var imageLinkStep = kosmoChat.startDialog(msg, timeOut);
            imageLinkStep.addChoice(/.*/, function(msg2){
                const moduleImageLink = msg2.envelope.message.text;
                kosmoModule.imageLink = moduleImageLink;
            })
        }

        var letsGo = start(msg);
    })
        
    
}



       

    
    
    

