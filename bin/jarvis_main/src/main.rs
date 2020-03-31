extern crate jarvis_config;
use jarvis_config::config;

extern crate jarvis_skills;
use jarvis_skills::SkillsHandler;

#[macro_use]
extern crate log;
extern crate simple_logger;

extern crate jarvis_speech;
use jarvis_speech::SpeechHandler;

fn main() {
    simple_logger::init_with_level(log::Level::Debug).unwrap();
    let conf = config();
    info!(
        "Launching jarvis Core Version {}.{}.{}",
        conf.major, conf.breaking, conf.minor
    );
    info!("Launching speech server");
    let mut speech_handler = SpeechHandler::new();
    if let Err(e) = speech_handler.init() {
        error!("Failed to launch speech server. Gave error: {:?}", e);
        return ();
    }
    info!("Launched speech server");
    info!("Launching skills handler...");
    let mut skill_loader = SkillsHandler::new();
    if let Err(e) = skill_loader.init() {
        error!("Failed to load skill handler, gave error: {:?}", e);
        speech_handler.say("I have encountered an error while starting up, please go to home dot jarvis dot t k slash errors to see what went wrong. I will now attempt to restart.".into());
        return ();
    }
    info!("Launched skills handler");
    info!("Launching wakework listener");
    if conf.first_launch == true {
        speech_handler.say("Welcome to jarvis, your new home assistant.".into());
        speech_handler.say("I am getting things ready for you now, In the mean time please go to home, dot jarvis, dot tk, slash register and create an account.".into());
        let code = generate_code();
        speech_handler.say(code_as(code));
    }
}

fn generate_code() -> String {
    return "abcpoi".to_string()
}

fn code_as(s: String) -> String {
    let alphabet = ["Alpha", "Beta","Charlie", "Delta","Echo","Foxstrot","Golf","Hotel","India","Juliett","Kilo","Lima","Mike","November","Oscar","Papa","Quebec","Romeo","Sierra","Tango","Uniform","Victor","Whiskey","X-Ray","Yankee","Zulu"];
    let mut res: String = "Once you are registered please enter the folloing code in the register a device section. Your code is: ".into();
    for char in s.chars() {
        res += &(char.to_string() + &", for ".to_owned() + alphabet[char as usize -  97] + &". ".to_owned());
    }
    res += "If you would like me to repeat that say: jarvis, repeat my code".into();
    res
}