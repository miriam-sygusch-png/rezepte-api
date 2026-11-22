import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // 1. Name und Nachricht des Fehlers im Terminal loggen
  console.error(`${err.name}: ${err.message}`);

  // 2. Status aus dem Fehler übernehmen — hat er keinen, ist es ein 500
  const status = err.status || 500;

  // 3. Mit diesem Status und { fehler: <Fehlermeldung> } antworten
  res.status(status).json({ fehler: err.message || "Interner Serverfehler" });
}