# from sklearn.neighbors import KNeighborsClassifier
import cv2
import pickle
import numpy as np
import os
import csv
import time
from datetime import datetime
import face_recognition
import tkinter as tk
class App:
    def __init__(self):
        self.main_window = tk.Tk()
        self.main_window.geometry("1200x520+350+100")

    def start(self):
        self.main_window.mainloop()

app = App()
app.start()
app.speak('Tait')
