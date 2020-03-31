// dashboard/main.rs - copywright 2019 Leo Cornelius @ The Jarvis Project
//!
//! This file manages the technical aspects of the defult page for both smart mirrors and smart screens
//! ( though both have UI differences ). This is the module run after tartup prodcedures. UI/index.html is
//! the main file for the ui with the js and css files being in the UI/js and UI/css respectivley. The dialog
//! and intent files are in speech/

use jarvis_ui::*;

fn init() -> Result<(), Box<std::error:Error>> {
  info!("Initiating Jarvis Dashboard");
  let conf = config();
  if conf.screen == false {
    return Err("No supported screens".into());
  } else {
    info!("Screen detected");
  }
  let ui_handle = UiHandle::new();
  if let Err(e) = ui_handle.init() {
    error!("Failed to init ui element. Gave error: {:?}", e);
    return Err(e);
  } else {
    info!("Launched UI handler");
  }
  if let Err(e) = ui_handle.document.set("UI/index.html".to_string()) {
    error!("Failed to display UI/index.html, gave error: {:?}", e);
    return Err(e);
  }
  return Ok(());
}


