## Lista de clases
* Usuario
* Tablero
* Equipo
* Permiso

```mermaid
classDiagram
class Usuario{
    +Int id
    +String nombre
    +String apellidos
    +String correo
    +String clave_cifrada
    +List~Equipo~ equipos
    +List~Tablero~ tableros
    +List~Permiso~ permisos

    +cifrar_clave(String clave) String
}

class Equipo{
    +Int id
    +String nombre
    +DateTime creado
    +List~Equipo~ equipos
    +List~Tablero~ tableros
    +List~Permiso~ permisos

    +cifrar_clave(String clave) String
}
```