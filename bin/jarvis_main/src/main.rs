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
    skill_loader.load_skill("../../dashboard/".into()).unwrap();
}
