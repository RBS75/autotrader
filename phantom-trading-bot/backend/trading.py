import threading
import time

class TradingBot:
    def __init__(self):
        self.active = False
        self.thread = None

    def start(self):
        if not self.active:
            self.active = True
            self.thread = threading.Thread(target=self.run)
            self.thread.start()

    def stop(self):
        self.active = False
        if self.thread:
            self.thread.join()

    def run(self):
        while self.active:
            print("Ejecutando trading...")  # Aquí irá tu lógica real
            time.sleep(10)
