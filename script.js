function calculateScore(answerKey, userAnswers) {
  const normalizedUserAnswers = userAnswers
    .toUpperCase()
    .replace(/[^12345ABCDE0 ]/g, '')
    .replace(/1/g, 'A')
    .replace(/2/g, 'B')
    .replace(/3/g, 'C')
    .replace(/4/g, 'D')
    .replace(/5/g, 'E');

  let score = 0;

  for (let i = 0; i < normalizedUserAnswers.length; i++) {
    if (normalizedUserAnswers[i] === answerKey[i]) {
      score++;
    }
  }

  return score;
}

const answerKeys = {
  sinonimTest: 'BCDECADEAE',
  antonimTest: 'CDCCABBABE',
  analogiTest: 'ABDEABBDBB',
  pengelompokanKata: 'AECBAAEBDE',
  numerikTest: 'DBDBECBABDEBDBACDDBAAACEBCDADA',
  logicTest: 'BDEDDCCEAB',
  TOEFLTest: 'BBACDBCACABCBCBDABACBCDBCDBCDCBAACCBCCDDB',
};

document.addEventListener('DOMContentLoaded', function() {
  const testForm = document.getElementById('testForm');
  const resultsElement = document.getElementById('results');

  testForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting

    const sinonimAnswers = document.getElementById('sinonimAnswers').value;
    const antonimAnswers = document.getElementById('antonimAnswers').value;
    const analogiAnswers = document.getElementById('analogiAnswers').value;
    const pengelompokanKataAnswers = document.getElementById('pengelompokanKataAnswers').value;
    const numerikAnswers = document.getElementById('numerikAnswers').value;
    const logicAnswers = document.getElementById('logicAnswers').value;
    const toeflAnswers = document.getElementById('toeflAnswers').value;

    const userAnswers = {
      sinonimTest: sinonimAnswers,
      antonimTest: antonimAnswers,
      analogiTest: analogiAnswers,
      pengelompokanKata: pengelompokanKataAnswers,
      numerikTest: numerikAnswers,
      logicTest: logicAnswers,
      TOEFLTest: toeflAnswers,
    };

    const testTypes = Object.keys(answerKeys);
    let resultsHTML = '';

    testTypes.forEach(testType => {
      const score = calculateScore(answerKeys[testType], userAnswers[testType]);
      resultsHTML += `Score for ${testType}: ${score}<br>`;
    });

    resultsElement.innerHTML = resultsHTML;
  });

  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', function() {
    const textareas = testForm.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.value = ''; // Clear textarea content
    });

    const scoreElements = testForm.querySelectorAll('.score');
    scoreElements.forEach(scoreElement => {
      scoreElement.textContent = ''; // Clear score display
    });

    resultsElement.innerHTML = ''; // Clear results display
  });
});
