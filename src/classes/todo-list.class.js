
import { Todo } from "./todo.class";

export class TodoList {

    constructor(){

        this.cargarLocalStorage();

    }

    nuevoTodo( todo ){

        this.todos.push(todo);
        this.guardarLocalStorage(this.todos);
    }

    eliminarTodo( id ){

        this.todos = this.todos.filter( element => element.id != id);
        this.guardarLocalStorage(this.todos);

    }

    cambiarEstadoTodo( id ){

        this.todos.forEach( element => {
            
            if(element.id == id) {

                element.completado = !element.completado; 

            }
        });

        
        this.guardarLocalStorage(this.todos);

    }

    eliminarCompletados(){

        this.todos = this.todos.filter( element => !element.completado );
        this.guardarLocalStorage(this.todos);

    }

    guardarLocalStorage(){

        localStorage.setItem("todos", JSON.stringify(this.todos));

    }

    cargarLocalStorage(){

        (localStorage.getItem("todos")) 
    
        ? this.todos = JSON.parse(localStorage.getItem("todos"))
        : this.todos = [];

        this.todos = this.todos.map( Todo.fromJSON );

    }
    
}