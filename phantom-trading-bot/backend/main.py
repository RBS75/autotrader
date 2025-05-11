from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from trading import TradingBot

app = FastAPI()
bot = TradingBot()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/trading")
async def toggle_trading(request: Request):
    data = await request.json()
    if data.get("active"):
        bot.start()
        return {"status": "trading started"}
    else:
        bot.stop()
        return {"status": "trading stopped"}
