import os.path
import datetime
import pickle
import mysql.connector
import tkinter as tk
import cv2
from PIL import Image, ImageTk
import face_recognition

import util

from util import conn


class App:
    def __init__(self):
        self.main_window = tk.Tk()
        # Get screen resolution
        screen_width = self.main_window.winfo_screenwidth()
        screen_height = self.main_window.winfo_screenheight()

        # Calculate window dimensions
        border_width = 2
        title_bar_height = 30
        window_width = screen_width - border_width * 2
        window_height = screen_height - title_bar_height - border_width * 2
        self.xpos = window_width // 2 - border_width
        self.xpos = self.xpos+100

        # Set window dimensions and position
        self.main_window.geometry("{}x{}+{}+{}".format(window_width,
                                                       window_height, border_width, title_bar_height))

        # self.main_window.geometry("1200x520+350+100")

        self.login_button_main_window = util.get_button(
            self.main_window, 'login', 'green', self.login)
        self.login_button_main_window.place(x=self.xpos, y=400)

        self.logout_button_main_window = util.get_button(
            self.main_window, 'logout', 'red', self.logout)
        self.logout_button_main_window.place(x=self.xpos, y=500)

        self.register_new_user_button_main_window = util.get_button(self.main_window, 'register new user', 'gray',
                                                                    self.register_new_user, 20, fg='black')
        self.register_new_user_button_main_window.place(x=self.xpos, y=600)

        # label_width = window_width // 2 - border_width
        # label_height = window_height - border_width * 2
        # webcam_label.place()
        self.webcam_label = util.get_img_label(self.main_window)
        self.webcam_label.place(relx=0, rely=0, relwidth=0.5, relheight=1)

        self.add_webcam(self.webcam_label)

        self.db_dir = './db'
        if not os.path.exists(self.db_dir):
            os.mkdir(self.db_dir)

    def add_webcam(self, label):
        if 'cap' not in self.__dict__:
            self.cap = cv2.VideoCapture(0)

        self._label = label
        self.process_webcam()

    def process_webcam(self):
        ret, frame = self.cap.read()
        self.most_recent_capture_arr = frame
        img_ = cv2.cvtColor(self.most_recent_capture_arr, cv2.COLOR_BGR2RGB)
        self.most_recent_capture_pil = Image.fromarray(img_)
        imgtk = ImageTk.PhotoImage(image=self.most_recent_capture_pil)
        self._label.imgtk = imgtk
        self._label.configure(image=imgtk)

        self._label.after(20, self.process_webcam)

    def login(self):
        name = util.recognize(self.most_recent_capture_arr, self.db_dir)

        if name in ['unknown_person', 'no_persons_found']:
            util.msg_box(
                'Ups...', 'Unknown user. Please register new user or try again.')
        else:
            util.msg_box('Welcome back !', 'Welcome, {}.'.format(name))

            cur = conn.cursor()
            cur.execute(
                "INSERT INTO logs (name, state) VALUES (%s, %s)", (name, 'in'))
            # conn.close()

    def logout(self):
        name = util.recognize(self.most_recent_capture_arr, self.db_dir)

        if name in ['unknown_person', 'no_persons_found']:
            util.msg_box(
                'Ups...', 'Unknown user. Please register new user or try again.')
        else:
            util.msg_box('Hasta la vista !', 'Goodbye, {}.'.format(name))
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO logs (name, state) VALUES (%s, %s)", (name, 'out'))
            # conn.close()

    def register_new_user(self):
        self.register_new_user_window = tk.Toplevel(self.main_window)
        screen_width = self.register_new_user_window.winfo_screenwidth()
        screen_height = self.register_new_user_window.winfo_screenheight()

        # Calculate window dimensions
        border_width = 2
        title_bar_height = 30
        window_width = screen_width - border_width * 2
        window_height = screen_height - title_bar_height - border_width * 2
        self.xpos = window_width // 2 - border_width

        self.register_new_user_window.geometry("{}x{}+{}+{}".format(window_width,
                                                                    window_height, border_width, title_bar_height))
        self.accept_button_register_new_user_window = util.get_button(
            self.register_new_user_window, 'Accept', 'green', self.accept_register_new_user, 10)
        self.accept_button_register_new_user_window.place(
            x=self.xpos+50, y=790)

        self.try_again_button_register_new_user_window = util.get_button(
            self.register_new_user_window, 'Try again', 'red', self.try_again_register_new_user, 10)
        self.try_again_button_register_new_user_window.place(
            x=self.xpos+300, y=790)

        self.capture_label = util.get_img_label(self.register_new_user_window)
        self.capture_label.place(relx=0, rely=0, relwidth=0.5, relheight=1)

        self.add_img_to_label(self.capture_label)

        self.entry_text_register_new_user = util.get_entry_text(
            self.register_new_user_window)
        self.entry_text_register_new_user.place(x=self.xpos+50, y=250)
        self.text_label_register_new_user = util.get_text_label(
            self.register_new_user_window, 'Username:')
        self.text_label_register_new_user.place(x=self.xpos+50, y=200)

        self.entry_text_register_email = util.get_entry_text(
            self.register_new_user_window)
        self.entry_text_register_email.place(x=self.xpos+50, y=400)
        self.text_label_register_email = util.get_text_label(
            self.register_new_user_window, 'Email:')
        self.text_label_register_email.place(x=self.xpos+50, y=350)

        self.entry_text_register_dep = util.get_entry_text(
            self.register_new_user_window)
        self.entry_text_register_dep.place(x=self.xpos+50, y=550)
        self.text_label_register_dep = util.get_text_label(
            self.register_new_user_window, 'Department:')
        self.text_label_register_dep.place(x=self.xpos+50, y=500)

        self.entry_text_register_emp = util.get_entry_text(
            self.register_new_user_window)
        self.entry_text_register_emp.place(x=self.xpos+50, y=700)
        self.text_label_register_emp = util.get_text_label(
            self.register_new_user_window, 'Password:')
        self.text_label_register_emp.place(x=self.xpos+50, y=650)

    def try_again_register_new_user(self):
        self.register_new_user_window.destroy()

    def add_img_to_label(self, label):
        imgtk = ImageTk.PhotoImage(image=self.most_recent_capture_pil)
        label.imgtk = imgtk
        label.configure(image=imgtk)

        self.register_new_user_capture = self.most_recent_capture_arr.copy()

    def start(self):
        self.main_window.mainloop()

    def accept_register_new_user(self):
        name = self.entry_text_register_new_user.get(1.0, "end-1c")
        email = self.entry_text_register_email.get(1.0, "end-1c")
        emp = self.entry_text_register_emp.get(1.0, "end-1c")
        dep = self.entry_text_register_dep.get(1.0, "end-1c")

        if not name.replace(" ", "").isalpha():
            self.register_new_user_window.destroy()
            util.msg_box(
                'invalid name', 'Invalid name. Please a name cannot contain numbers.')
            return

        if '@' in email:
            embeddings = face_recognition.face_encodings(
                self.register_new_user_capture)[0]
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO employees (name, email,  department,emp)VALUES (%s, %s, %s, %s)", (name, email,  dep, emp))
            conn.close()
            file = open(os.path.join(
                self.db_dir, '{}.pickle'.format(name)), 'wb')
            pickle.dump(embeddings, file)
            util.msg_box('Success!', 'User was registered successfully !')
            self.register_new_user_window.destroy()
        else:
            self.register_new_user_window.destroy()
            util.msg_box(
                'invalid email', 'Invalid email. Please include @ in your email and try again.')


if __name__ == "__main__":

    app = App()

    app.start()
