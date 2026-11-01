const params = new URLSearchParams(location.search);
const article = articles.find(item => item.id === params.get("id"));
if (!article) {
  document.getElementById("storyTitle").textContent = "Story not found";
  document.getElementById("storyBody").textContent = "This article may have moved. Head back to the homepage to explore other stories.";
} else {
  document.title = `${article.title} — PixelNest`;
  document.getElementById("storyCategory").textContent = article.category.toUpperCase();
  document.getElementById("storyTitle").textContent = article.title;
  document.getElementById("storyMeta").textContent = `${article.date}  ·  ${article.readTime}`;
  document.getElementById("storyBody").textContent = article.body;
  if (article.image) {
    const img = document.createElement("img");
    img.src = article.image; img.alt = ""; img.style.cssText = "width:100%;max-height:430px;object-fit:cover";
    document.getElementById("storyImage").appendChild(img);
  }
}