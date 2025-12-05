import jwt from "jsonwebtoken";

// Esta es la función "Factory" que recibe los roles [1, 2]
export const verifyRoles = (rolesPermitidos) => {
  // Y devuelve el middleware real que Express ejecutará
  return (req, res, next) => {
    let token;

    // 1. Buscar el token en los headers (Formato: "Bearer eyJhbGci...")
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Obtenemos solo el código hash, quitando la palabra "Bearer"
        token = req.headers.authorization.split(" ")[1];

        // 2. Verificar que el token sea válido (Autenticación)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Verificar que el ROL sea el correcto (Autorización)
        // decoded.id_rol viene dentro del token
        if (!rolesPermitidos.includes(decoded.id_rol)) {
          console.log(rolesPermitidos.decoded.id_rol);
          res.status(403); // 403 Forbidden (Prohibido)
          throw new Error(
            "Acceso denegado: No tienes permisos para esta acción"
          );
        }

        // Si todo pasa, guardamos al usuario en la request por si el controlador lo necesita
        req.user = decoded;
        next(); // Pasa al siguiente
      } catch (error) {
        // Si el error fue por rol, mantenemos el 403. Si fue por token, es 401.
        if (res.statusCode !== 403) {
          res.status(401); // 401 Unauthorized
          throw new Error("Token no válido o expirado");
        }
        // Si ya era 403, relanzamos el error original
        throw error;
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("No autorizado, no se envió ningún token");
    }
  };
};
