if (document.querySelector('.js-swap-active')) {
  document.querySelectorAll('.js-swap-active').forEach(container=>{
    let elements = Array.from(container.children)
    elements.forEach(item=>{
      item.addEventListener('click', (event)=>{
        if (!event.currentTarget.classList.contains('active')) {
          event.currentTarget.parentElement.querySelector('.active').classList.remove('active')
          event.currentTarget.classList.add('active')
        }
      })
    })
  })
}
if (document.querySelector('.js-swap-table')) {
  let elements = Array.from(document.querySelector('.js-swap-table').children)
  let tabs = Array.from(document.querySelector('.tables-tabs').children)
  elements.forEach(item=>{
    item.addEventListener('click', (event)=>{
      if (!event.currentTarget.classList.contains('active')) {
        event.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        event.currentTarget.classList.add('active')
        if (document.querySelector('.tables-tabs .active-table')) {
          document.querySelector('.tables-tabs .active-table').classList.remove('active-table')
        }
        tabs[+event.currentTarget.dataset.table].classList.add('active-table')
      }
    })
  })
}
