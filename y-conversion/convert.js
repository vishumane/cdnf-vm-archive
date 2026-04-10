const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SOURCE_DIR = "./dl"; // current folder
const TARGET_DIR = "./x9KqP2Lm/7LmN8rT/zX91Qa"; // 🔐 hidden folder

// ✅ Create nested folders automatically
fs.mkdirSync(TARGET_DIR, { recursive: true });

const files = fs.readdirSync(SOURCE_DIR);

files.forEach(file => {
  if (file.endsWith(".pdf")) {
    
    const slug = file.replace(".pdf", "");

    // 🔐 generate pdfKey
    const pdfKey = crypto
      .createHash("md5")
      .update(slug)
      .digest("hex")
      .slice(0, 12);

    const oldPath = path.join(SOURCE_DIR, file);
    const newPath = path.join(TARGET_DIR, `${pdfKey}.pdf`);

    fs.copyFileSync(oldPath, newPath);

    console.log(`✅ ${file} → ${pdfKey}.pdf`);
  }
});

console.log("🚀 All files moved + renamed");