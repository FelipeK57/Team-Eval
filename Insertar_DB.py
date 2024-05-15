import psycopg2
from datetime import date

# Connect to the database
try:
    conexion = psycopg2.connect(
        dbname="bd_Team-Eval",
        user="postgres",
        password="teameval",  # Replace with your actual password (avoid storing in code)
        host="localhost",
        port=5432
    )

    # Prepare the INSERT query (using string formatting for clarity)
    sql_informes = "INSERT INTO informes_informes (nota, comentarios) VALUES (%s, %s)"
    sql_user = "INSERT INTO public.auth_user (id, password, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    sql_estudiante = "INSERT INTO estudiantes_estudiante (id, codigo, user_id) VALUES (%s, %s, %s)"
    sql_profesor = "INSERT INTO  profesor_profesor (id, telefono, identificacion, user_id) VALUES (%s, %s, %s, %s)"
    sql_grupo = "INSERT INTO grupo_grupo (id, nombre, proyectoasignado) VALUES (%s, %s, %s)"
    sql_curso = "INSERT INTO cursos_cursos (id, codigo, nombre, estado, periodoacademico, profesor_id) VALUES (%s, %s, %s, %s, %s, %s)"
    sql_cursos_estudiantes = "INSERT INTO cursos_cursos_estudiantes (id, cursos_id, estudiante_id) VALUES (%s, %s, %s)"
    sql_cursos_evaluaciones = "INSERT INTO cursos_cursos_evaluaciones (id, cursos_id, evalucion_id) VALUES (%s, %s, %s)"
    sql_evaluacion_evaluacion = "INSERT INTO evaluacion_evaluacion (id, fecha, rubrica_id) VALUES (%s, %s, %s)"
    sql_evaluacion_grupo = "INSERT INTO evaluacion_evaluacion_grupo (id, evaluacion_id, grupo_id) VALUES (%s, %s, %s)"
    sql_evaluacion_informe = "INSERT INTO evaluacion_evaluacion_informe (id, evaluacion_id, informes_id) VALUES (%s, %s, %s)"
    sql_grupo_estudiantes = "INSERT INTO grupo_grupo_estudiantes (id, grupo_id, estudiante_id) VALUES (%s, %s, %s)"
    sql_rubrica_evaluacion = "INSERT INTO rubrica_rubrica_evaluacion (id, nombre, escala) VALUES (%s, %s, %s)"
    sql_rubrica_criterio = "INSERT INTO rubrica_rubrica_evaluacion_criterios (id, rubrica_evaluacion_id, criterio_evaluacion_id) VALUES (%s, %s, %s)"
    sql_criterio = "INSERT INTO criterio_evaluacion_criterio_evaluacion (id, descripcion) VALUES (%s, %s)"

    # Define the data to insert
    nota = 777
    comentarios = 'Hey muy buenas a todos guapisimos'

    # Create a cursor
    cursor = conexion.cursor()

    # Execute the INSERT query with data values
    cursor.execute(sql_informes, (nota, comentarios))
    cursor.execute(sql_user, (2, 'd123456d', False, 'David', 'David', 'Palacios', 'david@gmail.com', False, True, '2024-05-03 11:30:50-05'))
    cursor.execute(sql_user, (3, 'j123456j', False, 'Diego', 'Diego', 'Leon', 'diego@gmail.com', False, True, '2024-05-03 11:35:50-05'))
    cursor.execute(sql_user, (4, 'se12345se', False, 'Sebastian', 'Sebastian', 'Hernandez', 'sebastian@gmail.com', False, True, '2024-05-03 11:30:50-05'))
    cursor.execute(sql_user, (5, 's123456s', False, 'Santiago', 'Santiago', 'Sanchez', 'santiago@gmail.com', False, True, '2024-05-03 11:35:50-05'))
    cursor.execute(sql_user, (6, 'k123456k', False, 'Kevin', 'Kevin', 'Bolaños', 'kevin@gmail.com', False, True, '2024-05-03 11:30:50-05'))
    cursor.execute(sql_user, (7, 'j123456j', False, 'Camilo', 'Camilo', 'Gonzalez', 'camilo@gmail.com', False, True, '2024-05-03 11:35:50-05'))
    cursor.execute(sql_user, (8, 'a123456a', False, 'Antonio', 'Antonio', 'Veléz', 'antonio@gmail.com', False, True, '2024-05-03 11:35:50-05'))
    cursor.execute(sql_user, (9, 'n123456n', False, 'Nathalia', 'Nathalia', 'Henao', 'nathalia@gmail.com', False, True, '2024-05-03 11:35:50-05'))

    cursor.execute(sql_estudiante, (1, '2255802', 2))
    cursor.execute(sql_estudiante, (2, '2255418', 3))
    cursor.execute(sql_estudiante, (3, '2255236', 4))
    cursor.execute(sql_estudiante, (4, '2255785', 5))
    cursor.execute(sql_estudiante, (5, '2255321', 6))
    cursor.execute(sql_estudiante, (6, '2255976', 7))

    cursor.execute(sql_profesor,(1, 22345, 77654990, 8)) 
    cursor.execute(sql_profesor,(2, 22233, 66543445, 9)) 

    cursor.execute(sql_curso,(1, 'D45667D', 'Proyecto Integrador', True, '2024-2', 1))
    cursor.execute(sql_curso,(2, 'C123456C', 'Desarrollo de Software', True, '2024-2', 2))

    cursor.execute(sql_grupo,(1, 'teameval1', 'proyectoteameval1'))
    cursor.execute(sql_grupo,(2, 'teameval2', 'proyectoteameval2'))
    cursor.execute(sql_grupo,(3, 'teameval3', 'proyectoteameval3'))
    
    cursor.execute(sql_grupo_estudiantes,(1, 1, 1))
    cursor.execute(sql_grupo_estudiantes,(2, 1, 2))
    cursor.execute(sql_grupo_estudiantes,(3, 2, 3))
    cursor.execute(sql_grupo_estudiantes,(4, 2, 4))
    cursor.execute(sql_grupo_estudiantes,(5, 3, 5))
    cursor.execute(sql_grupo_estudiantes,(6, 3, 6))

    cursor.execute(sql_cursos_estudiantes,(1, 1, 1))
    cursor.execute(sql_cursos_estudiantes,(2, 1, 2))
    cursor.execute(sql_cursos_estudiantes,(3, 1, 3))
    cursor.execute(sql_cursos_estudiantes,(4, 1, 4))
    cursor.execute(sql_cursos_estudiantes,(5, 1, 5))
    cursor.execute(sql_cursos_estudiantes,(6, 1, 6))
    cursor.execute(sql_cursos_estudiantes,(7, 2, 1))
    cursor.execute(sql_cursos_estudiantes,(8, 2, 2))
    cursor.execute(sql_cursos_estudiantes,(9, 2, 3))
    cursor.execute(sql_cursos_estudiantes,(10, 2, 4))
    cursor.execute(sql_cursos_estudiantes,(11, 2, 5))
    cursor.execute(sql_cursos_estudiantes,(12, 2, 6))

    cursor.execute( sql_criterio,(1, 'El integrante cumple de forma responsable sus tareas'))
    cursor.execute( sql_criterio,(2, 'El integrante muestra respeto ante las ideas de sus compañeros'))

    cursor.execute( sql_rubrica_evaluacion,(1, 'Rubrica Antonio', 4))

    cursor.execute( sql_evaluacion_evaluacion,(1, date(2024, 5, 20), 1))

    cursor.execute( sql_rubrica_criterio,(1, 1, 1))
    cursor.execute( sql_rubrica_criterio,(2, 1, 2))
    
    cursor.execute( sql_evaluacion_grupo,(1, 1, 1))
    cursor.execute( sql_evaluacion_grupo,(2, 1, 2))
    cursor.execute( sql_evaluacion_grupo,(3, 1, 3))

    # Commit the changes to make the insertion permanent
    conexion.commit()

    print("Datos insertados correctamente")

except (Exception, psycopg2.Error) as error:
    print("Error durante la inserción:", error)

finally:
    # Close the connection (always recommended)
    if conexion:
        conexion.close()