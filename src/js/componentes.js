
import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias en el Html

const htmlTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
        <li class="${todo.completado ? 'completed' : '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : ''}>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    htmlTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

txtInput.addEventListener( 'keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ){

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
        
    }


});

htmlTodoList.addEventListener( 'click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ) {

        todoList.cambiarEstadoTodo(todoId);
        todoElemento.classList.toggle('completed');
        

    } else if( nombreElemento.includes('button') ) {

        todoList.eliminarTodo( todoId );
        htmlTodoList.removeChild( todoElemento );
        
    }

});

btnEliminarCompletados.addEventListener( 'click', (event) => {

    todoList.eliminarCompletados();

    for (let i = htmlTodoList.children.length - 1; i >= 0; i--) {

        const children = htmlTodoList.children[i];

        if( children.classList.contains('completed') ) {

            htmlTodoList.removeChild( children );
        }

    }

})

filtros.addEventListener( 'click', evento => {

    const filtro = evento.target.text;

    if( !filtro ) { return; }

    anchorFiltros.forEach( anchorFiltro => anchorFiltro.classList.remove('selected') );
    evento.target.classList.add('selected');

    for( const todoHtml of htmlTodoList.children){
        
        todoHtml.classList.remove('hidden');
        const completado = todoHtml.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':

                if( completado ) { todoHtml.classList.add('hidden'); }

            break;

            case 'Completados':

                if( !completado ) { todoHtml.classList.add('hidden'); }
    
            break;

        }

    }

});