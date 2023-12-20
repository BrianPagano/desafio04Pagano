const socket = io();

socket.on('connect', () => {
    console.log('Conexión exitosa al servidor de socket.io');
});

// Escucho el evento 'newProduct' para manejar el agregado de un nuevo product
socket.on('newProduct', function(product) {
    // Aquí debes actualizar la vista con el nuevo producto
    updateViewWithNewProduct(product);
});

function updateViewWithNewProduct(product) {
    const productsContainer = document.getElementById('contenedorProducto');

    // Crea un nuevo elemento div para representar el nuevo producto
    const productCard = document.createElement('div');
    productCard.classList.add('card');

    // Aquí debes agregar la estructura de tu tarjeta de producto utilizando los datos del nuevo producto
    productCard.innerHTML = `
        <picture>
            <img src="/img/${product.data.thumbnail}" class="card-img-top" alt=${product.data.title}/>
        </picture>
        <div class="card-body">
            <h3 class="card-title">${product.data.title}</h3>
            <p>COD: ${product.data.code}</p>
            <p class='precioYCant'> 
                Precio: $${product.data.price} Cantidad: ${product.data.stock}
            </p>
        </div>
        <button to="/item/${product.data.id}" class="btn btn2">
            Ver detalle
        </button>
    `;

    // Agrega el nuevo elemento a tu contenedor de productos
    productsContainer.appendChild(productCard);
}