const contenedorUl = document.getElementById('navbarSupportedContent');
const lista = document.getElementById('lista');
const hamb = document.getElementById('hamb');
const btn = document.getElementById('submit');
const form = document.getElementById('form');
const nombre = document.querySelector('.nombreCompleto');
const email = document.querySelector('.email');
const telefono = document.querySelector('.telefono');
const comentarios = document.querySelector('.textArea');

const modificarMenu = () => {
  const uno = document.getElementById('barraUno');
  const dos = document.getElementById('barraDos');
  const tres = document.getElementById('barraTres');

  if (dos.style.opacity !== '0') {
    uno.style.transform = 'translateY(10px) rotate(45deg)';
    uno.style.transition = 'all 0.2s ease-in-out';
    tres.style.transform = 'translateY(-10px) rotate(135deg)';
    tres.style.transition = 'all 0.2s ease-in-out';
    dos.style.opacity = '0';
    dos.style.transition = 'all 0.2s ease-in-out';
  } else {
    uno.style.transform = 'translateY(0px) rotate(0deg)';
    tres.style.transform = 'translateY(0px) rotate(0deg)';
    dos.style.opacity = '1';
    dos.style.transition = 'all 0.2s ease-in-out';
    tres.style.transition = 'all 0.2s ease-in-out';
    uno.style.transition = 'all 0.2s ease-in-out';
  }
};

(function () {
  emailjs.init('user_hCqWm2f1dBjU8MxczFLo6');
})();

const sendEmail = (e) => {
  e.preventDefault();
  validarCampos();
};

const enviarForm = (nombre, email, telefono, comentarios) => {
  emailjs.send('service_h04lqaq', 'template_lftvgwp', {
    nombre: nombre,
    email: email,
    telefono: telefono,
    comentarios: comentarios,
  });
};

const validarCampos = () => {
  if (
    nombre.value === '' ||
    email.value === '' ||
    comentarios.value === '' ||
    telefono.value === ''
  ) {
    completarCampos();
  } else {
    enviarForm(nombre.value, email.value, telefono.value, comentarios.value);
    exito();
    form.reset();
  }
};

const completarCampos = () => {
  swal({
    text: 'Todos los campos son requeridos',
    icon: 'warning',
    button: 'Cerrar',
  });
};

const exito = () => {
  swal({
    text: 'Formulario enviado con éxito!',
    icon: 'success',
    button: 'Cerrar',
  });
};

const start = () => {
  btn.addEventListener('click', sendEmail);
  hamb.addEventListener('click', modificarMenu);
};

window.onload = start;
// Array de productos
const productos = {
  producto1: {
    nombre: 'Papas fritas',
    precio: '3.50',
    descripcion: 'Papas frescas preparadas en el momento, caseras, seleccionadas exclusivamente para tener una buena calidad y con un sabor inigualable.',
    srcImg: 'https://i.blogs.es/f9cf25/degustacion-patatas/450_1000.jpg'
  },
  producto2: {
    nombre: 'Hamburguesa',
    precio: '10.00',
    descripcion: 'La mejor Hamburguesa del mercado, con productos finamente seleccionados, una presentación única y el mejor sabor.',
    srcImg: 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg'
  },
  producto3: {
    nombre: 'Pizza',
    precio: '15.50',
    descripcion: 'Masa preparada en el local, fermentada el tiempo suficiente para que de una mordida puedas sentir una sensación única de sabor y textura.',
    srcImg: 'https://elgourmet.s3.amazonaws.com/recetas/share/pizza_Mh3H4eanyBKEsStv1YclPWTf9OUqIi.png'
  },
  producto4: {
    nombre: 'Completo',
    precio: '8.50',
    descripcion: 'Estos son los mejores completos de la ciudad, hechos con el mejor pan y ingredientes finamente seleccionados.',
    srcImg: 'https://i2.wp.com/golososdelmundo.com/wp-content/uploads/2018/08/completo-italiano3.jpg?fit=1024%2C683'
  },
  producto5: {
    nombre: 'Taco',
    precio: '15.00',
    descripcion: 'El mejor taco del mercado, como si lo preparara uno de los mejores taqueros de México.',
    srcImg: 'https://imasacr.com/wp-content/uploads/2018/05/aussie-style-beef-and-salad-tacos-86525-1.jpeg'
  }
}
// Se captura el template de los productos
const templateProd = document.getElementById('template-prod').content
const contenedorProd = document.querySelector('.contenedor-productos')
const fragment = document.createDocumentFragment()


// TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
Object.values(productos).forEach( producto => {
  templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
  templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
  templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
  templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
  templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
  const clone = templateProd.cloneNode(true)
  fragment.appendChild(clone)
})
contenedorProd.appendChild(fragment)

// TODO LO RELACIONADO AL CARRITO DE COMPRA
let carrito = {}
const templateTabla = document.getElementById('agregar-producto-al-carro').content
const tbodyCarrito = document.getElementById('carrito-body')
const fragmentTabla = document.createDocumentFragment()
const templateFoot = document.getElementById('tfooter').content
const tfootCarrito = document.getElementById('footer')

contenedorProd.addEventListener('click', e => {
  
  if(e.target.textContent === "Agregar") {
    setCarrito(e.target.parentElement.parentElement)
  }
  e.stopPropagation();
})
const setCarrito = e => {
  const pivoteCarrito = {
    nombre: e.querySelector('.div-info .nombre-prod').textContent,
    precio: e.querySelector('.div-precio-boton .precio').textContent,
    cantidad: 1
  }
  if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
    carrito[pivoteCarrito.nombre].cantidad += 1
  } else {
    carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
  }
  pintarTabla(carrito)
}

const pintarTabla = objetoCarrito => {
  Object.values(objetoCarrito).forEach( objeto => {
    const cloneTabla = templateTabla.cloneNode(true)
    cloneTabla.getElementById('producto').textContent = objeto.nombre
    cloneTabla.getElementById('cant').textContent = objeto.cantidad
    cloneTabla.getElementById('precio-uni').textContent = objeto.precio
    let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
    cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
    fragmentTabla.appendChild(cloneTabla)
  })
  tbodyCarrito.innerHTML = ''
  tbodyCarrito.appendChild(fragmentTabla)
  pintarFooter()
}
const pintarFooter = () => {
  tfootCarrito.innerHTML = ''
  if(Object.keys(carrito).length === 0) {
    tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
  } else {
    const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
    templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
    const cloneFoot = templateFoot.cloneNode(true)
    fragment.appendChild(cloneFoot)
    tfootCarrito.appendChild(fragment)
    //Boton Vaciar carrito
    const botonVaciar = document.getElementById('vaciar-tabla')
botonVaciar.addEventListener('click', () => {
      carrito = {}
      pintarTabla(carrito)
      pintarFooter()
    })
    
    //Botones aumentar y disminuir cantidades
    
  }
}
tbodyCarrito.addEventListener('click', e => {
  
  if(e.target.classList.contains('button')) {
    aumentarDisminuir(e.target)
  }
})
const aumentarDisminuir = boton => {
  if(boton.textContent === '+'){
    const indicador = boton.parentElement.parentElement.firstElementChild.textContent
    Object.values(carrito).forEach( elemento => {
      if(elemento.nombre === indicador) {
      carrito[elemento.nombre].cantidad++  
      }
    })
  }
  if(boton.textContent === '-') {
    const indicador = boton.parentElement.parentElement.firstElementChild.textContent
    Object.values(carrito).forEach( elemento => {
      if(elemento.nombre === indicador) {
      carrito[elemento.nombre].cantidad--
        if(carrito[elemento.nombre].cantidad === 0) {
          delete carrito[elemento.nombre]
        }
      }
    })
  }
  pintarTabla(carrito)
  pintarFooter()
}

