import psycopg2

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
    sql_grupoestudiante = "INSERT INTO grupo_grupo_estudiantes (id, grupo_id, estudiante_id) VALUES (%s, %s, %s)"
    sql_curso = "INSERT INTO cursos_cursos (id, codigo, nombre, estado, periodoacademico, profesor_id) VALUES (%s, %s, %s, %s, %s, %s)"
    sql_cursos_grupo = "INSERT INTO cursos_cursos_grupos (id, cursos_id, grupo_id) VALUES (%s, %s, %s)"
    sql_criterio = "INSERT INTO criterio_evaluacion_criterio_evaluacion (id, descripcion) VALUES (%s, %s)"

    # Define the data to insert
    nota = 777
    comentarios = 'Hey muy buenas a todos guapisimos'

    # Create a cursor
    cursor = conexion.cursor()

    # Execute the INSERT query with data values
    cursor.execute(sql_informes, (nota, comentarios))
    cursor.execute(sql_user, (9, 'd123456d', False, 'David', 'David', 'Palacios', 'david@gmail.com', False, True, '2024-05-03 11:30:50-05'))
    cursor.execute(sql_user, (10, 'j123456j', False, 'Diego', 'Diego', 'Leon', 'diego@gmail.com', False, True, '2024-05-03 11:35:50-05'))
    cursor.execute(sql_user, (11, 'a123456a', False, 'Antonio', 'Antonio', 'Veléz', 'antonio@gmail.com', False, True, '2024-05-03 11:35:50-05'))
    cursor.execute(sql_estudiante, (6, '2255802', 9))
    cursor.execute(sql_estudiante, (7, '2255418', 10))
    cursor.execute(sql_profesor,(5, 22345, 77654990, 11))  
    cursor.execute(sql_grupo,(3, 'teameval3', 'proyectoteameval2'))
    cursor.execute(sql_grupoestudiante,(7, 3, 6))
    cursor.execute(sql_grupoestudiante,(8, 3, 7))
    cursor.execute(sql_curso,(4, 'D45667D', 'FADA', True, '2024-2', 5))
    cursor.execute(sql_cursos_grupo,(6, 4, 3))
    
    
    # Commit the changes to make the insertion permanent
    conexion.commit()

    print("Datos insertados correctamente en la tabla 'informes_informes'")

except (Exception, psycopg2.Error) as error:
    print("Error durante la inserción:", error)

finally:
    # Close the connection (always recommended)
    if conexion:
        conexion.close()