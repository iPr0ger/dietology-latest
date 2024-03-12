if (document.querySelector('.location-select-head')) {
    document.querySelectorAll('.location-select-head').forEach(el=>{
        el.addEventListener('click', (event)=>{
            event.currentTarget.parentElement.classList.toggle('active')
        })
    })
    document.querySelectorAll('.location-select-dropdown__item').forEach((item)=>{
        item.addEventListener('click', (event)=>{
            document.querySelectorAll('.location-select').forEach(select=>{
                select.classList.remove('active')
                select.querySelector('.location').innerHTML = event.currentTarget.innerHTML
            })
        })
    })
}
if (document.querySelector('.primary-select-head')) {
    document.querySelectorAll('.primary-select-head').forEach(el=>{
        let select = el.closest('.primary-select')
        el.addEventListener('click', (event)=>{
            event.currentTarget.parentElement.classList.toggle('active')
        })
        if (el.classList.contains('js-return')) {return}
        select.querySelectorAll('.primary-select-dropdown__item').forEach((item)=>{
            item.addEventListener('click', (event)=>{
                select.classList.remove('active')
                select.querySelector('.primary-select-head__value').innerHTML = event.currentTarget.innerHTML
            })
        })
    })

}

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
if (document.querySelector('.profile-menu-list.js-containers')) {
    let elements = Array.from(document.querySelector('.profile-menu-list').children)
    let tabs = document.querySelectorAll('.profile-container')
    elements.forEach(el=>{
        el.addEventListener('click', (event)=>{
            if (!event.currentTarget.classList.contains('active')) {
                event.currentTarget.parentElement.querySelector('.active').classList.remove('active')
                event.currentTarget.classList.add('active')
                if (document.querySelector('.profile-container.d-flex')) {
                    let active = document.querySelector('.profile-container.d-flex')
                    active.classList.remove('d-flex')
                    active.classList.add('d-none')
                }
                tabs[+event.currentTarget.dataset.container].classList.add('d-flex')
                tabs[+event.currentTarget.dataset.container].classList.remove('d-none')
            }

        })
    })
}

if (document.querySelector('.js-open-modal')) {
    document.querySelectorAll('.js-open-modal').forEach(el=>{
        el.addEventListener('click', (event)=>{
            document.getElementById(event.currentTarget.dataset.modal).classList.add('active')
            document.body.classList.add('no-scroll')
        })
    })
    document.querySelectorAll('.js-close-modal').forEach(el=>{
        el.addEventListener('click', (event)=>{
            event.currentTarget.closest('.modal-wrapper').classList.remove('active')
            document.body.classList.remove('no-scroll')
        })
    })
    document.querySelectorAll('.modal-wrapper').forEach(el=>{
        el.addEventListener('mousedown', (event)=>{
            if (event.target.classList.contains('modal-wrapper')) {
                event.currentTarget.classList.remove('active')
                document.body.classList.remove('no-scroll')
            }
        })
    })
}
if (document.querySelector('.favorite-button')) {
    document.querySelectorAll('.favorite-button').forEach(el=>{
        el.addEventListener('click', (event)=>{
            event.currentTarget.classList.toggle('active')
        })
    })
}
if (document.querySelector('.burger-button')) {
    document.querySelector('.burger-open').addEventListener('click', ()=>{
        document.querySelector('.burger-menu').classList.add('active')
        document.body.classList.add('no-scroll')
    })
    document.querySelector('.burger-close').addEventListener('click', ()=>{
        document.querySelector('.burger-menu').classList.remove('active')
        document.body.classList.add('remove')
    })
}
if (document.querySelector('.burger-select')) {
    document.querySelector('.burger-select').addEventListener('click', (event)=>{
        event.currentTarget.classList.toggle('active')
        if (event.currentTarget.classList.contains('active')) {
            event.currentTarget.lastElementChild.classList.add('d-flex')
            event.currentTarget.lastElementChild.classList.remove('d-none')
        } else {
            event.currentTarget.lastElementChild.classList.add('d-none')
            event.currentTarget.lastElementChild.classList.remove('d-flex')
        }
    })
    document.querySelectorAll('.drop-item').forEach(el=>{
        let tabs = document.querySelectorAll('.profile-tabs .profile-container')

        el.addEventListener('click', (event)=>{
            document.querySelector('.burger-menu').classList.remove('active')
            document.body.classList.remove('no-scroll')
            if (document.querySelector('.profile-container.d-flex')) {
                let active = document.querySelector('.profile-container.d-flex')
                active.classList.remove('d-flex')
                active.classList.add('d-none')
            }
            tabs[+event.currentTarget.dataset.container].classList.add('d-flex')
            tabs[+event.currentTarget.dataset.container].classList.remove('d-none')
        })
    })
}
function nextStep(el) {
    let block = el.closest('.container')
    block.classList.remove('d-flex')
    block.classList.add('d-none')
    block.nextElementSibling.classList.add('d-flex')
    block.nextElementSibling.classList.remove('d-none')
}
function prevStep(el) {
    let block = el.closest('.container')
    block.classList.remove('d-flex')
    block.classList.add('d-none')
    block.previousElementSibling.classList.add('d-flex')
    block.previousElementSibling.classList.remove('d-none')
}


