const PRACTICE = true;

const PAIR_CONDITIONS = ['context', 'semantic', 'both', 'unrelated', 'nonobject']
const PRIME_CONDITIONS = ['real', 'non']
const PRAC_CONDITIONS = ['prac', 'obj']

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

// Practice trials.
var practice_design = [];
for (var i = 0; i < 12; i++) {
    // Populate object_number.
    if (i < 10) {
        if (i % 2 == 0) {
            practice_design.push({object_number: 1});
        } else {
            practice_design.push({object_number: 2});
        }
    } else if (i == 10) {
        practice_design.push({object_number: 3});
    } else if (i == 11) {
        practice_design.push({object_number: 4});
    }

    // Populate relation.
    if (i < 8) {
        practice_design[i]['relation'] = Math.floor(i / 2);
    } else {
        practice_design[i]['relation'] = 4;
    }

    // Populate corr_resp.
    if (i < 8) {
        practice_design[i]['corr_resp'] = 0;
    } else {
        practice_design[i]['corr_resp'] = 1;
    }
}

console.log(practice_design);

var practice_message = {
    timeline: [
        {
            type: "html-keyboard-response",
            stimulus: "<p>There will be a block of practice trials.</p>"
                        + "<p><i>Press any key to continue.</i></p>",
            post_trial_gap: 1000
        }
    ],
    conditional_function: function() {
        return PRACTICE;
    }
};
timeline.push(practice_message)

var practice_trials = {
    timeline: [
        {
            type: "html-keyboard-response",
            stimulus: "+",
            choices: jsPsych.NO_KEYS,
            trial_duration: 500
        },
        {
            type: "html-keyboard-response",
            stimulus: function() {
                pair_cond = PAIR_CONDITIONS[jsPsych.timelineVariable('relation', true)];
                num = String(jsPsych.timelineVariable('object_number', true));

                return "<img src='img/Prime_" + pair_cond + "_" + PRAC_CONDITIONS[0] + "_" + num + ".jpg'>";
            },
            choices: jsPsych.NO_KEYS,
            trial_duration: 500
        },
        {
            type: "html-keyboard-response",
            stimulus: function() {
                pair_cond = PAIR_CONDITIONS[jsPsych.timelineVariable('relation', true)];
                num = String(jsPsych.timelineVariable('object_number', true));
                
                return "<img src='img/Target_" + pair_cond + "_" + PRAC_CONDITIONS[0] + "_" + num + ".jpg'>";
            },
            choices: ['1', '0'],
            post_trial_gap: 500
        }
    ],
    timeline_variables: practice_design,
    conditional_function: function() {
        return PRACTICE;
    }
};
timeline.push(practice_trials);


// Start.
jsPsych.init({
    timeline: timeline,
    on_finish: function() {
      jsPsych.data.displayData();
    }
});
