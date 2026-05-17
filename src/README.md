[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&pause=1000&color=C8A96A&width=490&height=80&lines=Selecta+Store+Ecommers;Proyecto+creado+con+React+js+;%2B+Vite)](https://git.io/typing-svg)

# Proyecto de eCommerce  (React-Vite)

## Descripción del Proyecto

Proyecto desarrollado con **React, Vite, Material UI y TailwindCSS** para un **eCommerce** que simula una tienda en línea con funcionalidades de autenticación, carrito de compras, CRUD de productos, búsqueda y optimización para despliegue.

![alt text](<Studio-Display-720x668.png>)

## Características Principales

- **Catálogo de productos**: Visualización de una variedad de productos  con detalles como nombre, precio e imagen y categoria.
- **Búsqueda y filtros**: Los usuarios pueden buscar productos por categorías.
- **Carrito de compras interactivo**: Agregar productos al carrito, actualizar el total en tiempo real, y mantener los datos del carrito utilizando **localStorage** para que persistan entre sesiones.
- **Sistema de navegación**: Cambio dinámico en el menú de navegación para mostrar el perfil del usuario si está logueado.
- **Responsividad**: Diseño adaptable a diferentes dispositivos (móviles, tablets y escritorio) .
  
![alt text](<iPad-mini-468x926.png>)

![alt text](<Pro-Display-XDR-1504x846.png>)

## 🚀 Tecnologías Utilizadas

React

Vite

TailwindCSS

Material UI

React Router DOM

React Icons

## Estructura del Proyecto

![alt text](<Captura de pantalla (9).png>)

1. **Imágenes**: Ubicadas en la carpeta `public`, todas las imágenes de productos y diseño se cargan desde aquí.

## Próximas Mejoras

- **Agregar más filtros**: Implementar más opciones de filtros avanzados, como estilos y temporadas.
  
- **Integración con API**: Conectar con FIREBASE para obtener productos y usuarios de manera dinámica.

- **Mejoras en la accesibilidad**: Asegurar que el sitio sea completamente accesible para usuarios con discapacidades visuales y motrices.

## Requerimientos Pre-Entrega

### Requerimiento #1: Estructura y Layout

-El proyecto debe tener una estructura de carpetas organizada

-Debe contar con un componente Layout.jsx que contenga un Header.jsx , un nav y un Footer.jsx, con una apariencia consistente y funcional

-El footer tiene que tener información de la empresa y las tarjetas de al menos 3 personas.

## Requerimiento #2: Catálogo de productos con datos de una API

-La aplicación debe tener un componente como ItemListContainer.jsx (o una página que cumpla esa función) que cargue la información de productos desde un archivo productos.json local usando useEffect y fetch.

-Los productos deben renderizarse utilizando un componente reutilizable Item.jsx, que reciba los datos por props.

## Requerimiento #3: Sistema de ruteo

-La navegación debe ser gestionada por react-router-dom.

Deben existir, como mínimo, las siguientes rutas:

/: Vista principal o de bienvenida.

/productos:

/producto/:id: Vista de detalle de un único producto

/carrito: Vista del carrito de compras.

-El NavBar debe utilizar el componente `Link` de React Router DOM para una navegación fluida sin recargas de página.

## Requerimiento #4: Funcionalidad del carrito con Context API

-Debe existir un componente que gestione el estado global del carrito

-Desde la vista de detalle el usuario debe poder agregar productos al carrito. Esta acción debe llamar a la función addToCart del contexto.

-El NavBar debe mostrar un ícono de carrito con un indicador numérico (CartWidget) que muestre la cantidad total de productos en el carrito. Este número debe obtenerse del CartContext y actualizarse en tiempo real.

-La ruta /carrito debe mostrar el detalle de los productos agregados, consumiendo la información directamente del CartContext.

## Requerimiento #5: Alojamiento online

-La página debe estar subida a Netlify o Vercel y compartir la url, junto con el link al repositorio de GitHub.

## Contribuciones

Este proyecto está abierto a contribuciones. Si deseas colaborar, crea un **pull request** o abre un **issue** con sugerencias.

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.

## Instalación y uso

bash
Copiar
Editar

# Clonar el repositorio

git clone https://github.com/MLauraSal/Selecta-Store

# Instalar dependencias

npm install

# Ejecutar en desarrollo

npm run dev
📦 Despliegue
