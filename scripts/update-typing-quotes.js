const fs = require('fs');
const path = require('path');

// A large database of quotes (English and Indonesian, poetic, motivational, tech)
const quotes = [
  // English Poetic & Tech
  "Code is poetry written in logic.",
  "Dream without fear, code without limits.",
  "Time is a river of passing events.",
  "Silence is the canvas of deep thoughts.",
  "Be a voice, not an echo.",
  "Create your own sunshine on cloudy days.",
  "Hustle in silence, let success make the noise.",
  "Not all those who wander are lost.",
  "Errors are proof that you are trying.",
  "Simplicity is the ultimate sophistication.",
  "Make it simple, but significant.",
  "Logic will get you from A to B; imagination will take you everywhere.",
  "Before software can be reusable it first has to be usable.",
  "To seek is to find, to build is to live.",
  "The best way to predict the future is to invent it.",
  "Lost time is never found again.",
  "In the middle of difficulty lies opportunity.",
  "What we think, we become.",
  "Strive not to be a success, but rather to be of value.",
  "Every moment is a fresh beginning.",
  "Code never lies, comments sometimes do.",
  "Programs must be written for people to read.",
  "Talk is cheap. Show me the code.",
  "Simplicity is key to beautiful code.",

  // Indonesian Poetic & Tech
  "Menulis kode membelah sunyinya malam.",
  "Setiap langkah adalah bagian dari cerita.",
  "Waktu terus berjalan tanpa pernah menunggu.",
  "Dalam hening, kita merajut mimpi.",
  "Mimpi tanpa aksi hanyalah ilusi.",
  "Terang akan datang setelah gulita.",
  "Sebuah kode, sejuta cerita.",
  "Menanti fajar di batas cakrawala.",
  "Fokus pada proses, hasil takkan mengkhianati.",
  "Secangkir kopi, sebaris kode, sejuta mimpi.",
  "Logika membimbing langkah, imajinasi menembus batas.",
  "Jangan biarkan hari kemarin menyita hari ini.",
  "Keberhasilan dimulai dari keputusan untuk mencoba.",
  "Sunyi malam adalah teman terbaik sang pemikir.",
  "Setiap akhir adalah awal yang baru.",
  "Detail kecil menciptakan kesempurnaan.",
  "Rintangan adalah jembatan menuju kekuatan.",
  "Hidup adalah seni menggambar tanpa penghapus.",
  "Mulailah dari mana kamu berada, gunakan apa yang kamu punya.",
  "Satu langkah kecil hari ini adalah awal lompatan besar esok hari.",
  "Kebenaran kode berada pada baris eksekusi.",
  "Karya terbaik lahir dari ketekunan tiada henti.",
  "Dalam baris kode terdapat bait-bait harapan."
];

// Helper to shuffle array and pick N items
function getRandomQuotes(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Format quotes to be safe for URL parameter
function formatQuoteForUrl(quote) {
  let formatted = quote
    .replace(/['’]/g, "") // remove apostrophes to avoid rendering issues
    .replace(/["]/g, "")
    .replace(/[;,]/g, "") // remove semicolon and commas to keep it clean and avoid parameter splitting
    .trim();
  
  return encodeURIComponent(formatted).replace(/%20/g, "+");
}

function updateReadme() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  if (!fs.existsSync(readmePath)) {
    console.error("README.md not found!");
    process.exit(1);
  }

  let readmeContent = fs.readFileSync(readmePath, 'utf8');

  // Select 7 random quotes (mix of English and Indonesian)
  const selectedQuotes = getRandomQuotes(quotes, 7);
  const formattedLines = selectedQuotes.map(formatQuoteForUrl).join(';');

  const typingSvgUrl = `https://readme-typing-svg.demolab.com?font=Outfit&weight=600&size=22&duration=3500&pause=1000&color=A855F7&center=true&vCenter=true&width=600&lines=${formattedLines}`;

  const replacementText = `<!-- STARTS_HERE_TYPING_SVG -->
  <a href="https://git.io/typing-svg">
    <img src="${typingSvgUrl}" alt="Typing SVG" />
  </a>
<!-- ENDS_HERE_TYPING_SVG -->`;

  const regex = /<!--\s*STARTS_HERE_TYPING_SVG\s*-->[\s\S]*?<!--\s*ENDS_HERE_TYPING_SVG\s*-->/g;

  if (regex.test(readmeContent)) {
    readmeContent = readmeContent.replace(regex, replacementText);
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log("Successfully updated README.md with new random typing quotes.");
  } else {
    console.error("Could not find STARTS_HERE_TYPING_SVG placeholders in README.md");
    process.exit(1);
  }
}

updateReadme();
