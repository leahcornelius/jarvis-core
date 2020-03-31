pub struct Config {
    pub major: u8,
    pub breaking: u8,
    pub minor: u8,
    pub home_api_key: String,
    pub screen: bool,
    pub voice_type: u8,
}

pub fn config() -> Config {
    Config {
        major: 0,
        breaking: 1,
        minor: 0,
        home_api_key: "".into(),
        screen: false,
        voice_type: 0,
    }
}
