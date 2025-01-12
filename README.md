# FACTURED
Prueba tecnica de FACTURED

Opción 2: Caso práctico propuesto

Video demo

[demo.mp4](https://github.com/nelsondev19/FACTURED/raw/refs/heads/master/demo.mp4)

Correr proyecto

```bash
docker compose up
```


Funcionalidades (backend)

✅ CRUD para tableros y tareas

✅ Mover tareas entre estados (pendiente, en progreso, completada)

✅ Base de datos PostgreSQL

✅ Implementación de validaciones robustas en los datos recibidos

✅ Dockerfile

✅ Principio SOLID y el patrón Repositorio

✅ Swagger UI [http://localhost:8000/docs](http://localhost:8000/docs)

❌ Generar reportes con conteo de tareas por estado y tablero, con estadísticas básicas como proporción de tareas completadas.

❌ Uso de autenticación segura (JWT, OAuth).

Detalles técnicos de la solución

- utilice `psycopg2` para conectarme a la base de datos ya que me gusta escribir mis propias consultas (RAW SQL)
- Framework `FastAPI` robusto eficiente y tipado por defecto



Funcionalidades (frontend)

✅ Interfaz usando Next.js y bun.

✅ Crear tableros.

✅ Crear tareas.

✅ Actualizar estado de la tarea

✅ Mover tareas entre tableros

✅ Paginación para las tareas (obtiene 50 en cada peticion)

✅ Peticiones a API utilizando `Fetch API`

✅ Drag and Drop nativo (sin bibliotecas)

✅ Modales nativos utilizando `<dialog></dialog>`

✅ Dockerfile

❌ Eliminar tarea

❌ Eliminar tablero


Detalles técnicos de la solución

- Cuando hago la petición a los tableros tambien obtiene una lista de tareas con un maximo de 50, luego con el boton dentro del tablero pido otras 50 tareas y asi es como hago la paginación


> Una cosas no las hice por falta de tiempo pero realmente tengo el conocimiento para hacerlas
