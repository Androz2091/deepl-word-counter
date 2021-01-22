// Create words counters
const sourceWordCounter = document.createElement('small')
sourceWordCounter.textContent = 'loading...'
const targetWordCounter = sourceWordCounter.cloneNode(true)

// Add them to the page
const div = document.getElementsByClassName('lmt__textarea_container')
div[0].appendChild(sourceWordCounter)
div[1].appendChild(targetWordCounter)

// Get source and target text area
const sourceTextArea = document.getElementsByClassName('lmt__source_textarea')[0];
const targetTextArea = document.getElementsByClassName('lmt__target_textarea')[0];

// Update target words counter
const updateTargetCount = () => {
    const previousWordCount = targetWordCounter.textContent.split(' ')[0];
    const newWordCount = targetTextArea.value.length === 0 ? 0 : targetTextArea.value.split(' ').length;
    // (DEBUG) console.log(`[DeepL Word Counter] Updating target word count... ${previousWordCount} → ${newWordCount}`);
    targetWordCounter.textContent = `${newWordCount} words`;
}

// Update source words counter and call updateTargetCount after 500ms (once the translation has been made)
let updateTargetTimeout = null;
const updateSourceCount = () => {
    const previousWordCount = sourceWordCounter.textContent.split(' ')[0];
    const newWordCount = sourceTextArea.value.length === 0 ? 0 : sourceTextArea.value.split(' ').length;
    // (DEBUG) console.log(`[DeepL Word Counter] Updating source word count... ${previousWordCount} → ${newWordCount}`);
    sourceWordCounter.textContent = `${newWordCount} words`
    if (updateTargetTimeout) clearTimeout(updateTargetTimeout)
    updateTargetTimeout = setTimeout(() => updateTargetCount(), 100);
};
updateSourceCount();

// Add source text area listener to call updateSourceCount once it's updated
if (sourceTextArea.addEventListener) {
    sourceTextArea.addEventListener('input', function() {
        updateSourceCount();
    }, false);
  } else if (sourceTextArea.attachEvent) { // IE-specific event handling code
    sourceTextArea.attachEvent('onpropertychange', function() {
        updateSourceCount();
    });
}

setInterval(() => updateTargetCount(), 2000);