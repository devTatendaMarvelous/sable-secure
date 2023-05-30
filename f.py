import tkinter as tk
from tkinter import ttk
from util import conn

# Create a new tkinter window
root = tk.Tk()

# Create a Treeview widget with two columns
tree = ttk.Treeview(root, columns=('name', 'activity','time'))
tree.column('#0', width=10, anchor='center')
tree.column('name', width=100, anchor='center')
tree.column('activity', width=150, anchor='center')
tree.column('time', width=150, anchor='center')

def on_select(event):
    item = tree.selection()[0]
    name = tree.item(item, 'values')[0]
    age = tree.item(item, 'values')[1]
    print(f'Selected: {name}, {age}')


tree.bind('<<TreeviewSelect>>', on_select)
# Set the heading for each column
tree.heading('#0', text='ID')
tree.heading('name', text='Name')
tree.heading('activity', text='Activity')
tree.heading('time', text='Time')

# Add some data to the table

# Connect to the database

cur = conn.cursor()

# Fetch data from the database
cur.execute('SELECT * FROM logs')
rows = cur.fetchall()


# Add the data to the table
for row in rows:
    tree.insert('', 'end', text=row[0], values=(row[1], row[2], row[3]))

# Close the database connection
conn.close()


# Pack the Treeview widget into the window
tree.pack()

# Run the main event loop
root.mainloop()
