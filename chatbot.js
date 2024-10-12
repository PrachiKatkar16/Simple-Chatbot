const readline = require('readline');
const qaPairs = [
    { question: "What is your name?", answer: "My name is Chatbot." },
    { question: "How can I help you?", answer: "I can assist you with your queries." },
    { question: "What is the weather today?", answer: "The weather is sunny." }
];

function chatbot(userQuestion) {
    const cleanedInput = userQuestion.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
    let bestMatch = null;
    let bestMatchScore = 0;

    qaPairs.forEach(qaPair => {
        const cleanedPredefinedQuestion = qaPair.question.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
        const matchScore = compareQuestions(cleanedInput, cleanedPredefinedQuestion);

        if (matchScore > bestMatchScore) {
            bestMatchScore = matchScore;
            bestMatch = qaPair.answer;
        }
    });

    return bestMatch || "Sorry, I don't understand your question.";
}


function compareQuestions(inputQuestion, predefinedQuestion) {
    const inputWords = inputQuestion.split(' ');
    const predefinedWords = predefinedQuestion.split(' ');
    let matchCount = 0;

    inputWords.forEach(inputWord => {
        if (predefinedWords.includes(inputWord)) {
            matchCount++;
        }
    });

    return matchCount;
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Ask me anything: ", (userInput) => {
    const response = chatbot(userInput);
    console.log(response);
    rl.close();
});
