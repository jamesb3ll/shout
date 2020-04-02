const { exec } = require("child_process");

export async function startScreenReader() {
  let lastOutput = "";
  let result = [];

  await toggleVoiceOver();

  /* const stopPolling = poll(options, async updateStable => {
    const text = getVoiceOverText();
    if (text == null) {
      return;
    }
    const trimmedText = text.trim();
    if (trimmedText !== lastText) {
      result.push(trimmedText);
      lastOutput = trimmedText;
      updateStable();
    }
  }); */
  const stop = async () => {
    await toggleVoiceOver();
    // stopPolling();
  };

  return {
    result,
    stop
  };
}

const runOsaScript = code =>
  new Promise((resolve, reject) => {
    exec(`osascript -l JavaScript -e "${code}"`, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });

const toggleVoiceOver = () =>
  runOsaScript(
    `
    function run() {
        let se = Application('System Events');
    
        delay(1);
    
        let F5 = 96;
        se.keyCode(F5, { using: 'command down' });
    
        delay(1);
    }
`
  );

const getVoiceOverText = () =>
  runOsaScript(
    `
      function run() {
        let voiceOver = Application('VoiceOver');
      
        delay(0.1);
      
        let lastPhrase = '';
        if (voiceOver.captionWindow.enabled) {
          lastPhrase = voiceOver.lastPhrase.content();
        }
      
        delay(1);
      
        return lastPhrase;
      }
  `
  );
