#[derive(Debug)]
struct Skill {
    name: String,
    source: String,
    init: bool,
}

#[derive(Debug)]
pub struct SkillsHandler {
    loaded: Vec<Skill>,
    init: bool,
}

impl SkillsHandler {
    pub fn new() -> SkillsHandler {
        SkillsHandler {
            loaded: vec![],
            init: false,
        }
    }
    pub fn init(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        self.init = true;
        return Ok(());
    }
    pub fn load_skill(&mut self, path: String) -> Result<(), Box<dyn std::error::Error>> {
        let skill = Skill {
            name: "skill".into(),
            source: path,
            init: false,
        };
        self.loaded.push(skill);
        return Ok(());
    }
}
