const quotes = [
  "Iron Sword Huh? What Are You Killing? Butterflies?",
  "No Lollygaggin'",
  "If I Had A Sister, I'd Sell Her In A Second",
  "Why The Elven Blade, Huh? Nord Steel Not Good Enough For You?",
  "By Shor, You're Hauling Around A Lot Of Junk",
  "Skyrim Belongs To The Nords!",
  "Let Me Guess, Someone Stole Your Sweetroll?",
  "Is That... Fur? Coming Out Of Your Ears?",
  "Wait... I Know You...",
  "Psst! Hey. I Know Who You Are. Hail Sithis!",
  "Never Should've Come Here!",
  "Those Warriors From Hammerfell? They've Got Curved Swords. Curved. Swords.",
  "You'll Make A Fine Rug, Cat!",
  "I Used To Be An Adventurer Like You, Then I Took An Arrow In The Knee",
  "Do You Get To The Cloud District Very Often?"
];

const randomQuote = () => {
  return "\"" + quotes[
    Math.floor(Math.random() * quotes.length)
  ] + "\"";
}

document.getElementById('playbtn').addEventListener('click', e => {
  const div = document.createElement('div');
  div.classList = 'quote';
  if (Math.floor(Math.random() * 2)) {
    div.style.animationName = 'animate-left';
  }
  div.innerHTML = randomQuote();
  document.getElementById('quote-container').appendChild(div); 
  div.addEventListener("animationend", e => {
    div.remove();
  });
});