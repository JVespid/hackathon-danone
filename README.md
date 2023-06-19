# Background del proyecto

Este proyecto es una web que ayuda al usuario dándole la informaron calórica de los productos Danone y asi el usuario pueda medir su consumo mas fácilmente.

Esta pagina se planeo desde un inicio para tener 5 paginas distintas.

1. **Inicio**: esta pagina contiene información general he incentiva al usuario a explorar por la web
1. **Productos**: esta pagina contiene una lista de todos los productos de Danone, junto con sus categorías y distintas marcas
1. **Diario**: esta pagina tendría acceso a un chat Bot que le ayudaría al usuario a llevar un registro de sus calorías diarias, el usuario ingresarías sus datos y el chat bot le diaria recomendaciones de los productos a consumir
1. **Contacto**: esta pagina contiene información de contacto de la empresa junto con información relevante de la empresa
1. **Perfil**: esta pagina contiene información del usuario que el chat bot recopila dal usuario como su nombre, edad, peso, altura, etc. También contiene información de sus preferencias de productos y su limite de calorías diarias y etc, en general la información relevante para el usuario y asi pueda tener un mejor control de su consumo calórico.Esta pagina tiene 2 subPaginas que sin las de **inicio de sesión** y **registro**

En términos generales la pagina web esta siendo impulsada con IA y yna gran base de datos de productos de Danone, para que el usuario pueda tener un mejor control de su consumo calórico y asi poder llevar una vida mas saludable junto a **Danone**.

Para el planteamiento general de la solución se decidió que el contenido de la web (textos e imágenes) estén alojados en al **servicio web de CMS de Contentful**, al igual que la información de los productos este alojada en una **base de datos de Supabase**, en un inicio se planteo usar un chat bot de internet pero al final por las limitantes se opto por usar el chat bot de **Open IA "Chat GPT-3"** y asi poder tener un chat bot mas avanzado que entienda al usuario.

La web esta construida en base a un **Contexto** lo que permite que cada componente sea independiente de los demás y asi poder reutilizarlos, eliminarlos o agregarlos sin afectar a los demás componentes, esto hace que la web sea **fácilmente editable y escalable** a pesar de tener un diseño cuestionable el cual es un problema que se puede **solucionar fácilmente** por su misma escalabilidad .

# Quien Soy

Bernardo Abel Lopez Sanchez

Soy Programador Web FullStack

No soy bueno diseñando, no es mi punto fuerte, soy bueno implementando y diseñando componentes apartir de un diseño pre existente, use como base el diseño que se nos proporciono en el **Figma** [ { Link } ](https://www.figma.com/file/XS37B2tVPmXQfKUnDfF3Qk/Danone-Hackathon-Mexico?type=design&node-id=0-1&t=0n2wFBBCoYls7aNg-0) he hice mi mejor esfuerzo para esto

En este proyecto no cree como tal un BackEnd ya que no se me hizo necesario, pero si cree un **Contexto** que me permite tener un mejor control de los datos y asi poder reutilizarlos en los distintos componentes de la web, también cree **funciones** que me permiten hacer peticiones a la base de datos de Supabase y asi poder obtener los datos de los productos y asi poder mostrarlos en la web y también use el LocalStorage para poder guardar información y asi evitar uso desmesurado de los servicios en linea que en la mayoría de veces es un gasto considerable.

# Usage

La web tiene un uso facil de entender y que los contenidos que tiene estan bien divididos en sus respectivas secciones y asi el usuario pueda encontrar lo que busca facilmente.

Para poder usar la web solo se tiene que entrar al siguiente [{ Link }](https://hackathon-danone-48660fm5n-jvespid.vercel.app/) donde se encuentra el proyecto **publicado en la nube de Vercel**:

# Instalación

El proyecto se encuentra en el siguiente lin de [{ GitHub }](https://github.com/JVespid/hackathon-danone.git)

El proyecto esta realizado con node asi que se requiere tenerlo descargado en la maquina local para poder instalar las dependencias. Link de descarga de [{ Node }](https://nodejs.org/es/download/)

Para poder instalar el proyecto se tiene que clonar el repositorio en la maquina local y luego instalar las dependencias con los siguientes comandos:

```bash
git clone https://github.com/JVespid/hackathon-danone.git .
npm install

```

Para hacer uso correcto del proyecto toma en cuanta que se usan las siguientes dependencias y para darle un buen uso al mismo hay que tener conocimientos mínimos de las mismas:

```json
{
  "@supabase/supabase-js": "^2.25.0",
  "axios": "^1.4.0",
  "contentful": "^10.2.4",
  "file-saver": "^2.0.5",
  "framer-motion": "^10.12.16",
  "jsonwebtoken": "^9.0.0",
  "next": "13.4.6",
  "openai": "^3.3.0",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "sass": "^1.63.4",
  "uuid": "^9.0.0"
}
```

una vez instaladas las dependencias hay que agregar las variables de entorno en un archivo **.env.local** en la raíz del proyecto, recuerda que necesitas

- Una base de datos de supabase base con 4 tablas y cada una regrese una respuesta en formato json (los id no pueden ser 0):

  - **categories**

  ```json
  {
    "id": 1,
    "name": "",
    "whatIs": "",
    "description": ""
  }
  ```

  - **marks**

  ```json
    {
        "id": 3,
        "category_id":1,// llave foránea a las categories
        "name": "",
        "description": "",
        "banner": ""
    },
  ```

  - **products**

  ```json
  {
    "id": 1,
    "name": "",
    "categori_id": 1, // llave foránea a las categories
    "mark-id": 1, // llave foránea a las marks
    "created_at": "",
    "picture": "", // link a la imagen de la marca
    "Contenido Energético por porción en kcal": 1,
    "Contenido Energético por envase en kcal": 1
  }
  ```

  - **users**

  ```json
  {
    "id": 1,
    "created_at": "",
    "name": "",
    "user": "",
    "email": "",
    "password": "",
    "token": "",
    "data": {}
  }
  ```

- una cuenta de contentful que tenga un modelo con id **homeNavbar** y ese modelo tenga uno typo que sea **Json** con el siguiente contenido:

  ```json
  [
    {
      "title": "Inicio",
      "src": "/",
      "icon": "",
      "extras": []
    },
    {
      "title": "Productos",
      "src": "/products",
      "icon": "arrow-bottom",
      "extras": [
        {
          "title": "DANONE ESSENTIAL DAIRY",
          "src": "/products?type=0"
        },
        {
          "title": "Bonafont",
          "src": "/products?type=1"
        },
        {
          "title": "Silk",
          "src": "/products?type=2"
        }
      ]
    },
    {
      "title": "Diario",
      "src": "/calc",
      "icon": "",
      "extras": []
    },
    {
      "title": "Contacto",
      "src": "/contact",
      "icon": "",
      "extras": []
    }
  ]
  ```

Una vez se tengas esos servicios configurados se necesita las variables de entorno recuerda que estas van en el archivo **.env.local** en la raíz del proyecto:

```env
NEXT_PUBLIC_ACCESS_TOKEN=example
NEXT_PUBLIC_SPACE_ID=example
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=example
NEXT_PUBLIC_OPENIA_API_KEY=example
```

Una vez configurado todo solo queda abrir la terminal en la raíz del proyecto y escribir el siguiente comando en la terminal y el proyecto se ejecutara en el [{ Local Host 3000 }](http://localhost:3000/):

```bash
npm run dev
```

# Stack utilizado

Este proyecto esta realizado con las siguientes tecnologías:

- **Next.js** como framework de React
- **React** como librería de JavaScript
- **Sass** como preprocesador de CSS
- **Supabase** como base de datos
- **Contentful** como CMS
- **OpenAI** como IA para la generación de textos

Se decidió usar este Stack por su flujo de trabajo y su fácil despliegue en la nube de **Vercel**, ademas de que es un stack que se puede usar para proyectos de cualquier tamaño y que se puede escalar fácilmente.

# Toma de decisiones

Primero lei las especificaciones del proyecto y decidí hacer este proyecto ya que cumplía las características, el problema fue el tiempo en si asi que decidí enfocarme en los siguientes puntos:

- fácil de escalar
- fácil de mantener
- fácil de implementar
- fácil de usar
- fácil de entender
- interfaz entendible
- funcional
- que cumpla con la mayor parte de requerimientos

Comencé a aprender la tecnología de CMS con **Contentful** ya que nunca antes había usado una, esto me llevo un poco de tiempo ya que era mi primera vez , el **problema** con el que me encontré fueron limitaciones de la version gratuita y este problema hizo que solo pusiera los datos de la barra de navegación allí y no la de las demás paginas, ya que no me alcanzaba el tiempo para hacerlo, pero si se puede hacer, solo es cuestión de tiempo, la web esta maquetada de tal forma que solo se tienen que remplazar un array ya creado en la web con la información por la respuesta del CMS.

Luego de haber estudiado el CMS me puse a crear la base de datos en **Supabase**. El **problema** que tuve fue que esto me llevo mucho tiempo ya que la información de los productos con sus respectivas informaciones nutrimental no se encontraban fácilmente, una vez que encontré la información que necesitaba tube que ingresarlas una por una a la base de datos, esto me ayudo a reforzar mi conocimiento en maquetación de bases de datos para poder manejar los datos tal y como los necesitaba.

Luego de terminar el modelado de la base de datos comencé a analizar el diseño y a crear el sistema que se auto gestiona con el **contexto de React** y asi poder tener los componentes independientes de los unos de los otros y que se puedan usar en cualquier parte de la web asi las funcionalidades se integran mas fácilmente y es fácilmente escalable y modificable , esto me ayudo a reforzar mi conocimiento en **React** y en **Context**.

Implemente un sistema de **cache con Local Storage** para que la web no tenga que hacer tantas peticiones a la base de datos y asi mejorar la experiencia de usuario, esto me ayudo a reforzar mi conocimiento en **cache con Local Storage** y en **supabase**.

La web la comencé a trabajar de la siguiente forma:

1. **Creación de layout Navbar** - Una vez ya planeada la forma de estructurar los componentes para que solo dependan del contexto, me puse a programar el layout para que las paginas tengan acceso a la **barra de navegación y al pie de pagina** de forma automática, por cuestiones de tiempo el pies de pagina no fue implementado aun, pues me enfoque en otras funcionalidades sin embargo esta maquetado y listo para ser implementado de una forma muy fácil.
1. **Creación de la pagina de Productos** - esta sección fue la mas compleja que hice pues una vez que ya tenia la información de la base de datos en el **cache con Local Storage** tenia que hacer un sistema de filtrado y búsqueda de productos, esto fue muy complejo pero al final lo logre e hice que funcionara sin ningún bug que yo Halla encornado.
1. **creación de pagina de Inicio de sesión, Registro y User** - este ecosistema de paginas fue compleja ya que requería de que pudiera manejar la sesión del usuario y que este pudiera ver su información, esto fue **complejo** ya que tube que manejar **cookies**, **LocalStorage**, **contexto** y **base de datos con Supabase** el principal problema que tuve y que mas tiempo me llevo fue el diseño ya que no se proporciono algún concepto o material adicional para esto asi que tuve que improvisar he intentar hacer un diseño que no se viera tan mal y que fuera funcional.

- Para cuando termine de diseñar el SignIn y el SignUp ya no tenia mucho tiempo y ese fue mi **Problema Real** la falta de tiempo me hizo replantear mis metas, me di cuenta que las paginas de **Usuario**, **Contacto** y **Diario** no las podría terminar asi que pense en una solución y esa fue "dejar de lado la parte del usuario y contacto y con el poco tiempo que me quedaba terminar **Inicio** y darle cierta funcionalidad básica a **DIario**"

4. **creación de la pagina de Inicio** - esta pagina fue la mas simple ya que era una simple landing con muy poca información, solo lo necesaria para poder hacer que el usuario se registre o vea alguna pagina.
5. **creación de la pagina de Diario** - cuando llegue a esta pagina el ya no tenia tiempo esto hizo que tuviera que trabajar en esta pagina sin buenas practicas en el maquetado, a pesar de esto pude implementar el **chat bot** super simple. en esta parte tuve un **problema**, la api de **Open IA** de dio un error que me impidió asegurarme que todo funcione al 100% sin embargo al crear esta parte de la **API de Open IA** seguí las mejores practicas y lo hice de tal forma que si la api de **Open IA** funcionara esta parte de la web funcionaria sin ningún problema y si no es asi simplemente el bot no te responderá nada. el **tiempo** fue lo que me impidió hacer que esta parte de la web funcione al 100% con mas tiempo esta web quedara al 100%.

**En general** me enfoque en la funcionalidades generales y en que todo sea 100% escalable y fácil de mantener, el diseño no fue mi prioridad ya que no es mi fuerte pero trate de improvisar he intentar hacer un diseño que no se viera tan mal y que fuera funcional.
