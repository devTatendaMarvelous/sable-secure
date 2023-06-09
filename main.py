import os.path
import datetime
import pickle

import tkinter as tk
import cv2
from PIL import Image, ImageTk


import util
from util import conn


class App:
    def __init__(self):
        self.main_window = tk.Tk()
        self.main_window.geometry("1200x520+350+100")

        self.login_button_main_window = util.get_button(
            self.main_window, 'login', 'green', self.login)
        self.login_button_main_window.place(x=750, y=200)

        self.webcam_label = util.get_img_label(self.main_window)
        self.webcam_label.place(x=10, y=0, width=700, height=500)

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
            conn.close()

    def add_img_to_label(self, label):
        imgtk = ImageTk.PhotoImage(image=self.most_recent_capture_pil)
        label.imgtk = imgtk
        label.configure(image=imgtk)

        self.register_new_user_capture = self.most_recent_capture_arr.copy()

    def start(self):
        self.main_window.mainloop()


if __name__ == "__main__":
    app = App()
    app.start()
