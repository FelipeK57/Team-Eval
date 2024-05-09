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
    sql = "INSERT INTO informes_informes (nota, comentarios) VALUES (%s, %s)"

    # Define the data to insert
    nota = 777
    comentarios = 'Hey muy buenas a todos guapisimos'

    # Create a cursor
    cursor = conexion.cursor()

    # Execute the INSERT query with data values
    cursor.execute(sql, (nota, comentarios))

    # Commit the changes to make the insertion permanent
    conexion.commit()

    print("Datos insertados correctamente en la tabla 'informes_informes'")

except (Exception, psycopg2.Error) as error:
    print("Error durante la inserción:", error)

finally:
    # Close the connection (always recommended)
    if conexion:
        conexion.close()