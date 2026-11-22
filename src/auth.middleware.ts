import { Request, Response, NextFunction } from "express";

const API_KEY = "geheim123";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  // 1. Header "x-api-key" aus der Anfrage auslesen
  const apiKey = req.header("x-api-key");

  // 2. Prüfen, ob der Schlüssel fehlt oder falsch ist
  if (apiKey !== API_KEY) {
    return res.status(401).json({ fehler: "Nicht autorisiert" });
  }

  // 3. Schlüssel stimmt -> weiter zum Controller
  next();
}