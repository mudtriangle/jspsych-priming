var timeline = [];

// Welcome message.
var welcome = {
    type: "html-keyboard-response",
    stimulus: "<h2>Priming Experiment</h2>"
              + "<p><i>Press any key to begin.</i></p>"
};
timeline.push(welcome);

// Basic instructions.
var instructions_1 = {
    type: "html-keyboard-response",
    stimulus: "<p>The study is about to begin.</p>"
              + "<p>On each trial, you will see two objects in a row.</br>"
              + "The first image will appear very briefly.</br>"
              + "You should try to look at it because it may help you to identify the second image.</p>"
              + "<p>For the second object,</br>"
              + "your task is to judge whether it shows a common object (e.g., an apple)</br>"
              + "or an abstract scuplture.</p>"
              + "<p><i>Press any key to continue.</i></p>"
};
timeline.push(instructions_1);

var instructions_2 = {
    type: "html-keyboard-response",
    stimulus: "<p>Press '1' if the second image shows a real object.</br>"
              + "Press '0' if it shows an abstract sculpture.</p>"
              + "<p><b>When you see the second image,</br>"
              + "respond as fast and as accurately as you can.</b></p>"
              + "<p><i>Press any key to continue.</i></p>",
    post_trial_gap: 1000
};
timeline.push(instructions_2);

// Start.
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
      jsPsych.data.displayData();
    }
});
