    /* Obteniendo elementos de HTML */
const taskInput = document.getElementById('newTask');
const taskButton = document.getElementById('addTask');
const task = document.getElementById('showTask');
const total = document.getElementById('total');
    /* Creando el arreglo de objetos */
let objTasks = [
    { id: 1, tarea: 'Terminar Desafío', complete: false},
    { id: 2, tarea: 'Estudiar APIs', complete: false },
    { id: 3, tarea: 'Hacer guia de ejercicios', complete: false }
];
    /* creacion de la variable que esta siempre escuchando el click en el boton agregar */
taskButton.addEventListener('click', () => {
        /* Validando el input, si no se ha escrito nada, me advierte con un alert */
    if (taskInput.value === "") {
        alert('No se ha ingresado una nueva tarea');
        return;
    }
        /* recorre el arreglo y al ultimo elemento le suma 1 al id */
    let counterId = objTasks[objTasks.length - 1].id + 1;
        /* agregando el elemento al arreglo */
    objTasks.push({ id: counterId, tarea: taskInput.value, complete: false });
        /* vaciando input */
    taskInput.value = "";
    showTask();
});
    /* funcion que muestra en el HTML cada elemento del arreglo */
const showTask = () => {
    let taskHtml = "";
    let showCount = 0;
        /* recorriendo cada elemento del arreglo y suma al contador la cantidad de tareas */
    for (let element of objTasks) {
        showCount++
            /* si la tarea esta chequeada le agrega la propiedad checked a la etiqueta input
               y le da el estilo a la etiqueta <p> */
        if(element.complete === true){
            isChecked = "checked"
            styleApply = "style='text-decoration: line-through;'"
        }else {
            isChecked = ""
            styleApply = ""
        } taskHtml +=   `<li>
                            <p ${styleApply} id="listP-${element.id}" class="${element.class}">${element.id}.- ${element.tarea}</p>
                            <div class="check">
                                <input type="checkbox" ${isChecked} data-taskid="${element.id}" id="verification-${element.id}" onclick="checkTask(event)">
                                <button class="close" onclick="deletTask(${element.id})">X</button>
                            </div>
                        </li>`
    }
        /* agregando al HTML la nueva lista y el contador */
    task.innerHTML = taskHtml;
    total.innerHTML = showCount;
}
    /* funcion que permite borrar una tarea a travez de un onclick agregado en la etiqueta <button> */
const deletTask = (tasksid) => {
        /* Pregunta antes de borrar la tarea de la lista */
    const confirm = window.confirm('¿Realmente desea borrar esta tarea?');
        /* si la respuesta es "cancelar", el codigo no se ejecuta gracias al return */
    if (!confirm) return;
        /* si la respuesta es aceptar, ingresa al arreglo de objetos
           verifica si la id corresponde a la id seleccionada y luego lo borra */
    const deletIndex = objTasks.findIndex(task => task.id === tasksid);
    const deleted = objTasks[deletIndex];
        /* en caso de estar chequeada la tarea y se borra se le resta 1 al contador de tareas */
    if(deleted.complete) {
        const checked = document.getElementById('checked');
        checked.innerHTML = parseInt(checked.innerHTML) - 1;
    }
        /* .splice borra el elemento seleccionado */
    objTasks.splice(deletIndex, 1);
    alert('Tarea borrada');
    showTask();
}
    /*  funcion que permite chequear las tareas a travez de un input checkbox */
const checkTask = (event) => {
        /* obtengo el valor del atributo data- al hacer click */
    const taskId = event.target.getAttribute('data-taskid');
    const index = objTasks.findIndex(task => task.id === parseInt(taskId));
    const task = objTasks[index];
    const taskElement = document.getElementById(`listP-${taskId}`);
        /* condicionando, si esta chequeado me cambia a true y agrega los estilos y suma 1 al contador 
            en caso contrario, quita el estilo y resta 1 al contador*/
    if (event.target.checked) {
        task.complete = true
        alert('Felicidades, completaste una tarea!!!')
        taskElement.style.textDecoration = 'line-through';
        const checked = document.getElementById('checked');
        checked.innerHTML = parseInt(checked.innerHTML) + 1;
    } else {
        task.complete = false
        taskElement.style.textDecoration = 'none';
        const checked = document.getElementById('checked');
        checked.innerHTML = parseInt(checked.innerHTML) - 1;
    }
};

showTask();