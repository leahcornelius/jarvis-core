use log::*;

#[derive(Debug, Clone)]
pub struct SpeechObject {
    voice: u8,
    speed: u8,
    text: String,
}
#[derive(Debug, Clone)]
pub struct SpeechHandler {
    queue: Vec<SpeechObject>,
    init: bool,
}

impl SpeechHandler {
    pub fn new() -> SpeechHandler {
        SpeechHandler {
            queue: vec![],
            init: false,
        }
    }

    pub fn init(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        self.init = true;
        return Ok(());
    }

    pub fn say(&mut self, text: String) {
        let speech = SpeechObject {
            voice: 0,
            speed: 1,
            text: text.clone(),
        };
        self.queue.push(speech);
        use std::process::Command;
        let prefix = "'".to_string();
        debug!(target: "speek", "{}", text);
        let mut speek = Command::new("./jarvis_speech/src/mimic")
                .arg(prefix + &text + &"'".to_string())
                .spawn()
                .expect("mimic failed to start");
        let _ =speek.wait();
        
    }
}
