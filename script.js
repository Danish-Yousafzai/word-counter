const ourText = document.getElementById("input-area");
ourText.addEventListener('input', updateTextStatistics);

function updateTextStatistics() {
  const wordsElement = document.getElementById("words");
  const sentencesElement = document.getElementById("sentences");
  const charactersElement = document.getElementById("characters");
  const paragraphElement = document.getElementById("paragraph");

  const textValue = ourText.value;

  charactersElement.innerHTML = textValue.length;

  const words = textValue === '' ? 0 : (textValue.match(/\b\w+('\w+)?\b/g) || []).length;
  wordsElement.innerHTML = words;

  const sentences = textValue.split(/[.!?]+/).length - 1 || 0;
  sentencesElement.innerHTML = sentences;

  const paragraphs = textValue.split('\n').length - 1 || 0;
  paragraphElement.innerHTML = paragraphs;

  const wordsArray = textValue.match(/\b\w+('\w+)?\b/g) || [];
  const wordCount = {};
  wordsArray.forEach(word => {
    word = word.toLowerCase();
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const topFiveWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  topWordsListElement.innerHTML = '';

  topFiveWords.forEach(([word, count]) => {
    const li = document.createElement('li');
    li.textContent = `${word}: ${count}`;
    topWordsListElement.appendChild(li);
  });
}