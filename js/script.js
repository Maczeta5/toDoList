let todoInput //miejsce, gdzie użytkownik wpisuje treść zadania
let errorInfo //info o braku zadań / konieczności wpisania zadań
let addBtn //przycisk ADD - dodaje nowe elementy do listy
let ulList //lista zadań, tagi UL
let newTodo

let popup //popup
let popupInfo //tekst w popupie, jak się doda pusty teskt
let todoToEdit // edytowany Todo
let popupInput //input w popupie
let popupAddBtn //przycisk 'zatwierdź' w popupie
let popupCloseBtn //przycisk 'anuluj w popupie

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	editBtn = document.querySelector('.edit')
	ulList = document.querySelector('.todolist ul')
	btnComplete = document.querySelector('.complete')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
} //funkcj, w której będziemy pobierać wszystkie elementy

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
} //funkcja, w której nadamy nasłuchowanie na elementy

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		createToolsArea()

		ulList.append(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Musisz wpisać jakieś zadanie!'
	}
}

const createToolsArea = () => {
	const toolArea = document.createElement('div')
	toolArea.classList.add('tools')
	newTodo.append(toolArea)

	const btnComplete = document.createElement('button')
	btnComplete.classList.add('complete')
	btnComplete.innerHTML = '<i class="fas fa-check"></i>'

	const btnEdit = document.createElement('button')
	btnEdit.classList.add('edit')
	btnEdit.textContent = 'EDIT'

	const btnDelete = document.createElement('button')
	btnDelete.classList.add('delete')
	btnDelete.innerHTML = '<i class="fas fa-times"></i>'

	toolArea.append(btnComplete, btnEdit, btnDelete)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
	}
}

const editTodo = e => {
	popup.style.display = 'flex'
	todoToEdit = e.target.closest('li')
	popupInput.value = todoToEdit.firstChild.textContent
}

const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz wprowadzić treść zadania!'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()
	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length == 0) {
		errorInfo.textContent = 'Brak zadań na liście...'
	}
}

const enterKeyCheck = (e) => {
if(e.key === 'Enter') {
	addNewTodo()
}	

}



document.addEventListener('DOMContentLoaded', main) //funkcja main uruchomi się dopiero kiedy na naszej stronie wczytaja się wszystkie elementy
