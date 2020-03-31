#[derive(Debug, Default)]
pub struct Document {
    path: String,
}

#[derive(Debug, Default)]
pub struct UiHandle {
    pub method: String,
    pub host: String,
    pub document: Document,
}

impl UiHandle {
    pub fn new() -> UiHandle {
        UiHandle {
            method: "http".to_string(),
            host: "localhost:1234".into(),
            document: Document::default(),
        }
    }
    pub fn init(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        return Ok(());
    }
}

impl Document {
    pub fn set(&mut self, path: String) -> Result<(), Box<dyn std::error::Error>> {
        self.path = path;
        return Ok(());
    }
}
