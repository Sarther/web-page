
let dataTable;
let dataTableIsInitialized = false;
let selectedProduct = null; // Variable global para almacenar el registro seleccionado

const dataTableOptions = {
    dom: "Bfrtip", //Para usar botones
    buttons: [{

        extend: "pdf", //Nombre del botón
        text: "<i class='fa-solid fa-file-pdf'></i>", //Icono del botón
        titleAttr: "Exportar a pdf",//Titulo cuando pasan por encima
        className: "btn btn-danger",//Color del botón
    },
    {
        extend: "print", //Nombre del botón
        text: "<i class='fa-solid fa-print'></i>", //Icono del botón
        titleAttr: "Imprimir",//Titulo cuando pasan por encima
        className: "btn btn-secondary",//Color del botón

    },
    {
        extend: "copy", //Nombre del botón
        text: "<i class='fa-solid fa-copy'></i>", //Icono del botón
        titleAttr: "Copiar table",//Titulo cuando pasan por encima
        className: "btn btn-light",//Color del botón

    },
    {
        extend: "", //Nombre del botón
        text: "<i class='fa-solid fa-trash'></i>", //Icono del botón
        titleAttr: "Eliminar registros",//Titulo cuando pasan por encima
        className: "btn btn-dark",//Color del botón
        id: "dele-btn",
        action: function (e, dt, node, config) {
            triggerDeleteButton();
        }
    }

    ],
    scrollX: '2000px',
    lengthMenu: [5, 10, 15, 20],
    columnDefs: [
        { className: "centered", targets: [1, 3, 4, 5, 7, 8, 6] }, //Centrar datos de las columnas
        { orderable: false, targets: [0] }, //No permitir que se ordene esta columna
        // { searchable: false, targets: [0] },
        { width: "12%", targets: [2] }, //Ancho de columnas
        { width: "15%", targets: [6] }, //Ancho de columnas
        {
            targets: 0,
            checkboxes: { //Hacer los registros seleccionables
                selectRow: true
            },
        },
    ],
    pageLength: 5, // Datos a mostrar inicialmente
    destroy: true, //Destruir el DataTable para poder volver a generarla
    language: { //Idioma en español de los textos estandar
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Llenar",
            "fillHorizontal": "Llenar celdas horizontalmente",
            "fillVertical": "Llenar celdas verticalemente",
            "info": "Información"
        },
        "buttons": {
            "copy": "Copiar",
            "copySuccess": {
                "_": "Copiado con exito",
                "1": "Fila copiada con exito"
            },
            "copyTitle": "Tabla Copiada",
            "createState": "Crear estado",
            "pageLength": {
                "_": "ver %d filas",
                "-1": "Ver todas las Filas",
                "1": "Ver una fila"
            },
            "renameState": "Renombrar",
            "updateState": "Actualizar",
            "csv": "CSV",
            "excel": "Excel",
            "pdf": "PDF",
            "collection": "Colección",
            "colvis": "Visibilidad Columna",
            "colvisRestore": "Restaurar Visibilidad",
            "copyKeys": "Presione Inicio + C para copiar la información de la tabla.  Para Cancelar hacer click en este mensaje para o ESC",
            "print": "Imprimir",
            "removeAllStates": "Eliminar todos los estados",
            "removeState": "Eliminar",
            "savedStates": "Estados Guardados",
            "stateRestore": "Estado %d"
        },
        "datetime": {
            "months": {
                "0": "Enero",
                "1": "Febrero",
                "10": "Noviembre",
                "11": "Diciembre",
                "2": "Marzo",
                "3": "Abril",
                "4": "Mayo",
                "5": "Junio",
                "6": "Julio",
                "7": "Agosto",
                "8": "Septiembre",
                "9": "Octubre"
            },
            "weekdays": {
                "0": "Dom",
                "1": "Lun",
                "2": "Mar",
                "4": "Jue",
                "5": "Vie",
                "3": "Mié",
                "6": "Sáb"
            },
            "amPm": [
                "am",
                "pm"
            ],
            "previous": "Anterior",
            "next": "Siguiente",
            "hours": "Hora",
            "minutes": "Minuto",
            "seconds": "Segundo",
            "unknown": "Desconocido"
        },
        "editor": {
            "close": "Cerrar",
            "create": {
                "button": "Nuevo",
                "submit": "Crear",
                "title": "Crear nueva entrada"
            },
            "edit": {
                "button": "Editar",
                "submit": "Actualizar",
                "title": "Editar Registro"
            },
            "remove": {
                "button": "Borrar",
                "submit": "Borrar",
                "title": "Borrar",
                "confirm": {
                    "_": "Esta seguro de eliminar %d registros",
                    "1": "Esta seguro de eliminar 1 registro"
                }
            },
            "multi": {
                "info": "Los elementos seleccionados contienen diferentes valores para esta entrada. Para editar y configurar todos los elementos de esta entrada en el mismo valor, haga clic o toque aquí, de lo contrario, conservar sus valores individuales.",
                "noMulti": "Múltiples valores",
                "title": "Valores multiples",
                "restore": "Deshacer cambios"
            },
            "error": {
                "system": "Ha ocurrido un error del sistema ( Mas Información)"
            }
        },
        "emptyTable": "Tabla Vacia",
        "infoEmpty": "Sin informacion",
        "lengthMenu": "Entradas",
        "loadingRecords": "Cargando...",
        "searchBuilder": {
            "button": {
                "_": "Creador de búsquedas (%d)",
                "0": "Creador de búsquedas"
            },
            "clearAll": "Quitar filtro",
            "data": "Datos",
            "logicAnd": "Y",
            "logicOr": "O",
            "value": "Valor",
            "add": "Agragar condición",
            "condition": "Condición",
            "conditions": {
                "date": {
                    "after": "Después",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual",
                    "not": "No",
                    "notBetween": "No Entre",
                    "notEmpty": "No Vacío"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual",
                    "gt": "Mayor",
                    "gte": "Mayor o Igual",
                    "lt": "Menor",
                    "lte": "Menor o Igual",
                    "not": "No",
                    "notBetween": "No Entre",
                    "notEmpty": "No vacío"
                },
                "string": {
                    "contains": "Contine",
                    "empty": "Vacío",
                    "endsWith": "Termina en",
                    "equals": "Iguales",
                    "not": "No",
                    "notEmpty": "No Vacío",
                    "startsWith": "Empieza en",
                    "notContains": "No Contiene",
                    "notStartsWith": "No empieza en",
                    "notEndsWith": "No finaliza en"
                },
                "array": {
                    "equals": "Iguales",
                    "empty": "Vacío",
                    "contains": "Contiene",
                    "not": "No",
                    "notEmpty": "No Vacío",
                    "without": "Con"
                }
            },
            "deleteTitle": "Eliminar regla",
            "leftTitle": "Izquierda",
            "rightTitle": "Derecha",
            "title": {
                "0": "Generador de Consultas",
                "_": "Generador de Consultas (%d)"
            }
        },
        "searchPanes": {
            "clearMessage": "Borrar Filtro",
            "collapseMessage": "desplegar todo",
            "loadMessage": "Cargando informacion",
            "showMessage": "Mostrar todos",
            "title": "Filtros Activos - %d",
            "collapse": {
                "0": "Paneles de Búsqueda",
                "_": "Paneles de Búsqueda (%d)"
            },
            "count": "Cuenta",
            "countFiltered": "Cuenta Filtro",
            "emptyPanes": "No hay información"
        },
        "searchPlaceholder": "Busqueda en tabla",
        "select": {
            "cells": {
                "_": "%d celdas seleccionadas",
                "1": "1 celda seleccionada"
            },
            "columns": {
                "_": "%d columnas seleccionadas",
                "1": "1 columna seleccionada"
            },
            "rows": {
                "1": "Fila seleccionada",
                "_": "Filas Seleccionadas"
            }
        },
        "aria": {
            "sortAscending": "Activar para ordenar ascendente",
            "sortDescending": "Activar para ordenar descendente"
        },
        "decimal": ".",
        "infoFiltered": "filtrado de _MAX_ entradas totales",
        "infoThousands": ",",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "processing": "Procesando...",
        "search": "Buscar:",
        "thousands": ",",
        "zeroRecords": "No se encontro información",
        "stateRestore": {
            "creationModal": {
                "button": "Crear",
                "columns": {
                    "search": "Búsqueda columnas",
                    "visible": "Visibilidad de columa"
                },
                "name": "Nombre:",
                "order": "Ordenar",
                "paging": "Paginado",
                "scroller": "Posición desplazamiento",
                "search": "Buscar",
                "searchBuilder": "Generador de Consultas",
                "select": "Seleccionar",
                "title": "Crear Nuevo Estado",
                "toggleLabel": "Incluir:"
            },
            "duplicateError": "Ya existe un estado con este nombre",
            "emptyError": "El nombre no puede estar vacío",
            "emptyStates": "Estado sin Guardar",
            "removeConfirm": "Esta seguro de eliminar el estado %d?",
            "removeError": "Error al eliminar el estado",
            "removeJoiner": "y",
            "removeSubmit": "Eliminar",
            "removeTitle": "Eliminar Estado",
            "renameButton": "Eliminar",
            "renameLabel": "Nuevo nombre para %s",
            "renameTitle": "Renombrar Estado"
        },
        "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        "infoPostFix": ""
    }
}

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy(); //Si la tabla ya está creada, se destruye para poder volver a generar
    }
    await listProducts(); //Se muestran los datos

    dataTable = $("#datatable_products").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
};

const listProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products"); //Se recuperan los datos del JSON
        const products = await response.json();

        let content = ``;
        products.forEach((product) => { //Se recorren los datos para mapearlos
            content += `
            <tr>
                <td value='${product.id}'></td>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.descripcion}</td>
                <td>${product.category}</td>
                <td class="image-cell"><a price='${product.price}' text='${product.title}' href='${product.image}'><i class="fa-solid fa-image fa-flip-horizontal fa-2xl" style='color: black'></i></a></td>
                <td>${product.rating.rate}</td>
                <td>${product.rating.count}</td>
                </tr>
                `
        });

        $("#tableBody_products").html(content);// Se pasan los datos recorridos al contenedor de pantalla

    } catch (e) {
        alert(e);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();//Cada que se cargue la página, se destruye y se regenera
});

$(document).on('click', '.image-cell', function (e) {//Al dar click a la imagen
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace

    const imageUrl = $(this).find('a').attr('href');//Se obtiene el link de la imagen
    const imageTitle = $(this).find('a').attr('text');//Se obtiene el Titulo de la imagen
    const imagePrice = $(this).find('a').attr('price');//Se obtiene el precio de la imagen
    if (selectedProduct) {//A la imagen seleccionada:
        // Abrir una ventana con la imagen y su info
        Swal.fire({
            title: imageTitle,
            html: `<img src="${imageUrl}" style="max-width: 100%;">`,
            showCloseButton: true,
            showConfirmButton: false,//Ocultar botón de confirmar
            width: '25%',//Ancho de la ventana de la imagen
            allowOutsideClick: true,//Permitir salir del Sweet alert dando click fuera de la imagen
            footer: `<h2 style='color: black'>$${imagePrice}</h2>`,
        });

    } else {
        console.log('Ningún producto seleccionado.');
    }
});

// Registro seleccionado
$('#datatable_products tbody').on('click', 'tr', function () {
    const rowData = dataTable.row(this).data();
    selectedProduct = rowData; // Almacena la información de la Imagen seleccionada
});

const triggerDeleteButton = () => {
    //Si se hace click en botón Eliminar:
    Swal.fire({//Mostrar Sweet Alert con opción Aceptar y Rechazar
        title: "¿Desea proceder con la eliminación?",
        showDenyButton: true,
        confirmButtonText: "Aceptar",
        denyButtonText: `Rechazar`,
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            // Si el usuario hace clic en "Aceptar":
            // Obtener las filas seleccionadas
            //{ EN PROCESO DE DEV
            // const selectedRows = dataTable.rows({ selected: true });
            // Obtener los datos de las filas seleccionadas (en este caso, el ID)
            // const selectedData = selectedRows.data().toArray(); 
            // const selectedIds = selectedData.map(row => row.id);
            // console.log('Eliminar productos con IDs:', selectedIds);
            // if (selectedData.length > 0) {
                //     // Eliminar filas seleccionadas
                //     // selectedRows.remove().draw(); EN PROCESO DE DEV
                // } else {
                    //     console.log('Ningún producto seleccionado.');
                    // }
            //EN PROCESO DE DEV }
        }
    });


};
