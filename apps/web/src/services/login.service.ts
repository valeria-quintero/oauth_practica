// Dirección base de nuestra API (NestJS)
const API_URL = 'http://localhost:3000';

// Inicia el login con GitHub: pide la URL de autorización a la API y redirige al usuario ahí
export async function login() {
    // GET /auth/login -> lo atiende el método login() del AuthController
    const response = await fetch(`${API_URL}/auth/login`);

    // Si la API respondió con error (404, 500, etc.), detenemos el flujo
    if (!response.ok) {
        throw new Error(`Error al obtener la URL de login (${response.status})`);
    }

    // La API responde { url: "https://github.com/login/oauth/authorize?..." }
    const { url } = await response.json();

    // Sacamos al navegador de nuestra app y lo mandamos a GitHub para que autorice
    window.location.href = url;
}
