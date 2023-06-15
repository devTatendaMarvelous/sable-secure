import tkinter as tk

root = tk.Tk()

# Get screen resolution
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

# Calculate window dimensions
border_width = 2
title_bar_height = 30
window_width = screen_width - border_width * 2
window_height = screen_height - title_bar_height - border_width * 2

# Set window dimensions and position
root.geometry("{}x{}+{}+{}".format(window_width,
              window_height, border_width, title_bar_height))

# Create a label widget for displaying images
label_width = window_width // 2 - border_width
label_height = window_height - border_width * 2
webcam_label = tk.Label(root, bg='white')
webcam_label.place(relx=0, rely=0, relwidth=0.5, relheight=1)

root.mainloop()
