var elementsDom = {
    container : document.getElementById('container'),
    cards: function () { return document.querySelectorAll('.card-container')},
    postInList: document.querySelector('.posts-in-list') ,
    classCard: 'card-container',
    classBtnCard : 'btn-add'
}

var state = {
    CardsAdded : [],
    counterStates : {
        quantity : 0
    },
    buttonStates : {
        textAdded: 'add to list',
        textRemove: 'remove to list'
    }
}



function cardTemplate({id,title,description,isAdded,isFollowed,author,date,urlImage}){

    let cardContainer = document.createElement('div')

    function buttonCard(){
        let text = ''
        text = isAdded ? state.buttonStates.textRemove : state.buttonStates.textAdded  
        let button = `<button class = "btn-add btn btn-primary" data-id="${id} data-is-added="${isAdded}" >${text}</button>`
        return button
    }
    
    cardContainer.classList.add(elementsDom.classCard)
    cardContainer.dataset.id = id
    
    cardContainer.innerHTML = `
        <div class = "img-card">
            <img src = "${urlImage}"/>
        </div>
        <div class = "card-content">
            <h3 class = "mb-1">${title}</h3>
            <div class = "d-flex justify-content-between mb-1">
                <span>${author}</span>
                <span>${date}</span>
            </div>
            <p class = "mb-3">${description}</p>
            ${buttonCard()}
        </div>
        
    `

    return cardContainer

}

function changeStateCounter(callback) {
    callback()
}

function updateCounter(quantity) {
    elementsDom.postInList.innerHTML = quantity.toString()
}

function addCardToList({id}){

    changeStateCounter( () => {
        state.counterStates.quantity++
        updateCounter(state.counterStates.quantity)
    })
    

    state.CardsAdded.push(id)
}

function removeToList({id}){

    changeStateCounter(() => {
        state.counterStates.quantity--
        updateCounter(state.counterStates.quantity)
    })

    let index = state.CardsAdded.indexOf(id)
    state.CardsAdded.splice(index,1)
    console.log(state.CardsAdded)
}

function getCards(){
    return data;
}

function updateCard(idCard){

    function findCard() {
        let id = idCard.toString()
        let cards = elementsDom.cards()
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].dataset.id === id) {
                return cards[i]
            }
        }
    }

    function changeTextButton(card){
        let button = card.querySelector('.' + elementsDom.classBtnCard)
        if (button.innerText === state.buttonStates.textAdded){
            button.innerText = state.buttonStates.textRemove;
        }else{
            button.innerText = state.buttonStates.textAdded;
        }
    }

    let card = findCard()

    if (card) changeTextButton(card) 

}

function renderCards(data){

    data.forEach((card,index) => {
        let template = cardTemplate(card)

        template.querySelector('.' + elementsDom.classBtnCard ).addEventListener('click',(event)=>{
            card.isAdded ? removeToList(card) : addCardToList(card)
            card.isAdded = !card.isAdded 
            updateCard(card.id)
            event.preventDefault()
        })

        elementsDom.container.append(template)
        
    })

}

function app(){
    renderCards(getCards())
}
app()