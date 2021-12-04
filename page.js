function showPage(id) {
  const pages = Array.from(document.getElementsByClassName('page'));

  for (const page of pages) {
    console.log(page.id, id, page)
    page.classList.toggle('page-active', page.id === id);
  }
}
