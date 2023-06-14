from flask import Flask, render_template, request, url_for, flash
from werkzeug.utils import redirect
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'many random bytes'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'thetechiam03'
app.config['MYSQL_DB'] = 'sable'

mysql = MySQL(app)


@app.route('/')
def Index():
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    if request.method == "POST":

        email = request.form['email']
        emp = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT * FROM employees WHERE email=%s AND emp=%s", (email, emp))
        data = cur.fetchall()
        cur.close()
        if data:
            flash("Logged in Successfully")
            return redirect(url_for('logs'))
        else:
            flash("Invalid credentials")
            return redirect(url_for('Loginp'))


@app.route('/loginp')
def Loginp():
    return render_template('login.html')


@app.route('/employees')
def Employees():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM employees")
    data = cur.fetchall()
    cur.close()

    return render_template('employees.html', employees=data)


@app.route('/edit/<string:id_data>')
def Edit(id_data):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM employees WHERE id=%s", (id_data,))
    data = cur.fetchall()
    cur.close()

    return render_template('edit.html', row=data)


@app.route('/logs')
def logs():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM logs")
    data = cur.fetchall()
    cur.close()

    return render_template('logs.html', logs=data)


@app.route('/insert', methods=['POST'])
def insert():
    if request.method == "POST":
        flash("Data Inserted Successfully")
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO employees (name, email, phone) VALUES (%s, %s, %s)", (name, email, phone))
        mysql.connection.commit()
        return redirect(url_for('Index'))


@app.route('/delete/<string:id_data>', methods=['GET'])
def delete(id_data):
    flash("Record Has Been Deleted Successfully")
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM employees WHERE id=%s", (id_data,))
    mysql.connection.commit()
    return redirect(url_for('Employees'))


@app.route('/update', methods=['GET', 'POST'])
def update():
    if request.method == 'POST':
        id_data = request.form['id']
        name = request.form['name']
        email = request.form['email']
        department = request.form['department']
        cur = mysql.connection.cursor()
        cur.execute("UPDATE employees SET name=%s, email=%s, department=%s WHERE id=%s",
                    (name, email, department, id_data))
        flash("Data Updated Successfully")
        return redirect(url_for('Employees'))
    else:
        flash("Data Updated failed")
        return redirect(url_for('Employees'))


@app.route('/create-log', methods=['POST'])
def create_log():
    # Get the data from the request
    data = request.json

    # Create the log file
    if request.method == "POST":
        # flash("Data Inserted Successfully")
        name = data['name']
        email = data['state']
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO logs (name, state) VALUES (%s, %s)", (data['name'], data['state']))
        mysql.connection.commit()

    # Return a response
    return {'status': 'success'}


if __name__ == "__main__":
    app.run(debug=True)
