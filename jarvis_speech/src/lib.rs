#[derive(Debug)]
pub struct SpeechObject {
    voice: u8,
    speed: u8,
    text: String,
}
#[derive(Debug)]
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
            text,
        };
        self.queue.push(speech);
    }
}
